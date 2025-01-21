import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObjectService, RARITY_COLORS } from '../../services/object.service';

@Component({
  selector: 'app-add-object',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css'],
})
export class AddObjectComponent {
  name = '';
  type = 'common'; 
  value: number | undefined;

  objectTypes = [
    'common',
    'uncommon', 
    'rare',
    'epic',
    'legendary'
  ];

  private objectService = inject(ObjectService);
  objects = this.objectService.getObjects();

  constructor() {}

  getRarityColor(type: string): string {
    return this.objectService.getRarityColor(type);
  }

  addObject(): void {
    if (this.name) {
      this.objectService.addObject(this.name, this.type, this.value);
      this.name = '';
      this.type = 'common'; 
      this.value = undefined;
    }
  }
}
