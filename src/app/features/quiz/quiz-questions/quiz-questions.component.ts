import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss']
})
export class QuizQuestionsComponent implements OnInit {

  @Input() question ;
  @Output() selectedOption = new EventEmitter();

  letters = new Array<string>("A", "B", "C", "D", "E", "F");

  constructor() { }

  sendSelectedOption(option: string){
    this.selectedOption.emit(option);
  }
  ngOnInit(): void {
  }




}
