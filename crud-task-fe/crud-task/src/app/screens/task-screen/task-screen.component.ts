import {
  ChangeDetectorRef,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import { TaskListModel } from '../../models/taskListModel';
import { TaskModel } from '../../models/taskModel';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrl: './task-screen.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class TaskScreenComponent implements OnInit {
  taskLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId: string = '';

  constructor(
    private taskService: TaskService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService
      .getAllTaskLists()
      .subscribe((allTaskLists: TaskListModel[]) => {
        this.taskLists = allTaskLists;
        // Get the first list id and route to it on page load
        // this.router.navigate(['task-list', this.taskLists[0]['_id']]);
      });
    this.activeRoute.params.subscribe((params: Params) => {
      this.taskListId = params['taskListId'];
      if (this.taskListId) {
        this.getAllTasks(this.taskListId);
      }
    });
  }

  taskClicked(task: TaskModel) {
    this.taskService.updateTaskStatus(task._taskListId, task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  deleteTask(task: TaskModel) {
    this.taskService
      .deleteATaskInsideATaskList(task._taskListId, task._id)
      .subscribe(() => {
        this.tasks = this.tasks
          .filter((t) => {
            t._id !== task._id;
          })
          .slice();
      });
  }

  deleteTaskList(taskList: TaskListModel) {
    this.taskService.deleteTaskList(taskList._id).subscribe(() => {
      this.taskLists = this.taskLists.filter((t) => t._id !== taskList._id);
    });
  }

  getAllTasks(taskListId: string) {
    this.taskService
      .getAllTaskForATaskList(taskListId)
      .subscribe((tasks: TaskModel[]) => {
        this.tasks = tasks;
      });
  }

  addNewTask() {
    if (this.taskListId) {
      //route the user to add task screen for the selected task-list
      this.router.navigate(['./new-task'], { relativeTo: this.activeRoute });
    } else {
      alert('Please select a task list');
      return;
    }
  }
}
