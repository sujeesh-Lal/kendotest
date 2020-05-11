import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class DataService {

    public loading = false;
    private BASE_URL = 'http://localhost:8000/apis/v1/products/';

    constructor(
        private http: HttpClient
    ) {
    }

    public query(state: any): void {
        this.fetch(state)
            .subscribe((x) => {
                return x;
            });
    }

    public fetch(state: any): Observable<GridDataResult> {
        const queryStr = `${state.skip}/${state.take}/true`;
        this.loading = true;

        return this.http
            .get(`${this.BASE_URL}${queryStr}`)
            .pipe(
                map((response: any) => {
                    return (
                        {
                            data: response.data,
                            total: parseInt(response.count, 10)
                        } as GridDataResult);
                }),
                tap(() => this.loading = false)
            );
    }
}
