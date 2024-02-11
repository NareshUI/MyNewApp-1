import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';

const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'AdminPanel', component: AdminBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
