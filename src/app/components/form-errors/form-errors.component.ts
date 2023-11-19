import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  @Input() group?: UntypedFormGroup;
  @Input() controlLabel?: string;
  @Input() controlName?: string;

  control?: UntypedFormControl;

  constructor() {
  }

  ngOnInit(): void {

    if (this.group && this.controlName) {
      this.control = this.group.controls[this.controlName] as UntypedFormControl;
    }

  }

}
