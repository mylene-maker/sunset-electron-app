import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {LocalStorageManagerService} from "../local-storage-manager/local-storage-manager.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // des flux qu'on peut observer et sur lesquels on peut subscribe (s'enregistrer / soiuscrire)

  // 3 types de subjects
  // - Subject: pipe dans lequel transite l'info
  // - BihaviorSubject: subject + conserve la derniere valeur qui a été envoyée dans le pipe (getter pour recup la derniere donnée
  // - ReplaySubject: bihaviorSubject avec un historique variable (entre 1 et x valeurs dans l'historique

  // Observalbe vs Subject
  // Subject => lecture + ecriture
  // Observable => écriture

  //permet la lecture et l'ecriture
  private internalToken$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)

  token$: Observable<string | undefined> = this.internalToken$.asObservable()

  private baseUrlApi: string =  environment.API_URL
  private resourceName: string = 'security'
  constructor(private http: HttpClient, private localStorageManagerService: LocalStorageManagerService) {
    const token = this.localStorageManagerService.getData(environment.LOCAL_STORAGE.TOKEN)
    this.internalToken$.next(token)
  }

  // return la derniere valeur nexter dans le subject
  get token(): string | undefined {
    return this.internalToken$.value
  }

  signIn(email: string, password: string, keepConnexion: boolean): Promise<void | string>{
    const obsHttp$ = this.http.post<{token:string}>(`${this.baseUrlApi}${this.resourceName}/auth`, {email, password})
    return firstValueFrom(obsHttp$) // transforme observable en promesse
      .then((res: {token: string}) => {
        this.internalToken$.next( res.token )
        console.log(keepConnexion)
        if (keepConnexion){
          this.localStorageManagerService.saveData(environment.LOCAL_STORAGE.TOKEN, res.token)
        }
      })

  }

  signOut() {
      this.internalToken$.next(undefined)
      this.localStorageManagerService.removeData(environment.LOCAL_STORAGE.TOKEN)
  }
}
