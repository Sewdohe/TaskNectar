import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})
export class FirebaseLoginComponent implements OnInit {
  public readonly loginFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onClickSubmit(): void {

  }

}
