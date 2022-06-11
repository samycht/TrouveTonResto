import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule} from '@angular/router'
import { RestauranttemplateComponent } from '../restauranttemplate/restauranttemplate.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    TopBarComponent
    ,HomeComponent,
    RestauranttemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule

   
  ],
  exports:[
    TopBarComponent,
    HomeComponent,
    RestauranttemplateComponent
  ]
  
})
export class HomeModule { }
