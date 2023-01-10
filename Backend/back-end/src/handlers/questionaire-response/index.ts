import axios from 'axios'
import { Handler, response } from 'express'


interface QuestionnaireResponse {
  readonly id: string
}


export const handlerPatchTrackle: Handler = async (req, res) => {
  try {

    const {idQuestionaireResponse, idPatient, Q2, Q3, Q4, Q5, Q6, Q7, Q7_1, Q7_2, Q7_3, Q8, Q10, Q12, Q14, Q16_1, Q16_2, Q16_3, Q16_4, Q16_5, Q17, Q18, Q19 } = req.body

    const response = (await axios.put<QuestionnaireResponse>(`/QuestionnaireResponse/${req.params.id}`, {

      resourceType: 'QuestionnaireResponse',
      "id": idQuestionaireResponse,
      "subject": {
        "reference": `/Patient/${idPatient}`,
      },

      "item": [
        {
          "linkId": "2",
          "text": "Zyklusnummer",
          "answer": [
            {
              "valueInteger": `${Q2}`
            }
          ]
        },
        {
          "linkId": "3",
          "text": "Datum erster Zyklustag",
          "answer": [
            {
              "valueDate": `${Q3}`
            }
          ]
        },
        {
          "linkId": "4",
          "text": "Zykluslaenge",
          "answer": [
            {
              "valueInteger": `${Q4}`
            }
          ]
        },
        {
          "linkId": "5",
          "text": "Stoerfaktoren",
          "answer": [
            {
              "valueString": `${Q5}`
            }
          ]
        },
        {
          "linkId": "6",
          "text": "Kinderwunsch in diesem Zyklus",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q6}`
            }
          ]
        },
        {
          "linkId": "7",
          "text": "Sind sie schwanger",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q7}`
            }
          ],
          "item": [
            {
              "linkId": "7.1",
              "text": "SS-Test positiv",
              "answer": [
                {
                  "valueBoolean": `${Q7_1}`
                }
              ]
            },
            {
              "linkId": "7.2",
              "text": "Verlaengerte Temperatur-Hochlage",
              "answer": [
                {
                  "valueBoolean": `${Q7_2}`
                }
              ]
            },
            {
              "linkId": "7.3",
              "text": "Ausscheider?", //ToDo: Evtl. auch boolen???
              "answer": [
                {
                  "valueString": `${Q7_3}`
                }
              ]
            }
          ]
        },
        {
          "linkId": "8",
          "text": "Erster fruchtbarer Tag nach trackle",
          "answer": [
            {
              "valueInteger": `${Q8}`
            }
          ]
        },

        {
          "linkId": "10",
          "text": "Erste höhere Messung nach trackle",
          "answer": [
            {
              "valueInteger": `${Q10}`
            }
          ]
        },

        {
          "linkId": "12",
          "text": "Ende der Temperatusauswertung nach trackle",
          "answer": [
            {
              "valueInteger": `${Q12}`
            }
          ]
        },

        {
          "linkId": "14",
          "text": "Letzter fruchtbarer Tag nach trackle",
          "answer": [
            {
              "valueInteger": `${Q14}`
            }
          ]
        },

        {
          "linkId": "16",
          "text": "GV pro Zyklustag",
          //ToDO Ask Frontend Team 
          "answer": [
            {
              "valueString": `${Q16_1}`
            },
            {
              "valueString": `${Q16_2}`
            },
            {
              "valueString": `${Q16_3}`
            },
            {
              "valueString": `${Q16_4}`
            },
            {
              "valueString": `${Q16_5}`
            }

          ]
        },
        {
          "linkId": "17",
          "text": "Messort Aufwachtemperatur",
          "answer": [
            {
              "valueString": `${Q17}`
            }
          ]
        },
        {
          "linkId": "18",
          "text": "Zervixschleimbeginn",
          "answer": [
            {
              "valueInteger": `${Q18}`
            }
          ]
        },
        {
          "linkId": "19",
          "text": "Zervixschleimhoehepunkt",
          "answer": [
            {
              "valueString": `${Q19}`
            }
          ]
        }
      ]

  }, {
      headers: {
          'content-type': 'application/fhir+json',
          'accept': 'application/fhir+json'
      }
  })).data
    console.log(response)

    return res.status(201).send(response).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }
}



