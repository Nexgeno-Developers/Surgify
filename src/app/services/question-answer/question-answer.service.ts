import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QuestionAnswerService {
    private apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    postQuestion(question: any) {
        return this.httpClient.post<any>(`${this.apiUrl + '/question-answers'}`, question);
    }

    getQuestionsBySurgery() {
        let filters = {
            "offset": 0,
            "limit": 100,
            "skip": 0
        };
        let params = new HttpParams().append('filters', JSON.stringify(filters));
        return this.httpClient.get<any>(`${this.apiUrl + '/question-answers'}`, { params });
    }

    getQuestionsBySurgeryId(surgeryId: string, searchText: string) {
        let filters = {
            "offset": 0,
            "limit": 100,
            "skip": 0
        };
        let params = new HttpParams().append('filters', JSON.stringify(filters));
        if (searchText) {
            params = params.append('searchText', searchText);
        }

        if (surgeryId) {
            params = params.append('id', surgeryId);
        }

        return this.httpClient.get<any>(`${this.apiUrl + '/question-answers/find-qa'}`, { params });
    }
}