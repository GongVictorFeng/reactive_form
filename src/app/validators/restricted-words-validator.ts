import { AbstractControl, ValidationErrors } from '@angular/forms';

export const restrictedWords = (...restrictedWords: string[]) => {
  return (constrol: AbstractControl): ValidationErrors | null => {
    const invalidWords = restrictedWords
      .map((w) => (constrol.value.includes(w) ? w : null))
      .filter((w) => w !== null);
    return invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(',') }
      : null;
  };
};
