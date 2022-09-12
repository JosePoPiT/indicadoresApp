import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorDetails } from '../../interfaces/error.interface';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorDetails!: ErrorDetails;
  constructor(
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {

    this.errorDetails = this.errorService.getErrorDetails();
  }

  ngOnDestroy(): void {
  }

}
