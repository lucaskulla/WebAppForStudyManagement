<template>
  <v-container fluid="fluid">
    <v-row class="mt-2 mb-4 ml-3">
      <v-col>
        <v-row class="mt-2 mb-4 ml-3">
          <v-card>
            <v-card-title>Sensiplan</v-card-title>
            <v-card-text>Erster fruchtbarer Tag nach Sensiplan
              <v-select
                  v-model="selectedFirstFertilSensi"
                  :items="firstFertilSensi"
                  chips
                  dense
              ></v-select>
            </v-card-text>

            <v-card-text>Erste höhere Messung nach Sensiplan
              <v-select
                  v-model="selectedFirstMesSensi"
                  :items="firstMesSensi"
                  chips
                  dense
              ></v-select>
            </v-card-text>

            <v-card-text>Ende der Temperaturauswertung nach Sensiplan
              <v-select
                  v-model="selectedEndTempSensi"
                  :items="endTempSensi"
                  chips
                  dense
              ></v-select>
            </v-card-text>

            <v-card-text>Letzter fruchtbarer Tag nach Sensiplan
              <v-select
                  v-model="selectedLastFertilDaySensi"
                  :items="lastFertilDaySensis"
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
                   v-on="on"
            >speichern
            </v-btn>
          </v-btn-toggle>
        </template>

        <h1 v-if="openDialogSensiNothingFilled">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Eine leere Sensiplan Eingabe ist nicht erlaubt. <br>
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

        <h1 v-else-if="openDialogSensiNotFilled || openDialogTempNotFilled">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Achtung</v-card-title>
            <v-divider/>

            <v-card-text>
              <div v-if="openDialogSensiNotFilled" class="text--primary">
                <br> Diese Sensiplan Angaben sind nicht ausgefüllt worden: <br> <br>
                <ul>
                  <li v-if="selectedFirstFertilSensi === 0">Erster fruchtbarer Tag</li>
                  <li v-if="selectedFirstMesSensi === 0">Erste höhere Messung</li>
                  <li v-if="selectedEndTempSensi === 0">Ende der Temperaturauswertung</li>
                  <li v-if="selectedLastFertilDaySensi === 0">Letzter fruchtbarer Tag</li>
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
                  class="white--text mx-2"
                  color="#004a6f"
                  @click="dialog = false"
              >Schließen
              </v-btn>
              <v-btn
                  class="white--text mx-2"
                  color="#D25A00"
                  @click="
                  checkingDone = true
                  saveCycle()
                  dialog = false
                  "
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
  name: "Add_CycleS",
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
      lastFertilDaySensis: [],
      firstFertilSensi: [],
      endTempSensi: [],
      firstMesSensi: [],
      measurement: [
        {text: 'rektal'},
        {text: 'oral'},
        {text: 'vaginal'},
      ],

      selectedFirstFertilSensi: 0,
      selectedFirstMesSensi: 0,
      selectedEndTempSensi: 0,
      selectedLastFertilDaySensi: 0,

      selectedCyclesUGV: 0,
      selectedCyclesKGV: 0,
      selectedCyclesK: 0,
      selectedCyclesV: 0,
      selectedCyclesKA: 0,

      selectedCervixSchleimBe: 0,
      selectedCervixSchleimHoeh: 0,
      selectedMeasurement: null,

      schwangerBool1: false,
      schwangerBool2: false,

      openDialogSensiNotFilled: false,
      openDialogSensiNothingFilled: false,
      openDialogTempNotFilled: false,
      openDialogSomethingFilled: true,
      checkingDone: false,
      dialog: false
    }
  },
  mounted() {
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesKGV.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.cyclesUGV.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.lastFertilDaySensis.push(i.toString());
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
      this.endTempSensi.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstMesSensi.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstFertilSensi.push(i.toString());
    }
  },

  methods: {
    checkInput() {
      if (((this.openDialogSensiNotFilled === true && this.openDialogTempNotFilled === true)
          || this.openDialogSensiNotFilled === true || this.openDialogTempNotFilled === true) && this.checkingDone === true) {
        // toggle values -- when save despite warning
        this.openDialogSensiNotFilled = false;
        this.openDialogTempNotFilled = false;
      } else {
        if (this.selectedFirstFertilSensi !== 0 && this.selectedFirstMesSensi !== 0 &&
            this.selectedEndTempSensi !== 0 && this.selectedLastFertilDaySensi !== 0) {
          this.checkingDone = true;
          this.openDialogSensiNotFilled = false;
          this.openDialogSensiNothingFilled = false;
        } else if (this.selectedFirstFertilSensi !== 0 || this.selectedFirstMesSensi !== 0 ||
            this.selectedEndTempSensi !== 0 || this.selectedLastFertilDaySensi !== 0) {
          this.openDialogSensiNotFilled = true;
          this.openDialogSensiNothingFilled = false;
          this.checkingDone = false;
        } else {
          this.openDialogSensiNotFilled = false;
          this.openDialogSensiNothingFilled = true;
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
      this.openDialogSomethingFilled = !(this.selectedFirstFertilSensi === 0 && this.selectedFirstMesSensi === 0 &&
          this.selectedEndTempSensi === 0 && this.selectedLastFertilDaySensi === 0 &&
          this.selectedCervixSchleimBe === 0 && this.selectedCervixSchleimHoeh === 0 &&
          this.selectedMeasurement === null && this.selectedCyclesUGV === 0 &&
          this.selectedCyclesKGV === 0 && this.selectedCyclesK === 0 &&
          this.selectedCyclesV === 0 && this.selectedCyclesKA === 0);
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
        this.axios.post("http://localhost:3000/QuestionnaireResponse/Sensiplan", {
          idPatient: this.patientID,

          Q2: this.cycleNum,
          Q3: this.date,
          Q4: this.cycleLength,
          Q5: this.stoerfaktor,
          Q6: this.kinderwunsch,
          Q7: this.schwanger,
          Q7_1: this.schwangerBool1,
          Q7_2: this.schwangerBool2,
          Q7_3: "s",
          Q9: this.selectedFirstFertilSensi,
          Q11: this.selectedFirstMesSensi,
          Q13: this.selectedEndTempSensi,
          Q15: this.selectedLastFertilDaySensi,
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