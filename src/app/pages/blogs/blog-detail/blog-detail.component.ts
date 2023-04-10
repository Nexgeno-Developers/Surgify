import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogId: string = '';
  myData: any;
  blogData: any;
  loading = false;
  otherBlogs:any[] = [];

  constructor(private route: ActivatedRoute,
    private blogService: BlogService,private sanitizer: DomSanitizer) {
    this.loading = true;

    this.route.params.subscribe((params: any) => {
      this.blogId = params.id;
      this.blogService.getBlogDetailsBySlug(this.blogId).subscribe((data) => {
        this.loading = false;
        this.blogData = data;
        this.myData= this.sanitizer.bypassSecurityTrustHtml(data?.content);
      }, (err) => {
        this.loading = false;
      });
      this.blogService.getBlogsNotSlug(4, this.blogId).subscribe((blogs: any) => {
        this.loading = false;
        this.otherBlogs = blogs;
      }, (err) => {
        this.loading = false;
      });

    });
  }

  ngOnInit(): void {
  }

}
