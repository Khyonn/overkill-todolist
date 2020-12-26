import { Component, NgModule } from '@angular/core';
import { LoadChildrenCallback, Router, RouterModule, Routes, Route } from '@angular/router';

@Component({ template: `Fake Component`, selector: 'app-fake-component' })
class FakeTodoComponent {}

@NgModule({
  declarations: [FakeTodoComponent],
  imports: [RouterModule.forChild([{ path: '', component: FakeTodoComponent }])],
})
class FakeTodosModule {}

export const fakeRouteLazyLoading = (
  router: Router,
  initialRoutes: Routes,
  path: string,
  expectation: (module: any) => void
) => {
  const correspondingRoute = initialRoutes.find((initialRoute) => initialRoute.path === path);

  if (correspondingRoute) {
    const newRoute: Route = {
      ...correspondingRoute,
      loadChildren: async () => {
        const module = await (correspondingRoute.loadChildren as LoadChildrenCallback)();

        expectation(module);
        return Promise.resolve(FakeTodosModule);
      },
    };

    const newRoutes: Routes = [...initialRoutes];
    newRoutes.splice(initialRoutes.indexOf(correspondingRoute), 1, newRoute);
    router.resetConfig(newRoutes);
    return newRoutes;
  }
  return initialRoutes;
};
