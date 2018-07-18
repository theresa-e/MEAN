import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTask: any;
  allTasks: any;
  editTask: any;
  constructor(private _tasksService: TasksService) { }

  // On page load
  ngOnInit() {
    this.newTask = { title: "", description: "" }
    this.getTasks();
  }


  onSubmit() {
    console.log('newTask: ', this.newTask)
    this.createTask(this.newTask)
    this.newTask = { title: "", description: "" }
    this.getTasks();
  }

  // Prepopulate the edit task form. 
  getEditTask(id: string) {
    console.log("Edit task button was clicked.");
    let observable = this._tasksService.findbyID(id);
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      this.editTask = res['foundTask'];
    })
    this.getTasks();

  }

  // Update task based on form input.
  updateTask(id: string) {
    let observable = this._tasksService.editTask(id, this.editTask)
    observable.subscribe(res => {
      console.log('Response from service: ', res);
    })
    this.getTasks();
  }

  // Display all tasks when user clicks a button.
  getTasks(): void {
    let observable = this._tasksService.getTasks();
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      this.allTasks = res['tasks'];
    })
    this._tasksService.getTasks();
  }

  // Display task description based on id
  showDetails(id: string): void {
    let observable = this._tasksService.findbyID(id);
    observable.subscribe(res => {
      console.log('Response from service: ', res);
      if (res.message == "Success") {
        this.taskById = res['foundTask'];
      }
    })
    this.getTasks();
  }

  // Create a new task
  createTask(task: any): void {
    let observable = this._tasksService.createTask(task);
    observable.subscribe(res => {
    });
    this.getTasks();
  }

  // Delete task
  deleteTask(id: string): void {
    console.log('DELETE ID: ', id)
    let observable = this._tasksService.deleteTask(id);
    observable.subscribe(res => {
      console.log('Deleted task.')
    });
    this.getTasks();
  }
}
