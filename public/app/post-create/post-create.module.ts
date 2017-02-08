import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent }     from './post-create.component';
import { PostCreateRoutingModule } from './post-create-routing.module';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PostCreateRoutingModule
   ],
  declarations: [PostCreateComponent],
  exports: [PostCreateComponent]
})
export class PostCreateModule { }