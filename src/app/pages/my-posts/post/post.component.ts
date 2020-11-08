import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../../shared/models/posts.interface';
import { MyPostsService } from '../my-posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: MyPostsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      // console.log(params['id']);

      if (params['id'] === 'new-post') {
      } else {
        this.getPostById(+params['id']);
      }
    });
  }

  getPostById(id: number) {
    this.postService.getPostById(id).subscribe((resp: any) => {
      this.post = resp;
      console.log(this.post);
    });
  }

  updatePost() {}
}
