import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, first, map, of } from "rxjs";
import { User } from "./olb-user";

import { XMLParser } from "fast-xml-parser";
import { TheosServiceResponseType } from "../domain/theos/theos-service-response-type";
import { TheosUser } from "../domain/theos/theos-user";
import { TheosService } from "../domain/theos/theos.service";

@Injectable({
  providedIn: "root"
})
export class OlbUserService {
  private THEOS_SOAP_URL = this.theosService.getTheosSoapUrl() + "/theos.php";

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly theosService: TheosService
  ) {}

  public filterUsers$(filterValue: string): Observable<User[]> {
    const theosServiceUrl = `${this.theosService.getTheosUrl()}?iValid=true&cText=${filterValue.toLowerCase()}`;

    return this.httpClient.get(theosServiceUrl, { responseType: "text" }).pipe(
      first(),
      map(xml => this.parseXml(xml, TheosServiceResponseType.XmlUserDataResponse)),
      catchError(err => {
        console.error("Es ist ein Fehler beim ermitteln von Theos Benutzern aufgetreten (OlbUserService:filterUsers):", err);
        return [];
      })
    );
  }

  // Leeres Array für alle Nutzer
  public getUsers(bNummern: string[]): Observable<User[]> {
    if (bNummern) {
      let bodyPersNumbers = "";
      bNummern.forEach(nummer => (bodyPersNumbers += "<the:persnr>" + nummer + "</the:persnr>\n"));

      const body =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:the="http://theos.olb.de/service/THEOSSchema">\n' +
        "<soapenv:Header/>\n" +
        "<soapenv:Body>\n" +
        "<the:getUserData>\n" +
        bodyPersNumbers +
        "<the:appname>Daisy</the:appname>\n" +
        "<the:apptoken>Benutzer</the:apptoken>\n" +
        "</the:getUserData>\n" +
        "</soapenv:Body>\n" +
        "</soapenv:Envelope>";

      const headers = new HttpHeaders();
      headers.set("SOAPAction", this.theosService.getTheosSoapUrl() + "/THEOSService/getUserData");
      headers.set("Content-Type", "text/xml; charset=utf-8");

      const users = this.httpClient
        .post(this.THEOS_SOAP_URL, body, {
          headers: headers,
          responseType: "text"
        })
        .pipe(
          map(xml => this.parseXml(xml, TheosServiceResponseType.SoapUserDataResponse)),
          catchError(err => {
            console.error("Es ist ein Fehler beim ermitteln von Theos Benutzern aufgetreten (OlbUserService:getUsers):", err);
            return [];
          })
        );

      return users;
    }
    return of([]);
  }

  private parseXml(xml: string, type: TheosServiceResponseType): User[] {
    const users = new Array<User>();
    const parser = new XMLParser();
    const jsonObj = parser.parse(xml);

    if (xml && type !== null) {
      if (type === TheosServiceResponseType.SoapUserDataResponse) {
        if (jsonObj && jsonObj["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:getUserDataResponse"]["ns1:result"]["ns1:user"]) {
          const tmpUserAry = jsonObj["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:getUserDataResponse"]["ns1:result"]["ns1:user"];
          if (tmpUserAry && Array.isArray(tmpUserAry)) {
            tmpUserAry.forEach((user: any) => {
              users.push({
                bNummer: user["ns1:personalnr"],
                firstName: user["ns1:benutzervorname"],
                lastName: user["ns1:benutzernachname"],
                fullName: user["ns1:benutzername"],
                geschlecht: user["ns1:geschlecht"],
                email: user["ns1:benutzermail"]["ns1:adresse"],
                telefon: user["ns1:benutzerteamposition"]["ns1:telefon"],
                position: user["ns1:benutzerteamposition"]["ns1:positionname"],
                orgEinheit: user["ns1:benutzerteamposition"]["ns1:teambezeichnung"],
                anschrift:
                  user["ns1:benutzerteamposition"]["ns1:strasse"] +
                  " " +
                  user["ns1:benutzerteamposition"]["ns1:plz"] +
                  " " +
                  user["ns1:benutzerteamposition"]["ns1:ort"],
                gebaeude: user["ns1:benutzerteamposition"]["ns1:gebaeude"]
              });
            });
          }
        }
      } else if (type === TheosServiceResponseType.XmlUserDataResponse) {
        if (jsonObj?.response?.result?.data) {
          if (Array.isArray(jsonObj.response.result.data)) {
            const theosUsers = jsonObj.response.result.data as TheosUser[];
            theosUsers.forEach(theosUser => {
              users.push({
                bNummer: theosUser.key,
                firstName: theosUser?.value?.split(",")[1]?.trim(),
                lastName: theosUser?.value?.split(",")[0]?.trim(),
                position: theosUser.info
              });
            });
          } else if (typeof jsonObj.response.result.data === "object") {
            const theosUser = jsonObj.response.result.data as TheosUser;
            users.push({
              bNummer: theosUser.key,
              firstName: theosUser?.value?.split(",")[1]?.trim(),
              lastName: theosUser?.value?.split(",")[0]?.trim(),
              position: theosUser.info
            });
          }
        }
      }
    }
    return users;
  }
}
