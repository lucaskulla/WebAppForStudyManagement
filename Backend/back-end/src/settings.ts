import { fhirclient } from "fhirclient/lib/types";

export const settings: fhirclient.AuthorizeParams =  {
  clientId: 'my-client-id',
  redirectUri: '/app',
  scope: 'launch/patient patient/*.read openid fhirUser',
  iss: 'http://hapi.fhir.org/baseR4'
}
