const TextAreaInput = ({
  formFieldKey,
  value,
  handleInputChange,
  required,
}: {
  formFieldKey: string;
  value: string;
  handleInputChange: (key: string, value: any) => void;
  required: boolean;
}) => {
  return (
    <textarea
      className="text-gray-900 min-h-20"
      value={value || ""}
      onChange={(e) => handleInputChange(formFieldKey, e.target.value)}
      required={required}
    />
  );
};

export default TextAreaInput;
