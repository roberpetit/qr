import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewQrComponent } from './new-qr/new-qr.component';

const routes: Routes = [
  { path: '', children: [] },
  { path: 'new', component: NewQrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
