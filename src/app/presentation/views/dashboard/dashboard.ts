import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { ImpactedAreas } from '../impacted-areas/impacted-areas';
import { FloodAnalysis } from '../flood-analysis/flood-analysis';
import { AboutUs } from '../about-us/about-us';
import { Settings } from '../settings/settings';
import { SIDE_MENU_ITEMS } from '../../models/MenuItem';
import { APP_ROUTES } from '../../../common/constants/routes.constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar,
    ImpactedAreas,
    FloodAnalysis,
    AboutUs,
    Settings
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  readonly sideMenuItems = SIDE_MENU_ITEMS;
  selectedItem: SIDE_MENU_ITEMS = SIDE_MENU_ITEMS.DASHBOARD;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const page = this.route.snapshot.paramMap.get('page');

    if (page && Object.values(SIDE_MENU_ITEMS).includes(page as SIDE_MENU_ITEMS)) {
      this.selectedItem = page as SIDE_MENU_ITEMS;
    } else {
      // default page
      this.selectedItem = SIDE_MENU_ITEMS.DASHBOARD;
      this.router.navigate([APP_ROUTES.HOME_WITHOUT_PARAM, this.selectedItem], { replaceUrl: true });
    }
  }

  // Called when a sidebar item is clicked
  onItemSelected(item: SIDE_MENU_ITEMS) {
    console.log("inside onItemSelected")
    this.selectedItem = item;
    this.router.navigate([APP_ROUTES.HOME_WITHOUT_PARAM, item]);
  }
}
