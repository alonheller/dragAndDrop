import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DrawerComponent} from './layout/drawer/drawer.component';
import {ViewerComponent} from './layout/viewer/viewer.component';


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
  {
    path: 'viewer/:id',
    component: ViewerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
