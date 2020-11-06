import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { HomeService } from './home.service';

import { Post } from '../../shared/models/posts.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    public authService: AuthService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.getAllPostFromOtherUsers();
  }

  getAllPostFromOtherUsers() {
    this.homeService.getAllPostsFromOtherUsers().subscribe((resp: Post[]) => {
      this.posts = resp;
      console.log(this.posts);
    });
  }
}
