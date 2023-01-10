<template>
  <v-main>
    <body>
    <v-col>
      <v-row class="mt-2 mb-4 ml-3">
        <v-card outlined>
          <v-card-text>Teilnehmer/in ID: {{ this.patientID }}</v-card-text>
          <v-card-text>Zyklusnummer:
            <v-text-field
                v-model="cycleNum"
                :rules="[rules.required, rules.num]"
                single-line
                type="number"
            />
          </v-card-text>
          <v-card-text>Datum erster Zyklustag:</v-card-text>
          <v-card-text>
            <v-date-picker v-model="date" color="#004a6f"
                           locale="de"
                           first-day-of-week="1"
            ></v-date-picker>
            <v-card-text style="font-size: small">
              * Bitte wählen Sie ein Datum aus.
            </v-card-text>
          </v-card-text>
          <v-card-text>Zykluslänge:
            <v-text-field
                v-model="cycleLength"
                :rules="[rules.required, rules.num]"
                single-line
                type="number"
            />
          </v-card-text>
          <v-card-text>Störfaktoren:
            <v-textarea rows="3" v-model="stoerfactor"></v-textarea>
          </v-card-text>
          <v-card-text>Kinderwunsch in diesem Zyklus:
            <v-select
                v-model="selectKinderwunsch"
                :items="kinderwunsch"
                :rules="rules.reqSelect"
                chips
                dense
            ></v-select>
          </v-card-text>
          <v-card-text>Schwanger:
            <v-select
                v-model="selectSchwanger"
                :items="schwanger"
                :rules="rules.reqSelect"
                chips
                dense
            ></v-select>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row class="mt-2 mb-4 ml-3">
        <v-dialog
            v-model="dialog"
            width="500">

          <template v-slot:activator="{ on, attrs }">
            <v-btn-toggle group>
              <v-btn color="red darken-4" outlined :to="{name: 'cycle'}">Abbrechen</v-btn>
              <v-btn
                  @click="sendCycleLengthTS()"
                  v-bind="attrs"
                  v-on="on"
              >trackle & Sensiplan
              </v-btn>

              <v-btn @click="sendCycleLengthT()"
                     v-bind="attrs"
                     v-on="on"
              >trackle
              </v-btn>

              <v-btn @click="sendCycleLengthS()"
                     v-bind="attrs"
                     v-on="on"
              >Sensiplan
              </v-btn>
            </v-btn-toggle>
          </template>

          <h1 v-if="openNotFilledDialog">
            <v-card outlined>
              <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
              <v-card-subtitle>Nicht alle Pflichtfelder sind ausgefüllt</v-card-subtitle>
              <v-divider/>

              <v-card-text>
                <div class="text--primary">
                  Bitte prüfen Sie ihre Eingabe, diese Felder fehlen noch: <br> <br>
                  <ul>
                    <li v-if="cycleNum === 0 || cycleNum === ''">Die Zyklusnummer</li>
                    <li v-if="date === null">Das Datum des ersten Zyklustags</li>
                    <li v-if="cycleLength === 0|| cycleLength === ''">Die Zykluslänge</li>
                    <li v-if="selectKinderwunsch === null">Der Kinderwunsch</li>
                    <li v-if="selectSchwanger === null">Schwangerschaft</li>
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
          <h1 v-if="openNegativeDialog">
            <v-card outlined>
              <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
              <v-card-subtitle>Nicht erlaubter Wert</v-card-subtitle>
              <v-divider/>

              <v-card-text>
                <div class="text--primary">
                  Bitte prüfen Sie ihre Eingabe, folgende Felder dürfen nur positive Werte annehmen: <br> <br>
                  <ul>
                    <li v-if="cycleNum < 1">Die Zyklusnummer</li>
                    <li v-if="cycleLength < 1">Die Zykluslänge</li>
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
  name: "Add_Cycle",
  data: () => {
    return {
      kinderwunsch: [
        {text: 'ja'},
        {text: 'nein'},
        {text: 'unentschieden'},
      ],
      schwanger: [
        {text: 'ja - SS-Test positiv'},
        {text: 'ja - verlängerte Temp.-Hochlage'},
        {text: 'ja - beides'},
        {text: 'nein'},
      ],
      participantNum: 0,
      cycleNum: 0,
      cycleLength: 0,
      date: null,
      stoerfactor: null,
      selectSchwanger: null,
      selectKinderwunsch: null,
      rules: {
        required: value => !!value || 'Pflichtangabe.',
        num: v => v >= 1 || "Negative Zahlen sowie Null ist nicht erlaubt.",
        reqSelect: [(v) => !!v || "Pflichtangabe"]
      },
      openNotFilledDialog: false,
      openNegativeDialog: false,
      dialog: false,
      patientID: localStorage.getItem('patientID'),
    }
  },

  methods: {
    check() {
      if (this.cycleNum < 1 || this.cycleLength < 1) {
        this.openNotFilledDialog = false;
        this.openNegativeDialog = true;
        return false;
      } else if (((this.cycleNum != null && this.cycleNum > 0) &&
          (this.cycleLength > 0 && this.cycleLength != null)
          && this.date != null && this.selectKinderwunsch != null
          && this.selectSchwanger != null)) {
        this.openNotFilledDialog = false;
        this.openNegativeDialog = false;
        return true;
      } else {
        this.openNotFilledDialog = true;
        this.openNegativeDialog = false;
        return false;
      }
    },
    sendCycleLengthTS() {
      if (this.check()) {
        localStorage.setItem('storageCycleLength', this.cycleLength)
        localStorage.setItem('storageCycleNum', this.cycleNum)
        localStorage.setItem('storageDate', this.date)
        localStorage.setItem('storageStoerfaktor', this.stoerfactor)
        localStorage.setItem('storagePregnant', this.selectSchwanger)
        localStorage.setItem('storageKinderwunsch', this.selectKinderwunsch)
        localStorage.setItem('patientID', this.patientID)
        this.$router.push("/patients/single_patient/cycle/add_cycle2")
      }
    },
    sendCycleLengthT() {
      if (this.check()) {
        localStorage.setItem('storageCycleLength', this.cycleLength)
        localStorage.setItem('storageCycleNum', this.cycleNum)
        localStorage.setItem('storageDate', this.date)
        localStorage.setItem('storageStoerfaktor', this.stoerfactor)
        localStorage.setItem('storagePregnant', this.selectSchwanger)
        localStorage.setItem('storageKinderwunsch', this.selectKinderwunsch)
        localStorage.setItem('patientID', this.patientID)
        this.$router.push("/patients/single_patient/cycle/add_cyclet")
      }
    },
    sendCycleLengthS() {
      if (this.check()) {
        localStorage.setItem('storageCycleLength', this.cycleLength)
        localStorage.setItem('storageCycleNum', this.cycleNum)
        localStorage.setItem('storageDate', this.date)
        localStorage.setItem('storageStoerfaktor', this.stoerfactor)
        localStorage.setItem('storagePregnant', this.selectSchwanger)
        localStorage.setItem('storageKinderwunsch', this.selectKinderwunsch)
        localStorage.setItem('patientID', this.patientID)
        localStorage.setItem('storageCycleLength', this.cycleLength)
        this.$router.push("/patients/single_patient/cycle/add_cycleS")
      }
    }
  }
}
</script>

<style scoped>

</style>