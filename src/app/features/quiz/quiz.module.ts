import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';


@NgModule({
  declarations: [
    QuizPageComponent,
    QuizQuestionsComponent,
    QuizResultComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuizModule { }
