import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact.model';

export class InMemoryContactsApi implements InMemoryDbService {
  createDb() {
    let contacts: Contact[] = [
      {
        id: '5CehW',
        icon: '',
        firstName: 'Percival',
        lastName: 'Doodleplumb',
        dateOfBirth: new Date('1994/05/05'),
        favoritesRanking: 0,
        personal: false,
        phones: [
          {
            phoneNumber: '555-765-4321',
            phoneType: 'mobile',
            preferred: false,
          },
        ],
        address: {
          streetAddress: '777 Whimsy Lane',
          city: 'Gleeberg City',
          state: 'Colohoma',
          postalCode: 'A4321',
          addressType: 'home',
        },
        notes: '',
      },
      {
        id: 'A6rwe',
        icon: '',
        firstName: 'Mortimer',
        lastName: 'Flungford',
        dateOfBirth: new Date('1988/10/05'),
        favoritesRanking: 0,
        personal: false,
        phones: [
          {
            phoneNumber: '555-877-5678',
            phoneType: 'mobile',
            preferred: false,
          },
        ],
        address: {
          streetAddress: '543 Lullaby Lane',
          city: 'Sleepytown',
          state: 'Ulaska',
          postalCode: 'F2231',
          addressType: 'other',
        },
        notes: '',
      },
      {
        id: '3bNGA',
        icon: '',
        firstName: 'Wanda',
        lastName: 'Giggleworth',
        dateOfBirth: new Date('1986/11/08'),
        favoritesRanking: 1,
        personal: false,
        phones: [
          {
            phoneNumber: '555-123-4567',
            phoneType: 'mobile',
            preferred: false,
          },
          { phoneNumber: '555-321-7654', phoneType: 'work', preferred: false },
        ],
        address: {
          streetAddress: '123 Merriment Avenue',
          city: 'Dorado City',
          state: 'Mezona',
          postalCode: 'Z2345',
          addressType: 'work',
        },
        notes: '',
      },
    ];

    return { contacts };
  }
}
