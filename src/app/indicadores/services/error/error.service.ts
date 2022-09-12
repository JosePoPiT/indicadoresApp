import { Injectable } from '@angular/core';
import { ErrorDetails } from '../../interfaces/error.interface';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {

    public errorDetails!: ErrorDetails;

    getErrorDetails(): ErrorDetails {
        return this.errorDetails;
    }

}