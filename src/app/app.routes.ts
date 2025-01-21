import { Routes } from '@angular/router';
import { AddObjectComponent } from './pages/add-object/add-object.component';
import { ObjectDetailsComponent } from './pages/object-details/object-details.component';

export const routes: Routes = [
  { path: '', component: AddObjectComponent },
  { path: 'details/:id', component: ObjectDetailsComponent },
];
