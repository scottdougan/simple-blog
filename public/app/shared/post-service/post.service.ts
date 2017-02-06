import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Post } from './post';


@Injectable()
export class PostService {
  private postsUrl = 'http://localhost:4000/posts';  

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
               .map(response => response.json().posts as Post[])
  }

  getPost(id: string): Observable<Post> {
    return this.http
               .get(`${this.postsUrl}/${id}`)
               .map(response => response.json().posts as Post);
  }

  search(term: string): Observable<Post[]> {
    return this.http
               .get(`${this.postsUrl}/?title=~${term}`)
               .map(response => response.json().posts as Post[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
