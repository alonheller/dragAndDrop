import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import {DrawerComponent} from "./layout/drawer/drawer.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/drawer',
    pathMatch: 'full'
  },
  {
    path: 'drawer',
    component: DrawerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
