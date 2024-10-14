const StringInput = ({
  formFieldKey,
  value,
  handleInputChange,
  required,
  pattern,
}: {
  formFieldKey: string;
  value: any;
  handleInputChange: (key: string, value: any) => void;
  required: boolean;
  pattern?: string;
}) => {
  return (
    <input
      className="text-gray-900"
      type="text"
      value={value || ""}
      onChange={(e) => handleInputChange(formFieldKey, e.target.value)}
      required={required}
      pattern={pattern}
    />
  );
};

export default StringInput;
