import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { products } from '../services/products';
import { customers } from '../services/customers';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { CategoriesService, OrdersService } from '../services/northwind.service';
import { State } from '@progress/kendo-data-query';

import { tap, switchMap, map, debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  providers: [OrdersService],
  encapsulation: ViewEncapsulation.None
})
export class GridViewComponent implements OnInit {

  public columns: any[] = [{ field: 'ProductID' }, { field: 'ProductName' }, { field: 'Category.CategoryName' },
  { field: 'QuantityPerUnit' }];
  public bindingType = 'array';
  public view: Observable<GridDataResult>;
  public gridData: any = products;
  public gridDataResult: GridDataResult = { data: products, total: products.length };
  public loading = false;


  public customerData: any[] = customers;
  public customerColumns: any[] = [{ field: 'CompanyName' }, { field: 'ContactName' }, { field: 'City' }, { field: 'ContactTitle' }];


  public state: any = {
    skip: 0,
    take: 100
  };

  public query: any;
  private stateChange = new BehaviorSubject<any>(this.state);


  public vData: any[] = [];

  constructor(private service: CategoriesService, private oService: OrdersService) {
    this.view = service;
    this.loading = false;

    this.query = this.stateChange.pipe(
      // debounceTime(50),
      tap(state => {
        this.state = state;
        this.loading = true;
      }),
      switchMap((state) => {
        return oService.fetch(state);
      }),
      tap((data: any) => {
        // console.log(data);
        this.loading = false;
        // return data.data;
      }),
      map((data: any) => {
        console.log(data);
        return data.data;
      }),
    );

    this.vData = this.createRandomData(100000);

  }

  public pageChange(state: any): void {
    this.stateChange.next(state);
  }

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

  changeBindingType(e) {
    switch (this.bindingType) {
      case 'array': {
        this.columns = [{ field: 'ProductID' }, { field: 'ProductName' }, { field: 'Category.CategoryName' }, { field: 'QuantityPerUnit' }];
        this.gridData = products;
        break;
      }
      case 'gridDataResult': {
        this.columns = [{ field: 'ProductID' }, { field: 'ProductName' }, { field: 'Category.CategoryName' }, { field: 'QuantityPerUnit' }];
        this.gridData = this.gridDataResult.data;
        break;
      }
      case 'async': {
        const state: State = { skip: 0, take: 100 };
        this.loading = true;
        this.columns = [{ field: 'CategoryID' }, { field: 'CategoryName' }, { field: 'Description' }];
        this.service.query(state);
        this.view.subscribe((res: any) => {
          this.gridData = (res && res.data) ? res.data : res;
          setTimeout(() => {
            this.loading = false;
          }, 3000);

        });
        break;
      }
    }
  }

  ngOnInit(): void {
  }

}
