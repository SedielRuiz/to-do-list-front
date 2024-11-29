import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { environment } from '../../environment'

@Injectable({
    providedIn: 'root'
})
export class ToDoListService {

    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = `${environment.baseUrl}/to-do-list`
    }

    getToDoList(filters: any = {}): Promise<any> {
        let params = new HttpParams()
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                params = params.set(key, filters[key])
            }
        }
        return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/all`, { params: params }))
    }

    create(formData: any): Promise<any> {
        return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/create`, formData))
    }

    update(id: number, formData: any): Promise<any> {
        return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/update/${id}`, formData))
    }

    delete(id: number): Promise<any> {
        return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/${id}`))
    }
}
