import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from './health-check/health-check.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { IconsProviderModule } from './icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TodoListService } from './todo-list.service';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component'

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FetchDataComponent,
    NavMenuComponent,
    HealthCheckComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    jqxGridModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzTagModule,
    NzFormModule,
    NzButtonModule,
    NzListModule,

    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }, TodoListService,
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
