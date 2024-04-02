import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductItemComponent } from './pages/product/item/product-item.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'product',
    children: [
      {
        path: ':id',
        component: ProductItemComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
