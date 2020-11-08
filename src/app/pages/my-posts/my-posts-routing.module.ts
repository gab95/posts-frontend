import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPostsComponent } from './my-posts.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', component: MyPostsComponent },
  { path: ':id', component: PostComponent },
  { path: 'new-post', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPostsRoutingModule {}
