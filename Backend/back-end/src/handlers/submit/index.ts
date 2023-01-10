import axios from 'axios'
import { Handler } from 'express'

interface Patient {
  readonly id: string
}

export const handler: Handler = async (req, res) => {
  try {

    const { family, given, gender, birthDate, item } = req.body

    // Create fhir patient:
    const patient = (await axios.post<Patient>('/Patient', {
      resourceType: 'Patient',
      gender,
      birthDate,
      name: [{ family, given }],
    })).data

    // Create fihr questionniare response:
    const response = (await axios.post<any>('/QuestionnaireResponse', {
      resourceType: 'QuestionnaireResponse',
      questionnaire: req.params.id,
      status: 'completed',
      subject: {
        reference: `Patient/${patient.id}`,
        display: `${given} ${family}`
      },
      item: item
    })).data

    return res.status(201).send(response).end()
  } catch (error) {
    return res.status(400).send(error).end()
  }
}
