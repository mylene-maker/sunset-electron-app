import { Injectable } from '@angular/core';
import {firstValueFrom, map, Observable} from "rxjs";
import {Command, CommandHttp} from "../../models/command.model";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private baseUrlApi: string =  environment.API_URL
  private resourceName: string = 'commands'

  private fullBaseUrlApi: string
  constructor(private http: HttpClient) {
    this.fullBaseUrlApi = this.baseUrlApi + this.resourceName
  }

  getAll(): Promise<Command[]> {
    const obsHttps$ = this.http
      .get<CommandHttp[]>(`${this.fullBaseUrlApi}/`)
      .pipe(
        map((commandsHttp: CommandHttp[]) => commandsHttp.map((commandHttp: CommandHttp) => Command.mapperCommandHttpToCommand(commandHttp)))
      )
    console.log(firstValueFrom(obsHttps$))
    return firstValueFrom(obsHttps$)
  }


}
