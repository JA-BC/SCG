import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-img-thumbnail',
    templateUrl: './img-thumbnail.component.html'
})
export class ImgThumbnailComponent implements OnInit {

    @Input() dimension: number[] = [90, 90];

    @Input() imageUrl = '';

    @Input() loading: boolean = false;

    @Output() upload = new EventEmitter();

    @Output() error = new EventEmitter();

    private readonly typeFiles: string[] = ['image/jpeg'];
    private readonly maxSizeMB: number = 2;

    constructor() { }

    ngOnInit(): void { }

    onUpload({ files }: { files: File[] }) {
        const file = files[0];
        const valid = this.isValidFile(file);

        if (!valid) {
            this.error.emit('El tipo de archivo no puede ser procesado');
            return;
        }

        this.upload.emit(file);
    }

    private isValidFile(file: File): boolean {
        const fileSizeinMB = file.size / (1024 * 1000);
        const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place

        if (size > this.maxSizeMB) {
            this.error.emit(`El archivo supera el limite de tamaño permitido. (${this.maxSizeMB} MB)`);
            return false;
        }

        return this.isValidType(file);
    }

    private isValidType(file: File): boolean {
        return this.typeFiles.includes(file.type);
    }
}
