import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent { 
  errorMessage: string;
  posts: Post[] = [];

  constructor(
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
                    .subscribe(
                       posts => this.posts = posts.slice(1, 5),
                       error =>  this.errorMessage = <any>error);
  }

  onSelect(post: Post): void {
    this.router.navigate(['/posts', post._id]);
  }
}