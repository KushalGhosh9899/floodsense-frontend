import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SIDE_MENU_ITEMS } from '../../../models/MenuItem';
import { CommonModule } from '@angular/common';
import { Dropdown } from '../../../../common/ui/dropdown/dropdown';
import { DropdownModel } from '../../../../common/ui/models/dropdown-model';
import { RegionViewModel } from '../../../../domain/viewmodels/RegionViewModel';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    Dropdown
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  readonly menuItems = SIDE_MENU_ITEMS;
  @Input({ required: true }) selectedItem!: SIDE_MENU_ITEMS;
  @Output() itemSelected = new EventEmitter<SIDE_MENU_ITEMS>();
  subRegions: number = 10
  description: string = 'Capital city of India'
  areaRegions: DropdownModel[] = []

  constructor(public vm: RegionViewModel) { }

  ngOnInit(): void {

    this.vm.loadRegions();

    this.vm.regions$.subscribe(regions => {

      if (regions.length > 0) {
        this.subRegions = regions[0].total_sub_regions
        this.description = regions[0].description

        this.areaRegions = regions.map(r => ({
          id: r.id,
          name: r.name + ', India'
        }));
      }
    });
  }

  selectItem(item: SIDE_MENU_ITEMS): void {
    this.itemSelected.emit(item);
  }
}
