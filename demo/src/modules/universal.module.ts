import { NgModule } from '@angular/core';

import { LogService } from './logger/log.service';
import { StorageService } from './storage/storage.service';

@NgModule({
  imports:      [ ],
  declarations: [
  ],
  exports:      [
  ],
  providers:    [
    LogService,
    StorageService
  ]
})
export class UniversalModule { }
