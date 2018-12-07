import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { SetUpService } from '../../shared/set-up.service';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss']
})
export class SetUpComponent implements OnInit {
  public datePickers: FormArray;

  constructor(private setUpService: SetUpService, private builder: FormBuilder, private router: Router) {}

  public ngOnInit() {
    this.datePickers = this.builder.array([moment()]);
  }

  public addDatePicker() {
    this.datePickers.push(new FormControl(null));
  }

  public save() {
    this.setUpService.save(this.datePickers.value).subscribe(() => this.router.navigate(['/dashboard']));
  }
}
