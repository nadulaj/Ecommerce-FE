import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  currentRoutes: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // get current route
    this.currentRoutes = this.router.url.split('/').slice(2);
    // console.log(this.currentRoutes);
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
