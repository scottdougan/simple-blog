import { Component, OnInit } from '@angular/core';

import { Post }         from './shared/post-service/post';
import { PostService }  from './shared/post-service/post.service';

@Component({
    selector: 'app',
    template: `
    <section class="sample-app-content">
        <nav>
            <a routerLink="/home" routerLinkActive="active">Home</a>
            <a routerLink="/posts" routerLinkActive="active">Posts</a>
        </nav>
        <router-outlet></router-outlet>
    </section>
    `
})
export class AppComponent { 
  posts: Post[] = [];

  constructor(private postService: PostService) { }
}