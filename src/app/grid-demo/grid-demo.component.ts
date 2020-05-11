import { Component, OnInit } from '@angular/core';

import { tap, switchMap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';
import {
  PageChangeEvent
} from '@progress/kendo-angular-grid';
import { categories } from '../services/categories';
import { FormGroup, FormControl, Validators } from '@angular/forms';


const createFormGroup = dataItem => new FormGroup({
  ProductID: new FormControl(dataItem.ProductID),
  ProductName: new FormControl(dataItem.ProductName, Validators.required),
  CategoryID: new FormControl(dataItem.CategoryID, Validators.required)
});


@Component({
  selector: 'app-grid-demo',
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent implements OnInit {
  public loading = false;
  public gridView: any;
  public state: any = {
    skip: 0,
    take: 20
  };
  private stateChange = new BehaviorSubject<any>(this.state);
  public categories: any[] = categories;
  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(private dService: DataService) {
    this.loadProducts();
  }

  ngOnInit(): void {

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
        return this.dService.getBulkData(state);
      }),
      tap((data: any) => {
      }),
      map((data: any) => {
        this.loading = false;
        return data;
      }),
    );
  }

  public category(id: number): any {
    return this.categories.find((x) => {
      return x.CategoryID === id;
    });
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
      ProductName: '',
      CategoryID: 1
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    const product = formGroup.value;

    // this.service.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }): void {
    // this.service.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
      sender.editCell(rowIndex, columnIndex, createFormGroup(dataItem));
    }
  }

  public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      // this.editService.assignValues(dataItem, formGroup.value);
      // this.editService.update(dataItem);
    }
  }

  public scollToElement(e, cnt?) {
    const container = document.querySelector('.k-grid-header-wrap');
    const node: any = container.querySelectorAll('table  tr  th')[cnt - 1];
    container.scrollLeft = node.offsetLeft;

    const containerData = document.querySelector('.k-grid-content.k-virtual-content');
    const nodeData: any = containerData.querySelectorAll('table > tbody > tr:first-child > td')[cnt - 1];
    containerData.scrollLeft = nodeData.offsetLeft;

  }

}
