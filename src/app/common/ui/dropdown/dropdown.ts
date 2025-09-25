import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownModel } from '../models/dropdown-model';

@Component({
  selector: 'app-dropdown',
  imports: [
    CommonModule
  ],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown implements OnInit{
  isOpen: boolean = false;
  @Input({ required: true }) areas!: DropdownModel[];
  @Output() selectedOption: EventEmitter<DropdownModel> = new EventEmitter<DropdownModel>();
  currentSelectedOption!: DropdownModel;

  ngOnInit(): void {
    this.currentSelectedOption = this.areas[0]
  }

  // Toggles the dropdown's open/closed state
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // Updates the selected value and closes the dropdown
  selectArea(option: DropdownModel): void {
    this.currentSelectedOption = option
    this.selectedOption.emit(option);
    this.isOpen = false;
  }
}
