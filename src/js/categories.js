/**
 * GOALWALLET - Sistema de Categorias
 * Gerencia categorias personalizadas para transações
 */

const Categories = (function() {
  'use strict';

  const STORAGE_KEY = 'goalwallet_categories';

  // Categorias padrão
  const DEFAULT_CATEGORIES = {
    receitas: [
      { id: 'sal', nome: 'Salário', cor: '#2ab96a', icone: '💰' },
      { id: 'free', nome: 'Freelance', cor: '#58a6ff', icone: '💼' },
      { id: 'inv', nome: 'Investimentos', cor: '#8fffa5', icone: '📈' },
      { id: 'ven', nome: 'Vendas', cor: '#ffcd3c', icone: '🛒' },
      { id: 'pre', nome: 'Presente', cor: '#ff9e4a', icone: '🎁' },
      { id: 'out-r', nome: 'Outros', cor: '#a8b9cc', icone: '💵' }
    ],
    despesas: [
      { id: 'ali', nome: 'Alimentação', cor: '#ff5a5f', icone: '🍔' },
      { id: 'tra', nome: 'Transporte', cor: '#ff9e4a', icone: '🚗' },
      { id: 'mor', nome: 'Moradia', cor: '#ffcd3c', icone: '🏠' },
      { id: 'sau', nome: 'Saúde', cor: '#8fffa5', icone: '🏥' },
      { id: 'edu', nome: 'Educação', cor: '#58a6ff', icone: '📚' },
      { id: 'laz', nome: 'Lazer', cor: '#a8b9cc', icone: '🎮' },
      { id: 'com', nome: 'Compras', cor: '#ff6b9d', icone: '🛍️' },
      { id: 'con', nome: 'Contas', cor: '#ff5a5f', icone: '📄' },
      { id: 'inv-d', nome: 'Investimentos', cor: '#2ab96a', icone: '💹' },
      { id: 'out-d', nome: 'Outros', cor: '#6c757d', icone: '💳' }
    ]
  };

  /**
   * Inicializa categorias com valores padrão
   */
  function init() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    }
  }

  /**
   * Obtém todas as categorias
   */
  function getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      return DEFAULT_CATEGORIES;
    }
  }

  /**
   * Obtém categorias por tipo
   */
  function getByType(tipo) {
    const all = getAll();
    return tipo === 'receita' ? all.receitas : all.despesas;
  }

  /**
   * Obtém categoria por ID
   */
  function getById(id, tipo) {
    const categories = getByType(tipo);
    return categories.find(c => c.id === id) || null;
  }

  /**
   * Cria nova categoria personalizada
   */
  function criar(tipo, dados) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    if (!dados.nome || dados.nome.trim().length < 2) {
      return { success: false, message: 'Nome da categoria deve ter pelo menos 2 caracteres' };
    }

    if (!tipo || !['receita', 'despesa'].includes(tipo)) {
      return { success: false, message: 'Tipo inválido' };
    }

    const all = getAll();
    const targetArray = tipo === 'receita' ? all.receitas : all.despesas;

    // Verifica duplicatas
    if (targetArray.some(c => c.nome.toLowerCase() === dados.nome.trim().toLowerCase())) {
      return { success: false, message: 'Categoria já existe' };
    }

    const novaCategoria = {
      id: `custom-${Date.now()}`,
      nome: Utils.sanitizeString(dados.nome.trim()),
      cor: dados.cor || '#58a6ff',
      icone: dados.icone || '📌',
      custom: true,
      usuarioId: session.usuarioId
    };

    targetArray.push(novaCategoria);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return { 
        success: true, 
        message: 'Categoria criada com sucesso',
        categoria: novaCategoria
      };
    } catch (error) {
      return { success: false, message: 'Erro ao salvar categoria' };
    }
  }

  /**
   * Atualiza categoria personalizada
   */
  function atualizar(id, tipo, novosDados) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const all = getAll();
    const targetArray = tipo === 'receita' ? all.receitas : all.despesas;
    const index = targetArray.findIndex(c => c.id === id);

    if (index === -1) {
      return { success: false, message: 'Categoria não encontrada' };
    }

    const categoria = targetArray[index];

    // Só permite editar categorias personalizadas do usuário
    if (!categoria.custom || categoria.usuarioId !== session.usuarioId) {
      return { success: false, message: 'Não é possível editar esta categoria' };
    }

    if (novosDados.nome !== undefined && novosDados.nome.trim().length >= 2) {
      categoria.nome = Utils.sanitizeString(novosDados.nome.trim());
    }

    if (novosDados.cor !== undefined) {
      categoria.cor = novosDados.cor;
    }

    if (novosDados.icone !== undefined) {
      categoria.icone = novosDados.icone;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return { 
        success: true, 
        message: 'Categoria atualizada com sucesso',
        categoria
      };
    } catch (error) {
      return { success: false, message: 'Erro ao atualizar categoria' };
    }
  }

  /**
   * Exclui categoria personalizada
   */
  function excluir(id, tipo) {
    const session = Auth.getSession();
    if (!session) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const all = getAll();
    const targetArray = tipo === 'receita' ? all.receitas : all.despesas;
    const index = targetArray.findIndex(c => c.id === id);

    if (index === -1) {
      return { success: false, message: 'Categoria não encontrada' };
    }

    const categoria = targetArray[index];

    // Só permite excluir categorias personalizadas do usuário
    if (!categoria.custom || categoria.usuarioId !== session.usuarioId) {
      return { success: false, message: 'Não é possível excluir esta categoria' };
    }

    // Verifica se existem transações usando esta categoria
    const transactions = Transactions.getByUser();
    const emUso = transactions.some(t => t.categoria === categoria.nome);

    if (emUso) {
      return { 
        success: false, 
        message: 'Categoria está em uso em transações. Remova ou altere as transações primeiro.' 
      };
    }

    targetArray.splice(index, 1);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return { success: true, message: 'Categoria excluída com sucesso' };
    } catch (error) {
      return { success: false, message: 'Erro ao excluir categoria' };
    }
  }

  /**
   * Reseta para categorias padrão
   */
  function resetToDefault() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      return { success: true, message: 'Categorias restauradas para padrão' };
    } catch (error) {
      return { success: false, message: 'Erro ao resetar categorias' };
    }
  }

  /**
   * Obtém estatísticas por categoria
   */
  function getEstatisticas(tipo = null, filtros = {}) {
    const transactions = Transactions.getFiltered(filtros);
    const categorias = {};

    transactions.forEach(t => {
      if (tipo && t.tipo !== tipo) return;

      const catNome = t.categoria || 'Sem categoria';
      
      if (!categorias[catNome]) {
        categorias[catNome] = {
          nome: catNome,
          tipo: t.tipo,
          total: 0,
          quantidade: 0,
          percentual: 0
        };
      }

      categorias[catNome].total += t.valor;
      categorias[catNome].quantidade++;
    });

    // Calcula percentuais
    const totalGeral = Object.values(categorias).reduce((sum, cat) => sum + cat.total, 0);
    Object.values(categorias).forEach(cat => {
      cat.percentual = totalGeral > 0 ? ((cat.total / totalGeral) * 100) : 0;
    });

    return Object.values(categorias).sort((a, b) => b.total - a.total);
  }

  // API Pública
  return {
    init,
    getAll,
    getByType,
    getById,
    criar,
    atualizar,
    excluir,
    resetToDefault,
    getEstatisticas,
    DEFAULT_CATEGORIES
  };
})();
