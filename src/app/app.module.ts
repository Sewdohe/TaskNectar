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
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';




@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavComponent,
    CalendarDetailComponent,
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
    MatListModule
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
    MatProgressSpinnerModule
  ]
})
export class AppModule { }
