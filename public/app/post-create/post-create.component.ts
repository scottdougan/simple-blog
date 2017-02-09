import { Component }                          from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }            from '@angular/router';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';

@Component({
  moduleId: module.id,
  selector: 'postcreate',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      author: ['', Validators.required ],
      title: '',
      post: ''
    });
  }

  savePost(value: any): void {
    let post = new Post();
    post = {
      _id: '',
      date: new Date(),
      author: value.author,
      title: value.title,
      post: value.post
    };

    this.postService.create(post)
    .then(post => {
      // Redirect to the new post
      this.router.navigate(['/posts', post._id]);
    });
  }

  goToSelect(post: Post): void {
    this.router.navigate(['/posts', post._id]);
  }
}