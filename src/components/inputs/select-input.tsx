import { Option } from "@/types/formDataTypes";

type SelectOptions = Option[];

const SelectInput = ({
  formFieldKey,
  value,
  handleInputChange,
  options,
  required,
}: {
  formFieldKey: string;
  value: any;
  handleInputChange: (key: string, value: any) => void;
  options: SelectOptions;
  required: boolean;
}) => {
  return (
    <select
      className="text-gray-900"
      value={value || ""}
      required={required}
      onChange={(e) => handleInputChange(formFieldKey, e.target.value)}
    >
      <option value="">Select...</option>
      {options.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.display}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
