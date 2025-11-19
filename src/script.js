/* ============================================================
   SCRIPT.JS - Central de Lógica (Auth, DB, Validações)
   ============================================================ */

const CHAVE_DB = 'goalwallet_db'; 
const CHAVE_SESSAO = 'usuario_logado_id'; 

// --- 1. INICIALIZAÇÃO DO BANCO DE DADOS ---
function iniciarBanco() {
    let db = JSON.parse(localStorage.getItem(CHAVE_DB));
    if (!db) {
        db = { 
            usuarios: [], 
            transacoes: [], 
            contas: [] 
        };
    }
    if (!db.contas) db.contas = [];
    if (!db.transacoes) db.transacoes = [];
    
    localStorage.setItem(CHAVE_DB, JSON.stringify(db));
}
iniciarBanco();

// --- 2. FUNÇÕES AUXILIARES GLOBAIS ---
function lerBanco() { 
    return JSON.parse(localStorage.getItem(CHAVE_DB)); 
}

function salvarBanco(db) { 
    localStorage.setItem(CHAVE_DB, JSON.stringify(db)); 
}

function verificarLogin() {
    if (!sessionStorage.getItem(CHAVE_SESSAO)) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function sair() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// --- 3. FUNÇÕES DE MÁSCARA E VALIDAÇÃO (CPF) ---

// Coloca pontos e traço enquanto digita
function mascaraCPF(i) {
    let v = i.value;
    if (isNaN(v[v.length - 1])) { 
        i.value = v.substring(0, v.length - 1);
        return;
    }
    i.setAttribute("maxlength", "14");
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}

// VALIDAÇÃO SIMPLIFICADA: APENAS QUANTIDADE DE DÍGITOS
function validarCPFReal(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); 
    
    // Verifica se tem 11 dígitos e não é uma sequência repetida simples
    if (cpf.length != 11 || 
        cpf == "00000000000" || cpf == "11111111111" || 
        cpf == "22222222222" || cpf == "33333333333") 
            return false;
            
    return true;
}

// --- 4. CADASTRO (Com todas as verificações) ---
function realizarCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpfInput = document.getElementById('cpf').value;
    const cpfLimpo = cpfInput.replace(/\D/g, ""); // Limpando CPF
    
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (!nome || !email || !cpfLimpo || !senha || !confirmarSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não conferem!");
        return;
    }

    // Validação Simplificada: Apenas 11 dígitos e não repetido
    if (!validarCPFReal(cpfLimpo)) {
        alert("CPF Inválido! Deve conter 11 dígitos válidos.");
        return;
    }

    const db = lerBanco();
    const usuarioExistente = db.usuarios.find(u => 
        u.email === email || u.cpf === cpfLimpo // Compara o CPF Limpo
    );

    if (usuarioExistente) {
        alert("E-mail ou CPF já cadastrados no sistema.");
        return;
    }

    // Sucesso: Salva
    db.usuarios.push({
        id: Date.now(),
        nome: nome,
        email: email,
        cpf: cpfLimpo, // Salvando apenas números (melhor para buscar no futuro)
        senha: senha
    });
    salvarBanco(db);

    alert("Conta criada com sucesso!");
    window.location.href = 'login.html'; 
}

// --- 5. LOGIN (E-mail OU CPF com correção de formato) ---
function realizarLogin(event) {
    event.preventDefault();
    const loginInput = document.getElementById('email').value; 
    const senha = document.getElementById('senha').value;
    const db = lerBanco();
    
    const usuario = db.usuarios.find(u => {
        if (loginInput.includes('@')) {
            // Busca por E-mail
            return u.email === loginInput && u.senha === senha;
        } else {
            // Busca por CPF
            
            // Limpa pontos/traços do input que o usuário digitou
            const cpfInputLimpo = loginInput.replace(/\D/g, ""); 
            
            // NOVO: Limpa pontos/traços do CPF salvo no banco (u.cpf) para garantir compatibilidade
            const cpfBancoLimpo = u.cpf.replace(/\D/g, ""); 

            // Compara o input limpo com o CPF salvo limpo
            return cpfBancoLimpo === cpfInputLimpo && u.senha === senha;
        }
    });

    if (usuario) {
        sessionStorage.setItem(CHAVE_SESSAO, usuario.id);
        sessionStorage.setItem('usuario_nome', usuario.nome);
        window.location.href = 'home.html';
    } else {
        alert("Dados incorretos! Verifique E-mail/CPF e senha.");
    }
}