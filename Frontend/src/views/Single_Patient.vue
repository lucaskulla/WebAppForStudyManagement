<template>
  <v-main>
    <body>
    <v-col>
      <v-row class="mt-2 mb-4 ml-3">
        <v-chip class="ma-2" outlined color="#004a6f">Teilnehmer/in ID: {{ this.patientID }}</v-chip>
      </v-row>
      <v-row class="mt-2 mb-4 ml-3">
        <v-card outlined>
          <v-card-text>Trackle ID: {{ this.trackleID }}</v-card-text>
          <v-card-text>Sensiplan ID: {{ this.sensiplanID }}</v-card-text>
          <v-card-text>Alte Datenbank ID: {{ this.oldDBID }}</v-card-text>
        </v-card>
      </v-row>
      <v-row class="mt-2 mb-4 ml-3">
        <v-btn-toggle group>
          <v-btn @click="toCycles()">zu den zyklen</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="mt-2 mb-4 ml-3">
        <v-btn-toggle group>
          <v-btn :to="{name: 'patients'}">zurück</v-btn>
          <v-btn @click="editPatient()">bearbeiten</v-btn>
          <v-btn @click="deletePatient()">löschen</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-col>
    </body>
  </v-main>
</template>

<script>
export default {
  name: "Single_Patient",
  data: () => {
    return {
      patientID: localStorage.getItem('patientSelect'),
      trackleID: '0',
      sensiplanID: '0',
      oldDBID: '0'
    }
  },
  mounted() {
    this.getPatient()
  },
  methods: {
    toCycles() {
      localStorage.setItem('patientID', this.patientID)
      this.$router.push("/patients/cycle")
    },
    editPatient() {
      localStorage.setItem('patientSelect', this.patientID)
      this.$router.push("/patients/single_patient/edit")
    },

    getPatient() {
      this.axios.get("http://localhost:3000/patient/" + this.patientID, {}).then((response) => {
        this.trackleID = response.data.identifier[0].value
        this.sensiplanID = response.data.identifier[1].value
        this.oldDBID = response.data.identifier[2].value
      }).catch((error) => {
        console.log(error)
      })
    },

    deletePatient() {
      this.axios.delete("http://localhost:3000/patient/" + this.patientID, {}).then((response) => {
            console.log(response)
          }
      ).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>