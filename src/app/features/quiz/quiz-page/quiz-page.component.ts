import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/quiz-question-model';
import { QuizService } from 'src/app/services/quiz.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  welcomeForm!: FormGroup;
  difficulty: string;
  category: number;
  counter: number = 0;
  displayError: boolean = false;
  loading: boolean = false;
  questions: Array<Question> = [];
  question : Question;
  totalQuestions: number = 0;
  showQuestion: boolean = false;
  showForm : boolean = true;
  isUser: any;
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

    // Welcome Form Initialized
    this.welcomeForm = this.fb.group({
      name: ['', Validators.required],
      difficulty: ['', Validators.required]})
      
    // Check if User already in storage
      const isUser = this.storage.getData('user');
      if(isUser) {
        this.showForm = false;
        this.showQuestion = true;
        this.category = this.route.snapshot.params['id'];
        this.difficulty = isUser.difficulty;
        this.getQuestions();
      }
  }

  
  save(){
    this.welcomeForm.patchValue({category : this.category});
    this.difficulty = this.welcomeForm.value['difficulty'];
    this.storage.setData(this.welcomeForm.value, 'user');
    this.getQuestions();
    this.showQuestion = true;
    this.showForm = false;

  }

  getQuestions(){
    this.service.getQuestions(this.category, this.difficulty).subscribe({
      next: questions => {
        this.questions = questions;
        this.question = questions[this.counter];
        this.totalQuestions = questions.length-1;
        console.log(this.totalQuestions)
      },
      error: error => {

      }
    })
  }

  forward(){
    const count = this.questions.length-1;
    if(this.counter < count) {
      this.counter++;
      this.question = this.questions[this.counter];
      console.log(this.counter);
    }
    
  }
  
  backward(){
    const count = this.questions.length-1;
    if(this.counter !== 0) {
      this.counter--;
      this.question = this.questions[this.counter];
      console.log(this.counter);
    }
   
  }

  navigate(index){
    this.question = this.questions[index];
  }

}
