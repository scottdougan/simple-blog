import { Component }                          from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';

@Component({
  moduleId: module.id,
  selector: 'postcreate',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      author: ['', Validators.required ],
      title: '',
      post: ''
    });
  }

  savePost(value: any){
    console.log(value);
  }
}