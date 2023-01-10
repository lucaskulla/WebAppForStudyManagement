<template>
  <v-main>
    <body>
    <v-card outlined>
      <v-card-title>
        <v-row>
          <v-col>
            <v-btn :to="{name: 'add_cycle'}" color="#004a6f" class="white--text mx-2">+ Zyklus hinzufügen</v-btn>
          </v-col>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-row>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="tasks"
          :search="search"
          :sort-by="['zyklusnummer, idT, idS']"
          :sort-desc="[false, true]"
          class="elevation-1 background"
          @click:row="singleCycleSave"
      ></v-data-table>
    </v-card>
    </body>
  </v-main>
</template>

<script>
export default {
  name: "Cycle_Page",
  data() {
    return {
      patientID: localStorage.getItem('patientID'),
      selectedRow: 0,
      search: '',
      headers: [
        {
          text: 'Zyklusnummer',
          align: 'start',
          sortable: true,
          value: 'zyklusnummer',
        },
        {text: 'Trackle ID', value: 'idT'},
        {text: 'Sensiplan ID', value: 'idS'},
      ],
      zyklusnummer: [],
      idTrackle: [],
      idSensiplan: [],
      lengthArray: 0,
      filter: '',
      tasks: [],
    }
  },
  mounted() {
    this.getCycleNum()
  },
  methods: {
    getCycleNum() {
      this.axios.get("http://localhost:3000/patient/" + this.patientID + "/everything", {}).then((response) => {
        this.tasks = response.data.response
      }).catch((error) => {
        console.log(error)
      })
    },

    singleCycleSave(item) {
      let selectionT = item.idT
      let selectionS = item.idS
      localStorage.setItem('selectedT', selectionT)
      localStorage.setItem('selectedS', selectionS)
      localStorage.setItem('patientID', this.patientID)
      this.$router.push("/patients/single_patient/cycle/single_cycle")
    }
  }
}

</script>

<style scoped>

</style>