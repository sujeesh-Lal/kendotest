import { OnInit } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  GridComponent,
  GridDataResult,
  PageChangeEvent
} from '@progress/kendo-angular-grid';
import { CategoriesService, OrdersService } from '../services/northwind.service';


import { State } from '@progress/kendo-data-query';

import { tap, switchMap, map, debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categories } from '../services/categories';



const createFormGroup = dataItem => new FormGroup({
  OrderID: new FormControl(),
  ShipName: new FormControl('', Validators.required),
  ShipCity: new FormControl('', Validators.required),
  ShipCountry: new FormControl('', Validators.required),
  CategoryID: new FormControl(dataItem.CategoryID, Validators.required)
});



@Component({
  selector: 'app-grid-view2',
  templateUrl: './grid-view2.component.html',
  styleUrls: ['./grid-view2.component.scss'],
  providers: [OrdersService],
})
export class GridView2Component implements OnInit, AfterViewInit {

  public gridView: any;
  public data: any[];
  public pageSize = 100;
  public skip = 0;

  public gridData = [{
    ProductID: 1,
    ProductName: 'Chai',
    UnitPrice: 18.0000,
    Discontinued: false
  }, {
    ProductID: 2,
    ProductName: 'Chang',
    UnitPrice: 19.0000,
    Discontinued: true
  }
  ];

  public state: any = {
    skip: 0,
    take: 100
  };

  public query: any;
  private stateChange = new BehaviorSubject<any>(this.state);
  public loading = false;

  public formGroup: FormGroup;
  private editedRowIndex: number;
  public categories: any[] = categories;

  @ViewChild('grid') private grid: GridComponent;

  constructor(private oService: OrdersService) {
    this.data = this.createRandomData(100000);
    this.loadProducts();
  }

  public ngAfterViewInit(): void {
    // this.grid.pageChange.pipe(debounceTime(500))
    //   .subscribe((e) => {
    //     return this.pageChange(e);
    //   });

    // this.grid.pageChange
    //   .subscribe((e) => {
    //     return this.pageChange(e);
    //   });
  }

  public pageChange(event: PageChangeEvent): void {
    this.stateChange.next(event);
  }

  private loadProducts(): void {
    this.gridView = this.stateChange.pipe(
      tap(state => {
        this.loading = true;
        this.state = state;
      }),
      switchMap((state) => {
        return this.oService.fetch(state);
      }),
      tap((data: any) => {
      }),
      map((data: any) => {
        this.loading = false;
        return data;
      }),
    );
  }

  /* Generating example data */
  private createRandomData(count: number): any[] {
    const firstNames = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Nige'];
    const lastNames = ['Davolio', 'Fuller', 'Leverling', 'Peacock', 'Buchanan', 'Suyama', 'King', 'Callahan', 'Dodsworth', 'White'];
    const cities = ['Seattle', 'Tacoma', 'Kirkland', 'Redmond', 'London', 'Philadelphia', 'New York', 'Seattle', 'London', 'Boston'];
    const titles = ['Accountant', 'Vice President, Sales', 'Sales Representative', 'Technical Support', 'Sales Manager', 'Web Designer',
      'Software Developer'];

    return Array(count).fill({}).map((_, idx) => ({
      id: idx + 1,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      title: titles[Math.floor(Math.random() * titles.length)]
    })
    );
  }

  public onStateChange(state: State) {
    // this.gridState = state;
    console.log(state);

    // this.editService.read();
  }


  public category(id: number): any {
    return this.categories.find((x) => {
      return x.CategoryID === id;
    });
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    // this.formGroup = new FormGroup({
    //   OrderID: new FormControl(),
    //   ShipName: new FormControl('', Validators.required),
    //   ShipCity: new FormControl('', Validators.required),
    //   CategoryID: new FormControl(dataItem.CategoryID, Validators.required)
    // });

    // sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = createFormGroup(dataItem);

    // this.formGroup = new FormGroup({
    //   ProductID: new FormControl(dataItem.ProductID),
    //   ProductName: new FormControl(dataItem.ProductName, Validators.required),
    //   UnitPrice: new FormControl(dataItem.UnitPrice),
    //   UnitsInStock: new FormControl(
    //     dataItem.UnitsInStock,
    //     Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
    //   Discontinued: new FormControl(dataItem.Discontinued)
    // });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    // const product: Product = formGroup.value;

    // this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    // this.editService.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  ngOnInit(): void {
  }

}
