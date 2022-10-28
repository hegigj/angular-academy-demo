import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ListComponent } from './list/list.component';
import { HighlightDirective } from './highlight.directive';
import { DividedByPipe } from './divided-by.pipe';
import {ChannelService} from "./channel.service";
import {SharedModule} from "./shared/shared.module";
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {format, FormatDatePipe} from './format-date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HighlightDirective,
    DividedByPipe,
    FormComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ChannelService,
    DatePipe,
    {
      provide: format,
      useValue: 'EEE dd/MM/yyyy hh:mm a'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
