import React from 'react';

interface CheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  defaultChecked = false,
  checked,
  onChange,
  disabled = false
}) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : isChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    if (!isControlled) {
      setIsChecked(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={currentChecked}
        onChange={handleChange}
        disabled={disabled}
        className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
};