export const handlerPostTrackle: Handler = async (req, res) => {
  try {

    const { idPatient, Q2, Q3, Q4, Q5, Q6, Q7, Q7_1, Q7_2, Q7_3, Q8, Q10, Q12, Q14, Q16_1, Q16_2, Q16_3, Q16_4, Q16_5, Q17, Q18, Q19 } = req.body

    const response = (await axios.post<QuestionnaireResponse>('/QuestionnaireResponse', {
      resourceType: 'QuestionnaireResponse',
      "subject": {
        "reference": `/Patient/${idPatient}`,
      },

      "item": [
        {
          "linkId": "2",
          "text": "Zyklusnummer",
          "answer": [
            {
              "valueInteger": `${Q2}`
            }
          ]
        },
        {
          "linkId": "3",
          "text": "Datum erster Zyklustag",
          "answer": [
            {
              "valueDate": `${Q3}`
            }
          ]
        },
        {
          "linkId": "4",
          "text": "Zykluslaenge",
          "answer": [
            {
              "valueInteger": `${Q4}`
            }
          ]
        },
        {
          "linkId": "5",
          "text": "Stoerfaktoren",
          "answer": [
            {
              "valueString": `${Q5}`
            }
          ]
        },
        {
          "linkId": "6",
          "text": "Kinderwunsch in diesem Zyklus",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q6}`
            }
          ]
        },
        {
          "linkId": "7",
          "text": "Sind sie schwanger",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q7}`
            }
          ],
          "item": [
            {
              "linkId": "7.1",
              "text": "SS-Test positiv",
              "answer": [
                {
                  "valueBoolean": `${Q7_1}`
                }
              ]
            },
            {
              "linkId": "7.2",
              "text": "Verlaengerte Temperatur-Hochlage",
              "answer": [
                {
                  "valueBoolean": `${Q7_2}`
                }
              ]
            },
            {
              "linkId": "7.3",
              "text": "Ausscheider?", //ToDo: Evtl. auch boolen???
              "answer": [
                {
                  "valueString": `${Q7_3}`
                }
              ]
            }
          ]
        },
        {
          "linkId": "8",
          "text": "Erster fruchtbarer Tag nach trackle",
          "answer": [
            {
              "valueInteger": `${Q8}`
            }
          ]
        },

        {
          "linkId": "10",
          "text": "Erste höhere Messung nach trackle",
          "answer": [
            {
              "valueInteger": `${Q10}`
            }
          ]
        },

        {
          "linkId": "12",
          "text": "Ende der Temperatusauswertung nach trackle",
          "answer": [
            {
              "valueInteger": `${Q12}`
            }
          ]
        },

        {
          "linkId": "14",
          "text": "Letzter fruchtbarer Tag nach trackle",
          "answer": [
            {
              "valueInteger": `${Q14}`
            }
          ]
        },

        {
          "linkId": "16",
          "text": "GV pro Zyklustag",
          //ToDO Ask Frontend Team 
          "answer": [
            {
              "valueString": `${Q16_1}`
            },
            {
              "valueString": `${Q16_2}`
            },
            {
              "valueString": `${Q16_3}`
            },
            {
              "valueString": `${Q16_4}`
            },
            {
              "valueString": `${Q16_5}`
            }

          ]
        },
        {
          "linkId": "17",
          "text": "Messort Aufwachtemperatur",
          "answer": [
            {
              "valueString": `${Q17}`
            }
          ]
        },
        {
          "linkId": "18",
          "text": "Zervixschleimbeginn",
          "answer": [
            {
              "valueInteger": `${Q18}`
            }
          ]
        },
        {
          "linkId": "19",
          "text": "Zervixschleimhoehepunkt",
          "answer": [
            {
              "valueString": `${Q19}`
            }
          ]
        }
      ]

    })).data
    console.log(response)

    return res.status(201).send(response).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }

}





