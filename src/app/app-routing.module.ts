import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AccountComponent} from "./features/account/account.component";
import { SearchComponent} from "./features/search/search.component";
import { RestlandingpageComponent } from './features/restlandingpage/restlandingpage.component';
import {FavoriteComponent} from "./features/favorite/favorite.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
  path: 'dashboard',
   loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),


  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path:'rest/:name',
    component:RestlandingpageComponent
  },
  {
    path:'favorite',
    component: FavoriteComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
