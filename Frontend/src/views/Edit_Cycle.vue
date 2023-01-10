<template>
  <v-main>
    <body>
    <v-row class="mt-2 mb-4 ml-3">
      <v-col>
        <v-row class="mt-2 mb-4 ml-3">
          <v-col>
            <v-card max-width="350" outlined>
              <v-card-text>Teilnehmer/in ID:
                {{ participantNum }}
              </v-card-text>
              <v-card-text>Zyklusnummer:
                <v-text-field
                    v-model="cycleNum"
                    :rules="[rules.required, rules.num]"
                    single-line
                    type="number"
                />
              </v-card-text>
              <v-card-text>Datum erster Zyklus:</v-card-text>
              <v-card-text>
                <v-date-picker v-model="date" color="#004a6f"
                               locale="de" first-day-of-week="1"
                ></v-date-picker>
                <v-card-text style="font-size: small">
                  * Bitte wählen Sie ein Datum aus.
                </v-card-text>
              </v-card-text>
              <v-card-text>Zykluslänge: {{ cycleLength }} *</v-card-text>

              <v-card-text>Störfaktoren:
                <v-textarea rows="3" v-model="stoerfaktor"></v-textarea>
              </v-card-text>

              <v-card-text>Kinderwunsch in diesem Zyklus:
                <v-select
                    v-model="selectedKW"
                    :items="kinderwunsch"
                    :rules="rules.reqSelect"
                    chips
                    dense
                ></v-select>
              </v-card-text>

              <v-card-text>Schwanger:
                <v-select
                    v-model="selectedSch"
                    :items="schwanger"
                    :rules="rules.reqSelect"
                    chips
                    dense
                ></v-select>
              </v-card-text>

              <v-card-text style="font-size: small">* um die Zykluslänge zu ändern, muss der bestehende Zyklus
                gelöscht und nochmals neu angelegt werden
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-row class="mt-2 mb-4 ml-3">
        <v-col>
          <v-container fluid="fluid">
            <v-row class="mt-0 mb-4 ml-3">
              <v-col>
                <v-card max-width="350" outlined>
                  <v-card-title>trackle</v-card-title>
                  <v-card-text>Erster fruchtbarer Tag nach trackle
                    <v-select
                        v-model="selectedFirstFertilTrackle"
                        :items="firstFertilTrackle"
                        chips
                        dense
                        :disabled="this.disabledT"
                        :clearable="true"
                    ></v-select>
                  </v-card-text>

                  <v-card-text>Erste höhere Messung nach trackle
                    <v-select
                        v-model="selectedFirstMesTrackle"
                        :items="firstMesTrackle"
                        chips
                        dense
                        :disabled="this.disabledT"
                        :clearable="true"
                    ></v-select>
                  </v-card-text>

                  <v-card-text>Ende der Temperatusauswertung nach trackle
                    <v-select
                        v-model="selectedEndTempTrackle"
                        :items="endTempTrackle"
                        chips
                        dense
                        :disabled="this.disabledT"
                        :clearable="true"
                    ></v-select>
                  </v-card-text>

                  <v-card-text>Letzter fruchtbarer Tag nach trackle
                    <v-select
                        v-model="selectedLastFertilDayTrackle"
                        :items="lastFertilDayTrackle"
                        chips
                        dense
                        :disabled="this.disabledT"
                        :clearable="true"
                    ></v-select>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col>
                <v-card max-width="350" outlined>
                  <v-card-title>Sensiplan</v-card-title>
                  <v-card-text>Erster fruchtbarer Tag nach Sensiplan
                    <v-select
                        v-model="selectedFirstFertilSensi"
                        :items="firstFertilSensi"
                        chips
                        dense
                        :disabled="this.disabledS"
                        :clearable="true"
                    ></v-select>

                  </v-card-text>
                  <v-card-text>Erste höhere Messung nach Sensiplan
                    <v-select
                        v-model="selectedFirstMesSensi"
                        :items="firstMesSensi"
                        chips
                        dense
                        :disabled="this.disabledS"
                        :clearable="true"
                    ></v-select>
                  </v-card-text>

                  <v-card-text>Ende der Temperatusauswertung nach Sensiplan
                    <v-select
                        v-model="selectedEndTempSensi"
                        :items="endTempSensi"
                        chips
                        dense
                        :disabled="this.disabledS"
                        :clearable="true"
                    ></v-select>

                  </v-card-text>
                  <v-card-text>Letzter fruchtbarer Tag nach Sensiplan
                    <v-select
                        v-model="selectedLastFertilDaySensis"
                        :items="lastFertilDaySensis"
                        chips
                        dense
                        :disabled="this.disabledS"
                        :clearable="true"
                    ></v-select>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-2 mb-4 ml-3">
              <v-col>
                <v-card max-width="350" outlined>
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
              </v-col>

              <v-col>
                <v-card max-width="350" outlined>
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
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-row>
    <v-row class="mt-2 mb-4 ml-3">
      <v-dialog
          v-model="dialog"
          width="500">

        <template v-slot:activator="{ on, attrs }">
          <v-btn-toggle group>
            <v-btn :to="{name: 'single_cycle'}">abbrechen</v-btn>
            <v-btn @click="sendEditedCycleTaoS()"
                   v-bind="attrs"
                   v-on="on"
            >änderungen speichern
            </v-btn>
          </v-btn-toggle>
        </template>

        <h1 v-if="openCycleNumDailog">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-card-subtitle>Nicht erlaubter Wert</v-card-subtitle>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Bitte prüfen Sie ihre Eingabe, folgende Felder dürfen nur postive Werte annehmen: <br> <br>
                <ul>
                  <li v-if="cycleNum < 1">Die Zyklusnummer</li>
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

        <h1 v-else-if="openDialogOnlyOneInput">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Bitte überprüfen Sie dass beides trackle und Sensiplan mindestens eine Angabe ausgefüllt bekommen. <br>
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

        <h1 v-else-if="openDialogSensiNotFilled">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Bitte überprüfen Sie, dass Sensiplan mindestens eine Angabe ausgefüllt bekommt. <br>
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

        <h1 v-else-if="openDialogTrackleNotFilled">
          <v-card outlined>
            <v-card-title class="text-h5 text--primary">Fehler</v-card-title>
            <v-divider/>

            <v-card-text>
              <div class="text--primary">
                Bitte überprüfen Sie, dass trackle mindestens eine Angabe ausgefüllt bekommt.<br>
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

    </body>
  </v-main>
