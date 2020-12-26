import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [MatCardModule, MatCheckboxModule, MatListModule, MatToolbarModule],
  exports: [MatCardModule, MatCheckboxModule, MatListModule, MatToolbarModule],
})
export class MaterialModule {}
