<template>
  <v-container fluid="fluid">
    <v-row class="mt-2 mb-16 ml-3">
      <v-col>
        <v-row>
          <v-card outlined>
            <v-card-text>Teilnehmer/in ID:
              {{ patientID }}
            </v-card-text>
            <v-card-text>Zyklusnummer:
              {{ cycleNum }}
            </v-card-text>
            <v-card-text>Datum erster Zyklus:
              {{ formatDate(date) }}
            </v-card-text>
            <v-card-text>Zykluslänge:
              {{ cycleLength }}
            </v-card-text>
            <v-card-text>Störfaktoren:
              {{ stoerfaktor }}
            </v-card-text>
            <v-card-text>Kinderwunsch in diesem Zyklus:
              {{ kinderwunsch }}
            </v-card-text>
            <v-card-text>Schwanger:
              {{ schwanger }}
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-16 mb-16 ml-3">
      <v-col>
        <v-row>
          <v-card outlined>
            <v-card-title>trackle</v-card-title>
            <v-card-text>Erster fruchtbarer Tag nach trackle:
              <v-chip>{{ firstFertilTrackle }}</v-chip>
            </v-card-text>

            <v-card-text>Erste höhere Messung nach trackle:
              <v-chip>{{ firstMesTrackle }}</v-chip>
            </v-card-text>

            <v-card-text>Ende der Temperatusauswertung nach trackle:
              <v-chip>{{ endTempTrackle }}</v-chip>
            </v-card-text>

            <v-card-text>Letzter fruchtbarer Tag nach trackle:
              <v-chip>{{ lastFertilDayTrackle }}</v-chip>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-card outlined>
            <v-card-title>Sensiplan</v-card-title>
            <v-card-text>Erster fruchtbarer Tag nach Sensiplan:
              <v-chip>{{ firstFertilSensi }}</v-chip>

            </v-card-text>
            <v-card-text>Erste höhere Messung nach Sensiplan:
              <v-chip>{{ firstMesSensi }}</v-chip>

            </v-card-text>
            <v-card-text>Ende der Temperatusauswertung nach Sensiplan:
              <v-chip>{{ endTempSensi }}</v-chip>

            </v-card-text>
            <v-card-text>Letzter fruchtbarer Tag nach Sensiplan:
              <v-chip>{{ lastFertilDaySensi }}</v-chip>

            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-16 mb-16 ml-3">
      <v-col>
        <v-row>
          <v-card outlined>
            <v-card-title>Geschlechtsverkehr</v-card-title>

            <v-card-text>Zyklustage → kein GV
              <v-chip>{{ cyclesKGV }}</v-chip>

            </v-card-text>
            <v-card-text>Zyklustage → ungeschützter GV
              <v-chip>{{ cyclesUGV }}</v-chip>

            </v-card-text>
            <v-card-text>Zyklustage → GV mit Kondom
              <v-chip>{{ cyclesK }}</v-chip>

            </v-card-text>
            <v-card-text>Zyklustage → GV mit anderem Verhütungsmittel
              <v-chip>{{ cyclesV }}</v-chip>

            </v-card-text>
            <v-card-text>Zyklustage → keine Angabe zu GV
              <v-chip>{{ cyclesKA }}</v-chip>

            </v-card-text>
          </v-card>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-card outlined>
            <v-card-text>Messort der Aufwachtemperatur:
              <v-chip>{{ measurement }}</v-chip>
            </v-card-text>
            <v-card-text>Zervixschleimbeginn (f, S oder S+):
              <v-chip>{{ cervixSchleimBe }}</v-chip>

            </v-card-text>
            <v-card-text>Zervixschleimhöhepunkt:
              <v-chip>{{ cervixSchleimHoeh }}</v-chip>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-2 mb-4 ml-3">
      <v-btn-toggle group>
        <v-btn :to="{name: 'cycle'}">Zurück</v-btn>
        <v-btn @click="editCycle()">bearbeiten</v-btn>
        <v-btn @click="deleteCycle()">löschen</v-btn>
      </v-btn-toggle>
    </v-row>

  </v-container>
</template>


