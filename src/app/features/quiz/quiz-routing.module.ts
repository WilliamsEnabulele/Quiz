import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizLayoutComponent } from 'src/app/_layouts/quiz-layout/quiz-layout.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

const routes: Routes = [
  { 
    path: '',
    component: QuizLayoutComponent,
    children: [
      { path: '', redirectTo: 'quiz', pathMatch: 'full' },
      { path: 'quiz:id', component: QuizPageComponent },
      { path: 'result', component: QuizResultComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
