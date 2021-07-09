import { Component, OnInit } from '@angular/core';
import { User, UserList } from '../interfaces/api';
import { ApiRestService } from '../services/api-rest.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userFiltered: User;
  public userId;
  public tittle = "Bienvenidos a la introducción sobre pruebas con Karma y Jasmine";
  public dataLoaded;
  public dataLoadWithError = false;

  constructor(public apiRest: ApiRestService) { }

  ngOnInit(): void {
    this.createUser();
  }

  public loadInfo() {
    this.apiRest.getUsersList().subscribe(
      (response: UserList) => {
        console.log(response.data);
        this.dataLoaded = response;
      },
      error => {
        console.error(error);
        this.dataLoadWithError = true;
      }
    )
  }

  public filterUser() {
    this.apiRest.getById(this.userId).subscribe(
      (response: User) => {
        this.userFiltered = response;
        console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }

  public createUser() {
    let body = {
      "name": "morpheus",
      "job": "leader"
    };

    this.apiRest.createUser(body).subscribe(
      data => {
        console.log(data);

      }
    )
  }
}
