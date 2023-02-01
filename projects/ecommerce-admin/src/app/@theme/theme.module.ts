import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

// layouts
import { HeaderComponent, FooterComponent, SideMenuComponent } from './layouts';

export const LAYOUTS = [HeaderComponent, FooterComponent, SideMenuComponent];

@NgModule({
  declarations: [...LAYOUTS],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [...LAYOUTS],
})
export class ThemeModule {}
