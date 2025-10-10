import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';

interface Option {
  label: string;
  value: string;
}

interface RadixMultiSelectProps {
  options: Option[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export const RadixMultiSelect: React.FC<RadixMultiSelectProps> = ({
  options,
  values,
  onValuesChange,
  placeholder = 'Select...',
  className = '',
  label
}) => {
  function handleToggle(val: string) {
    if (values.includes(val)) {
      onValuesChange(values.filter(v => v !== val));
    } else {
      onValuesChange([...values, val]);
    }
  }
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
      )}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="w-full flex justify-between items-center rounded-lg border border-border bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base"
            type="button"
          >
            <span>
              {values.length > 0 ? `Selected (${values.length})` : placeholder}
            </span>
            <ChevronDownIcon className="ml-2 w-5 h-5" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white border border-border rounded-lg shadow-lg z-20 w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto">
            {options.map(opt => {
              const checked = values.includes(opt.value);
              return (
                <DropdownMenu.Item
                  className={`flex items-center px-4 py-2 text-base cursor-pointer hover:bg-primary-orange/10 select-none radix-disabled:opacity-50`}
                  key={opt.value}
                  onSelect={e => {
                    e.preventDefault();
                    handleToggle(opt.value);
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    readOnly
                    checked={!!checked}
                  />
                  {opt.label}
                  {checked && <CheckIcon className="w-5 h-5 ml-auto text-primary-orange" />}
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
