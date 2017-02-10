import { Component } from '@angular/core';


@Component({
    selector: 'app',
    template: `
      <section class="sample-app-content">
          <nav>
            <div class="nav-wrapper">
              <a href="#" class="brand-logo right">Simple Blog</a>
              <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
                <li><a routerLink="/create" routerLinkActive="active">Create</a></li>
                <li><a routerLink="/posts" routerLinkActive="active">All Posts</a></li>
              </ul>
            </div>
          </nav>
          <router-outlet></router-outlet>
      </section>
    `
})
export class AppComponent { 
}