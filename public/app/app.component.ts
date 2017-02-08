import { Component } from '@angular/core';


@Component({
    selector: 'app',
    template: `
    <section class="sample-app-content">
        <nav>
            <a routerLink="/home" routerLinkActive="active">Home</a>
            <a routerLink="/createpost" routerLinkActive="active">Create Post</a>
            <a routerLink="/posts" routerLinkActive="active">All Posts</a>
        </nav>
        <router-outlet></router-outlet>
    </section>
    `
})
export class AppComponent { 
}