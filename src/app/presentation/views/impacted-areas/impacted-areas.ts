import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LatLngTuple, Map, map, tileLayer, polygon } from 'leaflet';

@Component({
  selector: 'app-impacted-areas',
  imports: [],
  templateUrl: './impacted-areas.html',
  styleUrl: './impacted-areas.css'
})
export class ImpactedAreas implements AfterViewInit {
  @ViewChild('map') mapElementRef: ElementRef = null!;

  public map: Map = null!;

  // ✅ Mock flood regions for Delhi
  floodRegions = [
    {
      name: 'East Delhi',
      description: 'Flood impacted near Yamuna river',
      coordinates: [
        [
          77.275,
          28.64
        ],
        [
          77.29,
          28.64
        ],
        [
          77.29,
          28.65
        ],
        [
          77.275,
          28.65
        ],
        [
          77.275,
          28.64
        ]
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
    // Initialize map centered on Delhi
    this.map = map(this.mapElementRef.nativeElement).setView([28.64, 77.28], 12);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Draw polygons for flood regions
    this.floodRegions.forEach(region => {
      const leafletCoords: LatLngTuple[] = region.coordinates.map(
        (c: number[]) => [c[1], c[0]] as LatLngTuple // flip [lng, lat] → [lat, lng]
      );

      polygon(leafletCoords, { color: 'red' })
        .addTo(this.map)
        .bindPopup(`<b>${region.name}</b><br>${region.description}`);
    });
  }
}