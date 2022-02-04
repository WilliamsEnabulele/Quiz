import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/quiz-question-model';
import { UserResponse } from 'src/app/models/user-answers-model';
import { QuizService } from 'src/app/services/quiz.service';
import { StorageService } from 'src/app/services/storage.service';
import { QuizCategory } from 'src/app/models/quiz-category';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  welcomeForm!: FormGroup;
  difficulty: string;
  categoryId: number;
  current: number = 0;
  displayError: boolean = false;
  loading: boolean = false;
  questions: Array<Question> = [];
  question : Question;
  totalQuestions: number = 0;
  showQuestion: boolean = false;
  showForm : boolean = true;
  isUser: any;
  get fc() { return this.welcomeForm.controls; }
  userResponse: UserResponse;
  userResponses: Array<UserResponse> = [];
  selectedOption: string;
  categories: Array<QuizCategory> = [];
  categoryName: string;


  constructor( 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private service: QuizService,
    private router: Router
     ) { 
    // get route parameter
    this.categoryId = this.route.snapshot.params['id'];
    
  }

  ngOnInit(): void {

    // Welcome Form Initialized
    this.welcomeForm = this.fb.group({
      name: ['', Validators.required],
      difficulty: ['easy', Validators.required]})
      
    // Check if User already in storage
      const isUser = this.storage.getData('user');
      if(isUser) {
        this.showForm = false;
        this.showQuestion = true;
        this.categoryId = this.route.snapshot.params['id'];
        this.difficulty = isUser.difficulty;
        this.getQuestions();
      }
  }

  
  save(){
    this.welcomeForm.patchValue({categoryId : this.categoryId});
    this.difficulty = this.welcomeForm.value['difficulty'];
    this.storage.setData(this.welcomeForm.value, 'user');
    this.getQuestions();
    this.showQuestion = true;
    this.showForm = false;

  }

  getQuestions(){
    this.service.getQuestions(this.categoryId, this.difficulty).subscribe({
      next: questions => {
        this.questions = questions;
        this.question = questions[this.current];
        this.totalQuestions = questions.length;
        console.log(this.totalQuestions)
      },
      error: error => {
        // To do
      }
    })
  }

  // Controls

  forward(){

    this.selectedOption = "";
    if(this.current + 1 < this.totalQuestions) {
      this.current++;
      this.question = this.questions[this.current];
    }
    else {
      this.storage.setData(this.userResponses, "responses")
      this.router.navigate(['/quiz/result']);
    }
    
  }
  
  backward(){

    if(this.current !== 0) {
      this.current--;
      this.question = this.questions[this.current];
    }
   
  }

  navigate(index){
    this.current = index;
    this.question = this.questions[index];
   
  }

  

  selectedAnswer(
    id: string ,
    question: string, 
    answer: string,
    correct_answer: string){
    var is_correct;
    if(answer === correct_answer){is_correct = true;}
    else{is_correct = false;}
    this.userResponse = {id,question,answer,correct_answer,is_correct}
    this.userResponses.push(this.userResponse);
    this.forward();

  }

  getSelectedOption(event){
    this.selectedOption = event;
  }

}
