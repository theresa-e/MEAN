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
    return this._tasks.delete('/tasks/' + id);
  }

  createTask(task: any){
    return this._tasks.post('/tasks', task);
  }

  editTask(id: string, task: any){
    return this._tasks.put('/tasks/'+ id, task)
  }
  
}
