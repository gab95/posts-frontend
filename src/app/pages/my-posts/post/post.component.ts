import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../../shared/models/posts.interface';
import { MyPostsService } from '../my-posts.service';
import { BaseFormPost } from '../../../shared/utils/base-form-post';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  formTitle: string;
  buttonLabel: string;

  post: Post;

  imageToUpload: File;
  imageTemp: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: MyPostsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      if (params['id'] !== 'new-post') {
        this.formTitle = 'Edit Post';
        this.buttonLabel = 'Update';
        this.getPostById(+params['id']);
      } else {
        this.formTitle = 'New Post';
        this.buttonLabel = 'Upload';
      }
    });
  }

  getPostById(id: number) {
    this.postService.getPostById(id).subscribe((resp: any) => {
      this.post = resp;
      console.log(this.post);
    });
  }

  cambiarImagen(file: File) {
    this.imageToUpload = file;

    if (!file) {
      return (this.imageTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };
  }

  uploadPost(caption: string) {
    this.postService
      .uploadNewPost(this.imageToUpload, caption)
      .subscribe((resp: any) => {
        Swal.fire('New Post Uploaded!', resp.msg, 'success');
        this.router.navigate(['/my-posts']);
      });
  }
}
