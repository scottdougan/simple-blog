import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Post }         from '../shared/post-service/post';
import { PostService }  from '../shared/post-service/post.service';


@Component({
  moduleId: module.id,
  selector: 'posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;
  private searchTerms = new Subject<string>();
  selectedPost: Post;

  constructor(
    private postService: PostService,
    private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.posts = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()   
      .switchMap(term => this.postService.search(term))
      .catch(error => {
        // TODO: Add real error handling
        console.log(error);
        return Observable.of<Post[]>([]);
      });
  }

  ngAfterViewInit(){
    this.search(""); // Init the list of posts
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPost.id]);
  }
}
