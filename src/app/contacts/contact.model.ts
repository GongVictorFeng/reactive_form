export interface Contact {
  id: string;
  icon: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  favoritesRanking: number | null;
  personal: boolean;
  phones: Phone[];
  address: Address;
  notes: string;
}

export interface Phone {
  phoneNumber: string;
  phoneType: string;
  preferred: boolean;
}

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  addressType: string;
}

export const PhoneTypes = [
  { title: 'Mobile', value: 'mobile' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
];

export const AddressTypes = [
  { title: 'Home', value: 'home' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
];