</template>

<script>
export default {
  name: "Edit_Cycle",
  data: () => {
    return {
      participantNum: localStorage.getItem('patientID'),
      trackleID: localStorage.getItem('trackleID'),
      sensiplanID: localStorage.getItem('sensiplanID'),
      cycleLength: localStorage.getItem('cycleLength'),

      cycleNum: 0,
      stoerfaktor: '',
      date: '',
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

      firstFertilTrackle: [],
      firstMesTrackle: [],
      lastFertilDayTrackle: [],
      endTempTrackle: [],

      firstFertilSensi: [],
      firstMesSensi: [],
      lastFertilDaySensis: [],
      endTempSensi: [],

      cyclesUGV: [],
      cyclesKGV: [],
      cyclesK: [],
      cyclesV: [],
      cyclesKA: [],

      measurement: [
        {text: 'rektal'},
        {text: 'oral'},
        {text: 'vaginal'},
      ],
      cervixSchleimBe: [],
      cervixSchleimHoeh: [],

      selectedFirstFertilTrackle: '',
      selectedKW: '',
      selectedSch: '',
      selectedFirstMesTrackle: '',
      selectedEndTempTrackle: '',
      selectedLastFertilDayTrackle: '',
      selectedFirstFertilSensi: '',
      selectedFirstMesSensi: '',
      selectedEndTempSensi: '',
      selectedLastFertilDaySensis: '',

      selectedCyclesUGV: 0,
      selectedCyclesKGV: 0,
      selectedCyclesK: 0,
      selectedCyclesV: 0,
      selectedCyclesKA: 0,

      selectedMeasurement: '',
      selectedCervixSchleimBe: '',
      selectedCervixSchleimHoeh: '',

      rules: {
        required: value => !!value || 'Pflichtangabe.',
        num: v => v >= 1 || "Negative Zahlen sowie Null ist nicht erlaubt.",
        reqSelect: [(v) => !!v || "Pflichtangabe"]
      },
      openCycleNumDailog: false,
      dialog: false,
      openDialogOnlyOneInput: false,

      schwangerBool1: false,
      schwangerBool2: false,

      disabledT: false,
      disabledS: false,

      openDialogSensiNotFilled: false,
      openDialogTrackleNotFilled: false,
    }
  },

  mounted() {
    this.getCycle()
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstFertilTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstMesTrackle.push(i.toString());
    }
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
      this.lastFertilDayTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.endTempSensi.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.endTempTrackle.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstMesSensi.push(i.toString());
    }
    for (let i = 1; i <= this.cycleLength; i++) {
      this.firstFertilSensi.push(i.toString());
    }
  },

  methods: {
    checkCycleNumCorrect() {
      if (Number(this.cycleNum) <= 0 || this.cycleNum === null || this.cycleNum === " ") {
        this.openCycleNumDailog = true;
        this.openDialogOnlyOneInput = false;
        return false;
      } else {
        this.openCycleNumDailog = false;
        this.openDialogOnlyOneInput = false;
        return true;
      }
    },

    formatSensiplanDataForSaving() {
      if (this.selectedFirstMesSensi === null) {
        this.selectedFirstMesSensi = "0";
      }
      if (this.selectedEndTempSensi === null) {
        this.selectedEndTempSensi = "0";
      }
      if (this.selectedLastFertilDaySensis === null) {
        this.selectedLastFertilDaySensis = "0";
      }
      if (this.selectedFirstFertilSensi === null) {
        this.selectedFirstFertilSensi = "0";
      }
    },

    formatTrackleDataForSaving() {
      if (this.selectedEndTempTrackle === null) {
        this.selectedEndTempTrackle = "0";
      }
      if (this.selectedFirstMesTrackle === null) {
        this.selectedFirstMesTrackle = "0";
      }
      if (this.selectedLastFertilDayTrackle === null) {
        this.selectedLastFertilDayTrackle = "0";
      }
      if (this.selectedFirstFertilTrackle === null) {
        this.selectedFirstFertilTrackle = "0";
      }
    },

    checkIfTrackleFilled() {
      if (Number(this.selectedFirstFertilTrackle) !== 0 || Number(this.selectedFirstMesTrackle) !== 0 ||
          Number(this.selectedEndTempTrackle) !== 0 || Number(this.selectedLastFertilDayTrackle) !== 0) {
        this.openDialogTrackleNotFilled = false;
        return true;
      } else {
        this.openDialogTrackleNotFilled = true;
        return false;
      }
    },

    checkIfSensiFilled() {
      if (Number(this.selectedFirstFertilSensi) !== 0 || Number(this.selectedFirstMesSensi) !== 0 ||
          Number(this.selectedEndTempSensi) !== 0 || Number(this.selectedLastFertilDaySensis) !== 0) {
        this.openDialogSensiNotFilled = false;
        return true;
      } else {
        this.openDialogSensiNotFilled = true;
        return false;
      }
    },

    checkIfBothFilled() {
      if (this.checkIfTrackleFilled() && this.checkIfSensiFilled()) {
        this.openDialogOnlyOneInput = false;
        return true;
      } else {
        this.openDialogOnlyOneInput = true;
        return false;
      }
    },

    removeZeroFromArray: function (arrayToRemoveZero) {
      if (arrayToRemoveZero.length === 0) {
        arrayToRemoveZero.push("0");
      } else {
        if (arrayToRemoveZero[0] === "0" && arrayToRemoveZero.length !== 1) {
          arrayToRemoveZero.shift();
        }
      }
    },

    getCycle() {
      if (this.trackleID !== "0") {
        this.axios.get("http://localhost:3000/QuestionnaireResponse/" + this.trackleID, {}).then((response) => {

          this.cycleNum = response.data.item[0].answer[0].valueInteger
          this.date = response.data.item[1].answer[0].valueDate
          this.stoerfaktor = response.data.item[3].answer[0].valueString
          if (this.stoerfaktor === null || this.stoerfaktor === "null") {
            this.stoerfaktor = ""
          }
          this.selectedKW = response.data.item[4].answer[0].valueString
          this.selectedSch = response.data.item[5].answer[0].valueString
          this.selectedCyclesKGV = response.data.item[10].answer[0].valueString.split(",")
          this.selectedCyclesUGV = response.data.item[10].answer[1].valueString.split(",")
          this.selectedCyclesK = response.data.item[10].answer[2].valueString.split(",")
          this.selectedCyclesV = response.data.item[10].answer[3].valueString.split(",")
          this.selectedCyclesKA = response.data.item[10].answer[4].valueString.split(",")

          this.selectedFirstFertilTrackle = response.data.item[6].answer[0].valueInteger.toString()
          this.selectedFirstMesTrackle = response.data.item[7].answer[0].valueInteger.toString()
          this.selectedEndTempTrackle = response.data.item[8].answer[0].valueInteger.toString()
          this.selectedLastFertilDayTrackle = response.data.item[9].answer[0].valueInteger.toString()

          this.selectedMeasurement = response.data.item[11].answer[0].valueString
          this.selectedCervixSchleimBe = response.data.item[12].answer[0].valueInteger.toString()
          this.selectedCervixSchleimHoeh = response.data.item[13].answer[0].valueString
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.disabledT = true;
      }
      if (this.sensiplanID !== "0") {
        this.axios.get("http://localhost:3000/QuestionnaireResponse/" + this.sensiplanID, {}).then((response) => {

          this.cycleNum = response.data.item[0].answer[0].valueInteger
          this.date = response.data.item[1].answer[0].valueDate
          this.stoerfaktor = response.data.item[3].answer[0].valueString
          if (this.stoerfaktor === null || this.stoerfaktor === "null") {
            this.stoerfaktor = ""
          }
          this.selectedKW = response.data.item[4].answer[0].valueString
          this.selectedSch = response.data.item[5].answer[0].valueString
          this.selectedCyclesKGV = response.data.item[10].answer[0].valueString.split(",")
          this.selectedCyclesUGV = response.data.item[10].answer[1].valueString.split(",")
          this.selectedCyclesK = response.data.item[10].answer[2].valueString.split(",")
          this.selectedCyclesV = response.data.item[10].answer[3].valueString.split(",")
          this.selectedCyclesKA = response.data.item[10].answer[4].valueString.split(",")

          this.selectedFirstFertilSensi = response.data.item[6].answer[0].valueInteger.toString()
          this.selectedFirstMesSensi = response.data.item[7].answer[0].valueInteger.toString()
          this.selectedEndTempSensi = response.data.item[8].answer[0].valueInteger.toString()
          this.selectedLastFertilDaySensis = response.data.item[9].answer[0].valueInteger.toString()

          this.selectedMeasurement = response.data.item[11].answer[0].valueString
          this.selectedCervixSchleimBe = response.data.item[12].answer[0].valueInteger.toString()
          this.selectedCervixSchleimHoeh = response.data.item[13].answer[0].valueString

        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.disabledS = true;
      }
    },

    prepareDataForSaving() {
      if (this.trackleID !== "0") {
        this.formatTrackleDataForSaving()
      }
      if (this.sensiplanID !== "0") {
        this.formatSensiplanDataForSaving()
      }
      if (this.selectedSch === "ja - SS-Test positiv") {
        this.schwangerBool1 = true
      } else if (this.selectedSch === "ja - verlängerte Temp.-Hochlage") {
        this.schwangerBool2 = true
      } else if (this.selectedSch === "ja - beides") {
        this.schwangerBool1 = true
        this.schwangerBool2 = true
      }
      if (this.stoerfaktor === "") {
        this.stoerfaktor = null;
      }
      this.removeZeroFromArray(this.selectedCyclesUGV)
      this.removeZeroFromArray(this.selectedCyclesK)
      this.removeZeroFromArray(this.selectedCyclesKA)
      this.removeZeroFromArray(this.selectedCyclesKGV)
      this.removeZeroFromArray(this.selectedCyclesV)
    },

    sendEditedCycleTaoS() {
      if (this.checkCycleNumCorrect()) { //if cycle num false don't continue to put  + doesn't interfere with other dialogs

        if (this.trackleID !== "0" && this.sensiplanID !== "0") {
          if (this.checkIfBothFilled()) {
            this.prepareDataForSaving();
          } else {
            return false; // should stop and not continue to saving
          }
        } else {
          if (this.trackleID !== "0") {
            if (this.checkIfTrackleFilled()) {
              this.prepareDataForSaving();
            } else return false; // should stop and not continue to saving
          } else {
            if (this.checkIfSensiFilled()) {
              this.prepareDataForSaving();           // should only run one time
            } else return false; // should stop and not continue to saving
          }
        }

        if (this.trackleID !== "0") {
          this.axios.put("http://localhost:3000/QuestionnaireResponse/Trackle/" + this.trackleID, {
            idQuestionaireResponse: this.trackleID,
            idPatient: this.participantNum,
            Q2: this.cycleNum,
            Q3: this.date,
            Q4: this.cycleLength,
            Q5: this.stoerfaktor,
            Q6: this.selectedKW,
            Q7: this.selectedSch,
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
            if (this.sensiplanID === "0") {
              this.$router.push("/patients/single_patient/cycle/single_cycle")
              location.reload()
            }
          }).catch((error) => {
            console.log(error)
          })
        }

        if (this.sensiplanID !== "0") {
          this.axios.put("http://localhost:3000/QuestionnaireResponse/Sensiplan/" + this.sensiplanID, {
            idQuestionaireResponse: this.sensiplanID,
            idPatient: this.participantNum,
            Q2: this.cycleNum,
            Q3: this.date,
            Q4: this.cycleLength,
            Q5: this.stoerfaktor,
            Q6: this.selectedKW,
            Q7: this.selectedSch,
            Q7_1: this.schwangerBool1,
            Q7_2: this.schwangerBool2,
            Q7_3: "t",
            Q9: this.selectedFirstFertilSensi,
            Q11: this.selectedFirstMesSensi,
            Q13: this.selectedEndTempSensi,
            Q15: this.selectedLastFertilDaySensis,
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
            this.$router.push("/patients/single_patient/cycle/single_cycle")
            location.reload()
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }

}
</script>

<style scoped>

</style>