/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'jhi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() languages: any[] = [];
  @Input() isAuthenticated: boolean = false;
  @Output() login = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();
  @Output() changeLanguage = new EventEmitter<any>();

  public pushRightClass: string = '';

  constructor(public router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit(): void {
    this.pushRightClass = 'push-right';
  }

  onLogin(): void {
    this.login.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }

  onChangeLanguage(languageKey: string): void {
    this.changeLanguage.emit(languageKey);
  }

  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar(): void {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr(): void {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }
}
