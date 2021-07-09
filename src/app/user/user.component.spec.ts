import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ApiRestService } from '../services/api-rest.service';

import { UserComponent } from './user.component';

export class UserServiceStub {
  getUsersList() {
    return of({
      page: 2,
      per_page: 10,
      total: 100,
      total_pages: 100,
      data: [
        {
          id: 111,
          email: "email@mail.com",
          first_name: "Diego",
          last_name: "Garcia",
          avatar: "string"
        }
      ]
    });
  }

  createUser() {
    return of({});
  }

  getById() {
    return of({})
  }
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const responseInfo = {
    page: 2,
    per_page: 10,
    total: 100,
    total_pages: 100,
    data: [
      {
        id: 111,
        email: "email@mail.com",
        first_name: "Diego",
        last_name: "Garcia",
        avatar: "string"
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientModule],
      providers: [HttpClient, { provide: ApiRestService, useClass: UserServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit("Should compare correct tittle by css", () => {
    const tittle = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(tittle.innerHTML).toBe(component.tittle);
  });

  fit("Should compare correct tittle by id", () => {
    const h1 = fixture.debugElement.nativeElement.querySelector('#tittle');

    expect(h1.innerHTML).toBe(component.tittle);
  });

  fit('should have button disabled', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#button-disabled');

    expect(btn.disabled).toBeTruthy();
  });

  fit("Should compare correct tittle by id and verify lenght to be greater than 0", () => {
    const h1 = fixture.debugElement.nativeElement.querySelector('#tittle');

    expect(h1.innerHTML).toBe(component.tittle);
    expect(h1.innerHTML.length).toBeGreaterThan(10);
  });

  fit('should success load info with real call', () => {
    (done: DoneFn) => {
      component.apiRest.getUsersList().subscribe(value => {
        expect(value.data.length).toBeGreaterThan(0);
        done();
      })
    }
  });

  fit('should success load info using stub call', () => {
    component.loadInfo();

    expect(component.dataLoaded).toEqual(responseInfo);
  });

  fit('should success load info with fake call', fakeAsync(() => {
    let spyloadInfo = spyOn<any>(component.apiRest, 'getUsersList').and.returnValue(of(responseInfo));

    component.loadInfo();

    expect(spyloadInfo).toHaveBeenCalled();
    expect(component.dataLoaded).toEqual(responseInfo);
  }));

  fit('should load info with errors', fakeAsync(() => {
    const responseError = {
      description: "Error inesperado"
    };
    let spyloadInfo = spyOn<any>(component.apiRest, 'getUsersList').and.returnValue(throwError(responseError));

    component.loadInfo();

    tick(100);

    expect(spyloadInfo).toHaveBeenCalled();
    expect(component.dataLoadWithError).toBeTruthy();
  }));

  fit('should execute loadInfo() from button click', () => {
    const spyLoadInfo = spyOn(component, 'loadInfo');
    const btn = fixture.debugElement.nativeElement.querySelector('#download-info');

    btn.click();

    expect(spyLoadInfo).toHaveBeenCalled();
  });
});
