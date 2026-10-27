/*
  PROJETO: SkillMatch JS
  Objetivo: comparar competências de um candidato com as vagas disponiveis
  de Front-End Júnior e recomendar o que precisa estudar.
*/


// Bloco 1 -  Competências do candidato //

const perfilCandidato = {
  nome = "Lucas"
  competencias: ["HTML", "CSS", "JS"]
};

// Bloco 2 - Classe vagas disponíveis //

class Vaga {
constructor(nome, competencias) {
  this.nome = nome;
  this.competencias = competencias;
}

 // Como calcular a porcentagem referente à compatibilidade
calcularCompatibilidade(perfilCandidato) {
  const possui = this.competencias.filter(
   this.competencias => perfilCandidato.includes(this.competencias)
        );

   return (possui.length / this.competencias.length) * 100;
    }

    // Identifica as habilidades que faltam
encontrarFaltantes(perfilCandidato) {
    return this.competencias.filter(
     competencias => !perfilCandidato.includes(competencias)
        );
    }


    // Classificar os niveis de compatibilidade
classificar(percentual) {
 if (percentual >= 80) {
            return "Alta compatibilidade";
        } else if (percentual >= 50) {
            return "Média compatibilidade";
        } else {
            return "Baixa compatibilidade";
        }
    }

    // Qual o tipo da vaga
    tipo() {
        return "Vaga geral";
    }
}


// Bloco 3 — Herança direcionada a objetos
class VagaFrontEnd extends Vaga {
    constructor(nome, competencias) {
        super(nome, competencias);
    }

    tipo() {
        return "Vaga Front-End";
    }
}


// Bloco 4 — Vagas e competências

const vagasDisponiveis = [
    new VagaFrontEnd(
        "Desenvolvedor Web Júnior",
        ["HTML", "CSS", "JavaScript"]
    ),

    new VagaFrontEnd(
        "Desenvolvedor Front-End Júnior",
        ["HTML", "CSS", "JavaScript", "React"]
    ),

    new VagaFrontEnd(
        "Estagiário Web",
        ["HTML", "CSS"]
    )
];

// Bloco 5 — Promise e Async/Await

function carregarVagas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(vagasDisponiveis);
            } catch (erro) {
                reject(erro);
            }
        }, 1000);
    });
}


// Bloco 6 - Mostrar Resultado - Callback

function mostrarResultado(callback) {
    callback();
}


// Bloco 7 - Contador

function criarContador() {
    let total = 0;

    return function (incrementar = false) {
        if (incrementar) {
            total++;
        }

        return total;
    };
}


// Bloco 8 - Recomendações de estudos

const recomendacoes = {
    JavaScript: "Estudar variáveis, funções, arrays e objetos.",
    React: "Estudar componentes, props e estado."
};

function gerarPlanoEstudo(resultados, vagas) {
    const todasFaltantes = resultados.flatMap(
        resultado => resultado.faltantes
    );

    const competenciasUnicas = [...new Set(todasFaltantes)];

    const plano = competenciasUnicas.map(habilidade => {
        const quantidadeVagas = vagas.filter(
            vaga => vaga.competencias.includes(habilidade)
        ).length;

        return {
            competencias: competencias,
            quantidadeVagas: quantidadeVagas,
            recomendacao: recomendacoes[competencias]
        };
    });

    // Foco nas competências exigidas pelo maior número de vagas
    return plano.sort(
        (a, b) => b.quantidadeVagas - a.quantidadeVagas
    );
}
// Bloco 9 - Parte principal

async function iniciar() {
    console.log("===== SKILLMATCH JS =====");
    console.log("Candidato:", candidato.nome);
    console.log("Minhas competencias:", candidato.competencias.join(", "));

    console.log("\nCarregando vagas...");

    const vagas = await carregarVagas();

    console.log("Vagas carregadas!");

    const contar = criarContador();

    const resultados = vagas.map(vaga => {
        const percentual = vaga.calcularCompatibilidade(
            candidato.competencias
        );

        const faltantes = vaga.encontrarFaltantes(
            candidato.habilidades
        );

        mostrarResultado(() => {
            console.log("\n-------------------------");
            console.log("Vaga:", vaga.nome);
            console.log("Tipo:", vaga.tipo());
            console.log(
                "Compatibilidade:",
                percentual.toFixed(2) + "%"
            );
            console.log("Classificação:", vaga.classificar(percentual));

            if (faltantes.length === 0) {
                console.log("Habilidades faltantes: nenhuma");
            } else {
                console.log(
                    "Habilidades faltantes:",
                    faltantes.join(", ")
                );
            }
        });

        contar(true);

        return {
            vaga,
            percentual,
            faltantes
        };
    });

    // Encontra a vaga com maior compatibilidade
    const melhor = resultados.reduce((anterior, atual) => {
        if (atual.percentual > anterior.percentual) {
            return atual;
        }

        return anterior;
    });

    console.log("\n===== MELHOR VAGA =====");
    console.log("Cargo:", melhor.vaga.nome);
    console.log(
        "Compatibilidade:",
        melhor.percentual.toFixed(2) + "%"
    );

    // Procura a primeira vaga com compatibilidade de 80% ou mais
    const vagaAlta = resultados.find(
        resultado => resultado.percentual >= 80
    );

    if (vagaAlta) {
        console.log(
            "\nVaga com alta compatibilidade:",
            vagaAlta.vaga.nome
        );
    }

    // Cria o plano de estudo
    const plano = gerarPlanoEstudo(resultados, vagas);

    console.log("\n===== PLANO DE ESTUDO =====");

    if (plano.length === 0) {
        console.log("Você já possui todas as habilidades necessárias!");
    } else {
        for (let indice = 0; indice < plano.length; indice++) {
            const item = plano[indice];

            console.log(
                (indice + 1) + ". " +
                item.habilidade + " — " +
                item.recomendacao +
                " Exigida por " +
                item.quantidadeVagas +
                " vaga(s)."
            );
        }
    }

    console.log("\nVagas analisadas:", contar());
    console.log("Simulação concluída!");
}
