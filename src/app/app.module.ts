import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { ImportAllNZModule } from './nz-declaration.module';
import { WebcamModule } from 'ngx-webcam';
import { SignaturePadModule } from 'ngx-signaturepad';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from './icons-provider.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FormLayoutComponent } from './layouts/form-layout/form-layout.component';
import { FormSectionComponent } from './shared/form-section/form-section.component';
import { CameraSectionComponent } from './shared/camera-section/camera-section.component';
import { SignatureSectionComponent } from './shared/signature-section/signature-section.component';
import { FormResultComponent } from './shared/form-result/form-result.component';
import { VerifySectionComponent } from './shared/verify-section/verify-section.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    FormLayoutComponent,
    FormSectionComponent,
    CameraSectionComponent,
    SignatureSectionComponent,
    FormResultComponent,
    VerifySectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    DashboardModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ImportAllNZModule,
    WebcamModule,
    SignaturePadModule,
    NgxCaptchaModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
