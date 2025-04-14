import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressTypes, PhoneTypes } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words-validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  phoneTypes = PhoneTypes;
  addressTypes = AddressTypes;
  contactForm = this.fb.nonNullable.group({
    id: '',
    icon: '',
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    personal: false,
    phones: this.fb.array([this.createPhone()]),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',
    }),
    notes: ['', restrictedWords('foo', 'bar')],
  });

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) {
      this.subscribeToAddressChange();
      return;
    }

    this.contactService.getContact(contactId).subscribe({
      next: (contact) => {
        if (contact) {
          for (let i = 1; i < contact.phones.length; i++) {
            this.addPhone();
          }
          this.contactForm.setValue(contact);
          this.subscribeToAddressChange();
        }
      },
    });
  }

  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get address() {
    return this.contactForm.controls.address;
  }

  addPhone() {
    const phone = this.createPhone();
    this.contactForm.controls.phones.push(phone);
  }

  private createPhone() {
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false,
    });

    phoneGroup.controls.preferred.valueChanges
      .pipe(distinctUntilChanged(this.stringifyCompare))
      .subscribe({
        next: (value) => {
          if (value) {
            phoneGroup.controls.phoneNumber.addValidators(Validators.required);
          } else {
            phoneGroup.controls.phoneNumber.removeValidators(
              Validators.required
            );
          }
          phoneGroup.controls.phoneNumber.updateValueAndValidity();
        },
      });

    return phoneGroup;
  }

  private subscribeToAddressChange() {
    const addressGroup = this.contactForm.controls.address;

    addressGroup.valueChanges
      .pipe(distinctUntilChanged(this.stringifyCompare))
      .subscribe(() => {
        for (const controlName in addressGroup.controls) {
          addressGroup.get(controlName)?.removeValidators(Validators.required);
          addressGroup.get(controlName)?.updateValueAndValidity();
        }
      });

    addressGroup.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged(this.stringifyCompare))
      .subscribe(() => {
        for (const controlName in addressGroup.controls) {
          addressGroup.get(controlName)?.addValidators(Validators.required);
          addressGroup.get(controlName)?.updateValueAndValidity();
        }
      });
  }

  private stringifyCompare(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  saveContact() {
    console.log(this.contactForm.value);
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }
}
