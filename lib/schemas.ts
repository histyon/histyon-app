import { z } from 'zod'
import { REGEX_VALIDATORS } from './constants'

// qui definiamo gli schemi di validazione usando le stesse regex del frontend

export const PasswordSchema = z.string()
  .min(8, "La password deve essere di almeno 8 caratteri")
  .regex(new RegExp(REGEX_VALIDATORS.PASSWORD), "Inserire una maiuscola, numero e carattere speciale");

export const PatientSchema = z.object({
  firstName: z.string().min(2).regex(new RegExp(REGEX_VALIDATORS.NAME), "Solo lettere consentite"),
  lastName: z.string().min(2).regex(new RegExp(REGEX_VALIDATORS.NAME), "Solo lettere consentite"),
  fiscalCode: z.string().length(16).regex(new RegExp(REGEX_VALIDATORS.FISCAL_CODE), "Formato errato"),
  email: z.string().email().optional().or(z.literal('')),
  dob: z.string(), 
  gender: z.enum(['M', 'F', 'OTHER']),
  country: z.string().optional(),
  placeOfBirth: z.string().optional(),
  addressStreet: z.string().optional(),
  addressCivic: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
})