import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressTypes, PhoneTypes } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words-validator';

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
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
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
    if (!contactId) return;
    this.contactService.getContact(contactId).subscribe({
      next: (contact) => {
        if (contact) {
          this.contactForm.setValue(contact);
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

  saveContact() {
    console.log(this.contactForm.controls.dateOfBirth.value);
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }
}
