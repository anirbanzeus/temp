import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MatSliderModule, MatCard, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { ApiService } from './core/api.Service';
import { HeaderComponent } from './components/header/header.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    ViewTasksComponent,
    TasksComponent,
    HeaderComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
