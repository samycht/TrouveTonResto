import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule} from '@angular/router'
@NgModule({
  declarations: [
    TopBarComponent
    ,HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
    

   
  ],
  exports:[
    TopBarComponent,
    HomeComponent
  ]
  
})
export class HomeModule { }
