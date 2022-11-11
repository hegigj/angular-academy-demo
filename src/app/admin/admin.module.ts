import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./list/list.component";
import { ItemComponent } from './list/item/item.component';
import {AdminRoutingModule} from "./admin-routing.module";



@NgModule({
  declarations: [
    ListComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
