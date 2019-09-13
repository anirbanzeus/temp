import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'view-task',
    component: ViewTasksComponent,
},
{
    path: 'view-app',
    component: AppComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
