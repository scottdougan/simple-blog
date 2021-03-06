import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostViewComponent } from './post-view.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'posts/:id', component: PostViewComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PostViewRoutingModule { }