import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LatLngTuple, Map, map, tileLayer, polygon, Polygon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FloodUiModel } from '../../models/FloodUiModel';
import { FloodViewModel } from '../../../domain/viewmodels/FloodViewModel';

@Component({
  selector: 'app-impacted-areas',
  standalone: true,
  imports: [],
  templateUrl: './impacted-areas.html',
  styleUrl: './impacted-areas.css'
})
export class ImpactedAreas implements AfterViewInit {
  @ViewChild('map') mapElementRef!: ElementRef;
  @ViewChild('floodToggle') floodToggle!: ElementRef<HTMLInputElement>;

  public map!: Map;
  public waterLevel: number = 0;
  private floodLayers: Polygon[] = [];
  public floodZonesVisible: boolean = true; // State to manage toggle

  @Input() floodRegions: FloodUiModel[] = [];

  constructor(private vm: FloodViewModel) { }

  ngOnInit(): void {
    this.vm.loadFloodRegions({
      region_id: '220b1179-d614-49de-8019-d7ad0f444290',
      from_in_ddMMyyHHmmss: '190925121212',
      to_in_ddMMyyHHmmss: '200925201212'
    });

    this.vm.floodRegions$.subscribe(regions => {
      if (regions.length > 0) {
        this.floodRegions = regions;
      }
      this.addFloodRegions();
    });
  }
  ngAfterViewInit(): void {
    this.initializeMap();
    this.addToggleListener();
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

}