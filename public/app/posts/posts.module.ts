import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [CommonModule, PostsRoutingModule, SharedModule],
  declarations: [PostsComponent],
  exports: [PostsComponent]
})
export class PostsModule { }