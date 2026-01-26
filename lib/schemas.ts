import { z } from 'zod'
import { REGEX_VALIDATORS } from './constants'
import { dictionary } from '@/lib/dictionary'
// qui definiamo le regole di validazione che uso sia nel form che nelle server actions
// usiamo le regex per essere sicuro che nome, cf e password rispettino i formati corretti

export const PasswordSchema = z.string()
  .min(8, dictionary.validation.passwordLength)
  .regex(new RegExp(REGEX_VALIDATORS.PASSWORD), dictionary.validation.passwordRegexMsg);

export const PatientSchema = z.object({
  firstName: z.string().min(2).regex(new RegExp(REGEX_VALIDATORS.NAME), dictionary.validation.nameAllowed),
  lastName: z.string().min(2).regex(new RegExp(REGEX_VALIDATORS.NAME), dictionary.validation.nameAllowed),
  fiscalCode: z.string().length(16).regex(new RegExp(REGEX_VALIDATORS.FISCAL_CODE), dictionary.validation.fiscalCodeFormat),
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