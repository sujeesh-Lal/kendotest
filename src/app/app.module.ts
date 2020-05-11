import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridViewComponent } from './grid-view/grid-view.component';

import { CategoriesService } from './services/northwind.service';
import { ProductsService } from './services/products.service';
import { DataService } from './services/data.service';
import { EditService } from './services/edit.service';
import { GridView2Component } from './grid-view2/grid-view2.component';
import { GridEditComponent } from './grid-edit/grid-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupAnchorDirective } from './services/popup.anchor-target.directive';
import { GridEdit2Component } from './grid-edit2/grid-edit2.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TextareacmpComponent } from './components/textareacmp/textareacmp.component';
import { CustominputComponent } from './components/custominput/custominput.component';
import { SheetjsDemoComponent } from './sheetjs-demo/sheetjs-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
    GridView2Component,
    GridEditComponent,
    PopupAnchorDirective,
    GridEdit2Component,
    GridDemoComponent,
    SearchBarComponent,
    TextareacmpComponent,
    CustominputComponent,
    SheetjsDemoComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, GridModule,
    AppRoutingModule, HttpClientModule, FormsModule,
    HttpClientJsonpModule, CommonModule, ReactiveFormsModule, DropDownListModule,
    PopupModule,
    InputsModule
  ],
  providers: [CategoriesService, ProductsService, DataService,
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
