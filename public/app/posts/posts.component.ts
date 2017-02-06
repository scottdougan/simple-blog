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
  errorMessage: string;
  posts: Post[];
  private searchTerms = new Subject<string>();
  private postSearchoOservable: Observable<Post[]>
  selectedPost: Post;

  constructor(
    private postService: PostService,
    private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.getPosts();
    this.postSearchoOservable = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.postService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Post[]>([]);
      });

      this.postSearchoOservable.subscribe(
         posts => this.posts = posts,
         error =>  this.errorMessage = <any>error);
  }

  getPosts() {
    this.postService.getPosts()
                    .subscribe(
                       posts => this.posts = posts,
                       error =>  this.errorMessage = <any>error);
  }

  onSelect(post: Post): void {
    this.router.navigate(['/posts', post._id]);
  }
}
