import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/Common/http';
import { environment } from 'src/environments/environment';
import { QuizResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private client: HttpClient
  ) { }

  read(){
    return this.client.get<Array<QuizResponse>>(`${environment.BASE_URL}`)
  }
}
