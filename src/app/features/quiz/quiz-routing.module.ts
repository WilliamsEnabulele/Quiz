import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizLayoutComponent } from 'src/app/_layouts/quiz-layout/quiz-layout.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

const routes: Routes = [
  { 
    path: '',
    component: QuizLayoutComponent,
    children: [
      { path: '', redirectTo: 'quiz', pathMatch: 'full' },
      { path: 'quiz', component: QuizPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
