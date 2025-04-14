import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Provider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => DateValueAccessorDirective),
};

@Directive({
  selector:
    'input([type=date])[formControl], input([type=date])[formControlName], input([type=date][ngModel])',
  providers: [DATE_VALUE_PROVIDER],
})
export class DateValueAccessorDirective implements ControlValueAccessor {
  @HostListener('input', ['$event.target.valueAsDate'])
  onChange!: Function;

  @HostListener('blur')
  onTouched!: Function;

  constructor(private element: ElementRef) {}

  writeValue(newDate: any): void {
    if (newDate instanceof Date) {
      this.element.nativeElement.value = newDate.toISOString().split('T')[0];
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => {
      fn(valueAsDate);
    };
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
