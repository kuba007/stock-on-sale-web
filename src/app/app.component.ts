import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    all: any;

    constructor(private http: HttpClient) {
        this.loadData();
    }

    async loadData() {
        const data = await this.http.get('https://stocks.jamesdeer.io/data/dashboard.json').toPromise();
        this.all = Object.keys(data).map(key => Object.assign({ticker: key}, data[key]));
    }
}
