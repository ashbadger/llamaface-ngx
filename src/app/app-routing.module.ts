import { SearchResultsComponent } from './search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RootPageComponent } from './root-page/root-page.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { LlamasComponent } from './llamas/llamas.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'llamas', component: LlamasComponent },
  { path: 'login', component: RootPageComponent },
  { path: 'llamas/:id', component: ProfileComponent},
  { path: 'account', component: AccountDetailsComponent},
  { path: 'search', component: SearchResultsComponent},
  { path: 'posts', component: PostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
