import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginBoxComponent } from './root-page/login-box/login-box.component';
import { SignupBoxComponent } from './root-page/signup-box/signup-box.component';
import { HomeComponent } from './home/home.component';
import { LlamasComponent } from './llamas/llamas.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupDetailsComponent } from './signup-details/signup-details.component';
import { RootPageComponent } from './root-page/root-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchHeaderComponent } from './search-header/search-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponent,
    SignupBoxComponent,
    HomeComponent,
    LlamasComponent,
    SearchResultsComponent,
    ProfileComponent,
    SignupDetailsComponent,
    RootPageComponent,
    SearchHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
