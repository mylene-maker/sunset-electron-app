import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User, UserForm} from "../../../models/user.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Country = User.Country;
import {BehaviorSubject, combineLatest, debounceTime, map, Observable} from "rxjs";
import {faEdit, faPlus, faRemove, faTrash} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{


  iconTrash: IconDefinition = faTrash;
  iconEdit: IconDefinition = faEdit;
  iconDetail: IconDefinition = faPlus;

  countries = Country

  users$?: Observable<User[]>

  //delete action
  selectedUserDeleteConfirmation?: User
  showDeleteSuccessToast: boolean = false

  // add or edit action
  selectedUserForEdition?: User;
  userForm?: FormGroup;

  private searchFilterText$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)


  constructor(private userService: UserService, private modalService: NgbModal, private fb: FormBuilder) {
  }

  ngOnInit (): void {
    this.users$ = this.getUsersFiltered()
  }
  onInputSearchFilter(evt: any) {
    const searchText = evt.target?.value
    this.searchFilterText$.next(searchText)
  }

  onClickAddUser(modalUserForm: any){
    this.initUserForm()
    const modal = this.modalService.open(modalUserForm)

    modal.result
      .then( ()=> {
        // Technique 1 fastidieuse
        // const userForm: UserForm = {
        //   email: this.userForm?.value.email,
        //   firstname: this.userForm?.value.firstname,
        //   lastname: this.userForm?.value.lastname,
        //   password: this.userForm?.value.password,
        //   country: 'France',
        //   roles: [{ id: 1}]
        // }

        // Technique 2 avec destructuration
        const userForm: UserForm = {
          ...this.userForm?.value,
          roles: [{ id: 1}]
        }
        console.log(userForm)

        this.userService
          .add(userForm)
          .then(() => {
            this.users$ = this.getUsersFiltered()
          })

      })
      .catch(() => {})
  }
  onClickEditUser(modalUserForm: any, userToEdit: User): void{
    this.initUserForm(userToEdit)

    this.selectedUserForEdition = userToEdit

    const modal = this.modalService.open(modalUserForm)
    modal.result
      .then( ()=> {

        const userForm: UserForm = {
          roles: userToEdit.roles,
          ...this.userForm?.value
        }
        console.log(userForm)

        this.userService
          .edit(userToEdit.id, userForm)
          .then(() => {
            this.users$ = this.getUsersFiltered()
            this.selectedUserForEdition = undefined
          })

      })
      .catch(() => {
        this.selectedUserForEdition = undefined
      })

  }

  onSubmitUserForm(modal: any) {

    if (this.userForm?.valid){
      modal.close()
    }
  }

  onClickDeleteUser(modalDeleteUser: any, user: User): void {
    this.selectedUserDeleteConfirmation = user

    const modal = this.modalService.open(modalDeleteUser)

    modal.result
      .then((choice) => {
      this.userService
        .deleteById(user.id)
        .then(() => {
          this.users$ = this.getUsersFiltered()
        })
        this.showDeleteSuccessToast = true
    })
      .catch(() => {})
  }

  private getUsersFiltered(): Observable<User[]> {
    return combineLatest([
      this.userService.getAll(),
      this.searchFilterText$
    ])
      .pipe(
        debounceTime(500),
        map(([users, searchText]) => {
          if(searchText) {
            return users.filter(u => u.firstname.toLowerCase().includes(searchText.toLowerCase()) || u.lastname.toLowerCase().includes(searchText.toLowerCase()))
          }
          return users
        })
      )
  }


  private initUserForm(userToEdit?: User): void{
    // un group est un ensemble de control
    // un control est lié a un champs html (x: input)
    // un control possede un tableau de deux index
    // index 0 la valeur par defaut
    // index 1 les validators
    this.userForm = this.fb.group({
      email: [userToEdit ? userToEdit.email : undefined, [ Validators.required, Validators.email]],
      lastname: [userToEdit ? userToEdit.lastname : undefined, [ Validators.required]],
      firstname: [userToEdit ? userToEdit.firstname : undefined, [ Validators.required]],
      street_number: [userToEdit ? userToEdit.street_number : undefined, [ Validators.required]],
      street_name: [userToEdit ? userToEdit.street_name : undefined, [ Validators.required]],
      zip_code: [userToEdit ? userToEdit.zip_code : undefined, [ Validators.required]],
      password: [undefined, [ Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':",.<>\/?]).{8,}$/)]],
      country: [userToEdit ? userToEdit.country : Country.FRANCE, [Validators.required]]
    })

  }



}
