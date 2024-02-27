import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataService } from './services';

@NgModule({
  imports: [CommonModule],
  providers: [MetadataService],
})
export class MetadataModule {}
