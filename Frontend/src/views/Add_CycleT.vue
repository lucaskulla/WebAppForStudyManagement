<template>
  <v-container fluid="fluid">
    <v-row class="mt-2 mb-4 ml-3">
      <v-col>
        <v-row class="mt-2 mb-4 ml-3">
          <v-card>
            <v-card-title>trackle</v-card-title>
            <v-card-text>Erster fruchtbarer Tag nach trackle
              <v-select
                  v-model="selectedFirstFertilTrackle"
                  :items="firstFertilTrackle"
                  chips
                  dense
              ></v-select>
            </v-card-text>

            <v-card-text>Erste höhere Messung nach trackle
              <v-select
                  v-model="selectedFirstMesTrackle"
                  :items="firstMesTrackle"
                  chips
                  dense
              ></v-select>

            </v-card-text>

            <v-card-text>Ende der Temperatusauswertung nach trackle
              <v-select
                  v-model="selectedEndTempTrackle"
                  :items="endTempTrackle"
                  chips
                  dense
              ></v-select>

            </v-card-text>

            <v-card-text>Letzter fruchtbarer Tag nach trackle
              <v-select
                  v-model="selectedLastFertilDayTrackle"
                  :items="lastFertilDayTrackle"
                  chips
                  dense
              ></v-select>
            </v-card-text>

          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-2 mb-4 ml-3">
      <v-col>
        <v-row class="mt-2 mb-4 ml-3">
          <v-card>
            <v-card-title>Geschlechtsverkehr</v-card-title>

            <v-card-text>Zyklustage → kein GV
              <v-select
                  v-model="selectedCyclesKGV"
                  :items="cyclesKGV"
                  chips
                  multiple
                  dense
              ></v-select>

            </v-card-text>
            <v-card-text>Zyklustage → ungeschützter GV
              <v-select
                  v-model="selectedCyclesUGV"
                  :items="cyclesUGV"
                  chips
                  multiple
                  dense
              ></v-select>

            </v-card-text>
            <v-card-text>Zyklustage → GV mit Kondom
              <v-select
                  v-model="selectedCyclesK"
                  :items="cyclesK"
                  chips
                  multiple
                  dense
              ></v-select>

            </v-card-text>
            <v-card-text>Zyklustage → GV mit anderem Verhütungsmittel
              <v-select
                  v-model="selectedCyclesV"
                  :items="cyclesV"
                  chips
                  multiple
                  dense
              ></v-select>

            </v-card-text>
            <v-card-text>Zyklustage → keine Angabe zu GV
              <v-select
                  v-model="selectedCyclesKA"
                  :items="cyclesKA"
                  chips
                  multiple
                  dense
              ></v-select>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-col>
        <v-row class="mt-2 mb-4 ml-3">
          <v-card>
            <v-card-text>Messort der Aufwachtemperatur:
              <v-select
                  v-model="selectedMeasurement"
                  :items="measurement"
                  chips
                  dense
              ></v-select>
            </v-card-text>
            <v-card-text>Zervixschleimbeginn (f, S oder S+):
              <v-select
                  v-model="selectedCervixSchleimBe"
                  :items="cervixSchleimBe"
                  chips
                  dense
              ></v-select>

            </v-card-text>
            <v-card-text>Zervixschleimhöhepunkt:
              <v-select
                  v-model="selectedCervixSchleimHoeh"
                  :items="cervixSchleimHoeh"
                  chips
                  dense
              ></v-select>

            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>


    <v-row class="mt-2 mb-4 ml-3">
      <v-dialog
          v-model="dialog"
          width="500">

        <template v-slot:activator="{ on, attrs }">
          <v-btn-toggle group>
            <v-btn :to="{name: 'add_cycle'}">Zurück</v-btn>
            <v-btn :to="{name: 'cycle'}">Abbrechen</v-btn>
            <v-btn @click="saveCycle()"
                   v-bind="attrs"
                   v-on="on">speichern
            </v-btn>
          </v-btn-toggle>
        </template>

        <h1 v-if="openDialogTrackleNothingFilled">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Eine leere trackle Eingabe ist nicht erlaubt. <br>
                Bitte überprüfen Sie Ihre Eingaben.<br>
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

        <h1 v-else-if="openDialogTrackleNotFilled || openDialogTempNotFilled">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Achtung</v-card-title>
            <v-divider/>

            <v-card-text>
              <div v-if="openDialogTrackleNotFilled" class="text--primary">
                <br> Diese trackle Angaben sind nicht ausgefüllt worden: <br> <br>
                <ul>
                  <li v-if="selectedFirstFertilTrackle === 0">Erster fruchtbarer Tag</li>
                  <li v-if="selectedFirstMesTrackle === 0">Erste höhere Messung</li>
                  <li v-if="selectedEndTempTrackle === 0">Ende der Temperaturauswertung</li>
                  <li v-if="selectedLastFertilDayTrackle === 0">Letzter fruchtbarer Tag</li>
                </ul>
              </div>

              <div v-if="openDialogTempNotFilled" class="text--primary">
                <br> Diese allgemeine Angaben sind nicht ausgefüllt worden: <br> <br>
                <ul>
                  <li v-if="selectedCervixSchleimBe === 0 ">Zervixschleimbeginn</li>
                  <li v-if="selectedCervixSchleimHoeh === 0 ">Zervixschleimhöhepunkt</li>
                  <li v-if="selectedMeasurement === null ">Messort der Aufwachtemperatur</li>
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
              <v-btn
                  color="#D25A00"
                  class="white--text mx-2"
                  @click="
                  checkingDone = true
                  saveCycle()
                  dialog = false"
              >Trotzdem speichern
              </v-btn>
            </v-card-actions>
          </v-card>
        </h1>

        <h1 v-if="openDialogSomethingFilled === false">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Sie haben noch nichts eingegeben. <br>
                Eine leere Auswahl kann nicht gespeichert werden.<br>
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
  </v-container>
