import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ListComponent } from './list/list.component';
import { HighlightDirective } from './highlight.directive';
import { DividedByPipe } from './divided-by.pipe';
import {ChannelService} from "./channel.service";
// import {SharedModule} from "./shared/shared.module";
import { FormComponent } from './form/form.component';
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {format, FormatDatePipe} from './format-date.pipe';
import { FormOneComponent } from './form-one/form-one.component';
import { FormTwoComponent } from './form-two/form-two.component';
import { FormContainerComponent } from './form-container/form-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HighlightDirective,
    DividedByPipe,
    FormComponent,
    FormatDatePipe,
    FormOneComponent,
    FormTwoComponent,
    FormContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // SharedModule
  ],
  providers: [
    // ChannelService,
    {
      provide: 'Loly',
      useClass: ChannelService,
      // useFactory: () => new ChannelService()
    },
    {
      provide: FormatDatePipe,
      useFactory: (dp: DatePipe) => new FormatDatePipe('en-US', 'yyyy/MM', dp),
      deps: [DatePipe]
    },
    DatePipe,
    {
      provide: format,
      useValue: 'EEE dd/MM/yyyy hh:mm a'
    }
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'fr-FR'
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
