import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';

@Component({
  moduleId: module.id,
  selector: 'postview',
  templateUrl: './post-view.component.html'
})
export class PostViewComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.postService.getPost(+params['id']))
    //   .subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }
}
