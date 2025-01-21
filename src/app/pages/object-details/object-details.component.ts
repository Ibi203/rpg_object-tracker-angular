import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObjectService } from '../../services/object.service';

@Component({
  selector: 'app-object-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
  object: any;
  private objectService = inject(ObjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  objects = this.objectService.getObjects();

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.object = this.objects.find(obj => obj.id === id);
      if (!this.object) {
        this.router.navigate(['/']);
      }
    });
  }

  hasNextObject(): boolean {
    const currentIndex = this.objects.findIndex(obj => obj.id === this.object.id);
    return currentIndex < this.objects.length - 1;
  }

  getNextObjectId(): number | null {
    const currentIndex = this.objects.findIndex(obj => obj.id === this.object.id);
    if (currentIndex < this.objects.length - 1) {
      return this.objects[currentIndex + 1].id;
    }
    return null;
  }

  hasPreviousObject(): boolean {
    const currentIndex = this.objects.findIndex(obj => obj.id === this.object.id);
    return currentIndex > 0;
  }

  getPreviousObjectId(): number | null {
    const currentIndex = this.objects.findIndex(obj => obj.id === this.object.id);
    if (currentIndex > 0) {
      return this.objects[currentIndex - 1].id;
    }
    return null;
  }

  getRarityColor(type: string): string {
    return this.objectService.getRarityColor(type);
  }
}