</template>

<script>
export default {
  name: "Add_CycleT",
  data: () => {
    return {
      cycleLength: localStorage.getItem('storageCycleLength'),
      cycleNum: localStorage.getItem('storageCycleNum'),
      date: localStorage.getItem('storageDate'),
      stoerfaktor: localStorage.getItem('storageStoerfaktor'),
      schwanger: localStorage.getItem('storagePregnant'),
      kinderwunsch: localStorage.getItem('storageKinderwunsch'),
      patientID: localStorage.getItem('patientID'),

      cyclesUGV: [],
      cyclesKGV: [],
      cyclesK: [],
      cyclesV: [],
      cyclesKA: [],
      cervixSchleimBe: [],
      cervixSchleimHoeh: [],
      lastFertilDayTrackle: [],
      firstFertilTrackle: [],
      endTempTrackle: [],
      firstMesTrackle: [],
      measurement: [
        {text: 'rektal'},
        {text: 'oral'},
        {text: 'vaginal'},
      ],

      selectedFirstFertilTrackle: 0,
      selectedFirstMesTrackle: 0,
      selectedEndTempTrackle: 0,
      selectedLastFertilDayTrackle: 0,

      selectedCyclesUGV: 0,
      selectedCyclesKGV: 0,
      selectedCyclesK: 0,
      selectedCyclesV: 0,
      selectedCyclesKA: 0,


      schwangerBool1: false,
      schwangerBool2: false,

      selectedCervixSchleimBe: 0,
      selectedCervixSchleimHoeh: 0,
      selectedMeasurement: null,

      openDialogTrackleNotFilled: false,
      openDialogTempNotFilled: false,
      openDialogTrackleNothingFilled: false,
      openDialogSomethingFilled: true,
      checkingDone: false,
      dialog: false
    }
  },
  mounted() {
    console.log(this.patientID)
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesKGV.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesUGV.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesV.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesKA.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesK.push(i.toString());
    }
    this.cervixSchleimHoeh.push('unklar')
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cervixSchleimHoeh.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cervixSchleimBe.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstMesTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstFertilTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.lastFertilDayTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.endTempTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstMesTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstFertilTrackle.push(i.toString());
    }
  },

  methods: {
    checkInput() {
      if (((this.openDialogTrackleNotFilled === true && this.openDialogTempNotFilled === true)
          || this.openDialogTrackleNotFilled === true || this.openDialogTempNotFilled === true) && this.checkingDone === true) {
        // toggle values -- when save despite warning
        this.openDialogTrackleNotFilled = false;
        this.openDialogTempNotFilled = false;
      } else {
        if (this.selectedFirstFertilTrackle !== 0 && this.selectedFirstMesTrackle !== 0 &&
            this.selectedEndTempTrackle !== 0 && this.selectedLastFertilDayTrackle !== 0) {
          this.checkingDone = true;
          this.openDialogTrackleNothingFilled = false;
          this.openDialogTrackleNotFilled = false;
        } else if (this.selectedFirstFertilTrackle !== 0 || this.selectedFirstMesTrackle !== 0 ||
            this.selectedEndTempTrackle !== 0 || this.selectedLastFertilDayTrackle !== 0) {
          this.openDialogTrackleNotFilled = true;
          this.openDialogTrackleNothingFilled = false;
          this.checkingDone = false;
        } else {
          this.openDialogTrackleNotFilled = false;
          this.openDialogTrackleNothingFilled = true;
          this.checkingDone = true;
          return false;
        }
        if (this.selectedCervixSchleimBe !== 0 && this.selectedCervixSchleimHoeh !== 0 && this.selectedMeasurement !== null) {
          this.openDialogTempNotFilled = false;
        } else if (this.selectedCervixSchleimBe === 0 || this.selectedCervixSchleimHoeh === 0 || this.selectedMeasurement === null) {
          this.openDialogTempNotFilled = true;
          this.checkingDone = false;
        } else {
          this.openDialogTempNotFilled = false;
        }
      }
      return this.checkingDone;
    },

    checkNothingAdded() {
      this.openDialogSomethingFilled = !(this.selectedFirstMesTrackle === 0 && this.selectedFirstFertilTrackle === 0 &&
          this.selectedEndTempTrackle === 0 && this.selectedLastFertilDayTrackle === 0 &&
          this.selectedCervixSchleimBe === 0 && this.selectedCervixSchleimHoeh === 0 &&
          this.selectedMeasurement === null && this.selectedCyclesK === 0 &&
          this.selectedCyclesKGV === 0 && this.selectedCyclesKA === 0 &&
          this.selectedCyclesUGV === 0 && this.selectedCyclesV === 0);
      return this.openDialogSomethingFilled;
    },

    saveCycle() {
      if (this.checkNothingAdded() && this.checkInput()) {

        if (this.schwanger === "ja - SS-Test positiv") {
          this.schwangerBool1 = true
        } else if (this.schwanger === "ja - verlängerte Temp.-Hochlage") {
          this.schwangerBool2 = true
        } else if (this.schwanger === "ja - beides") {
          this.schwangerBool1 = true
          this.schwangerBool2 = true
        }
        this.axios.post("http://localhost:3000/QuestionnaireResponse/Trackle", {
          idPatient: this.patientID,

          Q2: this.cycleNum,
          Q3: this.date,
          Q4: this.cycleLength,
          Q5: this.stoerfaktor,
          Q6: this.kinderwunsch,
          Q7: this.schwanger,
          Q7_1: this.schwangerBool1,
          Q7_2: this.schwangerBool2,
          Q7_3: "t",
          Q8: this.selectedFirstFertilTrackle,
          Q10: this.selectedFirstMesTrackle,
          Q12: this.selectedEndTempTrackle,
          Q14: this.selectedLastFertilDayTrackle,
          Q16_1: this.selectedCyclesKGV,
          Q16_2: this.selectedCyclesUGV,
          Q16_3: this.selectedCyclesK,
          Q16_4: this.selectedCyclesV,
          Q16_5: this.selectedCyclesKA,
          Q17: this.selectedMeasurement,
          Q18: this.selectedCervixSchleimBe,
          Q19: this.selectedCervixSchleimHoeh,

        }).then((response) => {
          console.log(response)
          this.$router.push("/patients/cycle")
          location.reload()
        }).catch((error) => console.log(error))
      }
    }
  }
}
</script>

<style scoped>

</style>