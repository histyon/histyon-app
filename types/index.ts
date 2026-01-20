export interface Patient {
  id: string;
  doctor_id: string;
  first_name: string;
  last_name: string;
  fiscal_code: string;
  date_of_birth: string;
  gender: 'M' | 'F' | 'OTHER';
  email?: string;
  phone_number?: string;
  address_street?: string;
  address_civic?: string;
  city?: string;
  province?: string;
  region?: string;
  postal_code?: string;
  country?: string;
  place_of_birth?: string;
  created_at: string;
}