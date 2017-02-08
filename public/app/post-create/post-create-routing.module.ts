import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostCreateComponent } from './post-create.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'createpost', component: PostCreateComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PostCreateRoutingModule { }