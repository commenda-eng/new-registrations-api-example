import React, { useState } from "react";
import {
  RegistrationFormStep,
  RegistrationFormField,
  DependentQuestion,
  Option,
  Validation,
} from "../types/formDataTypes";

interface MultiPageFormProps {
  steps: RegistrationFormStep[];
  onSubmit: (values: Record<string, any>) => void;
}

const inputClassName = "text-gray-900";

const MultiPageForm: React.FC<MultiPageFormProps> = ({ steps, onSubmit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const currentStep = steps[currentStepIndex];

  const handleInputChange = (fieldKey: string, value: any) => {
    setFormValues({ ...formValues, [fieldKey]: value });
  };

  const handleDependentQuestionChange = (
    fieldKey: string,
    dependentKey: string,
    value: any
  ) => {
    console.log(fieldKey, dependentKey, value);
    setFormValues((formValues: Record<string, any>) => {
      return {
        ...formValues,
        [dependentKey]: value,
      };
    });
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onSubmit(formValues);
    }
  };

  const renderField = (field: RegistrationFormField) => {
    return (
      <div key={field.key} className="flex flex-col max-w-[50%] p-2">
        <label className="text-md">
          {field.title}
          {field.required && " *"}
        </label>
        <p className="text-sm">{field.question}</p>
        {field.type === "boolean" && (
          <select
            className={inputClassName}
            value={formValues[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          >
            <option value="">Select...</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        )}
        {field.type === "string" && (
          <input
            className={inputClassName}
            type="text"
            value={formValues[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        )}
        {field.type === "longText" && (
          <input
            className={inputClassName}
            type="textarea"
            value={formValues[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        )}
        {field.type === "date" && (
          <input
            className={inputClassName}
            type="date"
            value={formValues[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            min={field.validations?.minDate || undefined}
            max={field.validations?.maxDate || undefined}
          />
        )}

        {field.type === "select" && field.options && (
          <select
            className={inputClassName}
            value={formValues[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          >
            <option value="">Select...</option>
            {field.options.map((option: Option) => (
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            ))}
          </select>
        )}
        {field.dependentQuestions &&
          Object.entries(field.dependentQuestions).map(
            ([parentQuestionValue, dependentQuestion]) =>
              formValues[field.key] === parentQuestionValue && (
                <div key={dependentQuestion.key} className="dependent-question">
                  <label>
                    {dependentQuestion.question}
                    {dependentQuestion.required && " *"}
                  </label>
                  <input
                    type={dependentQuestion.type}
                    value={formValues[dependentQuestion.key] || ""}
                    onChange={(e) =>
                      handleDependentQuestionChange(
                        field.key,
                        dependentQuestion.key,
                        e.target.value
                      )
                    }
                  />
                </div>
              )
          )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl">{`Step ${currentStepIndex + 1}: ${
        currentStep.step
      }`}</h2>
      {currentStep.fields.map((field) => renderField(field))}
      <div className="flex w-full justify-between">
        {currentStepIndex > 0 && (
          <button onClick={() => setCurrentStepIndex(currentStepIndex - 1)}>
            Previous
          </button>
        )}
        <button onClick={handleNext}>
          {currentStepIndex < steps.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MultiPageForm;
