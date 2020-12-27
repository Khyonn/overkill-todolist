import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodolistResolver } from '@todos/resolvers/todolist.resolver';

import { TodoDetailPageComponent } from '@todos/pages/todo-detail-page/todo-detail-page.component';
import { TodoPageComponent } from '@todos/pages/todo-page/todo-page.component';
import { TodoResolver } from './resolvers/todo.resolver';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
    resolve: { todos: TodolistResolver },
    children: [
      {
        path: ':todoId',
        component: TodoDetailPageComponent,
        resolve: { todo: TodoResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