export const handlerPutSensiplan: Handler = async (req, res) => {
  try {

    const {idQuestionaireResponse, idPatient, Q2, Q3, Q4, Q5, Q6, Q7, Q7_1, Q7_2, Q7_3, Q9, Q11, Q13, Q15, Q16_1, Q16_2, Q16_3, Q16_4, Q16_5, Q17, Q18, Q19 } = req.body

    const response = (await axios.put<QuestionnaireResponse>(`/QuestionnaireResponse/${req.params.id}`, {
      resourceType: 'QuestionnaireResponse',
      "id": idQuestionaireResponse,
      "subject": {
        "reference": `/Patient/${idPatient}`,
      },

      "item": [
        {
          "linkId": "2",
          "text": "Zyklusnummer",
          "answer": [
            {
              "valueInteger": `${Q2}`
            }
          ]
        },
        {
          "linkId": "3",
          "text": "Datum erster Zyklustag",
          "answer": [
            {
              "valueDate": `${Q3}`
            }
          ]
        },
        {
          "linkId": "4",
          "text": "Zykluslaenge",
          "answer": [
            {
              "valueInteger": `${Q4}`
            }
          ]
        },
        {
          "linkId": "5",
          "text": "Stoerfaktoren",
          "answer": [
            {
              "valueString": `${Q5}`
            }
          ]
        },
        {
          "linkId": "6",
          "text": "Kinderwunsch in diesem Zyklus",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q6}`
            }
          ]
        },
        {
          "linkId": "7",
          "text": "Sind sie schwanger",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q7}`
            }
          ],
          "item": [
            {
              "linkId": "7.1",
              "text": "SS-Test positiv",
              "answer": [
                {
                  "valueBoolean": `${Q7_1}`
                }
              ]
            },
            {
              "linkId": "7.2",
              "text": "Verlaengerte Temperatur-Hochlage",
              "answer": [
                {
                  "valueBoolean": `${Q7_2}`
                }
              ]
            },
            {
              "linkId": "7.3",
              "text": "Ausscheider?", //ToDo: Evtl. auch boolen???
              "answer": [
                {
                  "valueString": `${Q7_3}`
                }
              ]
            }
          ]
        },

        {
          "linkId": "9",
          "text": "Erster fruchtbarer Tag nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q9}`
            }
          ]
        },

        {
          "linkId": "11",
          "text": "Erste höhere Messung nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q11}`
            }
          ]
        },

        {
          "linkId": "13",
          "text": "Ende der Temperatusauswertung nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q13}`
            }
          ]
        },

        {
          "linkId": "15",
          "text": "Letzter fruchtbarer Tag nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q15}`
            }
          ]
        },
        {
          "linkId": "16",
          "text": "GV pro Zyklustag",
          //ToDO Ask Frontend Team 
          "answer": [
            {
              "valueString": `${Q16_1}`
            },
            {
              "valueString": `${Q16_2}`
            },
            {
              "valueString": `${Q16_3}`
            },
            {
              "valueString": `${Q16_4}`
            },
            {
              "valueString": `${Q16_5}`
            }

          ]
        },
        {
          "linkId": "17",
          "text": "Messort Aufwachtemperatur",
          "answer": [
            {
              "valueString": `${Q17}`
            }
          ]
        },
        {
          "linkId": "18",
          "text": "Zervixschleimbeginn",
          "answer": [
            {
              "valueInteger": `${Q18}`
            }
          ]
        },
        {
          "linkId": "19",
          "text": "Zervixschleimhoehepunkt",
          "answer": [
            {
              "valueString": `${Q19}`
            }
          ]
        }
      ]

    }, {
      headers: {
          'content-type': 'application/fhir+json',
          'accept': 'application/fhir+json'
      }
  })).data
    console.log(response)

    return res.status(201).send(response).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }

}











