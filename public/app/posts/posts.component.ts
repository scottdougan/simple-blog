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
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  errorMessage: string;
  posts: Post[];
  private searchTerms = new Subject<string>();
  private postSearchoObservable: Observable<Post[]>
  selectedPost: Post;
  private limitOptions = [
    {value:5,name:"5"},
    {value:10,name:"10"},
    {value:20,name:"20"}
  ];
  private selectedLimit = 5;


  constructor(
    private postService: PostService,
    private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.getPosts();
    this.postSearchoObservable = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        const query = {
          searchTitle: term,
          limit:  this.selectedLimit
        }
        return this.postService.search(query)
      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Post[]>([]);
      });

      this.postSearchoObservable.subscribe(
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
