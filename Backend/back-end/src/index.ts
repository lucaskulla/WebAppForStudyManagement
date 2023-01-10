import express from 'express'
import session from 'express-session'
import { settings } from './settings'
import axios from 'axios'


const app = express()
const port = process.env.PORT ?? 3000

// Set baseURL for axios
axios.defaults.baseURL = settings.iss

app.use(express.json())

//ToDo: Manual installation: should be npm install cors 
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8089',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


//Handles Patient Stuff
import {handlerPost as patientHandlerPost} from './handlers/patient'
app.post('/patient', patientHandlerPost)

import {handlerGet as patientHandlerGet} from './handlers/patient'
app.get('/patient/:id', patientHandlerGet)

import {handlerPatch as patientHandlerPatch} from './handlers/patient'
app.put('/patient/:id', patientHandlerPatch)

import {handlerAddQuID as patientGetEverything} from './handlers/patient'
app.get('/patient/:id/everything', patientGetEverything)

import {handlerDelete as patientHandlerDelete} from './handlers/patient'
app.delete('/patient/:id', patientHandlerDelete)

//Handles QuestionaireResponse Stuff
import {handlerPostTrackle as questionnaireResponsePostTrackle} from './handlers/questionaire-response'
app.post('/QuestionnaireResponse/Trackle', questionnaireResponsePostTrackle)

import {handlerPostSensiplan as questionnaireResponsePostSensiplan} from './handlers/questionaire-response'
app.post('/QuestionnaireResponse/Sensiplan', questionnaireResponsePostSensiplan)

import {handlerGet as questionnaireResponseGet} from './handlers/questionaire-response'
app.get('/QuestionnaireResponse/:id', questionnaireResponseGet)

import {handlerDelete as questionnaireResponseDelete} from './handlers/questionaire-response'
app.delete('/QuestionnaireResponse/:id', questionnaireResponseDelete)

import {handlerPatchTrackle as questionnaireResponsePatchTrackle} from './handlers/questionaire-response'
app.put('/QuestionnaireResponse/Trackle/:id', questionnaireResponsePatchTrackle)

import {handlerPutSensiplan as questionnaireResponsePatchSensiplan} from './handlers/questionaire-response'
app.put('/QuestionnaireResponse/Sensiplan/:id', questionnaireResponsePatchSensiplan)

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
})