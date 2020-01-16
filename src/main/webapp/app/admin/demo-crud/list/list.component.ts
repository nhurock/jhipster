import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LANGUAGES } from 'app/core/language/language.constants';
import { DemoCRUDService } from '../demo-crud.service';

@Component({
  selector: 'jhi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users!: any[];

  user!: any;
  languages = LANGUAGES;
  authorities: string[] = ['ROLE_USER', 'ROLE_ADMIN'];
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [],
    langKey: [],
    authorities: []
  });

  constructor(private demoCRUDService: DemoCRUDService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    const body: any = {
      body: {
        login: 'user2'
      }
    };
    this.demoCRUDService.fetch(body).subscribe(res => {
      this.users = res.body.page.content;
    });
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== undefined) {
      this.demoCRUDService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.demoCRUDService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  selectUser(user: any): void {
    // eslint-disable-next-line no-console
    console.log('updateUser: ', user);

    if (user) {
      this.updateForm(user);
    }
  }

  private updateForm(user: any): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      langKey: user.langKey,
      authorities: user.authorities
    });
  }

  private updateUser(user: any): void {
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.langKey = this.editForm.get(['langKey'])!.value;
    user.authorities = this.editForm.get(['authorities'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
