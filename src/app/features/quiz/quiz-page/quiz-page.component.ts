import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { captureRejections } from 'events';
import { QuizService } from 'src/app/services/quiz.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  welcomeForm!: FormGroup;
  difficulty: number;
  category: number;
  counter: number;

  get fc() { return this.welcomeForm.controls; }

  constructor( 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private service: QuizService
     ) { 
    // get route parameter
    this.category = this.route.snapshot.params['id'];
    
  }

  ngOnInit(): void {

    this.welcomeForm = this.fb.group({
      
      name: ['', Validators.required],
      difficulty: ['', Validators.required]

  })
  }

  save(){
    this.difficulty = this.welcomeForm['difficulty'].value;
    this.storage.setData(this.welcomeForm.value, 'user');
  }

  getQuestions(){
    this.service.getQuestions(this.category, this.difficulty).subscribe({
      next: questions => {

      },
      error: error => {

      }
    })
  }

  forward(){
    this.counter++;
  }
  
  backward(){
    this.counter--;
  }

}
