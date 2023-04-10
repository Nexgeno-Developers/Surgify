import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  isLoading = true;
  blogsList = [];
  selectedBlog: any;
  showDetail = false;
  searchText = null;
  searchedText = null;
  totalBlogs = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.blogService.getAllBlogs(100).subscribe((blogs) => {
      this.isLoading = false;
      this.blogsList = blogs;
      this.totalBlogs = blogs;
    }, (err) => {
      this.isLoading = false;
    })
  }


  selectBlog(blog: any) {
    this.selectedBlog = blog;
    this.showDetail = true;
  }

  search() {
    this.searchedText = this.searchText;
    let filteredList = this.totalBlogs.filter((blog: any) => {
      return (blog.content.indexOf(this.searchText) != -1 || blog.tags.indexOf(this.searchText) != -1)
    });
    this.blogsList = filteredList;

  }


}
