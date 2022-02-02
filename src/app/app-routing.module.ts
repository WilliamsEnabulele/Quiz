import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { GeneralLayoutComponent } from './_layouts/general-layout/general-layout.component';

const routes: Routes = [ {
  path: '',
  component: GeneralLayoutComponent,
  children: [
    { path: '', redirectTo: '/', pathMatch: 'full'},
    { path:'', component: LandingComponent}
  ]
},
{
  path: 'quiz',
  loadChildren: () => import('./features/quiz/quiz.module').then((m)=>m.QuizModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
