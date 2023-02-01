import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

import { MENU_ITEMS } from '../../../pages/pages-menu';
import { MenuItemType } from '../../../@core/models/types';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  MENU_ITEM_TYPES = {
    HEADING: 'HEADING',
    DIVIDER: 'DIVIDER',
    SUB_MENU: 'SUB_MENU',
    SUB_MENU_LINK: 'SUB_MENU_LINK',
    MENU_LINK: 'MENU_LINK',
  };

  menuItems: MenuItemType[] = MENU_ITEMS;
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  getMenuItemType(item: MenuItemType): string {
    if (item.hasOwnProperty('heading')) {
      return this.MENU_ITEM_TYPES.HEADING;
    } else if (item.hasOwnProperty('divider')) {
      return this.MENU_ITEM_TYPES.DIVIDER;
    } else if (item.hasOwnProperty('children')) {
      return this.MENU_ITEM_TYPES.SUB_MENU;
    } else if (
      Object.keys(item).length === 2 &&
      item.hasOwnProperty('title') &&
      item.hasOwnProperty('route')
    ) {
      return this.MENU_ITEM_TYPES.SUB_MENU_LINK;
    } else {
      return this.MENU_ITEM_TYPES.MENU_LINK;
    }
  }

  /**
   * check route active or not
   */
  isActiveRoute(item: MenuItemType) {
    if (item.hasOwnProperty('children')) {
      const r = item.children?.find((i) => i?.route === this.currentRoute);
      return r && true;
    } else {
      return item.route === this.currentRoute;
    }
  }

  navigate(route: string = '/pages/dashboard') {
    this.router.navigateByUrl(route);
  }
}
