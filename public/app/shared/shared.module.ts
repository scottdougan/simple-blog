import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";

import { PostService } from './post-service/post.service';


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ MaterializeDirective ],
  exports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    MaterializeDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [PostService]
    };
  }
}