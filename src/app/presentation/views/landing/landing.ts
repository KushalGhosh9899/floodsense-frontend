import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SIDE_MENU_ITEMS } from '../../models/MenuItem';
import { APP_ROUTES } from '../../../common/constants/routes.constants';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  constructor(private router: Router) { }
  projectName = 'FloodSense'; // You can define your project name here

  features = [
    {
      icon: 'assets/analytics.svg', // Updated with dark-friendly Undraw SVGs
      title: 'Real-time Monitoring',
      description: 'Stay updated with live flood impact data and critical alerts.'
    },
    {
      icon: 'assets/analysis.svg',
      title: 'Advanced Flood Analysis',
      description: 'Simulate scenarios with a water level slider to predict future impact.'
    },
    {
      icon: 'assets/flood_analysis.svg',
      title: 'Proactive Planning',
      description: 'Empower communities with actionable insights for better preparedness.'
    },
  ];

  moveToDashboard() {
    this.router.navigate(['home/', SIDE_MENU_ITEMS.DASHBOARD]);
  }
}
