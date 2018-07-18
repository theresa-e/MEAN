import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  tasks = [];
  taskById = [];
  constructor(private _tasksService: TasksService){}

  // Display all tasks when user clicks a button.
  getTasks(): void{
    console.log('Button was clicked.')
    let observable = this._tasksService.getTasks();
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      this.tasks = res['tasks'];
    })
    this._tasksService.getTasks();
  }

  // Display task description based on id
  showDetails(id: string): void{
    console.log('Show detail button was clicked.');
    console.log(`TASK ID: ${id}`);
    let observable = this._tasksService.findbyID(id);
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      if (res.message == "Success"){
        this.taskById = res['foundTask'];
      }
    })
  }

}
