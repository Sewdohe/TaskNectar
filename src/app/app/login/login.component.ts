import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DAVCalendar,
} from "tsdav";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public readonly loginFormGroup: FormGroup;
  public isAuthed: boolean = false;
  public calendars: DAVCalendar[] | null = null

  initLogin() {
    this.auth.startLogin();
  }

  constructor(private auth: AuthService, private readonly formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      server: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auth.isAuthed$.subscribe(authed => {
      this.isAuthed = authed;
      console.log('authed!')
      console.log('getting calendar data')
      if (authed == true) {
        this.getCalendars();
      }
    })

    this.auth.calendars$.subscribe((calendars) => {
      this.calendars = calendars;
      console.log(this.calendars!)
    })
  }

  getCalendars() {
    this.auth.getCalendars();
  }

  public onClickSubmit(): void {
    if (this.loginFormGroup.invalid) {
      // stop here if it's invalid
      alert('Invalid input');
      return;
    }
    let loginValues = this.loginFormGroup.getRawValue()
    this.auth.davLogin(
      loginValues.user,
      loginValues.password,
      "https://" + loginValues.server + "/remote.php/dav/")
  }

}
