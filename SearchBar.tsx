
import React, { useState } from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="לדוגמה: החטא ועונשו, הארי פוטר, קיצור תולדות האנושות"
          disabled={isLoading}
          dir="rtl"
          className="w-full pl-4 pr-12 py-3 bg-brand-surface border-2 border-gray-600 rounded-full text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-subtle hover:text-brand-primary disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
