import { NgModule } from '@angular/core';
import {PreloadingStrategy, RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {DetailsComponent} from "./list/details/details.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent,
    children: [
      {
        path: ':ID',
        component: DetailsComponent
      }
    ]
  },
  // {
  //   path: 'list/:id',
  //   component: DetailsComponent
  // },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: '**',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      // preloadingStrategy: PreloadingStrategy
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
