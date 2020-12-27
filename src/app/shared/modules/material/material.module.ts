import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
  ],
})
export class MaterialModule {}
