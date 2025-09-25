import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  // General Settings
  theme: 'dark' = 'dark';
  defaultView: 'dashboard' = 'dashboard';
  units: 'metric' = 'metric';

  // Map Settings
  basemapStyle: 'minimalist' = 'minimalist';
  layers = {
    floodPolygons: true,
    roads: true,
    boundaries: false,
    pointsOfInterest: false
  };

  // Notification Settings
  emailAlerts: boolean = true;
  pushNotifications: boolean = true;


  constructor() { }
}
