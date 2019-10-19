import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TaskDetail} from "../models/taskdetail";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../models/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8888/tasks/';

  /*login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload);
  }*/

  getTasks() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getTaskById(id: number): Observable<ApiResponse> {
    console.log('calling to springboot');
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createTask(task: TaskDetail): Observable<ApiResponse> {
    console.log('step 3');
    return this.http.post<ApiResponse>(this.baseUrl, task);
  }

  /*updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  }*/

  deleteTask(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
