import { Component, Input, OnInit, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html'
})
export class SearchbarComponent implements OnInit {

    @Input()
    color = 'light';

    @Input()
    placeholder = '¿Que quieres buscar?';

    @Input()
    debounce = 2500;

    @Output()
    research = new EventEmitter();

    @ViewChild(IonSearchbar, { static: true })
    searchbar: IonSearchbar;
    
    set value(v: string) {
        this.searchbar.value = v;
        this.research.emit(v);
    }

    private lastValue: string;

    constructor() { }

    ngOnInit(): void { }

    onResearch(value: string) {
        if (this.lastValue?.toLowerCase() === value?.toLowerCase()) {
            return;
        }

        this.lastValue = value;
        this.research.emit(value);
    }

}
