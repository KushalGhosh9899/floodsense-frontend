import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
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
}
