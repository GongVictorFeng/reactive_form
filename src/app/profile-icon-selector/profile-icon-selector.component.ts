import { Component, forwardRef, Provider } from '@angular/core';
import { PROFILE_ICON_NAMES } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const ICON_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
};

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css'],
  providers: [ICON_VALUE_PROVIDER],
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  showAllIcons: boolean = true;
  profileIcons = PROFILE_ICON_NAMES;
  selectedIcon: string = '';
  onChange!: Function;
  onTouched!: Function;

  onSelected(icon: string) {
    this.selectedIcon = icon;
    this.showAllIcons = false;
    this.onChange(icon);
  }

  writeValue(icon: string): void {
    this.selectedIcon = icon;
    if (icon && icon !== '') {
      this.showAllIcons = false;
      return;
    }
    this.showAllIcons = true;
  }
  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => {
      fn(icon);
    };
  }
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