<script>
export default {
  name: "Single_Cycle",
  data: () => {
    return {
      patientID: localStorage.getItem('patientID'),
      trackleID: localStorage.getItem('selectedT'),
      sensiplanID: localStorage.getItem('selectedS'),
      cycleLength: 0,
      cycleNum: 0,
      date: null,
      stoerfaktor: null,
      schwanger: null,
      kinderwunsch: null,

      cyclesUGV: [],
      cyclesKGV: [],
      cyclesK: [],
      cyclesV: [],
      cyclesKA: [],
      cervixSchleimBe: 0,
      cervixSchleimHoeh: 0,

      lastFertilDayTrackle: 0,
      firstFertilTrackle: 0,
      endTempTrackle: 0,
      firstMesTrackle: 0,

      lastFertilDaySensi: 0,
      firstFertilSensi: 0,
      endTempSensi: 0,
      firstMesSensi: 0,

      measurement: "",
    }
  },
  mounted() {
    this.getCycle()
  },
  methods: {

    async getCycle() {
      if (this.trackleID !== "0") {
        this.axios.get("http://localhost:3000/QuestionnaireResponse/" + this.trackleID, {}).then((response) => {
          this.cycleNum = response.data.item[0].answer[0].valueInteger
          this.date = response.data.item[1].answer[0].valueDate
          this.cycleLength = response.data.item[2].answer[0].valueInteger
          this.stoerfaktor = response.data.item[3].answer[0].valueString
          if (this.stoerfaktor === null || this.stoerfaktor === "null") {
            this.stoerfaktor = "-"
          }
          this.kinderwunsch = response.data.item[4].answer[0].valueString
          this.schwanger = response.data.item[5].answer[0].valueString

          this.firstFertilTrackle = response.data.item[6].answer[0].valueInteger
          this.firstMesTrackle = response.data.item[7].answer[0].valueInteger
          this.endTempTrackle = response.data.item[8].answer[0].valueInteger
          this.lastFertilDayTrackle = response.data.item[9].answer[0].valueInteger
          this.cyclesKGV = response.data.item[10].answer[0].valueString
          this.cyclesUGV = response.data.item[10].answer[1].valueString
          this.cyclesK = response.data.item[10].answer[2].valueString
          this.cyclesV = response.data.item[10].answer[3].valueString
          this.cyclesKA = response.data.item[10].answer[4].valueString
          this.measurement = response.data.item[11].answer[0].valueString
          if (this.measurement === null || this.measurement === "null") {
            this.measurement = "-"
          }
          this.cervixSchleimBe = response.data.item[12].answer[0].valueInteger
          this.cervixSchleimHoeh = response.data.item[13].answer[0].valueString

        }).catch((error) => {
          console.log(error)
        })
      }
      if (this.sensiplanID !== "0") {
        await this.axios.get("http://localhost:3000/QuestionnaireResponse/" + this.sensiplanID, {}).then((response) => {

          this.cycleNum = response.data.item[0].answer[0].valueInteger
          this.date = response.data.item[1].answer[0].valueDate
          this.cycleLength = response.data.item[2].answer[0].valueInteger
          this.stoerfaktor = response.data.item[3].answer[0].valueString
          if (this.stoerfaktor === null || this.stoerfaktor === "null") {
            this.stoerfaktor = "-"
          }
          this.kinderwunsch = response.data.item[4].answer[0].valueString
          this.schwanger = response.data.item[5].answer[0].valueString
          this.firstFertilSensi = response.data.item[6].answer[0].valueInteger
          this.firstMesSensi = response.data.item[7].answer[0].valueInteger
          this.endTempSensi = response.data.item[8].answer[0].valueInteger
          this.lastFertilDaySensi = response.data.item[9].answer[0].valueInteger

          this.cyclesKGV = response.data.item[10].answer[0].valueString
          this.cyclesUGV = response.data.item[10].answer[1].valueString
          this.cyclesK = response.data.item[10].answer[2].valueString
          this.cyclesV = response.data.item[10].answer[3].valueString
          this.cyclesKA = response.data.item[10].answer[4].valueString

          this.measurement = response.data.item[11].answer[0].valueString
          if (this.measurement === null || this.measurement === "null") {
            this.measurement = "-"
          }
          this.cervixSchleimBe = response.data.item[12].answer[0].valueInteger
          this.cervixSchleimHoeh = response.data.item[13].answer[0].valueString
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },

    editCycle() {
      localStorage.setItem('patientID', this.patientID)
      localStorage.setItem('trackleID', this.trackleID)
      localStorage.setItem('sensiplanID', this.sensiplanID)
      localStorage.setItem('cycleLength', this.cycleLength)
      this.$router.push("/patients/single_patient/cycle/single_cycle/edit_cycle")
    },

    deleteCycle() {
      if (this.trackleID !== "0") {
        this.axios.delete("http://localhost:3000/QuestionnaireResponse/" + this.trackleID, {}).catch((error) => {
          console.log(error)
        })
      }
      if (this.sensiplanID !== "0") {
        this.axios.delete("http://localhost:3000/QuestionnaireResponse/" + this.sensiplanID, {}).catch((error) => {
          console.log(error)
        })
      }
      if (this.trackleID !== "0" || this.sensiplanID !== "0") {
        this.$router.push("/patients/cycle")
      }
    },

    formatDate(date) {
      if (date === null) {
        return "-";
      }
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    }
  }
}
</script>

<style scoped>

</style>