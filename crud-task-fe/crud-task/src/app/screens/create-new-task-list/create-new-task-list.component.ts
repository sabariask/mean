import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../task.service';
import { TaskListModel } from '../../models/taskListModel';

@Component({
  selector: 'app-create-new-task-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './create-new-task-list.component.html',
  styleUrl: './create-new-task-list.component.scss',
})
export class CreateNewTaskListComponent implements OnInit {
  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  addNewTaskList(title: string) {
    if (title) {
      this.taskService
        .createTaskList(title)
        .subscribe((data: TaskListModel) => {
          this.router.navigate(['/task-list', data._id]);
        });
    } else {
      alert('Title cannot be empty');
      return;
    }
  }
}
