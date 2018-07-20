import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  questions: any = [
    ["What comes after 5?", 6],
    ["What comes after 10?", 11],
    ["How many toes do you have?", 10],
    ["What comes after 1?", 2]
  ]
  questionToDisplay: any[];
  userAnswer: number;
  userAnswerResults: string;

  constructor() { }

  ngOnInit() {
    this.getQuestion(); // get a new question once component is loaded. 
    this.userAnswer = null;
    this.userAnswerResults = '';
  }

  // Ask random question
  getQuestion():void {
    let randomNum = Math.floor(Math.random() * this.questions.length) // Get random index of question.
    this.questionToDisplay = this.questions[randomNum];
  }

  // Check if user's answer is correct. If it is, they win 1 coin.
  checkAnswer(){
    if (this.userAnswer == this.questionToDisplay[1]){
      console.log("User's guess: ", this.userAnswer, ", Correct answer: ", this.questionToDisplay[1]);
      this.userAnswerResults = "You won 1 shinto coin!"
      this.userAnswer = null;
      // go to service and increase total coin count.
    } else {
      this.userAnswerResults = "Try a different answer.";
      this.userAnswer = null;
    }
  }
}
