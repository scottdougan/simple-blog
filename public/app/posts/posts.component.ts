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
  private searchQuery = new Subject();
  private currentSearchTitle = '';
  private limitOptions = [
    {value:5,name:"5"},
    {value:10,name:"10"},
    {value:20,name:"20"}
  ];
  private selectedLimit = this.limitOptions[0];

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  search(title: string): void {
    this.currentSearchTitle = title;

    const query = {
      searchTitle: title,
      limit:  this.selectedLimit.value
    }
    this.searchQuery.next(query);
  }

  limitChange(newLimit: any) {
    this.selectedLimit = newLimit;

    const query = {
      searchTitle: this.currentSearchTitle,
      limit:  newLimit.value
    };
    this.searchQuery.next(query);
  }

  ngOnInit(): void {
    this.searchQuery
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(query => {
        if (query.hasOwnProperty('searchTitle') && query['searchTitle'].length == 0) {
          delete query['searchTitle']; // Don't send an empty searchTitle
        }
        return this.postService.search(query)
      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Post[]>([]);
      })
      .subscribe(
        posts => this.posts = posts,
        error =>  this.errorMessage = <any>error
      );

      this.searchQuery.next({
        limit:  this.selectedLimit.value
      });
  }

  onSelect(post: Post): void {
    this.router.navigate(['/posts', post._id]);
  }
}
