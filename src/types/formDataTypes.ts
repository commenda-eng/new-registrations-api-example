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

export interface DependentQuestion {
  key: string;
  question: string;
  type: string;
  options?: Option[];
  validations?: Validation;
  required: boolean;
}

export interface RegistrationFormField {
  key: string;
  title: string;
  question: string;
  type: string;
  options?: Option[];
  previousValue?: any;
  required: boolean;
  validations?: Validation;
  dependentQuestions?: Record<string, DependentQuestion>;
}

export interface RegistrationFormStep {
  step: string;
  fields: RegistrationFormField[];
}
