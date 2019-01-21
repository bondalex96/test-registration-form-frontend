import { Injectable } from '@angular/core';
import { UserRepository } from '../../infrastructure/repositories/user-repository';
import { User } from '../../domain/entities/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Registration {

    constructor(private userRepository: UserRepository) {
    }

    public execute(nick: string, firstName: string, lastName: string, email: string, password: string): Observable<object> {
        const user = new User(nick, firstName, lastName, email, password);
        return this.userRepository.register(user);
    }
}
