import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MatSliderModule, MatCard, MatSnackBarModule, MatCheckboxModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { ApiService } from './core/api.Service';
import { HeaderComponent } from './components/header/header.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { AppModalProjectComponent } from './components/app-modal-project/app-modal-project.component';
import { AppModalTaskComponent } from './components/app-modal-task/app-modal-task.component';
import { SortableColumnComponent } from './components/sortable-column-component/sortable-column-component.component';
import { SortService } from './core/SortService';

@NgModule({
  declarations: [
    AppComponent,
    ViewTasksComponent,
    TasksComponent,
    HeaderComponent,
    EditTaskComponent,
    AddProjectComponent,
    AddUserComponent,
    ViewProjectComponent,
    ViewUserComponent,
    AppModalComponent,
    AppModalProjectComponent,
    AppModalTaskComponent,
    SortableColumnComponent
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
    Ng2SearchPipeModule  ,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [ApiService, ViewProjectComponent, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
