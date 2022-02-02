import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  pageSize:any;
  background = [
    'primary', 'secondary', 'dark', 
    'warning','primary', 'secondary', 
    'dark', 'warning','primary', 
    'secondary', 'dark', 'warning' 
  ]

  constructor(
    private service : QuizService
  ) { 
   this.pageSize = 4;
  }

  ngOnInit(): void {

    this.service.getCategories().subscribe({
      next: categories => {
        this.items = categories;
        console.log(this.items);
      },
      error: error =>{

      }
    })

    

  }
 
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

}
