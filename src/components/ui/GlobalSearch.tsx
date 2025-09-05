import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useSearchStore } from '../../stores';

interface SearchResult {
  id: string;
  type: 'property' | 'client' | 'lead' | 'deal' | 'user';
  title: string;
  subtitle?: string;
  data: any;
}

export const GlobalSearch: React.FC = () => {
  const { searchTerm, results, isSearchOpen, setSearchTerm, setIsSearchOpen, clearSearch } = useSearchStore();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fechar busca quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  // Focar no input quando abrir
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleResultClick = (result: SearchResult) => {
    // Construir URL baseada no tipo do resultado
    const url = `/${result.type}s/${result.id}`;
    navigate(url);
    setIsSearchOpen(false);
    clearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      clearSearch();
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400 dark:text-gray-300" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar... (Ctrl+K)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-10 w-80 rounded-md border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:text-white"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isSearchOpen && (searchTerm.length > 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary-50 dark:hover:bg-secondary-700 flex items-center space-x-3 transition-colors"
                >
                  <span className="text-lg">{result.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-secondary-900 dark:text-secondary-100 truncate">
                      {result.title}
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 truncate">
                      {result.subtitle}
                    </div>
                  </div>
                  <div className="text-xs text-secondary-400 dark:text-secondary-500 capitalize">
                    {result.type}
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm.length > 2 ? (
            <div className="px-4 py-8 text-center text-secondary-500 dark:text-secondary-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum resultado encontrado</p>
              <p className="text-sm">Tente buscar por outro termo</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
