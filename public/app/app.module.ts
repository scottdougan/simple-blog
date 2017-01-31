import { NgModule }       from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { HomeModule } from './home/home.module';
import { PostsModule } from './posts/posts.module';
import { PostViewModule } from './post-view/post-view.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule, 
    JsonpModule,
    AppRoutingModule,
    HomeModule,
    PostsModule,
    PostViewModule,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }