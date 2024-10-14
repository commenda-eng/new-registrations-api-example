import React, { useState } from "react";
import {
  RegistrationFormStep,
  RegistrationFormField,
  RegistrationFormSection,
  FormQuestion,
} from "../types/formDataTypes";
import BooleanSelectInput from "./inputs/boolean-select-input";
import StringInput from "./inputs/string-input";
import TextAreaInput from "./inputs/textarea-input";
import DateInput from "./inputs/date-input";
import SelectInput from "./inputs/select-input";
import PhoneInput from "./inputs/phone-input";
import EmailInput from "./inputs/email-input";
import UrlInput from "./inputs/url-input";
import NumberInput from "./inputs/number-input";

interface MultiPageFormProps {
  steps: RegistrationFormStep[];
  onSubmit: (values: Record<string, any>) => void;
}

const MultiPageForm: React.FC<MultiPageFormProps> = ({ steps, onSubmit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const currentStep = steps[currentStepIndex];

  const handleInputChange = (fieldKey: string, value: any) => {
    setFormValues({ ...formValues, [fieldKey]: value });
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onSubmit(formValues);
    }
  };

  const renderQuestion = (field: FormQuestion) => {
    return (
      <>
        <label className="text-sm">
          {field.question || null}
          {field.required && " *"}
        </label>
        {field.type === "boolean" && (
          <BooleanSelectInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
          />
        )}
        {field.type === "text" && (
          <StringInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
            pattern={field.validations?.regex}
          />
        )}
        {field.type === "url" && (
          <UrlInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
            pattern={field.validations?.regex}
          />
        )}
        {field.type === "number" && (
          <NumberInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
          />
        )}
        {field.type === "phone" && (
          <PhoneInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
            pattern={field.validations?.regex}
          />
        )}
        {field.type === "longText" && (
          <TextAreaInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
          />
        )}
        {field.type === "date" && (
          <DateInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            min={field.validations?.minDate}
            max={field.validations?.maxDate}
            pattern={field.validations?.regex}
            required={field.required}
          />
        )}
        {field.type === "email" && (
          <EmailInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            required={field.required}
            pattern={field.validations?.regex}
          />
        )}
        {field.type === "select" && field.options && (
          <SelectInput
            formFieldKey={field.key}
            value={formValues[field.key]}
            handleInputChange={handleInputChange}
            options={field.options}
            required={field.required}
          />
        )}
      </>
    );
  };

  const renderField = (field: RegistrationFormField) => {
    return (
      <div key={field.key} className="flex flex-col p-2">
        {renderQuestion(field)}
        {field.dependentQuestions &&
          Object.entries(field.dependentQuestions).map(
            ([parentQuestionValue, dependentQuestion]) =>
              // Render the dependent question if the parent question's value
              // requires it.
              formValues[field.key] === parentQuestionValue &&
              renderQuestion(dependentQuestion)
          )}
      </div>
    );
  };

  const renderSection = (section: RegistrationFormSection) => {
    return (
      <div className="flex flex-col max-w-[50%] p-2">
        <label className="text-md">{section.title}</label>
        {section.subtitle ? (
          <label className="text-sm">{section.subtitle}</label>
        ) : null}
        <div className="flex flex-col w-full gap-2">
          {section.fields.map((field) => renderField(field))}
        </div>
      </div>
    );
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
    >
      <h2 className="text-2xl">{`Step ${currentStepIndex + 1}: ${
        currentStep.stepTitle
      }`}</h2>
      {currentStep.sections.map((section) => renderSection(section))}
      <div className="flex w-full justify-between">
        {currentStepIndex > 0 && (
          <button onClick={() => setCurrentStepIndex((i) => i - 1)}>
            Previous
          </button>
        )}
        <button type="submit">
          {currentStepIndex < steps.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default MultiPageForm;
