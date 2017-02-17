import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterializeDirective } from "angular2-materialize";


@NgModule({
  imports: [CommonModule],
  declarations: [ MaterializeDirective ],
  exports: [
    CommonModule, 
    MaterializeDirective]
})
export class SharedModule {
}