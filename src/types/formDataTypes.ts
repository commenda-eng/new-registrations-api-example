export interface Option {
  display: string;
  value: string;
}

export interface Validation {
  regex?: string;
  // Date validations:
  minDate?: string;
  maxDate?: string;
}

export interface FormQuestion {
  key: string;
  question: string;
  type: string;
  options?: Option[];
  previousValue?: string;
  required: boolean;
  validations?: Validation;
}

export type RegistrationFormField = FormQuestion & {
  // Questions that must be shown only if some specific parent value is selected,
  // represented by the key in this mapping:
  dependentQuestions?: Record<string, FormQuestion>;
};

export interface RegistrationFormSection {
  key: string;
  title: string;
  subtitle?: string;
  fields: RegistrationFormField[];
}

export interface RegistrationFormStep {
  stepTitle: string;
  sections: RegistrationFormSection[];
}
