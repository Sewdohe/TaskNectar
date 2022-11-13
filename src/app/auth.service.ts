import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, interval, map, Observable, Observer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Firestore, collection, doc } from '@angular/fire/firestore'
import {
  DAVCalendar,
  DAVCalendarObject
} from "tsdav";

type TokenResponse = {
  login: string,
  poll: {
    token: string,
    endpoint: string,
  }
}

type AuthResponse = {
  "server": string,
  "loginName": string,
  "appPassword": string
}

interface ApiResponse {
  "response": "Success" | "Error"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Declare Class Properties
  loginUrl: string = '/nextcloud/login/v2'
  baseUrl: string = '/api/'
  response$: Observable<TokenResponse> | undefined;
  headers: HttpHeaders = new HttpHeaders({
    'OCS-APIRequest': 'true'
  })
  credentialData$: BehaviorSubject<AuthResponse | null> = new BehaviorSubject<AuthResponse | null>(null);
  credentialData: AuthResponse | null = null;

  isAuthed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthed: boolean = false;

  selectedCalendar$ = new BehaviorSubject<DAVCalendarObject[] | null>(null);
  selectedCalendar: DAVCalendar | null = null;

  public calendars$ = 
    new BehaviorSubject<DAVCalendar[] | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private firestore: Firestore) {

  }

  loginToServer(authResponse: AuthResponse) {
    console.warn('logging into API')
    this.http.post('/api/login', authResponse).subscribe((response) => {
      console.log(response);
    })
  }

  getCalendars() {
    this.http.get("/api/calendars").subscribe((calendars) => {
      //@ts-ignore
      this.calendars$.next(calendars);
    })
  }

  getCalendarDetail(calendar: DAVCalendar) {
    //@ts-ignore
    this.http.post("api/detail", {calendar: calendar}).subscribe((calendar: DAVCalendarObject[]) => {
      console.log("response from API:")
      console.log(calendar)
      //@ts-ignore
      this.selectedCalendar$.next(calendar)
    })
  }

  davLogin(user: string, password: string, server: string) {
    this.http.post("/api/davlogin", {
      user,
      password,
      server
    }).subscribe((response: Partial<ApiResponse>) => {
      if(response.response !== "Error") {
        console.warn("Login results: ", response.response)
        this.isAuthed$.next(true);
      }
    })
  }

  // Declare Methods
  // Section
  redirectToLogin(url: string, endpoint: string, token: string) {
    console.log('navigating to: ', url)
    window.open(url, "_blank");
    let unsub = this.pollTokenURL(endpoint, token).subscribe();
    this.credentialData$.subscribe(data => {
      if(data != null) {
        unsub.unsubscribe()
        this.loginToServer(data);
      }
    })
  }

  pollTokenURL(url: string, token: string) {
    console.log('Starting polling!')
    let proxyedURL = url.replace("https://nextcloud.divnectar.com/", "")
    this.credentialData$.subscribe(credData => {})
    
   return interval(3000).pipe(
      map((x) => {
        if(this.credentialData == null) {
          this.http.post<AuthResponse>(
          '/nextcloud/login/v2/poll',
            {},
            { responseType: 'json', headers: this.headers, params: { token: token } }
          ).subscribe((response: AuthResponse) => {
            console.warn("GOT AUTH!")
            console.log(response)
            this.credentialData$.next(response);
          })
        }
      })
    )
  }

  startLogin() {
    this.response$ = this.http.post<TokenResponse>(
      "/api/login",
      { responseType: 'json', headers: this.headers });

    this.response$.subscribe((data: TokenResponse) => {
      console.warn(data)
      this.redirectToLogin(data.login, data.poll.endpoint, data.poll.token);
    })
  }

}
