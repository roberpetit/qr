import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { HomeComponent } from './home/home.component';
import { NewQrComponent } from './new-qr/new-qr.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'new', component: NewQrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
