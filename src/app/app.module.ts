import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ListComponent } from './list/list.component';
import { HighlightDirective } from './highlight.directive';
import { DividedByPipe } from './divided-by.pipe';
import {ChannelService} from "./channel.service";
import {SharedModule} from "./shared/shared.module";
import { FormComponent } from './form/form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HighlightDirective,
    DividedByPipe,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
