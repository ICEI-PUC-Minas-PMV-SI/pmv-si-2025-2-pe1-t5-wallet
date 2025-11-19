/* ============================================================
   SCRIPT.JS - GoalWallet (Com Validação Real de CPF)
   ============================================================ */

const CHAVE_DB = 'goalwallet_db'; 
const CHAVE_SESSAO = 'usuario_logado_id'; 

// --- INICIALIZAÇÃO ---
function iniciarBanco() {
    if (!localStorage.getItem(CHAVE_DB)) {
        localStorage.setItem(CHAVE_DB, JSON.stringify({ usuarios: [], transacoes: [] }));
    }
}
iniciarBanco();

// --- FUNÇÕES VISUAIS (MÁSCARA) ---
// Essa função coloca os pontos e traço automaticamente
function mascaraCPF(i) {
    let v = i.value;
    if (isNaN(v[v.length - 1])) { // Impede entrar letras
        i.value = v.substring(0, v.length - 1);
        return;
    }
    
    i.setAttribute("maxlength", "14");
    v = v.replace(/\D/g, ""); // Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca um hífen entre o terceiro e o quarto dígitos
    i.value = v;
}

// --- FUNÇÃO MATEMÁTICA (VALIDAÇÃO DE CPF) ---
function validarCPFReal(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontos e traços
    if (cpf == '') return false;
    
    // Elimina CPFs invalidos conhecidos (ex: 111.111.111-11)
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;
            
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) 
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) 
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
        
    return true;
}

// --- FUNÇÕES AUXILIARES ---
function lerBanco() { return JSON.parse(localStorage.getItem(CHAVE_DB)); }
function salvarBanco(db) { localStorage.setItem(CHAVE_DB, JSON.stringify(db)); }

// --- CADASTRO ---
function realizarCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (!nome || !email || !cpf || !senha || !confirmarSenha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não conferem!");
        return;
    }

    // 1. Validação Matemática do CPF
    if (!validarCPFReal(cpf)) {
        alert("CPF Inválido! Verifique os números.");
        return;
    }

    const db = lerBanco();

    // 2. Verifica se já existe (Compara apenas números para garantir)
    const cpfLimpo = cpf.replace(/\D/g, "");
    const cpfExiste = db.usuarios.find(u => u.cpf.replace(/\D/g, "") === cpfLimpo);
    const emailExiste = db.usuarios.find(u => u.email === email);

    if (emailExiste) { alert("E-mail já cadastrado."); return; }
    if (cpfExiste) { alert("CPF já cadastrado."); return; }

    // Salva o usuário
    db.usuarios.push({
        id: Date.now(),
        nome: nome,
        email: email,
        cpf: cpf, // Salva formatado (ex: 123.456...)
        senha: senha
    });
    salvarBanco(db);

    alert("Conta criada com sucesso!");
    window.location.href = 'login.html'; 
}

// --- LOGIN (ROBUSTO) ---
function realizarLogin(event) {
    event.preventDefault();
    const loginInput = document.getElementById('email').value; 
    const senha = document.getElementById('senha').value;
    const db = lerBanco();
    
    // Lógica Inteligente:
    // Se tem '@', busca por email exato.
    // Se não tem '@', assume que é CPF, limpa os pontos do input e do banco e compara apenas números.
    
    const usuario = db.usuarios.find(u => {
        if (loginInput.includes('@')) {
            return u.email === loginInput && u.senha === senha;
        } else {
            // Login por CPF: Limpa tudo que não é número para comparar
            const cpfInputLimpo = loginInput.replace(/\D/g, ""); 
            const cpfBancoLimpo = u.cpf.replace(/\D/g, "");
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

// --- LOGOUT ---
function sair() {
    sessionStorage.removeItem(CHAVE_SESSAO);
    sessionStorage.removeItem('usuario_nome');
    window.location.href = 'login.html';
}

// --- HOME ---
function carregarDadosHome() {
    const usuarioId = sessionStorage.getItem(CHAVE_SESSAO);
    if (!usuarioId) { window.location.href = 'login.html'; return; }

    const nome = sessionStorage.getItem('usuario_nome');
    document.getElementById('nome-usuario').innerText = `Olá, ${nome}!`;

    const db = lerBanco();
    const minhasTransacoes = db.transacoes.filter(t => t.usuarioId == usuarioId);

    let saldoTotal = 0;
    const lista = document.getElementById('lista-movimentos');
    lista.innerHTML = ''; 

    minhasTransacoes.reverse().forEach(t => {
        if (t.tipo === 'entrada') saldoTotal += t.valor;
        else saldoTotal -= t.valor;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${t.descricao}</span>
            <span class="${t.tipo === 'entrada' ? 'positivo' : 'negativo'}">
                ${t.tipo === 'entrada' ? '+' : '-'} R$ ${t.valor.toFixed(2)}
            </span>
        `;
        lista.appendChild(li);
    });
    document.getElementById('saldo-total').innerText = `R$ ${saldoTotal.toFixed(2)}`;
}

// --- NOVA TRANSAÇÃO ---
function novaTransacao(tipo) {
    const usuarioId = sessionStorage.getItem(CHAVE_SESSAO);
    const descricao = prompt(tipo === 'entrada' ? "Descrição do recebimento:" : "Descrição do gasto:");
    if (!descricao) return; 

    const valorStr = prompt("Valor (ex: 50.00):");
    const valor = parseFloat(valorStr?.replace(',', '.')); 

    if (isNaN(valor) || valor <= 0) { alert("Valor inválido!"); return; }

    const db = lerBanco();
    db.transacoes.push({
        id: Date.now(),
        usuarioId: usuarioId, 
        tipo: tipo,
        descricao: descricao,
        valor: valor,
        data: new Date().toISOString()
    });
    salvarBanco(db);
    carregarDadosHome();
}