import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonService, EncriptionService } from '../../../@core/services';
import { TOKENS } from '../../../keys';
import { UserType } from '../../../@core/models/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSideMenuCollapse: boolean = false;
  user!: UserType;

  constructor(private es: EncriptionService, private cs: CommonService) {}

  ngOnInit(): void {
    // get user
    this.user = this.es.response_decript(localStorage.getItem(TOKENS.userData) || '') as UserType;
    // console.log(this.user);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  toogleSideBar(): void {
    if (!this.isSideMenuCollapse) {
      // collapse
      this.collapse();
    } else {
      // expand
      this.expand();
    }

    this.isSideMenuCollapse = !this.isSideMenuCollapse;
  }

  expand() {
    const leftPaneEl = document.getElementById('left-pane');
    const headerEl = document.getElementById('header');

    leftPaneEl?.classList.remove('menu-collapse');
    headerEl?.classList.remove('menu-collapse');
  }

  collapse() {
    const leftPaneEl = document.getElementById('left-pane');
    const headerEl = document.getElementById('header');

    leftPaneEl?.classList.add('menu-collapse');
    headerEl?.classList.add('menu-collapse');
  }

  logout(): void {
    this.cs.logOut();
  }

  onWindowResize(e: any) {
    if (window.innerWidth < 1200) {
      if (!this.isSideMenuCollapse) {
        this.collapse();
        this.isSideMenuCollapse = true;
      }
    } else {
      if (this.isSideMenuCollapse) {
        this.expand();
        this.isSideMenuCollapse = false;
      }
    }
  }
}
