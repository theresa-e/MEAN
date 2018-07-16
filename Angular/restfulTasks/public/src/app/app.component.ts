import { Component } from '@angular/core';
import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  tasks = [];
  constructor(private _tasksService: TasksService){}

  ngOnInit(){
    this.getTaskFromService();
  }

  getTaskFromService(){
    let observable = this._tasksService.getTasks();
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      this.tasks = res['tasks'];
    })
    this._tasksService.getTasks();
  }
}
