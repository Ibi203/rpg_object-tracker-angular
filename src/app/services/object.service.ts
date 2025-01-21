import { Injectable } from '@angular/core';

export const RARITY_COLORS = {
  common: '#9d9d9d',     
  uncommon: '#1eff00',   
  rare: '#0070dd',      
  epic: '#a335ee', 
  legendary: '#ff8000'   
};

export interface RPGObject {
  id: number;
  name: string;
  type: string;
  value?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  
  private objects: RPGObject[] = [];
  private readonly STORAGE_KEY = 'rpg-objects';

  constructor() {
    this.loadObjects();
  }

  private loadObjects(): void {
    const savedObjects = localStorage.getItem(this.STORAGE_KEY);
    if (savedObjects) {
      this.objects = JSON.parse(savedObjects);
    }
  }

  private saveObjects(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.objects));
  }

  getObjects(): RPGObject[] {
    return this.objects;
  }

  getObjectById(id: number): RPGObject | undefined {
    return this.objects.find(obj => obj.id === id);
  }

  addObject(name: string, type: string, value?: number): void {
    const newId = this.objects.length > 0 
      ? Math.max(...this.objects.map(obj => obj.id)) + 1 
      : 1;

    this.objects.push({
      id: newId,
      name,
      type,
      value
    });

    this.saveObjects();
  }

  deleteObject(id: number): void {
    this.objects = this.objects.filter(obj => obj.id !== id);
    this.saveObjects();
  }

  updateObject(updatedObject: RPGObject): void {
    const index = this.objects.findIndex(obj => obj.id === updatedObject.id);
    if (index !== -1) {
      this.objects[index] = updatedObject;
      this.saveObjects();
    }
  }

  getRarityColor(type: string): string {
    return RARITY_COLORS[type as keyof typeof RARITY_COLORS] || RARITY_COLORS.common;
  }
}
