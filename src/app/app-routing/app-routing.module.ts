import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products/products.component';
import {RecipeComponent} from "../recipe/recipe/recipe.component";
import {RegisterComponent} from "../auth/register/register.component";
import {ShopsComponent} from "../shops/shops/shops.component";
import {StatDashboardComponent} from "../statistics/stat-dashboard/stat-dashboard.component";

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: HomeComponent
   },
  {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
   },
  {
  path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule'
   },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'products',
    //canActivate: [AuthGuard],
    component: ProductsComponent
  },
  {
    path: 'statistics',
    //canActivate: [AuthGuard],
    component: StatDashboardComponent
  },
  {
    path: 'shops',
    //canActivate: [AuthGuard],
    component: ShopsComponent
  },
 { path: 'recipes',
   //canActivate: [AuthGuard],
   component: RecipeComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
