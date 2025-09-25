import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Detail } from './detail/detail';
import { MenuItem } from '../../models/MenuItem';

@Component({
  selector: 'app-dashboard',
  imports: [
    Sidebar,
    Detail
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  // Mock data for the menu items
  menuItems: MenuItem[] = [
    { id: 1, title: 'Dashboard', details: 'A summary of your recent activities and metrics.' },
    { id: 2, title: 'Analytics', details: 'Detailed reports and data visualizations.' },
    { id: 3, title: 'Settings', details: 'Configure application settings and user preferences.' },
  ];

  selectedItem: MenuItem | null = null;

  // Method to handle an item selection from the sidebar
  onItemSelected(item: MenuItem): void {
    this.selectedItem = item;
  }
}
