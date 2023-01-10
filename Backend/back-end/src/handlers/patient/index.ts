import axios from 'axios'
import {Handler} from 'express'
import {stringify} from 'querystring';

const CircularJSON = require('circular-json');


interface Patient {
    readonly id: string
}


export const handlerAddQuID: Handler = async (req, res) => {
    try {

        const {} = req.body

        const patient = (await axios.get<any>(`QuestionnaireResponse/?patient=${req.params.id}`, {
                headers: {
                    'content-type': 'application/fhir+json',
                    'accept': 'application/fhir+json'
                }
            }
        ))

        let pat = CircularJSON.stringify(patient);

        let base = patient["data"]["entry"]
        let response = []
        try {
            for (let index = 0; index < 100; index++) {
                let current = base[index]

                let filterFrageTrackleVSSensiplan = current["resource"]["item"][9]["linkId"]
                let idTrackle = 0
                let idSensiplan = 0
                let zyklusnummer = current["resource"]["item"][0]["answer"][0]["valueInteger"]
                let zyklusAfter = base[index + 1]["resource"]["item"][0]["answer"][0]["valueInteger"]

                if (zyklusnummer == zyklusAfter) {
                    idSensiplan = current["resource"]["id"]
                    idTrackle = base[index + 1]["resource"]["id"]
                    response.push({
                        "zyklusnummer": zyklusnummer,
                        "idT": idTrackle,
                        "idS": idSensiplan
                    })
                    console.log(index + "t und s")
                }else if(index > 0){
                    let zyklusBefore = base[index - 1]["resource"]["item"][0]["answer"][0]["valueInteger"]
                    if(zyklusBefore == zyklusnummer){
                        idSensiplan=0
                        idTrackle=0
                        console.log(index + "nichts")
                    }else if (filterFrageTrackleVSSensiplan == 14) { //if 14 -> Trackle, else Sensiplan
                        idTrackle = current["resource"]["id"]
                        response.push({
                            "zyklusnummer": zyklusnummer,
                            "idT": idTrackle,
                            "idS": idSensiplan
                        })
                        console.log(index + "t")
                    } else {
                        idSensiplan = current["resource"]["id"]
                        response.push({
                            "zyklusnummer": zyklusnummer,
                            "idT": idTrackle,
                            "idS": idSensiplan
                        })
                        console.log(index + "s")
                    }
                }else if (filterFrageTrackleVSSensiplan == 14) { //if 14 -> Trackle, else Sensiplan
                    idTrackle = current["resource"]["id"]
                    response.push({
                        "zyklusnummer": zyklusnummer,
                        "idT": idTrackle,
                        "idS": idSensiplan
                    })
                    console.log(index + "t")
                } else {
                    idSensiplan = current["resource"]["id"]
                    response.push({
                        "zyklusnummer": zyklusnummer,
                        "idT": idTrackle,
                        "idS": idSensiplan
                    })
                    console.log(index + "s")
                }



            }

        } catch (ArrayIndexOutOfBoundsException) {

        }

        return res.status(201).send({
            response
        }).end()
    } catch (error) {
        console.log(error)
        return res.status(400).send(error).end()
    }
}


export const handlerPatch: Handler = async (req, res) => {
    try {

        const {idTrackle, idSensiplan, idOldDB} = req.body

        const patient = (await axios.put<Patient>(`/Patient/${req.params.id}`, {

            "resourceType": "Patient",
            "id": `${req.params.id}`,
            "subject": {},

            "identifier": [
                {
                    "system": "idTrackle",
                    "value": idTrackle,

                },
                {
                    "system": "idSensiplan",
                    "value": idSensiplan,

                },
                {
                    "system": "idOldDB",
                    "value": idOldDB,

                }
            ]
        }, {
            headers: {
                'content-type': 'application/fhir+json',
                'accept': 'application/fhir+json'
            }
        }))

        let response = CircularJSON.stringify(patient)
        return res.status(201).end()
    } catch (error) {
        console.log(error)
        return res.status(400).send(error).end()
    }
}

export const handlerDelete: Handler = async (req, res) => {
    try {
        // Create fhir patient:
        console.log(req.params.id)
        const patient = (await axios.delete<Patient>(`/Patient/${req.params.id}`))


        return res.status(200).end()
    } catch (error) {
        return res.status(400).end()
    }
}


export const handlerGet: Handler = async (req, res) => {
    try {
        // Create fhir patient:
        const patient = (await axios.get<Patient>(`/Patient/${req.params.id}`))


        return res.status(201).send(patient.data).end()
    } catch (error) {
        return res.status(400).send(error).end()
    }
}

export const handlerPost: Handler = async (req, res) => {
    try {
        const {idTrackle, idSensiplan, idOldDB} = req.body
        // Create fhir patient:
        const patient = (await axios.post<Patient>('/Patient', {
            resourceType: 'Patient',
            "identifier": [
                {
                    "system": "idTrackle",
                    "value": idTrackle,

                },
                {
                    "system": "idSensiplan",
                    "value": idSensiplan,

                },
                {
                    "system": "idOldDB",
                    "value": idOldDB,

                }
            ]
        })).data
        console.log(patient)

        return res.status(201).send(patient).end()
    } catch (error) {
        return res.status(400).send(error).end()
    }
}
