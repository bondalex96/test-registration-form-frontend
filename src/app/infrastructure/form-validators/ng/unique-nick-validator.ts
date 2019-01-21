import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserRepository } from '../../repositories/user-repository';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UniqueNickValidator {
    constructor(private userRepository: UserRepository) {
    }

    public validate(
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.userRepository.checkNickIsUnique(control.value)
            .pipe(
                map(unique => (unique ? null : {uniqueNick: true})),
                catchError(() => null)
            );
    }

}
