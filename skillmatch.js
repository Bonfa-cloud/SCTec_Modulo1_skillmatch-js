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
calcularCompatibilidade(candidato) {
  const possui = this.competencias.filter(
   this.competencias => candidato.includes(this.competencias)
        );

   return (possui.length / this.competencias.length) * 100;
    }

    // Identifica as habilidades que faltam
    encontrarFaltantes(candidato) {
    return this.competencias.filter(
     competencias => !candidato.includes(competencias)
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

    // Informa o tipo da vaga
    tipo() {
        return "Vaga geral";
    }
}


