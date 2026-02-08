// ELEMENTOS
const input = document.getElementById('taskInput');
const botao = document.getElementById('addTaskButton');
const lista = document.getElementById('taskList');

// ESTADO
let tarefas = [];

// =======================
// CRIAR ITEM VISUAL
function criarElementoTarefa(tarefa) {
    const item = document.createElement('li');
    item.textContent = tarefa.texto;

    // marcar como feita
    item.addEventListener('click', () => {
        item.classList.toggle('feita');
    });

    // botão excluir
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'x';
    botaoExcluir.classList.add('excluir');

    botaoExcluir.addEventListener('click', (event) => {
        event.stopPropagation();
        excluirTarefa(tarefa.id);
    });

    item.appendChild(botaoExcluir);
    lista.appendChild(item);
}

// =======================
// RENDERIZAR LISTA
function renderizarLista() {
    lista.innerHTML = '';
    tarefas.forEach(criarElementoTarefa);
}

// =======================
// ADICIONAR TAREFA
function adicionarTarefa() {
    const texto = input.value.trim();
    if (texto === '') return;

    tarefas.push({
        id: Date.now(),
        texto: texto
    });

    salvarTarefas();
    renderizarLista();
    input.value = '';
}

// =======================
// EXCLUIR TAREFA
function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas();
    renderizarLista();
}

// =======================
// SALVAR / CARREGAR
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        renderizarLista();
    }
}

// =======================
// EVENTOS
botao.addEventListener('click', adicionarTarefa);

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

// =======================
// INICIALIZAÇÃO
carregarTarefas();

