import { NgModule }       from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app-routing.module';
import { MaterializeDirective } from 'angular2-materialize';

import { HomeModule } from './home/home.module';
import { PostsModule } from './posts/posts.module';
import { PostViewModule } from './post-view/post-view.module';
import { PostCreateModule } from './post-create/post-create.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule, 
    JsonpModule,
    // My modules
    AppRoutingModule,
    HomeModule,
    PostsModule,
    PostViewModule,
    PostCreateModule,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MaterializeDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }