/**
 * GOALWALLET - Sistema de Autenticação
 * Gerencia registro, login, logout e sessões de usuários usando localStorage
 */

const Auth = {
  // Chaves para localStorage
  STORAGE_KEYS: {
    USERS: 'goalwallet_users',
    SESSION: 'goalwallet_session'
  },

  /**
   * Inicializa o sistema de autenticação
   */
  init() {
    // Garante que a lista de usuários existe
    if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify([]));
    }
  },

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário {nome, email, cpf, senha}
   * @returns {Object} {success: boolean, message: string, user?: Object}
   */
  registrar(userData) {
    try {
      const { nome, email, cpf, senha } = userData;

      // Validações
      if (!nome || nome.trim().length < 3) {
        return { success: false, message: 'Nome deve ter pelo menos 3 caracteres' };
      }

      if (!Utils.validateEmail(email)) {
        return { success: false, message: 'Email inválido' };
      }

      if (!Utils.validateCPF(cpf)) {
        return { success: false, message: 'CPF inválido' };
      }

      if (!Utils.validateSenha(senha)) {
        return { success: false, message: 'Senha deve ter pelo menos 6 caracteres' };
      }

      // Verifica se usuário já existe
      const users = this.getAllUsers();
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (emailExists) {
        return { success: false, message: 'Este email já está cadastrado' };
      }

      const cpfClean = Utils.cleanCPF(cpf);
      const cpfExists = users.some(u => u.cpf === cpfClean);
      
      if (cpfExists) {
        return { success: false, message: 'Este CPF já está cadastrado' };
      }

      // Cria novo usuário
      const newUser = {
        id: Utils.generateId(),
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        cpf: cpfClean,
        senha: Utils.hashSenha(senha), // Hash da senha
        dataCriacao: new Date().toISOString()
      };

      // Salva usuário
      users.push(newUser);
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));

      // Retorna usuário sem a senha
      const { senha: _, ...userWithoutPassword } = newUser;
      
      return { 
        success: true, 
        message: 'Cadastro realizado com sucesso!',
        user: userWithoutPassword
      };

    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return { success: false, message: 'Erro ao realizar cadastro. Tente novamente.' };
    }
  },

  /**
   * Realiza login do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Object} {success: boolean, message: string, user?: Object}
   */
  login(email, senha) {
    try {
      // Validações básicas
      if (!email || !senha) {
        return { success: false, message: 'Preencha email e senha' };
      }

      if (!Utils.validateEmail(email)) {
        return { success: false, message: 'Email inválido' };
      }

      // Busca usuário
      const users = this.getAllUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        return { success: false, message: 'Email ou senha incorretos' };
      }

      // Verifica senha
      const senhaHash = Utils.hashSenha(senha);
      if (user.senha !== senhaHash) {
        return { success: false, message: 'Email ou senha incorretos' };
      }

      // Cria sessão
      const session = {
        usuarioId: user.id,
        email: user.email,
        nome: user.nome,
        dataLogin: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEYS.SESSION, JSON.stringify(session));

      // Retorna usuário sem senha
      const { senha: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: userWithoutPassword
      };

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, message: 'Erro ao fazer login. Tente novamente.' };
    }
  },

  /**
   * Realiza logout do usuário
   */
  logout() {
    localStorage.removeItem(this.STORAGE_KEYS.SESSION);
    window.location.href = 'index.html';
  },

  /**
   * Verifica se há um usuário logado
   * @returns {boolean} True se há sessão ativa
   */
  isAuthenticated() {
    const session = this.getSession();
    return session !== null;
  },

  /**
   * Obtém a sessão atual
   * @returns {Object|null} Dados da sessão ou null
   */
  getSession() {
    try {
      const sessionData = localStorage.getItem(this.STORAGE_KEYS.SESSION);
      if (!sessionData) return null;
      
      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Erro ao obter sessão:', error);
      return null;
    }
  },

  /**
   * Obtém dados do usuário logado
   * @returns {Object|null} Dados do usuário ou null
   */
  getCurrentUser() {
    const session = this.getSession();
    if (!session) return null;

    const users = this.getAllUsers();
    const user = users.find(u => u.id === session.usuarioId);
    
    if (!user) return null;

    // Retorna sem a senha
    const { senha: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  /**
   * Obtém todos os usuários (privado - sem senhas)
   * @returns {Array} Lista de usuários
   */
  getAllUsers() {
    try {
      const usersData = localStorage.getItem(this.STORAGE_KEYS.USERS);
      if (!usersData) return [];
      
      return JSON.parse(usersData);
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      return [];
    }
  },

  /**
   * Atualiza dados do usuário
   * @param {string} userId - ID do usuário
   * @param {Object} updates - Dados para atualizar
   * @returns {Object} {success: boolean, message: string}
   */
  updateUser(userId, updates) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);

      if (userIndex === -1) {
        return { success: false, message: 'Usuário não encontrado' };
      }

      // Não permite atualizar email, cpf ou senha por esta função
      const { email, cpf, senha, id, dataCriacao, ...allowedUpdates } = updates;

      users[userIndex] = {
        ...users[userIndex],
        ...allowedUpdates
      };

      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));

      // Atualiza sessão se for o usuário logado
      const session = this.getSession();
      if (session && session.usuarioId === userId) {
        session.nome = users[userIndex].nome;
        localStorage.setItem(this.STORAGE_KEYS.SESSION, JSON.stringify(session));
      }

      return { success: true, message: 'Dados atualizados com sucesso' };

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { success: false, message: 'Erro ao atualizar dados' };
    }
  },

  /**
   * Limpa todos os dados (usar com cuidado - apenas para desenvolvimento)
   */
  clearAllData() {
    if (confirm('ATENÇÃO: Isso irá apagar TODOS os dados. Confirma?')) {
      localStorage.clear();
      Utils.showToast('Todos os dados foram apagados', 'info');
      window.location.href = 'index.html';
    }
  }
};

// Inicializa ao carregar
Auth.init();

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
