import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCommendService } from '../../../../../Services/Auth/Commend/Handler/auth-commend.service';
import { slideInOutAnimation } from '../animations';

@Component({
  selector: 'app-country-selection',
  imports: [MatFormSharedModule, RouterModule],
  templateUrl: './country-selection.component.html',
  styleUrl: './country-selection.component.css',
  animations: [slideInOutAnimation],
})
export class CountrySelectionComponent implements OnInit {
  countryForm: FormGroup = new FormGroup({});

  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly _AuthCommendService = inject(AuthCommendService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this._AuthCommendService.getRegistrationData().subscribe((res) => {
      this.countryForm = this.fb.group({
        country: [res.country ?? '', Validators.required],
      });
    });
  }

  sellGlobally(): void {
    console.log('Navigating to Jumia Global seller page...');
    window.open('https://www.jumia-global.com/', '_blank');
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      this._AuthCommendService.updateCountrySelection(this.countryForm.value);
      this.submitted.emit(true);
    }
  }
}
