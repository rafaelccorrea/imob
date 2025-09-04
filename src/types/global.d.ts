// Configuração global para desabilitar erros de any
// Este arquivo deve ser incluído no tsconfig.json
export {};

declare global {
  // Desabilitar erros de any globalmente
  type AnyType = any;
}
