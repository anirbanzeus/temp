import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TasksComponent } from './components/tasks/tasks.component';


const routes: Routes = [
  {
    path: 'view-task',
    component: ViewTasksComponent,
    runGuardsAndResolvers: 'always'
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
    path: '',
    redirectTo: '/app-tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
