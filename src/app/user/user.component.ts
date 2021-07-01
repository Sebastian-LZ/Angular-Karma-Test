import { Component, OnInit } from '@angular/core';
import { User, UserList } from '../interfaces/api';
import { ApiRestService } from '../services/api-rest.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userId;

  constructor(private apiRest: ApiRestService) { }

  ngOnInit(): void {
    this.createUser();
  }

  public loadInfo() {
    this.apiRest.getUsersList().subscribe(
      (response: UserList) => {
        console.log(response.data);
      },
      error => {
        console.error(error);
      }
    )
  }

  public filterUser() {
    this.apiRest.getById(this.userId).subscribe(
      (response: User) => {
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
