import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoFormComponent } from './auto-form/auto-form.component';
import { MessageComponent } from './input-data/message.component';
import { MasterComponent } from './input-data/master.component';

const routes: Routes = [
  { path: '',          component: AutoFormComponent },
  { path: 'auto-form', component: AutoFormComponent },
  { path: 'message',   component: MessageComponent },
  { path: 'master',    component: MasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
