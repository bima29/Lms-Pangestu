import { useMemo, useState } from 'react';

export interface Option<T = string> {
  label: string;
  value: T;
}

interface SearchSelectProps<T = string> {
  options: Option<T>[];
  value?: T;
  placeholder?: string;
  onChange: (value: T) => void;
  className?: string;
  disabled?: boolean;
}

function normalize(text: string) {
  return (text || '').toLowerCase().normalize('NFKD');
}

const SearchSelect = <T extends string | number = string>({
  options,
  value,
  placeholder = 'Select...',
  onChange,
  className = '',
  disabled
}: SearchSelectProps<T>) => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return options;
    return options.filter(o => normalize(o.label).includes(q));
  }, [options, query]);

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
      />
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        value={(value as any) ?? ''}
        onChange={(e) => onChange((e.target.value as unknown) as T)}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {filtered.map(opt => (
          <option key={`${opt.value}`} value={`${opt.value}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchSelect;
