<template>
  <div>
    <v-main>
      <body>
      <v-card outlined>
        <v-card-title>
          <v-row>
            <v-col>
              <v-btn :to="{name: 'create_patient'}" color="#004a6f" class="white--text mx-2">+ Teilnehmer/in
                hinzufügen
              </v-btn>
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
            :sort-by="['id, trackleID, sensiID,oldDBID']"
            :sort-desc="[false, true]"
            class="elevation-1 background"
            @click:row="singlePatientSave"
        ></v-data-table>
      </v-card>
      </body>
    </v-main>

  </div>
</template>

<script>
export default {
  name: "Patients_Page",
  data() {
    return {
      selectedRow: 0,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {text: 'Trackle ID', value: 'idT'},
        {text: 'Sensiplan ID', value: 'idS'},
        {text: 'Alte Datenbank ID', value: 'idDB'},
      ],
      tasks: [],
      idTrackle: [],
      idSensiplan: [],
      idOldDB: [],
      id: [],
    }
  },
  mounted() {
    this.getAllPatients()
  },
  methods: {
    singlePatientSave(item) {
      let selection = item.id
      localStorage.setItem('patientSelect', selection)
      this.$router.push("/patients/single_patient")
    },
    async getAllPatients() {
      this.axios.get("http://localhost:3000/patient/7059490", {}).then((response) => {
        this.idTrackle.push(response.data.identifier[0].value)
        this.idSensiplan.push(response.data.identifier[1].value)
        this.idOldDB.push(response.data.identifier[2].value)
        this.id.push("7059490")
      }).catch((error) => {
        console.log(error)
      })
      await this.axios.get("http://localhost:3000/patient/7059491", {}).then((response) => {
        this.idTrackle.push(response.data.identifier[0].value)
        this.idSensiplan.push(response.data.identifier[1].value)
        this.idOldDB.push(response.data.identifier[2].value)
        this.id.push("7059491")
      }).catch((error) => {
        console.log(error)
      })
      await this.axios.get("http://localhost:3000/patient/7066131", {}).then((response) => {
        this.idTrackle.push(response.data.identifier[0].value)
        this.idSensiplan.push(response.data.identifier[1].value)
        this.idOldDB.push(response.data.identifier[2].value)
        this.id.push("7066131")
      }).catch((error) => {
        console.log(error)
      })
      this.tasks = [
        {
          id: this.id[0],
          idT: this.idTrackle[0],
          idS: this.idSensiplan[0],
          idDB: this.idOldDB[0],
        },
        {
          id: this.id[1],
          idT: this.idTrackle[1],
          idS: this.idSensiplan[1],
          idDB: this.idOldDB[1],
        },
        {
          id: this.id[2],
          idT: this.idTrackle[2],
          idS: this.idSensiplan[2],
          idDB: this.idOldDB[2],
        }
      ]
    }
  }
}
</script>
