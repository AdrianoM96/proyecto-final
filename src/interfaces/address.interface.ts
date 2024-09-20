import { Country } from "./country.interface";

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: any;
  phone: string;
}
