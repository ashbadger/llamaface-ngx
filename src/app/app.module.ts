import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LoginBoxComponent } from './root-page/login-box/login-box.component';
import { SignupBoxComponent } from './root-page/signup-box/signup-box.component';
import { HomeComponent } from './home/home.component';
import { LlamasComponent } from './llamas/llamas.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RootPageComponent } from './root-page/root-page.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { LlamaResultComponent } from './shared/llama-result/llama-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponent,
    SignupBoxComponent,
    HomeComponent,
    LlamasComponent,
    SearchResultsComponent,
    ProfileComponent,
    AccountDetailsComponent,
    RootPageComponent,
    NavbarComponent,
    PostsComponent,
    LlamaResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
