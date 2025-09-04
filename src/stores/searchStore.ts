import { create } from 'zustand';
import { mockProperties, mockUsers, mockLeads, mockDeals } from '../utils/mockData';

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
    
    // Função para obter nome do agente
    const getAgentName = (agentId: string) => {
      const agent = mockUsers.find(user => user.id === agentId);
      return agent ? agent.name : 'Agente não encontrado';
    };
    
    // Buscar em imóveis
    mockProperties.forEach(property => {
      const agentName = getAgentName(property.responsibleAgentId);
      const matches = 
        property.title.toLowerCase().includes(term.toLowerCase()) ||
        property.address.neighborhood.toLowerCase().includes(term.toLowerCase()) ||
        property.address.city.toLowerCase().includes(term.toLowerCase()) ||
        property.owner.name.toLowerCase().includes(term.toLowerCase()) ||
        agentName.toLowerCase().includes(term.toLowerCase());
      
      if (matches) {
        results.push({
          id: property.id,
          type: 'property',
          title: property.title,
          subtitle: `${property.address.neighborhood}, ${property.address.city} - ${agentName}`,
          url: `/properties`,
          icon: '🏠'
        });
      }
    });
    
    // Buscar em usuários (agentes/corretores)
    mockUsers.forEach(user => {
      const matches = 
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase());
      
      if (matches) {
        const roleText = user.role === 'agent' ? 'Corretor' : 
                        user.role === 'manager' ? 'Gestor' : 
                        user.role === 'owner' ? 'Proprietário' : 
                        user.role === 'financial' ? 'Financeiro' : 
                        user.role === 'hr' ? 'RH' : user.role;
        
        results.push({
          id: user.id,
          type: 'user',
          title: user.name,
          subtitle: `${user.email} - ${roleText}`,
          url: `/users`,
          icon: '👤'
        });
      }
    });

    // Buscar em leads
    mockLeads.forEach(lead => {
      const agentName = getAgentName(lead.assignedAgentId);
      const matches = 
        lead.name.toLowerCase().includes(term.toLowerCase()) ||
        lead.email.toLowerCase().includes(term.toLowerCase()) ||
        agentName.toLowerCase().includes(term.toLowerCase());
      
      if (matches) {
        results.push({
          id: lead.id,
          type: 'lead',
          title: lead.name,
          subtitle: `${lead.email} - ${agentName}`,
          url: `/leads`,
          icon: '🎯'
        });
      }
    });

    // Buscar em deals
    mockDeals.forEach(deal => {
      const agentName = getAgentName(deal.agentId);
      const matches = 
        deal.type.toLowerCase().includes(term.toLowerCase()) ||
        deal.status.toLowerCase().includes(term.toLowerCase()) ||
        agentName.toLowerCase().includes(term.toLowerCase());
      
      if (matches) {
        const statusText = deal.status === 'signed' ? 'Assinado' :
                          deal.status === 'negotiating' ? 'Em Negociação' :
                          deal.status === 'pending' ? 'Pendente' :
                          deal.status === 'cancelled' ? 'Cancelado' : deal.status;
        
        results.push({
          id: deal.id,
          type: 'deal',
          title: `${deal.type === 'sale' ? 'Venda' : 'Locação'} - ${statusText}`,
          subtitle: `R$ ${deal.value.toLocaleString()} - ${agentName}`,
          url: `/deals`,
          icon: '💰'
        });
      }
    });
    
    set({ results: results.slice(0, 10) }); // Limitar a 10 resultados
  },
  
  clearSearch: () => {
    set({ searchTerm: '', results: [] });
  }
}));
