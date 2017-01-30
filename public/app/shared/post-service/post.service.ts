import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private PostsUrl = 'http://localhost:4000/posts';  

  constructor(private http: Http) { }

  getPosts(): Promise<Post[]> {
    return this.http.get(this.PostsUrl)
               .toPromise()
               .then(response => response.json().posts as Post[])
               .catch(this.handleError);
  }

  getPost(id: number): Promise<Post> {
    return this.getPosts()
               .then(posts => posts.find(post => post.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
