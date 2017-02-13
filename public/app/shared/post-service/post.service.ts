import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Post } from './post';


@Injectable()
export class PostService {
  private api = 'http://localhost:4000';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${this.api}/posts`)
               .map(response => response.json().posts as Post[])
  }

  getPost(id: string): Observable<Post> {
    return this.http
               .get(`${this.api}/posts/${id}`)
               .map(response => response.json().posts as Post);
  }

  search(term: string): Observable<Post[]> {
    let params = new URLSearchParams();
    if (term) {
      params.append('search', term);
    }  

    const options = new RequestOptions({
      headers: this.headers,
      search: params
    });

    return this.http.get(`${this.api}/posts/`, options)
               .map(response => response.json().posts as Post[]);
  }

  create(post: Post): Promise<Post> {
    return this.http
               .post(`${this.api}/create`, JSON.stringify({post: post}), {headers: this.headers})
               .toPromise()
               .then(res => res.json().post as Post)
               .catch(this.handleError);
  }

  delete(id: string): Promise<Boolean> {
    return this.http
               .delete(`${this.api}/posts/${id}`)
               .toPromise()
               .then(res => {
                 console.log(res);
                 if (res.status == 200) {
                   return true;
                 }
                 return false;
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
