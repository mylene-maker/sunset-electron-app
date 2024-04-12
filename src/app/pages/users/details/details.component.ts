import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {faCheck, faClock, faLocation} from "@fortawesome/free-solid-svg-icons";
import {Command} from "../../../models/command.model";
import {CommandService} from "../../../services/command/command.service";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  user$?: Promise<User>
  commands$?: Promise<Command[]>

  iconCheck : IconDefinition = faCheck;
  iconWait : IconDefinition = faClock;

  constructor(private userService: UserService, private router: Router,
              private route: ActivatedRoute, private commandService: CommandService) {
  }

  ngOnInit(): void {
    // correspond au :id que l'on a mis dans le app-routing.module.ts
    const id = this.route.snapshot.paramMap.get('id')
    if (id){
      this.user$ = this.userService.getById(parseInt(id))
    }else {
      this.router.navigateByUrl('/not-found')
    }
    this.commands$ = this.commandService.getAll()

  }

    protected readonly faLocation = faLocation;
    protected readonly faCheck = faCheck;

}
