import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPostsRoutingModule } from './my-posts-routing.module';
import { MyPostsComponent } from './my-posts.component';
import { MaterialModule } from '../../material.module';

import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [MyPostsComponent, PostComponent],
  imports: [CommonModule, MaterialModule, MyPostsRoutingModule],
})
export class MyPostsModule {}
