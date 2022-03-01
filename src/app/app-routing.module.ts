import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
      { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
