import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TaskDetail} from "../models/taskdetail";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../models/api.response";
import { ProjectDetail } from '../models/projectDetail';
import { UserDetail } from '../models/userDetail';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8888/';

  /*login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload);
  }*/

  getTasks() : Observable<ApiResponse> {   
    return this.http.get<ApiResponse>(this.baseUrl+'tasks/');
  }

  getParentTasks(scope: string) : Observable<ApiResponse> {    
    return this.http.get<ApiResponse>(this.baseUrl+'tasks/scope');
  }

  getProjects() : Observable<ApiResponse> {    
    return this.http.get<ApiResponse>(this.baseUrl+'project/');
  }

  getUsers() : Observable<ApiResponse> {    
    return this.http.get<ApiResponse>(this.baseUrl+'user/');
  }

  getTaskById(id: number): Observable<ApiResponse> {
    console.log('calling to springboot');
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  getTaskByProjectName(projectName: string): Observable<ApiResponse> {
    console.log('calling to springboot');
    return this.http.get<ApiResponse>(this.baseUrl+'tasks/fetch/' + projectName);
  }

  getProjectById(id: number): Observable<ApiResponse> {
    console.log('calling to springboot');
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createTask(task: TaskDetail): Observable<ApiResponse> {
    console.log('step 3333');
    return this.http.post<ApiResponse>(this.baseUrl+'tasks/', task);
  }

  createProject(project: ProjectDetail): Observable<ApiResponse> {
    console.log('step 3');   
    return this.http.post<ApiResponse>(this.baseUrl+'project/', project);
  }

  createUser(user: UserDetail): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'user/', user);
  }

  updateTask(task: TaskDetail): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl+'tasks/' + task.taskId, task);
  }

  updateTaskToComplete(task: TaskDetail): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl+'tasks/complete/' + task.taskId, task);
  }

  updateProject(project: ProjectDetail): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl+'project/'+ project.projectId, project);
  }

  updateUser(user: UserDetail): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl+'user/'+ user.userId, user);
  }

  deleteTask(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
