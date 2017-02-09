import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';

@Component({
  moduleId: module.id,
  selector: 'postview',
  templateUrl: './post-view.component.html'
})
export class PostViewComponent implements OnInit {
  errorMessage: string;
  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {}

  // routerOnActivate(curr: RouteSegment): void {
  //       let id = curr.getParam('id');
  //       this.postService.getPost(id)
  //                       .subscribe(
  //                          post => this.post = post,
  //                          error =>  this.errorMessage = <any>error);
  //   }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.postService.getPost(params['id']))
      .subscribe(
        post => this.post = post,
        error =>  this.errorMessage = <any>error);
  }

  goBack(): void {
    this.location.back();
  }

  deletePost(): void {
    this.postService.delete(this.post._id)
    .then(deleted => {
      if (deleted) {
        // Redirect back to the list
        this.router.navigate(['/posts']);
      }
    });
  }
}
