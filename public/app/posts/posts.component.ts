import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';

@Component({
  moduleId: module.id,
  selector: 'posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;

  constructor(
    private postService: PostService,
    private router: Router) { }

  getPosts(): void {
    this.postService
      .getPosts()
      .then(posts => this.posts = posts);
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.create(name)
  //     .then(hero => {
  //       this.heroes.push(hero);
  //       this.selectedHero = null;
  //     });
  // }

  // delete(hero: Hero): void {
  //   this.heroService
  //       .delete(hero.id)
  //       .then(() => {
  //         this.heroes = this.heroes.filter(h => h !== hero);
  //         if (this.selectedHero === hero) { this.selectedHero = null; }
  //       });
  // }

  ngOnInit(): void {
    this.getPosts();
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPost.id]);
  }
}
