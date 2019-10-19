import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EditTaskComponent } from './edit-task/edit-task.component';


const routes: Routes = [
  {
    path: 'view-task',
    component: ViewTasksComponent,
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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
