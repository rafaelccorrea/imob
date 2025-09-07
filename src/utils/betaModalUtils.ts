/**
 * Utilitários para gerenciar o modal beta
 * Útil para desenvolvimento e testes
 */

const BETA_MODAL_KEY = 'beta-modal-dismissed';

/**
 * Reseta o estado do modal beta (remove do localStorage)
 * Útil para testar o modal novamente durante o desenvolvimento
 */
export const resetBetaModal = () => {
  localStorage.removeItem(BETA_MODAL_KEY);
  console.log('Modal beta resetado. Recarregue a página para ver o modal novamente.');
};

/**
 * Verifica se o modal beta foi fechado permanentemente
 */
export const isBetaModalDismissed = (): boolean => {
  return localStorage.getItem(BETA_MODAL_KEY) === 'true';
};

/**
 * Força o modal beta a aparecer (remove do localStorage)
 * Útil para demonstrações
 */
export const forceShowBetaModal = () => {
  localStorage.removeItem(BETA_MODAL_KEY);
  window.location.reload();
};

// Expor funções globalmente para facilitar testes no console
if (typeof window !== 'undefined') {
  (window as any).resetBetaModal = resetBetaModal;
  (window as any).isBetaModalDismissed = isBetaModalDismissed;
  (window as any).forceShowBetaModal = forceShowBetaModal;
}
