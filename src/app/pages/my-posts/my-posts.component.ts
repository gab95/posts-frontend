import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/models/posts.interface';
import { AuthService } from '../auth/auth.service';
import { MyPostsService } from './my-posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    public authService: AuthService,
    private myPostsService: MyPostsService
  ) {}

  ngOnInit(): void {
    this.getAllPostFromOtherUsers();
  }

  getAllPostFromOtherUsers() {
    this.myPostsService
      .getAllPostFromLoggedInUsers()
      .subscribe((resp: Post[]) => {
        this.posts = resp;
        console.log(this.posts);
      });
  }
}
