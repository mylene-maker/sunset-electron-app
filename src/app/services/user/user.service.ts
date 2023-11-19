import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {User, UserForm, UserHttp} from "../../models/user.model";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrlApi: string =  environment.API_URL
  private resourceName: string = 'users'

  private fullBaseUrlApi: string
  constructor(private http: HttpClient) {
    this.fullBaseUrlApi = this.baseUrlApi + this.resourceName
  }

  getAll(): Promise<User[]> {
    const obsHttps$ = this.http
      .get<UserHttp[]>(`${this.fullBaseUrlApi}/`)
      .pipe(
        map((usersHttp: UserHttp[]) => usersHttp.map((userHttp: UserHttp) => User.mapperUserHttpToUser(userHttp)))
      )
    return firstValueFrom(obsHttps$)
  }

  getById(id: number): Promise<User> {
    const obsHttps$ = this.http
      .get<UserHttp>(`${this.fullBaseUrlApi}/${id}`)
      .pipe(
        map((userHttp: UserHttp) => User.mapperUserHttpToUser(userHttp))
      )
    return firstValueFrom(obsHttps$)
  }

  deleteById(id: number): Promise<any> {
    const obsHttps$ = this.http
      .delete(`${this.fullBaseUrlApi}/${id}`)

    return firstValueFrom(obsHttps$)
  }


  add(userToAdd: UserForm): Promise<any> {
    const obsHttps$ = this.http
      .post(`${this.fullBaseUrlApi}/`, userToAdd)

    return firstValueFrom(obsHttps$)
  }

  edit(id: number, userEdited: UserForm): Promise<any> {
    const obsHttps$ = this.http
      .put(`${this.fullBaseUrlApi}/${id}`, userEdited)

    return firstValueFrom(obsHttps$)
  }
}
