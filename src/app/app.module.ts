import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './features/account/account.component';
import {HomeModule} from "./features/home/home.module";
import { SearchComponent } from './features/search/search.component';
import {FormsModule} from "@angular/forms";
import {FilterPipe} from "./features/search/filter.pipe";
import { FavoriteComponent } from './features/favorite/favorite.component';



@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    SearchComponent,
    FilterPipe,
    FavoriteComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    HomeModule,
    FormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
