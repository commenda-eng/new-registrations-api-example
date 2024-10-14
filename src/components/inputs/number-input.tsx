const NumberInput = ({
  formFieldKey,
  value,
  handleInputChange,
  required,
}: {
  formFieldKey: string;
  value: any;
  handleInputChange: (key: string, value: any) => void;
  required: boolean;
}) => {
  return (
    <input
      className="text-gray-900"
      type="number"
      required={required}
      value={value || ""}
      onChange={(e) => handleInputChange(formFieldKey, e.target.value)}
    />
  );
};

export default NumberInput;
