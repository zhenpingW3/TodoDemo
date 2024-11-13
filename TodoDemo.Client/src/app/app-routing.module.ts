import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'nav-menu', component: NavMenuComponent  },
  { path: 'jqxgrid-demo', component: HomeComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'health-check', component: HealthCheckComponent },
  { path: 'todo-list', component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
