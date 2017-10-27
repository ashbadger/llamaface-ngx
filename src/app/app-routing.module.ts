import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'
import { RootPageComponent } from './root-page/root-page.component'
import { LlamasComponent } from './llamas/llamas.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'llamas', component: LlamasComponent },
  { path: 'login', component: RootPageComponent },
  { path: 'llamas/:id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
