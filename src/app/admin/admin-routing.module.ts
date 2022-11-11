import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: '**',
    redirectTo: '/admin/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
