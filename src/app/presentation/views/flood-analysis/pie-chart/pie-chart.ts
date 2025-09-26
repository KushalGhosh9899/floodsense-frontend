import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export class PieChart implements OnChanges {
  @Input({ required: true }) totalRegions: number = 10;
  @Input({ required: true }) floodedRegions: number = 0;

  public unfloodedRegions: number = 0;
  public floodedPercentage: number = 0;
  public unfloodedPercentage: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate percentages whenever inputs change
    this.unfloodedRegions = this.totalRegions - this.floodedRegions;
    this.calculatePercentages();
  }

  private calculatePercentages(): void {
    if (this.totalRegions > 0) {
      this.floodedPercentage = (this.floodedRegions / this.totalRegions) * 100;
      this.unfloodedPercentage = (this.unfloodedRegions / this.totalRegions) * 100;
    } else {
      this.floodedPercentage = 0;
      this.unfloodedPercentage = 0;
    }
  }
}