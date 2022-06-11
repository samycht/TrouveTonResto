import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/home.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'


@NgModule({
  declarations: [
    DashboardComponent,
    RestaurantFormComponent,
  
  
  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    HomeModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule

  ],


})
export class DashboardModule { }
