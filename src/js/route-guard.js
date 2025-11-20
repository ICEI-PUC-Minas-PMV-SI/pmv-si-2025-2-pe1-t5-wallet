/**
 * GOALWALLET - Proteção de Rotas
 * Middleware para verificar autenticação e proteger páginas
 */

const RouteGuard = {
  /**
   * Páginas que NÃO requerem autenticação
   */
  PUBLIC_PAGES: ['index.html', 'cadastro.html'],

  /**
   * Verifica se a página atual requer autenticação
   * @returns {boolean} True se é página pública
   */
  isPublicPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return this.PUBLIC_PAGES.includes(currentPage);
  },

  /**
   * Protege a página atual - redireciona para login se não autenticado
   * Chamar no início de páginas protegidas
   */
  protect() {
    // Se é página pública, não faz nada
    if (this.isPublicPage()) {
      return;
    }

    // Verifica autenticação
    if (!Auth.isAuthenticated()) {
      Utils.showToast('Você precisa fazer login para acessar esta página', 'error');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  },

  /**
   * Redireciona usuário logado para dashboard
   * Chamar em páginas de login/cadastro
   */
  redirectIfAuthenticated() {
    if (Auth.isAuthenticated() && this.isPublicPage()) {
      window.location.href = 'dashboard.html';
    }
  },

  /**
   * Inicializa proteção automática da página
   * Adiciona listener para verificar sessão
   */
  init() {
    // Protege a página atual
    this.protect();

    // Verifica sessão periodicamente (a cada 30 segundos)
    setInterval(() => {
      if (!this.isPublicPage() && !Auth.isAuthenticated()) {
        Utils.showToast('Sessão expirada. Faça login novamente.', 'error');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }
    }, 30000);
  }
};

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RouteGuard;
}
