import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SIDE_MENU_ITEMS } from '../../../models/MenuItem';
import { Dropdown } from '../../../../common/ui/dropdown/dropdown';
import { DropdownModel } from '../../../../common/ui/models/dropdown-model';
import { RegionViewModel } from '../../../../domain/viewmodels/RegionViewModel';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, Dropdown],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit, OnChanges {
  readonly menuItems = SIDE_MENU_ITEMS;

  @Input({ required: true }) selectedItem!: SIDE_MENU_ITEMS;
  @Output() itemSelected = new EventEmitter<SIDE_MENU_ITEMS>();

  subRegions: number = 10;
  description: string = 'Capital city of India';
  areaRegions: DropdownModel[] = [];

  constructor(public vm: RegionViewModel, private router: Router) { }

  ngOnInit(): void {
    this.vm.loadRegions();
    this.vm.regions$.subscribe(regions => {
      if (regions.length > 0) {
        this.subRegions = regions[0].total_sub_regions;
        this.description = regions[0].description;
        this.areaRegions = regions.map(r => ({
          id: r.id,
          name: `${r.name}, India`
        }));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // This ensures the sidebar updates its highlighted item when parent updates selectedItem
    if (changes['selectedItem'] && !changes['selectedItem'].firstChange) {
      this.selectedItem = changes['selectedItem'].currentValue;
    }
  }

  selectItem(item: SIDE_MENU_ITEMS): void {
    this.selectedItem = item
    this.itemSelected.emit(item);
    this.router.navigate(['/home', item]);
  }
}
