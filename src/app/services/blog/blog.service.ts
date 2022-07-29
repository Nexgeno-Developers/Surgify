import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    getBlogDetailsById(id: string) {
        return this.httpClient.get<any>(`${this.apiUrl + '/blogs/' + id}`)
    }

    getAllBlogs(limit: number) {
        let filters = {
            "offset": 0,
            "limit": limit,
            "skip": 0
        };
        let params = new HttpParams().append('filter', JSON.stringify(filters));
        return this.httpClient.get<any>(`${this.apiUrl + '/blogs'}`, { params });
    }
    getBlogsNotSlug(limit: number, slug: string) {
        let filters = {
            "offset": 0,
            "limit": limit,
            "skip": 0,
            "where": {
             "slug":{"neq": slug}
            }
          };
        let params = new HttpParams().append('filter', JSON.stringify(filters));
        return this.httpClient.get<any>(`${this.apiUrl + '/blogs'}`, { params });
    }

    getBlogDetailsBySlug(slug: string) {
        let params = new HttpParams().append('slug', slug);
        return this.httpClient.get<any>(`${this.apiUrl + '/blogs/find-by-slug'}`, { params })
    }
}