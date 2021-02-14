import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { VALIDATIONS } from '../../constants/index';
import { DestroyService } from '../../services/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: '[input-wrapper], ion-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    providers: [DestroyService]
})
export class InputWrapperComponent implements OnInit {

    @Input() label: string;

    @Input() labelClass: string = '';

    @Input() labelColor: string = 'medium';

    @Input() labelPosition: string = 'stacked';

    @Input() errorColor: string = 'danger';

    @Input() errorMsg = 'Este campo es obligatorio';

    @Input() ctrl: NgModel;

    constructor(
        private readonly destroy$: DestroyService
    ) { }

    ngOnInit() {
        this.ctrl?.statusChanges.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => this.getCtrlValidationMsg());
    }

    getCtrlValidationMsg(): string {
        if (!this.ctrl || !this.ctrl?.errors) {
            return;
        }

        const errors = this.ctrl.errors;
        const name = this.ctrl.name;

        if (name in VALIDATIONS) {
            for (const error in errors) {
                switch (error) {
                    case 'required':
                        this.errorMsg = VALIDATIONS[name].required;
                        break;
    
                    case 'minlength':
                        const minLength = errors[error]?.requiredLength;
                        this.errorMsg = VALIDATIONS[name].minLength(minLength);
                        break;
    
                    case 'pattern':
                        this.errorMsg = VALIDATIONS[name].pattern;
                        break;
    
                    default:
                        break;
                }
            }
        }

        return this.errorMsg;

      }

}

