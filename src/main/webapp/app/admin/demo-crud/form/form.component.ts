import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  constructor(private _NgbActiveModal: NgbActiveModal) {}

  ngOnInit(): void {}

  get activeModal(): NgbActiveModal {
    return this._NgbActiveModal;
  }
}
