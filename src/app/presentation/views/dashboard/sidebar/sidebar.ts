import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/MenuItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() menuItems: MenuItem[] = [];
  @Input() selectedItemId: number | undefined = undefined;
  @Output() itemSelected = new EventEmitter<MenuItem>();

  selectItem(item: MenuItem): void {
    this.itemSelected.emit(item);
  }
}
