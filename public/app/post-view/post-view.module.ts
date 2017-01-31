import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewComponent } from './post-view.component';
import { PostViewRoutingModule } from './post-view-routing.module';


@NgModule({
  imports: [CommonModule, PostViewRoutingModule],
  declarations: [PostViewComponent],
  exports: [PostViewComponent]
})
export class PostViewModule { }