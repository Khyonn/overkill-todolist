import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule, ReactiveFormsModule],
  exports: [NotFoundComponent, HttpClientModule, MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
