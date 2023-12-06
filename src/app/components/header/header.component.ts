import {Component, OnInit} from '@angular/core';
import {faCalendar, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  // isConnected: boolean = false
  isConnected$?: Observable<boolean>

  iconHome: IconDefinition = faHouse
  iconSignOut: IconDefinition = faUser
  iconCalendar: IconDefinition = faCalendar

  // Il est excecuté une fois a la creation du composant
  constructor(private authService: AuthService, private router: Router) {
  }

  // il est executé a chaque fois que le composant est affiché
  ngOnInit(): void {
    // solution 1
    // const cbExecuteEachTimeNewTokenNexted = (token: string | undefined) => {
    //   this.isConnected = Boolean(token)
    // }
    // this.authService
    //   .token$
    //   .subscribe(cbExecuteEachTimeNewTokenNexted)

    //solution 3
    //operer une transformation d'une string vers un boolean
    this.isConnected$ = this.authService
      .token$
      .pipe(
        map((token: string | undefined) => Boolean(token))
      )

  }

  onClickSignOut() {
    this.authService.signOut()
    this.router.navigateByUrl('/auth/signin')
  }
}
