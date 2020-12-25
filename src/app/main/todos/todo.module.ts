import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SharedModule } from '@shared/shared.module';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { StoreModule } from '@ngrx/store';
import { todosFeatureKey, todosFeatureReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './store/todolist/effects';
import { TodolistResolver } from './resolvers/todolist.resolver';
import { TodoHttpService } from './services/todo-http.service';

@NgModule({
  declarations: [TodoPageComponent, TodoListComponent, TodoItemComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule,
    StoreModule.forFeature(todosFeatureKey, todosFeatureReducer),
    EffectsModule.forFeature([TodoListEffects]),
  ],
  providers: [TodoHttpService, TodolistResolver],
})
export class TodoModule {}
