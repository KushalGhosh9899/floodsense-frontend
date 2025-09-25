import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SIDE_MENU_ITEMS } from '../../../models/MenuItem';
import { CommonModule } from '@angular/common';
import { Dropdown } from '../../../../common/ui/dropdown/dropdown';
import { DropdownModel } from '../../../../common/ui/models/dropdown-model';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    Dropdown
],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  readonly menuItems = SIDE_MENU_ITEMS;
  @Input({ required: true }) selectedItem!: SIDE_MENU_ITEMS;
  @Output() itemSelected = new EventEmitter<SIDE_MENU_ITEMS>();
  areaRegions:DropdownModel[] = [
    {
      id: '12121',
      name: 'Delhi, India'
    },
    {
      id: '121212',
      name: 'Mumbai, India'
    }
  ]

  selectItem(item: SIDE_MENU_ITEMS): void {
    this.itemSelected.emit(item);
  }
}
