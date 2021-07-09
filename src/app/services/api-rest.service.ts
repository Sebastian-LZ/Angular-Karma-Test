import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { User, UserList, UserRequest } from '../interfaces/api';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private contextPath = "https://reqres.in/api/users";

  constructor(private http: HttpClient) { }

  public getUsersList(): Observable<UserList> {

    return this.http.get<UserList>(this.contextPath);
  }

  public getById(userId: string): Observable<User> {
    const complementaryPath = this.contextPath.concat("/"+userId);

    return this.http.get<User>(complementaryPath);
  }

  public createUser(userRq: UserRequest): Observable<any> {
    return this.http.post<any>(this.contextPath, userRq);
  }
}