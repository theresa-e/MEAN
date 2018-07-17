import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private _tasks: HttpClient) {
  }

  getTasks(){
    return this._tasks.get('/tasks');
  }

  findbyID(id: string){
    return this._tasks.get('/tasks/' + id);
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
