import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { todosFeatureKey, todosReducerMap } from './store';
import { TodoListEffects } from './store/todolist/effects';

import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoDetailPageComponent } from './pages/todo-detail-page/todo-detail-page.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodolistResolver } from './resolvers/todolist.resolver';
import { TodoResolver } from './resolvers/todo.resolver';
import { TodoHttpService } from './services/todo-http.service';

@NgModule({
  declarations: [TodoPageComponent, TodoDetailPageComponent, TodoListComponent, TodoItemComponent, TodoDetailComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule,
    StoreModule.forFeature(todosFeatureKey, todosReducerMap),
    EffectsModule.forFeature([TodoListEffects]),
  ],
  providers: [TodoHttpService, TodolistResolver, TodoResolver],
})
export class TodoModule {}
