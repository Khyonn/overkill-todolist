import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TodoModule } from '@todos/todo.module';
import { fakeRouteLazyLoading } from '@testing/lazyloading';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should have a toolbar and a router-outler', () => {
    expect(appComponent).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-toolbar')).toBeDefined();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeDefined();
  });

  it('should redirect to /todos and lazyload TodoModule', fakeAsync(() => {
    fakeRouteLazyLoading(router, routes, 'todos', (module) => {
      expect(module).toBe(TodoModule);
    });
    router.initialNavigation();
    expect(fixture.nativeElement.querySelector('app-fake-component')).toBeFalsy();

    router.navigateByUrl('/todos');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/todos');
    expect(fixture.nativeElement.querySelector('app-fake-component')).toBeTruthy();
  }));

  it('should redirect to 404 page', fakeAsync(() => {
    router.initialNavigation();
    expect(fixture.nativeElement.querySelector('app-not-found')).toBeFalsy();
    router.navigateByUrl('/todosaaa');

    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/todosaaa');
    expect(fixture.nativeElement.querySelector('app-not-found')).toBeTruthy();
  }));
});
