import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private _tasks: HttpClient) {
    this.getTasks();
    this.deleteTask('5b490591bea31e2edd8784f0'); // for now, pass in ID manually
    this.createTask({
      title: 'Test task',
      description: 'Test descript',
    })
  }

  getTasks(){
    return this._tasks.get('/tasks'); 
  }

  deleteTask(id: string){ // no need to say public/private outside of constructor
    const tempObservable = this._tasks.delete('/tasks/' + id);
    tempObservable.subscribe(res => console.log('Deleted :', res));
  }

  createTask(task: any){
    const tempObservable = this._tasks.post('/tasks', task);
    tempObservable.subscribe(res => console.log('Created :', res));
  }

}
