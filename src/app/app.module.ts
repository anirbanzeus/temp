import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './badge/badge.component';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MatSliderModule, MatCard } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    ViewTasksComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }