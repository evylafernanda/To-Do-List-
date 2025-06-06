function adicionarTarefa() {
    const input = document.getElementById("tarefaInput");
    const texto = input.value.trim();

    if (texto !== "") {
        const li = document.createElement("li");

        const spanTexto = document.createElement("span");
        spanTexto.textContent = texto;
        spanTexto.className = "texto-tarefa";

        spanTexto.addEventListener("click", function () {
            li.classList.toggle("completed");
            salvarTarefas();
        });

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "✎";
        botaoEditar.className = "edit-btn";
        botaoEditar.onclick = function () {
            const novoTexto = prompt("Editar tarefa:", spanTexto.textContent);
            if (novoTexto !== null && novoTexto.trim() !== "") {
                spanTexto.textContent = novoTexto.trim();
                salvarTarefas();
            }
        };

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "✕";
        botaoRemover.className = "remove-btn";
        botaoRemover.onclick = function () {
            if (confirm("Tem certeza que deseja remover esta tarefa?")) {
                li.remove();
                salvarTarefas();
            }
        };

        li.appendChild(spanTexto);
        li.appendChild(botaoEditar);
        li.appendChild(botaoRemover);

        document.getElementById("listaTarefas").appendChild(li);
        input.value = "";

        salvarTarefas();
    }
}

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll("#listaTarefas li").forEach(li => {
        tarefas.push({
            texto: li.querySelector(".texto-tarefa").textContent,
            concluida: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tarefasEB", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefasEB")) || [];
    tarefasSalvas.forEach(tarefa => {
        const input = document.getElementById("tarefaInput");
        input.value = tarefa.texto;
        adicionarTarefa();
        const ultimo = document.querySelectorAll("#listaTarefas li:last-child")[0];
        if (tarefa.concluida) {
            ultimo.classList.add("completed");
        }
    });
    document.getElementById("tarefaInput").value = "";
}

window.onload = carregarTarefas;

document.getElementById("tarefaInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});
