<template>
  <v-main>
    <body>
    <v-col>
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
                v-model="sensiID"
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
              <v-btn :to="{name: 'patients'}">abbrechen</v-btn>
              <v-btn
                  @click="sendCreateRequest()"
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
        </v-dialog>
      </v-row>
    </v-col>
    </body>
  </v-main>
</template>

<script>
export default {
  name: "Create_Patient",
  data: () => ({
    trackleID: 0,
    sensiID: 0,
    oldDBID: 0,
    rules: [
      v => v >= 0 && !!v || "Negative Zahlen sind nicht erlaubt"
    ],
    dialog: false,
    errorNeg: false,
    errorNotFilled: false
  }),
  methods: {

    check() {
      if (this.trackleID < 0 || this.sensiID < 0 || this.oldDBID < 0) {
        this.errorNeg = true;
        this.errorNotFilled = false;
        return false;
      } else if ((this.trackleID > 0 && this.oldDBID > 0) ||
          (this.sensiID > 0 && this.oldDBID > 0) ||
          (this.trackleID > 0 && this.sensiID > 0) ||
          this.trackleID > 0 || this.sensiID > 0) {
        this.errorNotFilled = false;
        this.errorNeg = false;
        return true;
      } else {
        this.errorNeg = false;
        this.errorNotFilled = true;
        return false;
      }
    },
    sendCreateRequest() {
      if (this.check()) {
        if (this.oldDBID === "") {
          this.oldDBID = 0;
        }
        if (this.trackleID === "") {
          this.trackleID = 0;
        }
        if (this.sensiplanID === "") {
          this.sensiplanID = 0;
        }
        console.log(this.oldDBID)
        this.axios.post("http://localhost:3000/patient", {
          idTrackle: this.trackleID,
          idSensiplan: this.sensiID,
          idOldDB: this.oldDBID,

        }).then((response) => {
          console.log(response)
          this.$router.push("/patients")
        }).catch((error) => console.log(error))
      }
    }
  }
}
</script>

<style scoped>

</style>