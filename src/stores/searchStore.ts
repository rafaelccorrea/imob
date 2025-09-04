import { create } from 'zustand';
import { mockProperties, mockUsers } from '../utils/mockData';

export interface SearchResult {
  id: string;
  type: 'property' | 'user' | 'deal' | 'lead';
  title: string;
  subtitle: string;
  url: string;
  icon: string;
}

interface SearchStore {
  searchTerm: string;
  isSearchOpen: boolean;
  results: SearchResult[];
  setSearchTerm: (term: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  search: (term: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchTerm: '',
  isSearchOpen: false,
  results: [],
  
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    if (term.length > 2) {
      get().search(term);
    } else {
      set({ results: [] });
    }
  },
  
  setIsSearchOpen: (open: boolean) => {
    set({ isSearchOpen: open });
  },
  
  search: (term: string) => {
    const results: SearchResult[] = [];
    
    // Buscar em imóveis
    mockProperties.forEach(property => {
      const matches = 
        property.title.toLowerCase().includes(term.toLowerCase()) ||
        property.address.neighborhood.toLowerCase().includes(term.toLowerCase()) ||
        property.address.city.toLowerCase().includes(term.toLowerCase()) ||
        property.owner.name.toLowerCase().includes(term.toLowerCase());
      
      if (matches) {
        results.push({
          id: property.id,
          type: 'property',
          title: property.title,
          subtitle: `${property.address.neighborhood}, ${property.address.city}`,
          url: `/properties`,
          icon: '🏠'
        });
      }
    });
    
    // Buscar em usuários
    mockUsers.forEach(user => {
      const matches = 
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase());
      
      if (matches) {
        results.push({
          id: user.id,
          type: 'user',
          title: user.name,
          subtitle: user.email,
          url: `/users`,
          icon: '👤'
        });
      }
    });
    
    set({ results: results.slice(0, 10) }); // Limitar a 10 resultados
  },
  
  clearSearch: () => {
    set({ searchTerm: '', results: [] });
  }
}));
