import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Post } from './posts.model';

@Injectable()
export class PostService {
    private postsUrl = 'https://llamaface-api.herokuapp.com/posts'
    private auth_header = {headers: new HttpHeaders().set('x-auth', localStorage.getItem('currentUser'))}

    constructor(private http: HttpClient) {}    
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postsUrl);
    }

    getPost(id: string): Observable<Post> {
        const url = `${this.postsUrl}/${id}`;
        return this.http.get<Post>(url);
    }

    getUserPosts(id: string): Observable<Post[]> {
        const url = `${this.postsUrl}/user/${id}`;
        return this.http.get<Post[]>(url);
    }

    deleteUserPosts(id: string): Observable<Post[]> {
        const url = `${this.postsUrl}/user/${id}`;
        return this.http.delete<Post[]>(url);
    }

    createPost(post : Post) {
        let url = this.postsUrl;
        return this.http.post<Post>(url, post);
    }

    deletePost(id: string): Observable<Post> {
        let url = `${this.postsUrl}/${id}`;
        return this.http.delete<Post>(url);
    }
}