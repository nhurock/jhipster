import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/core/language/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  collapedSideBar: boolean | undefined;

  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  swaggerEnabled?: boolean;
  version: string;

  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private titleService: Title,
    private router: Router,
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe(() => this.updateTitle());

    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  receiveCollapsed($event: any): void {
    this.collapedSideBar = $event;
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  onLogin(): void {
    this.loginModalService.open();
  }

  onLogout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  onChangeLanguage(event: string): void {
    this.sessionStorage.store('locale', event);
    this.languageService.changeLanguage(event);
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
