import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validators as CustomValidators} from '../../../infrastructure/form-validators/ng/validators';
import {UniqueEmailValidator} from '../../../infrastructure/form-validators/ng/unique-email-validator';
import {UniqueNickValidator} from '../../../infrastructure/form-validators/ng/unique-nick-validator';
import {NgxSpinnerService} from 'ngx-spinner';
import {Registration} from '../../../application/use-cases/registration';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    static readonly passwordMinLength = 5;
    registrationForm: FormGroup;

    constructor(
        private registration: Registration,
        private fb: FormBuilder,
        private uniqueEmailValidator: UniqueEmailValidator,
        private uniqueNickValidator: UniqueNickValidator,
        private spinner: NgxSpinnerService,
        private notifier: NotifierService
    ) {
    }

    public ngOnInit() {
        this.registrationForm = this.initForm();
    }

    public onSubmit(): void {
        this.markControlsAsTouched();

        if (this.registrationForm.valid) {
            this.spinner.show();

            this.registration.execute(
                this.nickControl().value,
                this.firstNameControl().value,
                this.lastNameControl().value,
                this.emailControl().value,
                this.passwordControl().value
            )
                .subscribe(() => {
                    this.spinner.hide();
                    this.resetValuesOfControls();
                    this.notifier.notify('success', 'Успешная регистрация!');
                }, (errors) => {
                    this.spinner.hide();
                    errors.map((error) => {
                        this.notifier.notify('error', error);
                    });
                });
            return;
        }
    }

    private initForm(): FormGroup {
        return this.fb.group({
            nick: [null, [
                Validators.required,
                CustomValidators.hasOnlyLatinCharactersAndDigits,
                CustomValidators.firstCharacterIsLatin,
            ], [this.uniqueNickValidator]
            ],
            email: [null, [
                Validators.required,
                Validators.email,
            ], [this.uniqueEmailValidator]
            ],
            firstName: [null, [
                Validators.required,
                CustomValidators.hasOnlyRussianCharacters,
            ]],
            lastName: [null, [
                Validators.required,
                CustomValidators.hasOnlyRussianCharacters,
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(RegistrationComponent.passwordMinLength),
            ]],
        });
    }

    private markControlsAsTouched(): void {
        const controls = this.registrationForm.controls;
        Object.keys(controls).forEach(key => {
            controls[key].markAsTouched();
        });
    }

    private resetValuesOfControls(): void {
        const controls = this.registrationForm.controls;
        Object.keys(controls).forEach(key => {
            controls[key].reset();
        });
    }

    private passwordControl(): AbstractControl {
        return this.registrationForm.get('password');
    }

    private nickControl(): AbstractControl {
        return this.registrationForm.get('nick');
    }

    private emailControl(): AbstractControl {
        return this.registrationForm.get('email');
    }

    private firstNameControl(): AbstractControl {
        return this.registrationForm.get('firstName');
    }

    private lastNameControl(): AbstractControl {
        return this.registrationForm.get('lastName');
    }
}
