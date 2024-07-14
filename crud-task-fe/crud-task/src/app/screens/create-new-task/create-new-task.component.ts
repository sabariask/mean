import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TaskModel } from '../../models/taskModel';

@Component({
  selector: 'app-create-new-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './create-new-task.component.html',
  styleUrl: './create-new-task.component.scss'
})
export class CreateNewTaskComponent {

  taskListId:string = '';
  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.taskListId = params['taskListId'];
    })
  }

  ngOnInit(): void {}

  addNewTask(title: string) {
    if (title) {
      this.taskService
        .createTaskInsideATaskList(this.taskListId, title)
        .subscribe((data: TaskModel) => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        });
    } else {
      alert('Title cannot be empty');
      return;
    }
  }
}
