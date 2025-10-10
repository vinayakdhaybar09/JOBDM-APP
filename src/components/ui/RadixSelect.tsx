import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';

interface RadixSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

export const RadixSelect: React.FC<RadixSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  label,
  error,
  className = '',
}) => (
  <div className={className}>
    {label && (
      <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
    )}
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={`w-full flex justify-between items-center rounded-lg border border-border bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-orange text-base ${error ? 'border-red-400' : ''}`}
        aria-label={label}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className="ml-2 w-5 h-5" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white border border-border rounded-lg shadow-lg z-20">
          <Select.Viewport>
            {/* Placeholder item if needed */}
            {options[0] && options[0].value === '' && (
              <Select.Item value="__none__" disabled className="flex items-center px-4 py-2 text-base text-text-tertiary select-none">
                <Select.ItemText>{options[0].label}</Select.ItemText>
              </Select.Item>
            )}
            {options
              .filter(opt => opt.value !== '')
              .map(opt => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="flex items-center px-4 py-2 text-base cursor-pointer hover:bg-primary-orange/10 select-none radix-disabled:opacity-50 radix-highlighted:bg-primary-orange/10"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className="ml-auto">
                    <CheckIcon className="w-4 h-4 text-primary-orange" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    {error && <p className="mt-1 text-red-600 text-xs">{error}</p>}
  </div>
);
