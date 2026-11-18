'use client';

import PhoneInput from 'react-phone-number-input';
import { cn } from '@/lib/utils';
import 'react-phone-number-input/style.css';
import './styled-phone-input.css';
import { UI_TEXT } from '@/data/ui';

interface StyledPhoneInputProps {
  id?: string;
  value?: string;
  onChange?: (value?: string | undefined) => void;
  placeholder?: string;
  defaultCountry?: string;
  international?: boolean;
  className?: string;
  error?: boolean;
  required?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

export function StyledPhoneInput({
  id,
  value,
  onChange,
  placeholder = UI_TEXT.contact.form.phonePlaceholder,
  defaultCountry = 'ET',
  international = true,
  className,
  error,
  required,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: StyledPhoneInputProps) {
  return (
    <div className={cn('phone-input-wrapper', className)}>
      <PhoneInput
        id={id}
        required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        value={value}
        onChange={onChange as (value?: string | undefined) => void}
        placeholder={placeholder}
        defaultCountry={defaultCountry as 'ET'}
        international={international}
        // Self-hosted flags (scripts/copy-flags.mjs), not the library's default CDN
        flagUrl="/flags/{XX}.svg"
        className={cn(
          'block w-full rounded-lg border px-4 py-3',
          'focus-within:border-brand-accent/50 border-border-default bg-surface-page',
          'text-text-heading',
          error && 'border-red-500 focus-within:border-red-500'
        )}
      />
    </div>
  );
}
