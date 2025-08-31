import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api/user'

    constructor(private http : HttpClient) {}

    signUp(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/userSignUp`, data)
    }

    login(data : any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, data)
    }
}