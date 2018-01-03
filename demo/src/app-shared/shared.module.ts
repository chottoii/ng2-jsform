import { NgModule } from '@angular/core';

import { UtilityService } from './utility/utility.service';
import { JsonReadService } from './utility/json-read.service';

import { CustomMaterialModule } from '../lib/';

@NgModule({
  imports:      [
    CustomMaterialModule
  ],
  declarations: [
  ],
  exports:      [
  ],
  providers:    [
    UtilityService,
    JsonReadService
  ]
})
export class SharedModule { }
