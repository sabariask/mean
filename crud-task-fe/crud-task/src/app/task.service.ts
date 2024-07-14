import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import { TaskModel } from './models/taskModel';
import { TaskListModel } from './models/taskListModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  // To fetch all the task list
  getAllTaskLists():Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists('tasklists');
  }

  getAllTasks(taskListId:string):Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  // Create a task list bucket
  createTaskList(title:string):Observable<TaskListModel>{
    let data = {'title': title};
    return this.apiConfigService.post('tasklists', data);
  }

  // TO fetch all the task inside a task list
  getAllTaskForATaskList(taskListId:string){
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  // Create  task inside a particular task list object
  createTaskInsideATaskList(taskListId:string, title:string){
    let data = {'title': title};
    return this.apiConfigService.taskPost(`tasklists/${taskListId}/tasks`, data);
  }

  // delete a task list
  deleteTaskList(taskListId:string):Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  // delete a task inside a particular task list
  deleteATaskInsideATaskList(taskListId:string, taskId:string):Observable<TaskModel>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  // update task status of a task whether it's completed or not
  updateTaskStatus(taskListId:string, taskobject:TaskModel):Observable<TaskListModel>{
    let updateData = {completed: !taskobject.completed};
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskobject._id}`, updateData);
  }
}
