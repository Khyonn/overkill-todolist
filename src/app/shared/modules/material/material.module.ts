import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [MatCardModule, MatListModule, MatToolbarModule],
  exports: [MatCardModule, MatListModule, MatToolbarModule],
})
export class MaterialModule {}
