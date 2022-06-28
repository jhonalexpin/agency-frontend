export class Agency {

    id: string;
    name: string;
    country: string;
    countryCode: string;
    city: string;
    street: string;
    currency: string;
    contactPerson: string;

  constructor(
    id: string, 
    name: string, 
    country: string, 
    countryCode: string, 
    city: string, 
    street: string, 
    currency: string, 
    contactPerson: string
) {
    this.id = id
    this.name = name
    this.country = country
    this.countryCode = countryCode
    this.city = city
    this.street = street
    this.currency = currency
    this.contactPerson = contactPerson
  }

    
    
}
