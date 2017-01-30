import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'posts', component: PostsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PostsRoutingModule { }