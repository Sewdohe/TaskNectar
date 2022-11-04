import { Injectable } from "@angular/core";
import {
  createDAVClient,
  DAVAccount,
  DAVCalendar,
  DAVCalendarObject,
  DAVClient
} from "tsdav";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class DavService {
  public client: DAVClient | null = null;
  // public account: DAVAccount;

  async getCalendars(): Promise<DAVCalendar[]> {
    return await this.client!.fetchCalendars({
      headers: {
        authorization: `Basic ${btoa('sewdohe:*%y*5Dv36*Yn#w')}`,
        "Access-Control-Allow-Origin": 'http://localhost:4200'
      }
    });
  }

  storeToken(token: string): void {
    console.log('got token: ', token)
  }

  async getCalendarDetail(calendar: DAVCalendar): Promise<DAVCalendarObject[]> {
    return await this.client!.fetchCalendarObjects({
      calendar,
      headers: {
        authorization: `Basic ${btoa('sewdohe:*%y*5Dv36*Yn#w')}`,
        "Access-Control-Allow-Origin": 'http://localhost:4200'
      }
    })
  }

  constructor(private auth: AuthService) {
    auth.credentialData$.subscribe(authData => {
      if(authData != null) {
        console.warn("Auth data recieved! Logging into dav service")
        this.client = new DAVClient({
          serverUrl: 'https://nextcloud.divnectar.com/remote.php/dav/',
          credentials: {
            username: 'sewdohe',
            password: authData?.appPassword,
          },
          authMethod: 'Basic',
          defaultAccountType: 'caldav',
        });
        this.client.login().then(() => {
          this.client?.fetchCalendars().then((calendars) => {
            console.log(calendars)
          })
        })
      }
    })
  }
}