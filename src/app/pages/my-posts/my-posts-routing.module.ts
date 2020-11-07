import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPostsComponent } from './my-posts.component';

const routes: Routes = [{ path: '', component: MyPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPostsRoutingModule { }
