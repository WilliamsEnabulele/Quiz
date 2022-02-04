import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { UserResponse } from '../../../models/user-answers-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  result = Array<UserResponse>();
  user = [];
  score : number = 0;
  count : number = 0;
  show: boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.result = this.storage.getData("responses");
    this.user = this.storage.getData("user");
    console.log(this.result);

    this.count = this.result.length;
    this.score = this.result.filter(x => x.is_correct == true).length
  
  }

showReview() {
  this.show = !this.show;
}

playAgain() {
  this.storage.removeData("responses");
  this.storage.removeData("user");
  this.router.navigate(['/'])
}

}
