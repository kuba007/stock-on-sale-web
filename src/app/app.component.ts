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
        this.sortBy('month');
    }

    sortBy(key: string) {
        this.all = this.all.sort((one, two) => one[key] - two[key]);
    }

    ago(updated: number) {
        if (updated === 0) {
            return 'never';
        }

        const diffMinutes = Math.round((new Date().getTime() - updated) / 1000 / 60);
        if (diffMinutes < 60) {
            return diffMinutes + 'm';
        }

        const diffHours = Math.round(diffMinutes / 60);
        return diffHours + 'h';
    }
}
