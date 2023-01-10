<template>
  <v-main>
    <body>
    <v-col>
      <v-row class="mt-2 mb-4 ml-3">
        <v-chip class="ma-2" outlined color="#004a6f">Teilnehmer/in ID: {{ patientID }}</v-chip>
      </v-row>
      <v-row class="mt-2 mb-4 ml-3">
        <v-card outlined>
          <v-card-text>Trackle ID:
            <v-text-field
                v-model="trackleID"
                :rules="rules"
                single-line
                type="number"
            />
          </v-card-text>
          <v-card-text>Sensiplan ID:
            <v-text-field
                v-model="sensiplanID"
                :rules="rules"
                single-line
                type="number"
            />
          </v-card-text>
          <v-card-text>Alte Datenbank ID:
            <v-text-field
                v-model="oldDBID"
                :rules="rules"
                single-line
                type="number"
            />
          </v-card-text>
        </v-card>
      </v-row>
      <v-row class="mt-2 mb-4 ml-3">
        <v-dialog
            v-model="dialog"
            width="500">

          <template v-slot:activator="{ on, attrs }">
            <v-btn-toggle group>
              <v-btn :to="{name: 'single_patient'}">abbrechen</v-btn>
              <v-btn
                  @click="savePatient()"
                  v-bind="attrs"
                  v-on="on"
              >speichern
              </v-btn>
            </v-btn-toggle>
          </template>

          <h1 v-if="errorNeg">
            <v-card outlined>
              <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
              <v-card-subtitle>Nicht erlaubter Wert</v-card-subtitle>
              <v-divider/>

              <v-card-text>
                <div class="text--primary">
                  Die von Ihnen eingetragene IDs dürfen keinen negativen Wert haben. <br>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#004a6f"
                    class="white--text mx-2"
                    @click="dialog = false"
                >Schließen
                </v-btn>
              </v-card-actions>
            </v-card>
          </h1>

          <h1 v-else-if="errorNotFilled">
            <v-card outlined>
              <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
              <v-card-subtitle>Nicht alle Pflichtfelder sind ausgefüllt</v-card-subtitle>
              <v-divider/>

              <v-card-text>
                <div class="text--primary">
                  Prüfen Sie bitte, dass mindestens eine ID eingetragen wurde: <br> <br>
                  <ul>
                    <li>Sensiplan oder trackle<br></li>
                    <li>Die alte Datenbank ID ist nur in Kombination mit
                      <br>trackle oder Sensiplan erlaubt <br></li>
                  </ul>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#004a6f"
                    class="white--text mx-2"
                    @click="dialog = false"
                >Schließen
                </v-btn>
              </v-card-actions>
            </v-card>
          </h1>
          <h1 v-else-if="errorNoChange">
            <v-card outlined>
              <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
              <v-divider/>

              <v-card-text>
                <div class="text--primary">
                  Die eingetragene Werte entsprechen den gespeicherten, bitte überprüfen Sie Ihre Angaben.
                </div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#004a6f"
                    class="white--text mx-2"
                    @click="dialog = false"
                >Schließen
                </v-btn>
              </v-card-actions>
            </v-card>
          </h1>
        </v-dialog>
      </v-row>
    </v-col>
    </body>
  </v-main>
</template>

<script>
export default {
  name: "Edit_Patient",
  data: () => {
    return {
      patientID: localStorage.getItem('patientSelect'),
      trackleID: 0,
      sensiplanID: 0,
      oldDBID: 0,
      readTID: '0',
      readSID: '0',
      readOID: '0',
      rules: [
        v => v >= 0 || "Negative Zahlen sind nicht erlaubt"
      ],
      dialog: false,
      errorNeg: false,
      errorNotFilled: false,
      errorNoChange: false
    }
  },
  mounted() {
    this.getPatient()
  },
  methods: {
    check() {
      if (this.oldDBID < 0 || this.trackleID < 0 || this.sensiplanID < 0) {
        this.errorNeg = true;
        this.errorNotFilled = false;
        this.errorNoChange = false;
        return false;
      } else if (this.compareNum(this.readTID, this.trackleID) &&
          this.compareNum(this.readSID, this.sensiplanID) &&
          this.compareNum(this.readOID, this.oldDBID)) {
        this.errorNotFilled = false;
        this.errorNoChange = true;
        this.errorNeg = false;
        return false;
      } else if ((this.trackleID > 0 && this.oldDBID > 0) || (this.sensiplanID > 0 && this.oldDBID > 0)
          || (this.trackleID > 0 && this.sensiplanID > 0) || this.trackleID > 0 || this.sensiplanID > 0) {
        this.errorNotFilled = false;
        this.errorNeg = false;
        this.errorNoChange = false;
        return true;
      } else {
        this.errorNotFilled = true;
        this.errorNeg = false;
        this.errorNoChange = false;
        return false;
      }
    },

    getPatient() {
      this.axios.get("http://localhost:3000/patient/" + this.patientID, {}).then((response) => {
        this.trackleID = response.data.identifier[0].value
        this.sensiplanID = response.data.identifier[1].value
        this.oldDBID = response.data.identifier[2].value

        this.readTID = this.trackleID
        this.readSID = this.sensiplanID
        this.readOID = this.oldDBID
      }).catch((error) => {
        console.log(error)
      })
    },
    compareNum: function (num, num2) {
      return num === num2 && num.length === num2.length;
    },
    savePatient() {
      if (this.check()) {
        if(this.oldDBID === ""){
          this.oldDBID = 0;
        }
        if(this.trackleID === ""){
          this.trackleID = 0;
        }
        if(this.sensiplanID === ""){
          this.sensiplanID = 0;
        }
        this.axios.put("http://localhost:3000/patient/" + this.patientID, {
          idPat: this.patientID,
          idTrackle: this.trackleID,
          idSensiplan: this.sensiplanID,
          idOldDB: this.oldDBID,
        }).then((response) => {
          console.log(response)
          this.$router.push("/patients/single_patient")
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>