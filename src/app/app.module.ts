import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import {SharedModule} from "./shared/shared.module";
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {format, FormatDatePipe} from './format-date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { RegisterFormComponent } from './register-form/register-form.component';
import {AppRoutingModule} from "./app-routing.module";
import { DetailsComponent } from './list/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    FormatDatePipe,
    RegisterFormComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    DatePipe,
    {
      provide: format,
      useValue: 'EEE dd/MM/yyyy hh:mm a'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
