import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Map, map, tileLayer, polygon, Polygon, LatLngTuple, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PieChart } from './pie-chart/pie-chart';
import { FloodViewModel } from '../../../domain/viewmodels/FloodViewModel';
import { FloodUiModel } from '../../models/FloodUiModel';
import { ENVRIONMENT } from '../../../environment';

@Component({
  selector: 'app-flood-analysis',
  standalone: true,
  imports: [FormsModule, PieChart],
  templateUrl: './flood-analysis.html',
  styleUrl: './flood-analysis.css'
})
export class FloodAnalysis implements AfterViewInit {
  @ViewChild('map') mapElementRef!: ElementRef;
  @ViewChild('floodToggle') floodToggle!: ElementRef<HTMLInputElement>;
  totalSubRegions:number=30
  floodedSubRegions:number=0;

  public map!: Map;
  public floodZonesVisible: boolean = true;
  public waterLevel: number = 230;
  public floodRegions: FloodUiModel[] = [];

  private floodLayers: Polygon[] = [];
  private readonly regionId = ENVRIONMENT.DEFAULT_REGION_ID;

  constructor(private vm: FloodViewModel) {}

  ngAfterViewInit(): void {
    // Initialize map. This must happen before anything else.
    this.initializeMap();

    // Subscribe to flood regions data.
    // The polygons are added ONLY when new data arrives.
    this.vm.analyseFloodRegions$.subscribe(regions => {
      if (!this.map) return; // Defensive check
      this.floodRegions = regions;
      this.clearFloodLayers();
      this.addFloodRegions();
      this.floodedSubRegions = regions.length
    });

    // Add the toggle listener.
    this.addToggleListener();

    // Trigger the initial data load for the first time.
    // The subscription above will handle the polygon creation when data arrives.
    this.loadImpactAnalysis(this.waterLevel);
  }

  private initializeMap(): void {
    if (this.map) return; // Prevent re-initialization
    const delhiCoords: LatLngTuple = [28.64, 77.28];
    this.map = map(this.mapElementRef.nativeElement).setView(delhiCoords, 12);

    tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 16 }
    ).addTo(this.map);

    tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      maxZoom: 16,
      opacity: 0.75
    }).addTo(this.map);
  }

  private addFloodRegions(): void {
    // Check if the map is valid before trying to add layers to it
    if (!this.map || !this.floodRegions || this.floodRegions.length === 0) return;

    const bounds = new LatLngBounds([]);

    this.floodRegions.forEach(region => {
      const coords: LatLngTuple[] = region.coordinates.map(([lng, lat]) => [lat, lng]);
      coords.forEach(coord => bounds.extend(coord));

      const floodLayer = polygon(coords, {
        color: '#00B8D9',
        weight: 2,
        fillColor: '#00B8D9',
        fillOpacity: 0.5
      }).addTo(this.map).bindPopup(`<b>${region.name}</b><br>${region.description || ''}`);

      this.floodLayers.push(floodLayer);
    });

    if (bounds.isValid()) this.map.fitBounds(bounds);
  }

  private clearFloodLayers(): void {
    if (!this.map) return; // Ensure map exists before removing layers
    this.floodLayers.forEach(layer => {
      if (this.map.hasLayer(layer)) this.map.removeLayer(layer);
    });
    this.floodLayers = [];
  }

  private addToggleListener(): void {
    if (!this.floodToggle) return;
    this.floodToggle.nativeElement.addEventListener('change', () => {
      this.toggleFloodLayers(this.floodToggle.nativeElement.checked);
    });
  }

  public toggleFloodLayers(show: boolean): void {
    this.floodZonesVisible = show;
    this.floodLayers.forEach(layer => show ? layer.addTo(this.map) : this.map.removeLayer(layer));
  }

  public onWaterLevelChange(): void {
    // This correctly re-triggers the data fetch when the slider changes.
    this.loadImpactAnalysis(this.waterLevel);
  }

  private loadImpactAnalysis(level: number): void {
    this.vm.loadFloodImpact({
      region_id: this.regionId,
      water_levels_in_meters: level
    });
  }
}