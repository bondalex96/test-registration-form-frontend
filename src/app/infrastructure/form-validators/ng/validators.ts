import {FormControl, ValidationErrors} from '@angular/forms';

export class Validators {
    static readonly onlyLatinCharacters = /^[a-zA-Z]+$/;
    static readonly onlyLatinCharactersAndDigits = /^[a-zA-Z0-9]+$/;
    static readonly onlyRussianCharacters = /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/;

    public static hasOnlyLatinCharactersAndDigits(control: FormControl): ValidationErrors | null {
        if (Validators.onlyLatinCharactersAndDigits.test(control.value)) {
            return null;
        }
        return { hasOnlyLatinCharactersAndDigits: true };
    }

    public static firstCharacterIsLatin(control: FormControl): ValidationErrors | null {
        if (!control.value) {
            return { firstCharacterIsLatin: true };
        }
        const firstCharacter = control.value.charAt(0);
        if (Validators.onlyLatinCharacters.test(firstCharacter)) {
            return null;
        }
        return { firstCharacterIsLatin: true };
    }

    public static hasOnlyRussianCharacters(control: FormControl): ValidationErrors | null {
        if (Validators.onlyRussianCharacters.test(control.value)) {
            return null;
        }

        return { hasOnlyRussianCharacters: true };
    }

}
