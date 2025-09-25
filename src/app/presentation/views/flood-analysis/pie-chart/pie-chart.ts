import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export class PieChart implements OnInit {
  @Input({required:true}) totalRegions: number = 10;
  @Input({required:true}) floodedRegions: number = 6;
  unfloodedRegions: number = 0;

  public floodedPercentage: number = 0;
  public unfloodedPercentage: number = 0;

  ngOnInit(): void {
    this.unfloodedRegions = this.totalRegions - this.floodedRegions
    this.calculatePercentages();
  }

  private calculatePercentages(): void {
    this.floodedPercentage = (this.floodedRegions / this.totalRegions) * 100;
    this.unfloodedPercentage = (this.unfloodedRegions / this.totalRegions) * 100;
  }
}