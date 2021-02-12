import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {
      path: 'auth',
      loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
