import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { environment } from '../../environment'

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.baseUrl
    }

    singIn(formData: any) {
        return firstValueFrom(this.httpClient.post(`${this.baseUrl}/auth/login`, formData));
    }

    isLogged(): boolean {
        return localStorage.getItem('singIn') === '1' ? true : false
    }

    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('singIn')
    }
}
