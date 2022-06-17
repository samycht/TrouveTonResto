import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RestlandingpageComponent } from './restlandingpage.component';
import { Router } from '@angular/router';



@NgModule({
  declarations: [
    RestlandingpageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    Router
    
  ]
})
export class RestlandingpageModule { }
