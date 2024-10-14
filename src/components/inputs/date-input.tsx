type DateValidations = {
  minDate?: string;
  maxDate?: string;
};

const DateInput = ({
  formFieldKey,
  value,
  handleInputChange,
  required,
  min,
  max,
  pattern,
}: {
  formFieldKey: string;
  value: any;
  handleInputChange: (key: string, value: any) => void;
  required: boolean;
  min?: string;
  max?: string;
  pattern?: string;
}) => {
  return (
    <input
      className="text-gray-900"
      type="date"
      value={value || ""}
      onChange={(e) => handleInputChange(formFieldKey, e.target.value)}
      min={min}
      max={max}
      pattern={pattern}
      required={required}
    />
  );
};

export default DateInput;
