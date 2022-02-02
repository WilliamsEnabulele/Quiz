import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/Common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { QuizCategory } from '../models/quiz-category';
import { Question } from '../models/quiz-question-model';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private client: HttpClient
  ) { }


    getQuestions(category: number, difficulty: number ): Observable<Array<Question>> {
    return this.client
      .get<{results:Array<Question>}>(
        `${environment.BASE_URL + '?amount=10&category='+ category + '&difficulty='+ difficulty + '&type=multiple'}`
      ).pipe(map((questions) => {
        let result = [];
        if(Array.isArray(questions.results)){
          questions.results.forEach(question =>{
            result.push({...question, id: Guid.create()});
            question['incorrect_answers'].push(question['correct_answer']);
            question['incorrect_answers'].sort( () => .5 - Math.random());
          })
        }
        return result;
      }));
  }

  getCategories(){
    return this.client.get<{trivia_categories:Array<QuizCategory>}>(`${environment.BASE_URL}/api_category.php`)
    .pipe(
      map((categories) => {
        let result = [];
        if(Array.isArray(categories.trivia_categories)){
          categories.trivia_categories.forEach(category =>{
            result.push(category);
          })
        }
        return result;

      } )
    )
  }
  
}
