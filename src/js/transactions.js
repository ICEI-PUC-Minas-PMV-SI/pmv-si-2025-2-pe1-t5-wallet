/**
 * Módulo de Transações (Receitas e Despesas)
 * Gerencia CRUD de transações e atualiza saldos das contas
 */

const Transactions = (function() {
  'use strict';

  const STORAGE_KEY = 'goalwallet_transactions';

  /**
   * Estrutura de uma transação:
   * {
   *   id: "uuid",
   *   usuarioId: "uuid",
   *   contaId: "uuid",
   *   tipo: "receita" | "despesa",
   *   categoria: "string",
   *   descricao: "string",
   *   valor: number,
   *   data: "YYYY-MM-DD",
   *   dataRegistro: "timestamp ISO",
   *   observacoes: "string" (opcional)
   * }
   */

  // Categorias padrão
  const CATEGORIAS_RECEITA = [
    'Salário',
    'Freelance',
    'Investimentos',
    'Vendas',
    'Presente',
    'Restituição',
    'Outros'
  ];

  const CATEGORIAS_DESPESA = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Compras',
    'Contas',
    'Investimentos',
    'Outros'
  ];

  /**
   * Obtém todas as transações do localStorage
   */
  function getAllTransactions() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      return [];
    }
  }

  /**
   * Salva transações no localStorage
   */
  function saveTransactions(transactions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      return true;
    } catch (error) {
      console.error('Erro ao salvar transações:', error);
      return false;
    }
  }

  /**
   * Gera UUID v4
   */
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Atualiza o saldo de uma conta após criar/editar/excluir transação
   */
  function atualizarSaldoConta(contaId) {
    if (!contaId) return;

    const session = Auth.getSession();
    if (!session) return;

    // Calcula novo saldo baseado nas transações
    const transactions = getByAccount(contaId);
    let novoSaldo = 0;

    transactions.forEach(t => {
      if (t.tipo === 'receita') {
        novoSaldo += parseFloat(t.valor);
      } else if (t.tipo === 'despesa') {
        novoSaldo -= parseFloat(t.valor);
      }
    });

    // Atualiza a conta
    Accounts.atualizar(contaId, { saldo: novoSaldo });
  }

  /**
   * Cria uma nova transação
   */
  function criar(dadosTransacao) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    // Validações
    if (!dadosTransacao.contaId) {
      return { success: false, message: 'Conta não informada' };
    }

    if (!dadosTransacao.tipo || !['receita', 'despesa'].includes(dadosTransacao.tipo)) {
      return { success: false, message: 'Tipo de transação inválido' };
    }

    if (!dadosTransacao.categoria || dadosTransacao.categoria.trim() === '') {
      return { success: false, message: 'Categoria não informada' };
    }

    if (!dadosTransacao.descricao || dadosTransacao.descricao.trim() === '') {
      return { success: false, message: 'Descrição não informada' };
    }

    if (!dadosTransacao.valor || isNaN(dadosTransacao.valor) || parseFloat(dadosTransacao.valor) <= 0) {
      return { success: false, message: 'Valor inválido' };
    }

    if (!dadosTransacao.data) {
      return { success: false, message: 'Data não informada' };
    }

    // Verifica se a conta existe e pertence ao usuário
    const conta = Accounts.getById(dadosTransacao.contaId);
    if (!conta || conta.usuarioId !== session.usuarioId) {
      return { success: false, message: 'Conta inválida ou não pertence ao usuário' };
    }

    const transactions = getAllTransactions();

    const novaTransacao = {
      id: generateUUID(),
      usuarioId: session.usuarioId,
      contaId: Utils.sanitizeString(dadosTransacao.contaId),
      tipo: dadosTransacao.tipo,
      categoria: Utils.sanitizeString(dadosTransacao.categoria),
      descricao: Utils.sanitizeString(dadosTransacao.descricao),
      valor: parseFloat(dadosTransacao.valor),
      data: dadosTransacao.data,
      dataRegistro: new Date().toISOString(),
      observacoes: dadosTransacao.observacoes ? Utils.sanitizeString(dadosTransacao.observacoes) : ''
    };

    transactions.push(novaTransacao);
    
    if (saveTransactions(transactions)) {
      // Atualiza o saldo da conta
      atualizarSaldoConta(dadosTransacao.contaId);
      
      return { 
        success: true, 
        message: 'Transação criada com sucesso',
        transacao: novaTransacao
      };
    }

    return { success: false, message: 'Erro ao salvar transação' };
  }

  /**
   * Atualiza uma transação existente
   */
  function atualizar(id, novosDados) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const transactions = getAllTransactions();
    const index = transactions.findIndex(t => t.id === id && t.usuarioId === session.usuarioId);

    if (index === -1) {
      return { success: false, message: 'Transação não encontrada' };
    }

    const transacaoOriginal = transactions[index];
    const contaIdAnterior = transacaoOriginal.contaId;

    // Atualiza campos permitidos
    if (novosDados.contaId !== undefined) {
      const conta = Accounts.getById(novosDados.contaId);
      if (!conta || conta.usuarioId !== session.usuarioId) {
        return { success: false, message: 'Conta inválida' };
      }
      transactions[index].contaId = novosDados.contaId;
    }

    if (novosDados.tipo !== undefined && ['receita', 'despesa'].includes(novosDados.tipo)) {
      transactions[index].tipo = novosDados.tipo;
    }

    if (novosDados.categoria !== undefined && novosDados.categoria.trim() !== '') {
      transactions[index].categoria = Utils.sanitizeString(novosDados.categoria);
    }

    if (novosDados.descricao !== undefined && novosDados.descricao.trim() !== '') {
      transactions[index].descricao = Utils.sanitizeString(novosDados.descricao);
    }

    if (novosDados.valor !== undefined && !isNaN(novosDados.valor) && parseFloat(novosDados.valor) > 0) {
      transactions[index].valor = parseFloat(novosDados.valor);
    }

    if (novosDados.data !== undefined) {
      transactions[index].data = novosDados.data;
    }

    if (novosDados.observacoes !== undefined) {
      transactions[index].observacoes = Utils.sanitizeString(novosDados.observacoes);
    }

    if (saveTransactions(transactions)) {
      // Atualiza saldo da conta anterior (se mudou)
      if (novosDados.contaId && novosDados.contaId !== contaIdAnterior) {
        atualizarSaldoConta(contaIdAnterior);
      }
      
      // Atualiza saldo da conta atual
      atualizarSaldoConta(transactions[index].contaId);
      
      return { 
        success: true, 
        message: 'Transação atualizada com sucesso',
        transacao: transactions[index]
      };
    }

    return { success: false, message: 'Erro ao atualizar transação' };
  }

  /**
   * Exclui uma transação
   */
  function excluir(id) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const transactions = getAllTransactions();
    const index = transactions.findIndex(t => t.id === id && t.usuarioId === session.usuarioId);

    if (index === -1) {
      return { success: false, message: 'Transação não encontrada' };
    }

    const contaId = transactions[index].contaId;
    transactions.splice(index, 1);

    if (saveTransactions(transactions)) {
      // Atualiza saldo da conta
      atualizarSaldoConta(contaId);
      
      return { success: true, message: 'Transação excluída com sucesso' };
    }

    return { success: false, message: 'Erro ao excluir transação' };
  }

  /**
   * Obtém transação por ID
   */
  function getById(id) {
    const session = Auth.getSession();
    if (!session) return null;

    const transactions = getAllTransactions();
    return transactions.find(t => t.id === id && t.usuarioId === session.usuarioId) || null;
  }

  /**
   * Obtém todas as transações do usuário logado
   */
  function getByUser() {
    const session = Auth.getSession();
    if (!session) return [];

    const transactions = getAllTransactions();
    return transactions.filter(t => t.usuarioId === session.usuarioId);
  }

  /**
   * Obtém transações de uma conta específica
   */
  function getByAccount(contaId) {
    const session = Auth.getSession();
    if (!session) return [];

    const transactions = getAllTransactions();
    return transactions.filter(t => 
      t.usuarioId === session.usuarioId && 
      t.contaId === contaId
    );
  }

  /**
   * Obtém transações filtradas
   */
  function getFiltered(filtros = {}) {
    let transactions = getByUser();

    // Filtro por tipo
    if (filtros.tipo && ['receita', 'despesa'].includes(filtros.tipo)) {
      transactions = transactions.filter(t => t.tipo === filtros.tipo);
    }

    // Filtro por conta
    if (filtros.contaId) {
      transactions = transactions.filter(t => t.contaId === filtros.contaId);
    }

    // Filtro por categoria
    if (filtros.categoria) {
      transactions = transactions.filter(t => t.categoria === filtros.categoria);
    }

    // Filtro por período (data início e fim)
    if (filtros.dataInicio) {
      transactions = transactions.filter(t => t.data >= filtros.dataInicio);
    }

    if (filtros.dataFim) {
      transactions = transactions.filter(t => t.data <= filtros.dataFim);
    }

    // Filtro por busca de texto (descrição ou observações)
    if (filtros.busca) {
      const busca = filtros.busca.toLowerCase();
      transactions = transactions.filter(t => 
        t.descricao.toLowerCase().includes(busca) ||
        (t.observacoes && t.observacoes.toLowerCase().includes(busca))
      );
    }

    // Ordenação (padrão: mais recentes primeiro)
    transactions.sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);
      return dataB - dataA;
    });

    return transactions;
  }

  /**
   * Obtém estatísticas de transações
   */
  function getEstatisticas(filtros = {}) {
    const transactions = getFiltered(filtros);

    let totalReceitas = 0;
    let totalDespesas = 0;
    let quantidadeReceitas = 0;
    let quantidadeDespesas = 0;

    transactions.forEach(t => {
      if (t.tipo === 'receita') {
        totalReceitas += t.valor;
        quantidadeReceitas++;
      } else if (t.tipo === 'despesa') {
        totalDespesas += t.valor;
        quantidadeDespesas++;
      }
    });

    const saldo = totalReceitas - totalDespesas;

    return {
      totalReceitas,
      totalDespesas,
      saldo,
      quantidadeReceitas,
      quantidadeDespesas,
      totalTransacoes: transactions.length
    };
  }

  /**
   * Obtém transações agrupadas por categoria
   */
  function getPorCategoria(tipo = null) {
    let transactions = getByUser();

    if (tipo) {
      transactions = transactions.filter(t => t.tipo === tipo);
    }

    const agrupado = {};

    transactions.forEach(t => {
      if (!agrupado[t.categoria]) {
        agrupado[t.categoria] = {
          categoria: t.categoria,
          tipo: t.tipo,
          total: 0,
          quantidade: 0
        };
      }

      agrupado[t.categoria].total += t.valor;
      agrupado[t.categoria].quantidade++;
    });

    return Object.values(agrupado).sort((a, b) => b.total - a.total);
  }

  /**
   * Formata valor para exibição
   */
  function formatarValor(valor, mostrarSinal = false) {
    const sinal = mostrarSinal && valor >= 0 ? '+' : '';
    return sinal + 'R$ ' + parseFloat(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Formata data para exibição
   */
  function formatarData(data) {
    const d = new Date(data + 'T00:00:00');
    return d.toLocaleDateString('pt-BR');
  }

  // API Pública
  return {
    criar,
    atualizar,
    excluir,
    getById,
    getByUser,
    getByAccount,
    getFiltered,
    getEstatisticas,
    getPorCategoria,
    formatarValor,
    formatarData,
    CATEGORIAS_RECEITA,
    CATEGORIAS_DESPESA
  };
})();
