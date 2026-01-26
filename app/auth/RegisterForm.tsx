'use client'

import { useState, useActionState, useEffect, useRef } from 'react'
import { signup, SignupState } from '@/lib/actions/auth'
import { ValidatedInput, GlobalLocationSelector, PhoneInput } from '@/components/ui/FormElements'
import { DateOfBirthPicker } from '@/components/ui/DateOfBirthPicker'
import { AlertTriangle, ArrowRight, ArrowLeft, Check, Lock } from 'lucide-react'
import { REGEX_VALIDATORS } from '@/lib/constants'

const initialState: SignupState = { status: 'idle', inputs: {} }

interface RegisterFormProps {
  dict: any
}

export function RegisterForm({ dict }: RegisterFormProps) {
  const [state, formAction] = useActionState(signup, initialState)
  const [currentStep, setCurrentStep] = useState(1)
  
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  
  const [dob, setDob] = useState<Date | undefined>(
    state.inputs?.dob ? new Date(state.inputs.dob) : undefined
  )

  useEffect(() => {
    if (state.inputs?.dob) setDob(new Date(state.inputs.dob))
  }, [state.inputs?.dob])
  
  const t = dict.auth.register;
  const tf = dict.auth.form;

  const validateAndNext = () => {
      let currentContainer: HTMLDivElement | null = null;
      if (currentStep === 1) currentContainer = step1Ref.current;
      if (currentStep === 2) currentContainer = step2Ref.current;
      if (currentStep === 3) currentContainer = step3Ref.current;

      if (currentContainer) {
          const inputs = currentContainer.querySelectorAll('input, select');
          let isValid = true;
          
          inputs.forEach((input: any) => {
              if (!input.checkValidity()) {
                  isValid = false;
                  input.reportValidity();
              }
          });

          if (isValid) {
              setCurrentStep(prev => Math.min(prev + 1, 3));
              window.scrollTo({ top: 0, behavior: 'smooth' });
          }
      } else {
          setCurrentStep(prev => Math.min(prev + 1, 3));
      }
  }

  const prevStep = () => { setCurrentStep(prev => Math.max(prev - 1, 1)) }

  const stepTitles = [t.steps.registry, t.steps.residence, t.steps.profession];
  const currentTitle = stepTitles[currentStep - 1];

  return (
    <form action={formAction} className="flex flex-col h-full" noValidate={false}>
        
        <div className="mb-6 px-8 pt-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.steps.one.split(' ')[0]} {currentStep} / 3</span>
                <span className="text-xs font-bold text-black uppercase tracking-wider">{currentTitle}</span>
            </div>
            
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-black transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
            </div>
        
            <h2 className="text-3xl font-bold mt-6 tracking-tight">
                {currentTitle}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{dict.auth.register.subheading}</p>
        </div>

        {state.status === 'error' && state.message && (
            <div className="mx-8 mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-4 rounded-xl text-sm flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                <p className="font-bold">{tf.warnings.attention}</p>
                <p>{state.message}</p>
                </div>
            </div>
        )}

        <div className="flex-1 overflow-y-auto px-8 py-2 space-y-6 custom-scrollbar">
            
            <div ref={step1Ref} className={currentStep === 1 ? 'block space-y-6 animate-in fade-in slide-in-from-right-8 duration-300' : 'hidden'}>
                <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput 
                        name="firstName" 
                        label={tf.labels.firstName}
                        pattern={REGEX_VALIDATORS.NAME}
                        errorMessage={dict.validation.name}
                        defaultValue={state.inputs?.firstName} 
                        required 
                    />
                    <ValidatedInput 
                        name="lastName" 
                        label={tf.labels.lastName}
                        pattern={REGEX_VALIDATORS.NAME}
                        errorMessage={dict.validation.name}
                        defaultValue={state.inputs?.lastName}
                        required 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput 
                        name="fiscalCode" 
                        label={tf.labels.fiscalCode}
                        className="uppercase font-mono" 
                        maxLength={16} 
                        pattern={REGEX_VALIDATORS.FISCAL_CODE}
                        errorMessage={dict.validation.fiscalCodeLen}
                        defaultValue={state.inputs?.fiscalCode}
                        required 
                    />
                    
                    <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{tf.labels.gender} *</label>
                        <select 
                            name="gender" 
                            required 
                            defaultValue={state.inputs?.gender || ""} 
                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-black focus:ring-inset transition-all text-sm"
                        >
                            <option value="" disabled>{tf.placeholders.select}</option>
                            <option value="M">{tf.options.male}</option>
                            <option value="F">{tf.options.female}</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{tf.labels.dob} *</label>
                    
                    <DateOfBirthPicker 
                        date={dob} 
                        setDate={setDob}
                        labels={{
                            day: tf.placeholders.day,
                            month: tf.placeholders.month,
                            year: tf.placeholders.year
                        }}
                    />
                    <input type="hidden" name="dob" value={dob ? dob.toISOString().split('T')[0] : ''} required />
                </div>

                <ValidatedInput 
                    name="placeOfBirth" 
                    label={tf.labels.birthPlace} 
                    defaultValue={state.inputs?.placeOfBirth}
                    required 
                    errorMessage={tf.warnings.required}
                />

                <PhoneInput label={tf.labels.phone} />
            </div>

            <div ref={step2Ref} className={currentStep === 2 ? 'block space-y-6 animate-in fade-in slide-in-from-right-8 duration-300' : 'hidden'}>
                <GlobalLocationSelector dict={dict} /> 
            </div>

            <div ref={step3Ref} className={currentStep === 3 ? 'block space-y-6 animate-in fade-in slide-in-from-right-8 duration-300' : 'hidden'}>
                <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput 
                        name="medicalLicense" 
                        label={tf.labels.medicalLicense}
                        placeholder={tf.placeholders.license}
                        defaultValue={state.inputs?.medicalLicense}
                        required 
                        errorMessage={tf.warnings.required}
                    />
                    <ValidatedInput 
                        name="hospitalName" 
                        label={tf.labels.hospital}
                        placeholder={tf.placeholders.hospital}
                        defaultValue={state.inputs?.hospitalName}
                        required 
                        errorMessage={tf.warnings.required}
                    />
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                            <Lock className="w-3 h-3 text-black" />
                        </div>
                        {tf.sections.credentials}
                    </h3>
                    
                    <ValidatedInput 
                        name="email" 
                        type="email" 
                        label={tf.labels.email}
                        pattern={REGEX_VALIDATORS.EMAIL}
                        errorMessage={dict.validation.emailInvalid}
                        defaultValue={state.inputs?.email}
                        externalError={state.errors?.email}
                        required 
                    />
                    
                    <ValidatedInput 
                        name="password" 
                        type="password" 
                        label={tf.labels.password}
                        pattern={REGEX_VALIDATORS.PASSWORD}
                        errorMessage={dict.validation.passwordRegexMsg}
                        defaultValue={state.inputs?.password}
                        externalError={state.errors?.password}
                        required 
                    />
                </div>
            </div>

        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 px-8 pb-4 bg-white">
            
            {currentStep > 1 && (
                <button 
                    type="button" 
                    onClick={prevStep}
                    className="flex-1 bg-white text-gray-900 border border-gray-200 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> {t.buttons.back}
                </button>
            )}

            {currentStep < 3 ? (
                <button 
                    type="button" 
                    onClick={validateAndNext}
                    className="flex-[2] bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm shadow-black/20"
                >
                    {t.buttons.next} <ArrowRight className="w-4 h-4" />
                </button>
            ) : (
                <button 
                    type="submit"
                    className="flex-[2] bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm shadow-black/20"
                >
                    {t.buttons.complete} <Check className="w-4 h-4" />
                </button>
            )}
        </div>
    </form>
  )
}