import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule {}
