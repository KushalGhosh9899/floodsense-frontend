import { Component, Input } from '@angular/core';
import { MenuItem } from '../../../models/MenuItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {
  @Input() selectedItem: MenuItem | null = null;
}
