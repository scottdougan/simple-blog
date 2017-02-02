import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Post } from './post';


@Injectable()
export class PostService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private postsUrl = 'http://localhost:4000/posts';  

  constructor(private http: Http) { }

  getPosts(): Promise<Post[]> {
    return this.http.get(this.postsUrl)
               .toPromise()
               .then(response => response.json().posts as Post[])
               .catch(this.handleError);
  }

  getPost(id: number): Promise<Post> {
    return this.getPosts()
               .then(posts => posts.find(post => post.id === id));
  }

  search(term: string): Observable<Post[]> {
    return this.http
               .get(`${this.postsUrl}/?postTitle=${term}`)
               .map(response => response.json().posts as Post[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
