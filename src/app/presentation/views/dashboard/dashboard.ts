import { Component, OnInit } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { MenuItem, SIDE_MENU_ITEMS } from '../../models/MenuItem';
import { ImpactedAreas } from "../impacted-areas/impacted-areas";
import { CommonModule } from '@angular/common';
import { FloodAnalysis } from '../flood-analysis/flood-analysis';
import { AboutUs } from '../about-us/about-us';
import { Settings } from "../settings/settings";

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Sidebar,
    ImpactedAreas,
    FloodAnalysis,
    AboutUs,
    Settings
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  selectedItem: SIDE_MENU_ITEMS = SIDE_MENU_ITEMS.DASHBOARD;
  readonly sideMenuItems = SIDE_MENU_ITEMS;

  // Method to handle an item selection from the sidebar
  onItemSelected(item: SIDE_MENU_ITEMS): void {
    this.selectedItem = item;
  }
}
