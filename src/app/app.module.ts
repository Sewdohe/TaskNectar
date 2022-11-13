import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './app/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DavService } from './dav.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { AuthService } from './auth.service';
import { ResponseInterceptor } from './interceptors/nc-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { TaskComponent } from './task/task.component';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component'


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavComponent,
    CalendarDetailComponent,
    TaskComponent,
    FirebaseLoginComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDividerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent],
  providers: [DavService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
  }],
  exports: [
    AppComponent,
    LoginComponent,
    MatButtonModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDividerModule
  ]
})
export class AppModule { }
