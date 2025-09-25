import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LatLngTuple, Map, map, tileLayer, polygon, Polygon, TileLayer, Control } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

@Component({
  selector: 'app-impacted-areas',
  standalone: true,
  imports: [],
  templateUrl: './impacted-areas.html',
  styleUrl: './impacted-areas.css'
})
export class ImpactedAreas implements AfterViewInit {
  @ViewChild('map') mapElementRef!: ElementRef;

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
    this.addLegend();
  }

  private initializeMap(): void {
    const delhiCoords: LatLngTuple = [28.64, 77.28];
    const initialZoom = 12;

    this.map = map(this.mapElementRef.nativeElement).setView(delhiCoords, initialZoom);

    tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    }).addTo(this.map);

    tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ',
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

  private addLegend(): void {
    const legend = new Control({ position: 'topright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <div class="legend-toggle">
          <input type="checkbox" id="floodToggle" checked>
          <label for="floodToggle">Flood Impacted Zones</label>
        </div>
        <div class="legend-item">
          <i style="background:#00B8D9"></i> Flood Zone
        </div>
      `;

      // Prevent map clicks from bubbling to the map
      L.DomEvent.disableClickPropagation(div);
      return div;
    };

    legend.addTo(this.map);

    // Get the toggle input element from the created legend div
    const toggleInput = document.getElementById('floodToggle') as HTMLInputElement;
    if (toggleInput) {
      toggleInput.addEventListener('change', (event) => {
        this.toggleFloodLayers(toggleInput.checked);
      });
    }
  }

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
}