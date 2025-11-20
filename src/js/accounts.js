/**
 * GOALWALLET - Gestão de Contas Bancárias
 * Gerencia contas bancárias dos usuários (CRUD completo)
 */

const Accounts = {
  // Chave para localStorage
  STORAGE_KEY: 'goalwallet_accounts',

  /**
   * Inicializa o sistema de contas
   */
  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  },

  /**
   * Cria uma nova conta bancária
   * @param {Object} accountData - Dados da conta {nome, tipo, data, saldo, cor}
   * @returns {Object} {success: boolean, message: string, account?: Object}
   */
  criar(accountData) {
    try {
      // Verifica se usuário está logado
      const session = Auth.getSession();
      if (!session) {
        return { success: false, message: 'Usuário não autenticado' };
      }

      const { nome, tipo, data, saldo, cor } = accountData;

      // Validações
      if (!nome || nome.trim().length < 2) {
        return { success: false, message: 'Nome do banco deve ter pelo menos 2 caracteres' };
      }

      if (!tipo) {
        return { success: false, message: 'Selecione o tipo de conta' };
      }

      // Valida data (mm/aa)
      if (data && !/^\d{2}\/\d{2}$/.test(data)) {
        return { success: false, message: 'Data inválida. Use o formato mm/aa' };
      }

      // Converte saldo para número
      let saldoNum = 0;
      if (saldo !== undefined && saldo !== null && saldo !== '') {
        saldoNum = parseFloat(String(saldo).replace(',', '.'));
        if (isNaN(saldoNum)) {
          return { success: false, message: 'Saldo inválido' };
        }
      }

      // Cria nova conta
      const newAccount = {
        id: Utils.generateId(),
        usuarioId: session.usuarioId,
        nome: nome.trim(),
        tipo: tipo,
        data: data || '',
        saldo: saldoNum,
        cor: cor || this.gerarCorAleatoria(),
        dataCriacao: new Date().toISOString()
      };

      // Salva conta
      const accounts = this.getAll();
      accounts.push(newAccount);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(accounts));

      return {
        success: true,
        message: 'Conta criada com sucesso!',
        account: newAccount
      };

    } catch (error) {
      console.error('Erro ao criar conta:', error);
      return { success: false, message: 'Erro ao criar conta. Tente novamente.' };
    }
  },

  /**
   * Atualiza uma conta existente
   * @param {string} accountId - ID da conta
   * @param {Object} updates - Dados para atualizar
   * @returns {Object} {success: boolean, message: string}
   */
  atualizar(accountId, updates) {
    try {
      const session = Auth.getSession();
      if (!session) {
        return { success: false, message: 'Usuário não autenticado' };
      }

      const accounts = this.getAll();
      const accountIndex = accounts.findIndex(a => a.id === accountId);

      if (accountIndex === -1) {
        return { success: false, message: 'Conta não encontrada' };
      }

      // Verifica se a conta pertence ao usuário
      if (accounts[accountIndex].usuarioId !== session.usuarioId) {
        return { success: false, message: 'Acesso negado' };
      }

      // Validações dos campos a atualizar
      if (updates.nome && updates.nome.trim().length < 2) {
        return { success: false, message: 'Nome deve ter pelo menos 2 caracteres' };
      }

      if (updates.data && !/^\d{2}\/\d{2}$/.test(updates.data)) {
        return { success: false, message: 'Data inválida. Use mm/aa' };
      }

      if (updates.saldo !== undefined) {
        const saldoNum = parseFloat(String(updates.saldo).replace(',', '.'));
        if (isNaN(saldoNum)) {
          return { success: false, message: 'Saldo inválido' };
        }
        updates.saldo = saldoNum;
      }

      // Não permite atualizar id, usuarioId ou dataCriacao
      const { id, usuarioId, dataCriacao, ...allowedUpdates } = updates;

      // Atualiza conta
      accounts[accountIndex] = {
        ...accounts[accountIndex],
        ...allowedUpdates,
        dataAtualizacao: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(accounts));

      return { success: true, message: 'Conta atualizada com sucesso!' };

    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      return { success: false, message: 'Erro ao atualizar conta. Tente novamente.' };
    }
  },

  /**
   * Exclui uma conta
   * @param {string} accountId - ID da conta
   * @returns {Object} {success: boolean, message: string}
   */
  excluir(accountId) {
    try {
      const session = Auth.getSession();
      if (!session) {
        return { success: false, message: 'Usuário não autenticado' };
      }

      const accounts = this.getAll();
      const account = accounts.find(a => a.id === accountId);

      if (!account) {
        return { success: false, message: 'Conta não encontrada' };
      }

      // Verifica se a conta pertence ao usuário
      if (account.usuarioId !== session.usuarioId) {
        return { success: false, message: 'Acesso negado' };
      }

      // Remove conta
      const updatedAccounts = accounts.filter(a => a.id !== accountId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedAccounts));

      return { success: true, message: 'Conta excluída com sucesso!' };

    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      return { success: false, message: 'Erro ao excluir conta. Tente novamente.' };
    }
  },

  /**
   * Obtém todas as contas (de todos os usuários)
   * @returns {Array} Lista de contas
   */
  getAll() {
    try {
      const accountsData = localStorage.getItem(this.STORAGE_KEY);
      if (!accountsData) return [];
      return JSON.parse(accountsData);
    } catch (error) {
      console.error('Erro ao obter contas:', error);
      return [];
    }
  },

  /**
   * Obtém contas do usuário logado
   * @returns {Array} Lista de contas do usuário
   */
  getByUser() {
    const session = Auth.getSession();
    if (!session) return [];

    const allAccounts = this.getAll();
    return allAccounts.filter(a => a.usuarioId === session.usuarioId);
  },

  /**
   * Obtém uma conta específica por ID
   * @param {string} accountId - ID da conta
   * @returns {Object|null} Dados da conta ou null
   */
  getById(accountId) {
    const accounts = this.getAll();
    return accounts.find(a => a.id === accountId) || null;
  },

  /**
   * Calcula saldo total de todas as contas do usuário
   * @returns {number} Saldo consolidado
   */
  getSaldoConsolidado() {
    const userAccounts = this.getByUser();
    return userAccounts.reduce((total, account) => total + (account.saldo || 0), 0);
  },

  /**
   * Formata saldo em reais (R$)
   * @param {number} value - Valor para formatar
   * @returns {string} Valor formatado
   */
  formatarSaldo(value) {
    const num = Number(value) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  },

  /**
   * Gera cor aleatória para nova conta (gradiente)
   * @returns {string} Gradiente CSS
   */
  gerarCorAleatoria() {
    const gradients = [
      'linear-gradient(135deg,#7b2ff7,#a445f0)',
      'linear-gradient(135deg,#ffd24c,#ffb84d)',
      'linear-gradient(135deg,#6b3e00,#c0782a)',
      'linear-gradient(135deg,#2dd4bf,#14b8a6)',
      'linear-gradient(135deg,#60a5fa,#3b82f6)',
      'linear-gradient(135deg,#f472b6,#fb7185)',
      'linear-gradient(135deg,#34d399,#10b981)',
      'linear-gradient(135deg,#a78bfa,#8b5cf6)',
      'linear-gradient(135deg,#fbbf24,#f59e0b)',
      'linear-gradient(135deg,#ec4899,#db2777)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  },

  /**
   * Gera iniciais do nome do banco para avatar
   * @param {string} nome - Nome do banco
   * @returns {string} Iniciais (1 ou 2 letras)
   */
  gerarIniciais(nome) {
    if (!nome) return 'B';
    
    const parts = nome.trim().toUpperCase().split(' ');
    if (parts.length === 1) {
      return parts[0].slice(0, 2);
    }
    return (parts[0][0] || '') + (parts[1][0] || '');
  },

  /**
   * Atualiza saldo de uma conta
   * @param {string} accountId - ID da conta
   * @param {number} novoSaldo - Novo saldo
   * @returns {Object} {success: boolean, message: string}
   */
  atualizarSaldo(accountId, novoSaldo) {
    return this.atualizar(accountId, { saldo: novoSaldo });
  },

  /**
   * Adiciona valor ao saldo de uma conta
   * @param {string} accountId - ID da conta
   * @param {number} valor - Valor a adicionar (positivo ou negativo)
   * @returns {Object} {success: boolean, message: string}
   */
  adicionarAoSaldo(accountId, valor) {
    const account = this.getById(accountId);
    if (!account) {
      return { success: false, message: 'Conta não encontrada' };
    }

    const novoSaldo = (account.saldo || 0) + valor;
    return this.atualizarSaldo(accountId, novoSaldo);
  },

  /**
   * Obtém estatísticas das contas do usuário
   * @returns {Object} Estatísticas
   */
  getEstatisticas() {
    const accounts = this.getByUser();
    
    return {
      totalContas: accounts.length,
      saldoTotal: this.getSaldoConsolidado(),
      contaPositiva: accounts.filter(a => a.saldo > 0).length,
      contaNegativa: accounts.filter(a => a.saldo < 0).length,
      contaZero: accounts.filter(a => a.saldo === 0).length,
      maiorSaldo: Math.max(...accounts.map(a => a.saldo || 0), 0),
      menorSaldo: Math.min(...accounts.map(a => a.saldo || 0), 0)
    };
  },

  /**
   * Limpa todas as contas do usuário atual (usar com cuidado)
   */
  limparContasUsuario() {
    const session = Auth.getSession();
    if (!session) return;

    const allAccounts = this.getAll();
    const otherAccounts = allAccounts.filter(a => a.usuarioId !== session.usuarioId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(otherAccounts));
  }
};

// Inicializa ao carregar
Accounts.init();

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Accounts;
}
