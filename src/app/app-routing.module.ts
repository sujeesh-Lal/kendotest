import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridViewComponent } from './grid-view/grid-view.component';
import { GridView2Component } from './grid-view2/grid-view2.component';
import { GridEditComponent } from './grid-edit/grid-edit.component';
import { GridEdit2Component } from './grid-edit2/grid-edit2.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { SheetjsDemoComponent } from './sheetjs-demo/sheetjs-demo.component';


const routes: Routes = [
  { path: '', redirectTo: 'sheetjs', pathMatch: 'full' },
  { path: 'grid', component: GridViewComponent },
  { path: 'grid2', component: GridView2Component },
  { path: 'gridEdit', component: GridEditComponent },
  { path: 'gridEdit2', component: GridEdit2Component },
  { path: 'demo', component: GridDemoComponent },
  { path: 'sheetjs', component: SheetjsDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
