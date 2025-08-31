import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:3000/api/v1'

    constructor(private http : HttpClient) {}

    signUp(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/users`, data)
    }

    login(data : any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, data)
    }
}