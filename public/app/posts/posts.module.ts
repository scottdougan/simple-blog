import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  imports: [CommonModule, PostsRoutingModule],
  declarations: [PostsComponent],
  exports: [PostsComponent]
})
export class PostsModule { }