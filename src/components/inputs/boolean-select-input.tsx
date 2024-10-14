const BooleanSelectInput = ({
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
    <select
      className="text-gray-900"
      value={value || ""}
      onChange={(e) => handleInputChange(formFieldKey, e.target.value)}
      required={required}
    >
      <option value="">Select...</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  );
};

export default BooleanSelectInput;
