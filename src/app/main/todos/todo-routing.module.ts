import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodolistResolver } from './resolvers/todolist.resolver';

const routes: Routes = [{ path: '', component: TodoPageComponent, resolve: { todos: TodolistResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
