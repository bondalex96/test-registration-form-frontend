import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserRepositoryService } from '../../repositories/user-repository.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UniqueNickValidator {
    constructor(private userRepository: UserRepositoryService) {
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
