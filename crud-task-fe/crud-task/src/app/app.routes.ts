import { Routes } from '@angular/router';
import { TaskScreenComponent } from './screens/task-screen/task-screen.component';
import { CreateNewTaskListComponent } from './screens/create-new-task-list/create-new-task-list.component';
import { CreateNewTaskComponent } from './screens/create-new-task/create-new-task.component';

export const routes: Routes = [
    {
        path: 'task-list',
        component: TaskScreenComponent
    },
    {
        path: 'task-list/:taskListId',
        component: TaskScreenComponent
    },
    {
        path: '',
        redirectTo: 'task-list',
        pathMatch: 'full'
    },
    {
        path: 'create-new-task-list',
        component: CreateNewTaskListComponent
    },
    {
        path: 'task-list/:taskListId/new-task',
        component: CreateNewTaskComponent
    },
];
