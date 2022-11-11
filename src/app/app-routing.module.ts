import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";
import {DetailComponent} from "./list/detail/detail.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserGuard} from "./user.guard";
import {ItemsResolver} from "./items.resolver";
import {ItemResolver} from "./item.resolver";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [UserGuard],
    data: {
      users: ['USER', 'ADMIN']
    },
    resolve: {
      items: ItemsResolver
    },
    children: [
      {
        path: ':ID',
        component: DetailComponent,
        resolve: {
          item: ItemResolver
        }
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'admin',
    canLoad: [UserGuard],
    data: {
      users: ['ADMIN']
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
