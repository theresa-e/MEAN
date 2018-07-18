import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() taskToShow: any; // @Input decorator allows child to use variable from parent (app component)
  constructor() { }

  ngOnInit() {
  }

}