export const handlerPostSensiplan: Handler = async (req, res) => {
  try {

    const { idPatient, Q2, Q3, Q4, Q5, Q6, Q7, Q7_1, Q7_2, Q7_3, Q9, Q11, Q13, Q15, Q16_1, Q16_2, Q16_3, Q16_4, Q16_5, Q17, Q18, Q19 } = req.body

    const response = (await axios.post<QuestionnaireResponse>('/QuestionnaireResponse', {
      resourceType: 'QuestionnaireResponse',
      "subject": {
        "reference": `/Patient/${idPatient}`,
      },

      "item": [
        {
          "linkId": "2",
          "text": "Zyklusnummer",
          "answer": [
            {
              "valueInteger": `${Q2}`
            }
          ]
        },
        {
          "linkId": "3",
          "text": "Datum erster Zyklustag",
          "answer": [
            {
              "valueDate": `${Q3}`
            }
          ]
        },
        {
          "linkId": "4",
          "text": "Zykluslaenge",
          "answer": [
            {
              "valueInteger": `${Q4}`
            }
          ]
        },
        {
          "linkId": "5",
          "text": "Stoerfaktoren",
          "answer": [
            {
              "valueString": `${Q5}`
            }
          ]
        },
        {
          "linkId": "6",
          "text": "Kinderwunsch in diesem Zyklus",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q6}`
            }
          ]
        },
        {
          "linkId": "7",
          "text": "Sind sie schwanger",
          "type": "choice",
          "answer": [
            {
              "valueString": `${Q7}`
            }
          ],
          "item": [
            {
              "linkId": "7.1",
              "text": "SS-Test positiv",
              "answer": [
                {
                  "valueBoolean": `${Q7_1}`
                }
              ]
            },
            {
              "linkId": "7.2",
              "text": "Verlaengerte Temperatur-Hochlage",
              "answer": [
                {
                  "valueBoolean": `${Q7_2}`
                }
              ]
            },
            {
              "linkId": "7.3",
              "text": "Ausscheider?", //ToDo: Evtl. auch boolen???
              "answer": [
                {
                  "valueString": `${Q7_3}`
                }
              ]
            }
          ]
        },

        {
          "linkId": "9",
          "text": "Erster fruchtbarer Tag nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q9}`
            }
          ]
        },

        {
          "linkId": "11",
          "text": "Erste höhere Messung nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q11}`
            }
          ]
        },

        {
          "linkId": "13",
          "text": "Ende der Temperatusauswertung nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q13}`
            }
          ]
        },

        {
          "linkId": "15",
          "text": "Letzter fruchtbarer Tag nach Sensiplan",
          "answer": [
            {
              "valueInteger": `${Q15}`
            }
          ]
        },
        {
          "linkId": "16",
          "text": "GV pro Zyklustag",
          //ToDO Ask Frontend Team 
          "answer": [
            {
              "valueString": `${Q16_1}`
            },
            {
              "valueString": `${Q16_2}`
            },
            {
              "valueString": `${Q16_3}`
            },
            {
              "valueString": `${Q16_4}`
            },
            {
              "valueString": `${Q16_5}`
            }

          ]
        },
        {
          "linkId": "17",
          "text": "Messort Aufwachtemperatur",
          "answer": [
            {
              "valueString": `${Q17}`
            }
          ]
        },
        {
          "linkId": "18",
          "text": "Zervixschleimbeginn",
          "answer": [
            {
              "valueInteger": `${Q18}`
            }
          ]
        },
        {
          "linkId": "19",
          "text": "Zervixschleimhoehepunkt",
          "answer": [
            {
              "valueString": `${Q19}`
            }
          ]
        }
      ]

    })).data
    console.log(response)

    return res.status(201).send(response).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }

}

export const handlerDelete: Handler = async (req, res) => {
  try {
    console.log(req.params.id)
    const response = (await axios.delete<QuestionnaireResponse>(`/QuestionnaireResponse/${req.params.id}`))


    return res.status(201).send(response).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }
}


export const handlerGet: Handler = async (req, res) => {
  try {
    const response = (await axios.get<QuestionnaireResponse>(`/QuestionnaireResponse/${req.params.id}`))


    return res.status(201).send(response.data).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }
}