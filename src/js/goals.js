/**
 * GOALWALLET - Sistema de Metas Financeiras
 * Gerencia metas de economia e gastos
 */

const Goals = (function() {
  'use strict';

  const STORAGE_KEY = 'goalwallet_goals';

  /**
   * Estrutura de uma meta:
   * {
   *   id: "uuid",
   *   usuarioId: "uuid",
   *   titulo: "string",
   *   descricao: "string",
   *   valorMeta: number,
   *   valorAtual: number,
   *   tipo: "economia" | "gasto",
   *   categoria: "string",
   *   dataInicio: "YYYY-MM-DD",
   *   dataFim: "YYYY-MM-DD",
   *   status: "ativa" | "concluida" | "cancelada",
   *   cor: "string",
   *   dataCriacao: "timestamp ISO"
   * }
   */

  function getAllGoals() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
      return [];
    }
  }

  function saveGoals(goals) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
      return true;
    } catch (error) {
      console.error('Erro ao salvar metas:', error);
      return false;
    }
  }

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Cria nova meta
   */
  function criar(dadosMeta) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    // Validações
    if (!dadosMeta.titulo || dadosMeta.titulo.trim().length < 3) {
      return { success: false, message: 'Título deve ter pelo menos 3 caracteres' };
    }

    if (!dadosMeta.valorMeta || isNaN(dadosMeta.valorMeta) || parseFloat(dadosMeta.valorMeta) <= 0) {
      return { success: false, message: 'Valor da meta inválido' };
    }

    if (!dadosMeta.dataFim) {
      return { success: false, message: 'Data de conclusão não informada' };
    }

    const goals = getAllGoals();

    const novaMeta = {
      id: generateUUID(),
      usuarioId: session.usuarioId,
      titulo: Utils.sanitizeString(dadosMeta.titulo.trim()),
      descricao: dadosMeta.descricao ? Utils.sanitizeString(dadosMeta.descricao.trim()) : '',
      valorMeta: parseFloat(dadosMeta.valorMeta),
      valorAtual: 0,
      tipo: dadosMeta.tipo || 'economia',
      categoria: dadosMeta.categoria || 'Geral',
      dataInicio: dadosMeta.dataInicio || new Date().toISOString().split('T')[0],
      dataFim: dadosMeta.dataFim,
      status: 'ativa',
      cor: dadosMeta.cor || '#58a6ff',
      dataCriacao: new Date().toISOString()
    };

    goals.push(novaMeta);
    
    if (saveGoals(goals)) {
      return { 
        success: true, 
        message: 'Meta criada com sucesso',
        meta: novaMeta
      };
    }

    return { success: false, message: 'Erro ao salvar meta' };
  }

  /**
   * Atualiza meta
   */
  function atualizar(id, novosDados) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const goals = getAllGoals();
    const index = goals.findIndex(g => g.id === id && g.usuarioId === session.usuarioId);

    if (index === -1) {
      return { success: false, message: 'Meta não encontrada' };
    }

    const meta = goals[index];

    if (novosDados.titulo !== undefined && novosDados.titulo.trim().length >= 3) {
      meta.titulo = Utils.sanitizeString(novosDados.titulo.trim());
    }

    if (novosDados.descricao !== undefined) {
      meta.descricao = Utils.sanitizeString(novosDados.descricao.trim());
    }

    if (novosDados.valorMeta !== undefined && !isNaN(novosDados.valorMeta) && parseFloat(novosDados.valorMeta) > 0) {
      meta.valorMeta = parseFloat(novosDados.valorMeta);
    }

    if (novosDados.valorAtual !== undefined && !isNaN(novosDados.valorAtual)) {
      meta.valorAtual = parseFloat(novosDados.valorAtual);
      
      // Verifica se atingiu a meta
      if (meta.valorAtual >= meta.valorMeta && meta.status === 'ativa') {
        meta.status = 'concluida';
      }
    }

    if (novosDados.dataFim !== undefined) {
      meta.dataFim = novosDados.dataFim;
    }

    if (novosDados.status !== undefined && ['ativa', 'concluida', 'cancelada'].includes(novosDados.status)) {
      meta.status = novosDados.status;
    }

    if (novosDados.cor !== undefined) {
      meta.cor = novosDados.cor;
    }

    if (saveGoals(goals)) {
      return { 
        success: true, 
        message: 'Meta atualizada com sucesso',
        meta
      };
    }

    return { success: false, message: 'Erro ao atualizar meta' };
  }

  /**
   * Adiciona progresso à meta
   */
  function adicionarProgresso(id, valor) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const goals = getAllGoals();
    const meta = goals.find(g => g.id === id && g.usuarioId === session.usuarioId);

    if (!meta) {
      return { success: false, message: 'Meta não encontrada' };
    }

    if (meta.status !== 'ativa') {
      return { success: false, message: 'Meta não está ativa' };
    }

    meta.valorAtual += parseFloat(valor);

    // Verifica se atingiu a meta
    if (meta.valorAtual >= meta.valorMeta) {
      meta.status = 'concluida';
      
      if (saveGoals(goals)) {
        return { 
          success: true, 
          message: '🎉 Parabéns! Você atingiu sua meta!',
          meta,
          concluida: true
        };
      }
    }

    if (saveGoals(goals)) {
      return { 
        success: true, 
        message: 'Progresso atualizado',
        meta,
        concluida: false
      };
    }

    return { success: false, message: 'Erro ao atualizar progresso' };
  }

  /**
   * Exclui meta
   */
  function excluir(id) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const goals = getAllGoals();
    const index = goals.findIndex(g => g.id === id && g.usuarioId === session.usuarioId);

    if (index === -1) {
      return { success: false, message: 'Meta não encontrada' };
    }

    goals.splice(index, 1);

    if (saveGoals(goals)) {
      return { success: true, message: 'Meta excluída com sucesso' };
    }

    return { success: false, message: 'Erro ao excluir meta' };
  }

  /**
   * Obtém meta por ID
   */
  function getById(id) {
    const session = Auth.getSession();
    if (!session) return null;

    const goals = getAllGoals();
    return goals.find(g => g.id === id && g.usuarioId === session.usuarioId) || null;
  }

  /**
   * Obtém todas as metas do usuário
   */
  function getByUser(filtros = {}) {
    const session = Auth.getSession();
    if (!session) return [];

    let goals = getAllGoals().filter(g => g.usuarioId === session.usuarioId);

    // Filtro por status
    if (filtros.status) {
      goals = goals.filter(g => g.status === filtros.status);
    }

    // Filtro por tipo
    if (filtros.tipo) {
      goals = goals.filter(g => g.tipo === filtros.tipo);
    }

    return goals.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
  }

  /**
   * Calcula percentual de progresso
   */
  function getProgresso(meta) {
    if (!meta || !meta.valorMeta) return 0;
    const percentual = (meta.valorAtual / meta.valorMeta) * 100;
    return Math.min(percentual, 100);
  }

  /**
   * Calcula dias restantes
   */
  function getDiasRestantes(meta) {
    if (!meta || !meta.dataFim) return 0;
    const hoje = new Date();
    const dataFim = new Date(meta.dataFim + 'T23:59:59');
    const diff = dataFim - hoje;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Atualiza progresso automaticamente baseado em transações
   */
  function atualizarProgressoAutomatico() {
    const session = Auth.getSession();
    if (!session) return;

    const goals = getByUser({ status: 'ativa' });
    const transactions = Transactions.getByUser();

    goals.forEach(meta => {
      // Filtra transações relevantes
      const relevantes = transactions.filter(t => {
        const dataValida = t.data >= meta.dataInicio && t.data <= meta.dataFim;
        const categoriaValida = !meta.categoria || meta.categoria === 'Geral' || t.categoria === meta.categoria;
        const tipoValido = (meta.tipo === 'economia' && t.tipo === 'receita') || 
                          (meta.tipo === 'gasto' && t.tipo === 'despesa');
        return dataValida && categoriaValida && tipoValido;
      });

      // Calcula progresso
      const novoProgresso = relevantes.reduce((sum, t) => sum + t.valor, 0);
      
      if (novoProgresso !== meta.valorAtual) {
        atualizar(meta.id, { valorAtual: novoProgresso });
      }
    });
  }

  // API Pública
  return {
    criar,
    atualizar,
    adicionarProgresso,
    excluir,
    getById,
    getByUser,
    getProgresso,
    getDiasRestantes,
    atualizarProgressoAutomatico
  };
})();
