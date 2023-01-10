import Vue from 'vue'
import VueRouter from 'vue-router'
import Home_Page from '../views/Home_Page.vue'
import Patients_Page from '../views/Patients_Page'
import Create_Patient from "@/views/Create_Patient"
import Single_Patient from "@/views/Single_Patient"
import Add_Cycle from "@/views/Add_Cycle";
import Cycle_Page from "@/views/Cycle_Page";
import Single_Cycle from "@/views/Single_Cycle";
import Edit_Cycle from "@/views/Edit_Cycle";
import Add_CyclTaS from "@/views/Add_CycleTaS";
import Add_CycleT from "@/views/Add_CycleT";
import Add_CycleS from "@/views/Add_CycleS";
import Edit_Patient from "@/views/Edit_Patient";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home_Page
  },
  {
    path: '/patients',
    name: 'patients',
    component: Patients_Page
  },
  {
    path: '/patients/create_patient',
    name: 'create_patient',
    component: Create_Patient
  },
  {
    path: '/patients/single_patient',
    name:'single_patient',
    component: Single_Patient
  },
  {
    path: '/patients/single_patient/edit',
    name:'edit_patient',
    component: Edit_Patient
  },
  {
    path: '/patients/single_patient/cycle/add_cycle',
    name:'add_cycle',
    component: Add_Cycle
  },
  {
    path: '/patients/single_patient/cycle/add_cycle2',
    name:'add_cycle2',
    component: Add_CyclTaS
  },
  {
    path: '/patients/cycle',
    name: 'cycle',
    component: Cycle_Page
  },
  {
    path: '/patients/single_patient/cycle/single_cycle',
    name: 'single_cycle',
    component: Single_Cycle
  },
  {
    path: '/patients/single_patient/cycle/single_cycle/edit_cycle',
    name: 'edit_cycle',
    component: Edit_Cycle
  },
  {
    path: '/patients/single_patient/cycle/add_cyclet',
    name:'add_cyclet',
    component: Add_CycleT
  },
  {
    path: '/patients/single_patient/cycle/add_cycleS',
    name:'add_cycleS',
    component: Add_CycleS
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
