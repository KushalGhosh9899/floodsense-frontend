import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Polygon, LatLngTuple, tileLayer, polygon, Map, map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PieChart } from './pie-chart/pie-chart';

@Component({
  selector: 'app-flood-analysis',
  imports: [
    FormsModule,
    PieChart
  ],
  templateUrl: './flood-analysis.html',
  styleUrl: './flood-analysis.css'
})
export class FloodAnalysis implements AfterViewInit {
  @ViewChild('map') mapElementRef!: ElementRef;
  @ViewChild('floodToggle') floodToggle!: ElementRef<HTMLInputElement>;

  public map!: Map;
  public waterLevel: number = 0;
  private floodLayers: Polygon[] = [];
  public floodZonesVisible: boolean = true; // State to manage toggle

  // Mock flood regions for Delhi
  floodRegions = [
    {
      name: 'East Delhi',
      description: 'Flood impacted near Yamuna river',
      coordinates: [
        [77.275, 28.64],
        [77.29, 28.64],
        [77.29, 28.65],
        [77.275, 28.65],
        [77.275, 28.64]
      ]
    },
    {
      name: 'Shahdara',
      description: 'Residential & market area',
      coordinates: [
        [77.270, 28.670],
        [77.290, 28.670],
        [77.290, 28.685],
        [77.270, 28.685],
        [77.270, 28.670]
      ]
    },
    {
      name: 'Mayur Vihar',
      description: 'Residential neighborhood',
      coordinates: [
        [77.310, 28.600],
        [77.325, 28.600],
        [77.325, 28.615],
        [77.310, 28.615],
        [77.310, 28.600]
      ]
    }
  ];

  ngAfterViewInit(): void {
    this.initializeMap();
    this.addFloodRegions();
    this.addToggleListener();
  }

  private initializeMap(): void {
    const delhiCoords: LatLngTuple = [28.64, 77.28];
    const initialZoom = 12;

    this.map = map(this.mapElementRef.nativeElement).setView(delhiCoords, initialZoom);

    tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    }).addTo(this.map);

    tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      maxZoom: 16,
      opacity: 0.75
    }).addTo(this.map);
  }

  private addFloodRegions(): void {
    this.floodRegions.forEach(region => {
      const leafletCoords: LatLngTuple[] = region.coordinates.map(
        (c: number[]) => [c[1], c[0]] as LatLngTuple
      );

      const floodLayer = polygon(leafletCoords, {
        color: '#00B8D9',
        weight: 2,
        fillColor: '#00B8D9',
        fillOpacity: 0.5
      })
        .addTo(this.map)
        .bindPopup(`<b>${region.name}</b><br>${region.description}`);

      this.floodLayers.push(floodLayer);
    });
  }

  private addToggleListener(): void {
    if (this.floodToggle) {
      this.floodToggle.nativeElement.addEventListener('change', () => {
        this.toggleFloodLayers(this.floodToggle.nativeElement.checked);
      });
    }
  }

  // Existing function to toggle layers
  public toggleFloodLayers(show: boolean): void {
    this.floodZonesVisible = show;
    this.floodLayers.forEach(layer => {
      if (show) {
        if (!this.map.hasLayer(layer)) {
          layer.addTo(this.map);
        }
      } else {
        if (this.map.hasLayer(layer)) {
          this.map.removeLayer(layer);
        }
      }
    });
  }

  public onWaterLevelChange(): void {
    console.log('New water level:', this.waterLevel, 'm');
    // Implement logic here to change flood zone opacity or visibility
    this.updateFloodLayerVisibility(this.waterLevel);
  }

  // New method to update layer visibility based on water level
  private updateFloodLayerVisibility(level: number): void {
    // Example logic:
    // If water level is above a certain threshold, change opacity.
    const opacity = level / 10; // Simple linear scale
    this.floodLayers.forEach(layer => {
      layer.setStyle({ fillOpacity: opacity });
    });
  }

}
