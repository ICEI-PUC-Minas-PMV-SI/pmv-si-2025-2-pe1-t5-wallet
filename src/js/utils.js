/**
 * GOALWALLET - Funções Utilitárias
 * Funções auxiliares para validação, formatação e geração de IDs
 */

const Utils = {
  /**
   * Gera um ID único usando timestamp e número aleatório
   * @returns {string} ID único
   */
  generateId() {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  },

  /**
   * Valida formato de email
   * @param {string} email - Email para validar
   * @returns {boolean} True se válido
   */
  validateEmail(email) {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  },

  /**
   * Valida CPF (validação básica de formato)
   * @param {string} cpf - CPF para validar
   * @returns {boolean} True se formato válido
   */
  validateCPF(cpf) {
    if (!cpf) return false;
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCPF)) return false;
    
    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;
    
    return true;
  },

  /**
   * Valida senha (mínimo 6 caracteres)
   * @param {string} senha - Senha para validar
   * @returns {boolean} True se válida
   */
  validateSenha(senha) {
    return senha && senha.length >= 6;
  },

  /**
   * Calcula força da senha
   * @param {string} senha - Senha para avaliar
   * @returns {Object} {strength: number (0-4), label: string, color: string}
   */
  getSenhaStrength(senha) {
    if (!senha) return { strength: 0, label: 'Muito fraca', color: '#ff5a5f' };
    
    let strength = 0;
    
    // Comprimento
    if (senha.length >= 6) strength++;
    if (senha.length >= 10) strength++;
    
    // Complexidade
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) strength++;
    if (/\d/.test(senha)) strength++;
    if (/[^a-zA-Z0-9]/.test(senha)) strength++;
    
    const levels = [
      { strength: 0, label: 'Muito fraca', color: '#ff5a5f' },
      { strength: 1, label: 'Fraca', color: '#ff9e4a' },
      { strength: 2, label: 'Média', color: '#ffcd3c' },
      { strength: 3, label: 'Forte', color: '#8fffa5' },
      { strength: 4, label: 'Muito forte', color: '#2ab96a' }
    ];
    
    return levels[Math.min(strength, 4)];
  },

  /**
   * Formata CPF (000.000.000-00)
   * @param {string} cpf - CPF para formatar
   * @returns {string} CPF formatado
   */
  formatCPF(cpf) {
    if (!cpf) return '';
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  /**
   * Remove formatação do CPF
   * @param {string} cpf - CPF formatado
   * @returns {string} CPF sem formatação
   */
  cleanCPF(cpf) {
    return cpf ? cpf.replace(/[^\d]/g, '') : '';
  },

  /**
   * Hash simples de senha (apenas para demo - em produção usar bcrypt)
   * ATENÇÃO: Esta é uma implementação básica para fins educacionais
   * Em produção, use bibliotecas adequadas e hash no backend
   * @param {string} senha - Senha para hash
   * @returns {string} Senha com hash
   */
  hashSenha(senha) {
    // Simples hash para demonstração (NÃO usar em produção real)
    let hash = 0;
    for (let i = 0; i < senha.length; i++) {
      const char = senha.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return `hash_${Math.abs(hash).toString(36)}`;
  },

  /**
   * Formata data para exibição (DD/MM/YYYY)
   * @param {Date|string} date - Data para formatar
   * @returns {string} Data formatada
   */
  formatDate(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  },

  /**
   * Sanitiza string para prevenir XSS básico
   * @param {string} str - String para sanitizar
   * @returns {string} String sanitizada
   */
  sanitizeString(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Exibe mensagem toast/alerta aprimorada
   * @param {string} message - Mensagem para exibir
   * @param {string} type - Tipo: 'success', 'error', 'info', 'warning'
   * @param {number} duration - Duração em ms (padrão 3000)
   */
  showToast(message, type = 'info', duration = 3000) {
    // Remove toast anterior se existir
    const existingToast = document.getElementById('goalwallet-toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Define cores e ícones por tipo
    const types = {
      success: { bg: '#2ab96a', icon: '✓' },
      error: { bg: '#ff5a5f', icon: '✕' },
      warning: { bg: '#ff9e4a', icon: '⚠' },
      info: { bg: '#58a6ff', icon: 'ℹ' }
    };

    const config = types[type] || types.info;

    // Cria novo toast
    const toast = document.createElement('div');
    toast.id = 'goalwallet-toast';
    
    toast.innerHTML = `
      <span style="font-size: 18px; margin-right: 12px;">${config.icon}</span>
      <span>${message}</span>
    `;
    
    // Estilos
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      padding: 16px 24px;
      background: ${config.bg};
      color: white;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      max-width: 360px;
      word-wrap: break-word;
      display: flex;
      align-items: center;
      font-size: 14px;
    `;

    // Adiciona animação (apenas uma vez)
    if (!document.getElementById('toast-animations')) {
      const style = document.createElement('style');
      style.id = 'toast-animations';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Remove após duração especificada
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Debounce function para otimizar eventos
   * @param {Function} func - Função para debounce
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function} Função com debounce
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Exibe feedback de validação em campo
   * @param {HTMLElement} input - Elemento input
   * @param {boolean} isValid - Se é válido
   * @param {string} message - Mensagem de erro (opcional)
   */
  showFieldFeedback(input, isValid, message = '') {
    if (!input) return;

    // Remove feedback anterior
    const existingFeedback = input.parentElement.querySelector('.field-feedback');
    if (existingFeedback) existingFeedback.remove();

    // Remove classes anteriores
    input.classList.remove('input-valid', 'input-invalid');

    if (isValid) {
      input.classList.add('input-valid');
    } else {
      input.classList.add('input-invalid');
      
      if (message) {
        const feedback = document.createElement('div');
        feedback.className = 'field-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
          color: #ff5a5f;
          font-size: 12px;
          margin-top: 4px;
          animation: fadeIn 0.2s ease;
        `;
        input.parentElement.appendChild(feedback);
      }
    }

    // Adiciona estilos de validação (apenas uma vez)
    if (!document.getElementById('validation-styles')) {
      const style = document.createElement('style');
      style.id = 'validation-styles';
      style.textContent = `
        .input-valid {
          border-color: #2ab96a !important;
        }
        .input-invalid {
          border-color: #ff5a5f !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  },

  /**
   * Mostra loading overlay
   * @param {string} message - Mensagem de loading (opcional)
   */
  showLoading(message = 'Carregando...') {
    const existing = document.getElementById('goalwallet-loading');
    if (existing) return;

    const overlay = document.createElement('div');
    overlay.id = 'goalwallet-loading';
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div class="spinner"></div>
        <p style="margin-top: 16px; color: white; font-weight: 600;">${message}</p>
      </div>
    `;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.2s ease;
    `;

    // Adiciona spinner styles
    if (!document.getElementById('spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'spinner-styles';
      style.textContent = `
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(overlay);
  },

  /**
   * Esconde loading overlay
   */
  hideLoading() {
    const loading = document.getElementById('goalwallet-loading');
    if (loading) {
      loading.style.animation = 'fadeOut 0.2s ease';
      setTimeout(() => loading.remove(), 200);
    }
  },

  /**
   * Modal de confirmação customizado
   * @param {string} message - Mensagem de confirmação
   * @param {string} confirmText - Texto do botão confirmar
   * @param {string} cancelText - Texto do botão cancelar
   * @returns {Promise<boolean>} Promise que resolve com true/false
   */
  showConfirm(message, confirmText = 'Confirmar', cancelText = 'Cancelar') {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.id = 'goalwallet-confirm';
      modal.innerHTML = `
        <div class="confirm-dialog">
          <p class="confirm-message">${message}</p>
          <div class="confirm-buttons">
            <button class="btn-cancel">${cancelText}</button>
            <button class="btn-confirm">${confirmText}</button>
          </div>
        </div>
      `;
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.2s ease;
      `;

      // Adiciona estilos do modal
      if (!document.getElementById('confirm-styles')) {
        const style = document.createElement('style');
        style.id = 'confirm-styles';
        style.textContent = `
          .confirm-dialog {
            background: #1e1e2e;
            padding: 24px;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          }
          .confirm-message {
            color: white;
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          .confirm-buttons {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
          }
          .btn-cancel, .btn-confirm {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
          }
          .btn-cancel {
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }
          .btn-cancel:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          .btn-confirm {
            background: #ff5a5f;
            color: white;
          }
          .btn-confirm:hover {
            background: #ff4449;
            transform: translateY(-1px);
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      const closeModal = (result) => {
        modal.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => {
          modal.remove();
          resolve(result);
        }, 200);
      };

      modal.querySelector('.btn-cancel').addEventListener('click', () => closeModal(false));
      modal.querySelector('.btn-confirm').addEventListener('click', () => closeModal(true));

      document.body.appendChild(modal);
    });
  },

  /**
   * Verifica se localStorage está disponível e funcionando
   * @returns {boolean} True se localStorage disponível
   */
  isLocalStorageAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Salva dados no localStorage com tratamento de erros
   * @param {string} key - Chave do item
   * @param {any} value - Valor a ser salvo
   * @returns {boolean} True se salvou com sucesso
   */
  setLocalStorage(key, value) {
    try {
      if (!this.isLocalStorageAvailable()) {
        console.error('localStorage não disponível');
        this.showToast('Erro: Armazenamento não disponível no navegador', 'error');
        return false;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
      if (e.name === 'QuotaExceededError') {
        this.showToast('Erro: Limite de armazenamento excedido', 'error');
      } else {
        this.showToast('Erro ao salvar dados', 'error');
      }
      return false;
    }
  },

  /**
   * Recupera dados do localStorage com tratamento de erros
   * @param {string} key - Chave do item
   * @param {any} defaultValue - Valor padrão se não encontrar
   * @returns {any} Dados recuperados ou valor padrão
   */
  getLocalStorage(key, defaultValue = null) {
    try {
      if (!this.isLocalStorageAvailable()) {
        console.error('localStorage não disponível');
        return defaultValue;
      }
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Erro ao recuperar do localStorage:', e);
      return defaultValue;
    }
  },

  /**
   * Remove item do localStorage com tratamento de erros
   * @param {string} key - Chave do item
   * @returns {boolean} True se removeu com sucesso
   */
  removeLocalStorage(key) {
    try {
      if (!this.isLocalStorageAvailable()) {
        return false;
      }
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Erro ao remover do localStorage:', e);
      return false;
    }
  }
};

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
