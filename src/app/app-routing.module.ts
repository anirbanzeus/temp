import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddUserComponent } from './components/add-user/add-user.component';


const routes: Routes = [
  {
    path: 'view-task',
    component: ViewTasksComponent,
    //runGuardsAndResolvers: 'always'
  },
  {
    path: 'app-tasks',
    component: TasksComponent,
  },
  {
    path: 'view-app',
    component: AppComponent,
  },
  {
    path: 'main-app',
    component: HeaderComponent,
  },
  {
    path: 'edit-task',
    component: EditTaskComponent,
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: '',
    redirectTo: '/add-project',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
