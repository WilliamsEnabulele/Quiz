import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from 'src/app/route.guard';
import { QuizLayoutComponent } from 'src/app/_layouts/quiz-layout/quiz-layout.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

const routes: Routes = [
  { 
    path: '',
    component: QuizLayoutComponent,
    children: [

      { path: '', redirectTo: 'quiz/:id', pathMatch: 'full' },
      { 
        path: 'quiz/:id', 
        component: QuizPageComponent
      
      },
      { 
        path: 'result', 
        component: QuizResultComponent,
        canActivate: [RouteGuard]
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
