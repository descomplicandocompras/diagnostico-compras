import { useState } from "react";
import "./App.css";

const quizData = [
  { question: "Há quanto tempo você atua na área de compras?", options: [{ texto: "Menos de 6 meses", valor: 0 }, { texto: "De 6 meses a 2 anos", valor: 0.5 }, { texto: "Mais de 2 anos", valor: 1 }], peso: 1 },
  { question: "Você realiza pedidos de compras no sistema da empresa?", options: [{ texto: "Nunca utilizei", valor: 0 }, { texto: "Faço com orientação", valor: 0.5 }, { texto: "Domino o processo", valor: 1 }], peso: 1 },
  { question: "Você acompanha o status dos pedidos que gera?", options: [{ texto: "Não acompanho", valor: 0 }, { texto: "Acompanho às vezes", valor: 0.5 }, { texto: "Sim, sempre acompanho", valor: 1 }], peso: 1 },
  { question: "Você cobra fornecedores quando há atrasos?", options: [{ texto: "Nunca", valor: 0 }, { texto: "Depende do caso", valor: 0.5 }, { texto: "Sim, sempre cobro e registro", valor: 1 }], peso: 1 },
  { question: "Você compara propostas apenas por preço?", options: [{ texto: "Sim, só comparo preço", valor: 0 }, { texto: "Considero alguns critérios", valor: 0.5 }, { texto: "Analiso qualidade, prazo, impostos e riscos", valor: 1 }], peso: 2 }, 
  { question: "Você já usou Curva ABC?", options: [{ texto: "Nunca usei", valor: 0 }, { texto: "Já vi, mas não aplico no dia a dia", valor: 0.5 }, { texto: "Sim, uso para definir prioridades", valor: 1 }], peso: 2 },
  { question: "Você revisa unidade de medida e descrição dos itens?", options: [{ texto: "Não reviso", valor: 0 }, { texto: "Reviso às vezes", valor: 0.5 }, { texto: "Sempre reviso antes de finalizar", valor: 1 }], peso: 2 },
  { question: "Qual seu domínio do sistema ERP da empresa?", options: [{ texto: "Nunca usei", valor: 0 }, { texto: "Uso com ajuda", valor: 0.5 }, { texto: "Tenho domínio completo", valor: 1 }], peso: 2 },
  { question: "Você entende NCM, CFOP e CST?", options: [{ texto: "Não sei o que é isso", valor: 0 }, { texto: "Já ouvi falar", valor: 0.5 }, { texto: "Sim, aplico na rotina", valor: 1 }], peso: 3 },
  { question: "Você confere os impostos de notas fiscais?", options: [{ texto: "Nunca conferi", valor: 0 }, { texto: "Confiro quando tenho dúvida", valor: 0.5 }, { texto: "Sim, sempre confiro", valor: 1 }], peso: 3 },
  { question: "Você sabe quando aplicar ICMS-ST ou IPI?", options: [{ texto: "Não entendo esses impostos", valor: 0 }, { texto: "Tenho noção básica", valor: 0.5 }, { texto: "Sim, sei aplicar conforme o caso", valor: 1 }], peso: 3 },
  { question: "Sua empresa recupera crédito de impostos nas compras?", options: [{ texto: "Não sei", valor: 0 }, { texto: "Acredito que sim, mas não me envolvo", valor: 0.5 }, { texto: "Sim, participo dessa conferência", valor: 1 }], peso: 3 },
  { question: "Você já elaborou ou participou de um planejamento de compras com base em consumo previsto ou histórico?", options: [{ texto: "Nunca participei disso", valor: 0 }, { texto: "Já vi ser feito, mas não atuei diretamente", valor: 0.5 }, { texto: "Sim, fiz previsões e participei da estratégia", valor: 1 }], peso: 2 },
  { question: "Você sabe o regime tributário da sua empresa?", options: [{ texto: "Não sei informar", valor: 0 }, { texto: "Sei qual é, mas não entendo o impacto", valor: 0.5 }, { texto: "Sim, sei e entendo o impacto nas compras", valor: 1 }], peso: 2 },
  { question: "Você já identificou e corrigiu um erro que poderia gerar prejuízo (fiscal ou operacional)?", options: [{ texto: "Nunca percebi", valor: 0 }, { texto: "Já percebi, mas não atuei", valor: 0.5 }, { texto: "Sim, identifiquei e corrigi", valor: 1 }], peso: 3 },
  { question: "Em situações urgentes, você já tomou decisões sem esperar aprovação formal?", options: [{ texto: "Nunca tomei decisões sozinho", valor: 0 }, { texto: "Já tomei, mas com receio ou insegurança", valor: 0.5 }, { texto: "Sim, tomei e assumi responsabilidade pelos resultados", valor: 1 }], peso: 3 },
  { question: "Você consegue conduzir uma compra do início ao fim com autonomia (desde a requisição até a entrega)?", options: [{ texto: "Não, preciso de orientação em cada etapa", valor: 0 }, { texto: "Faço parte do processo com alguma autonomia", valor: 0.5 }, { texto: "Sim, conduzo todas as etapas com segurança", valor: 1 }], peso: 3 },
  { question: "Você já propôs ou implementou melhorias que geraram resultado prático nas compras?", options: [{ texto: "Nunca propus", valor: 0 }, { texto: "Já sugeri algo informalmente", valor: 0.5 }, { texto: "Sim, executei ou acompanhei melhorias com resultado", valor: 1 }], peso: 4 }, 
  { question: "Outros colegas já buscaram sua ajuda ou opinião técnica para tomar decisões?", options: [{ texto: "Nunca fui referência para outros", valor: 0 }, { texto: "Às vezes pedem minha opinião", valor: 0.5 }, { texto: "Sim, frequentemente sou consultado ou sou referência técnica", valor: 1 }], peso: 2 },
  { question: "Você já participou da automatização de alguma tarefa ou processo de compras?", options: [{ texto: "Nunca participei disso", valor: 0 }, { texto: "Já vi acontecer na empresa", valor: 0.5 }, { texto: "Sim, participei ou propus alguma automação", valor: 1 }], peso: 2 },
  { question: "Você já participou da substituição de um fornecedor crítico por problemas de desempenho?", options: [{ texto: "Nunca atuei nesse tipo de situação", valor: 0 }, { texto: "Já apoiei alguém no processo", valor: 0.5 }, { texto: "Sim, participei diretamente da análise e da troca", valor: 1 }], peso: 3 },
  { question: "Você já participou de compras internacionais (importações)?", options: [{ texto: "Nunca atuei com importação", valor: 0 }, { texto: "Já apoiei, mas sem responsabilidade direta", valor: 0.5 }, { texto: "Sim, participei ativamente da negociação e processo", valor: 1 }], peso: 3 },
  { question: "Você acompanha prazos de entrega dos fornecedores?", options: [{ texto: "Não acompanho", valor: 0 }, { texto: "Uso planilhas ou e-mails", valor: 0.5 }, { texto: "Acompanho com indicadores", valor: 1 }], peso: 2 },
  { question: "Você já participou da escolha de um fornecedor?", options: [{ texto: "Nunca participei", valor: 0 }, { texto: "Já dei minha opinião", valor: 0.5 }, { texto: "Sim, participei ativamente", valor: 1 }], peso: 2 },
  { question: "Você usa alguma ferramenta para acompanhar compras?", options: [{ texto: "Não uso nada", valor: 0 }, { texto: "Uso planilhas simples", valor: 0.5 }, { texto: "Uso ferramentas com controle estruturado", valor: 1 }], peso: 2 },
  { question: "Você já interagiu com a área fiscal ou contábil para resolver dúvidas sobre impostos ou documentos?", options: [{ texto: "Nunca interagi com essas áreas", valor: 0 }, { texto: "Já conversei em alguns casos", valor: 0.5 }, { texto: "Sim, tenho rotina de alinhamento com essas áreas", valor: 1 }], peso: 2 },
  { question: "Você participa de reuniões com outras áreas?", options: [{ texto: "Nunca participei", valor: 0 }, { texto: "De vez em quando", valor: 0.5 }, { texto: "Sim, participo com frequência", valor: 1 }], peso: 2 },
  { question: "Você justifica escolhas com critérios técnicos?", options: [{ texto: "Nunca justifico", valor: 0 }, { texto: "Só informalmente", valor: 0.5 }, { texto: "Sim, documento as justificativas", valor: 1 }], peso: 2 },  
  { question: "Você já negociou preços ou prazos?", options: [{ texto: "Nunca negociei", valor: 0 }, { texto: "Poucas vezes", valor: 0.5 }, { texto: "Sim, com frequência", valor: 1 }], peso: 3 },
  { question: "Você sabe o que é ‘saving’ (economia gerada na compra)?", options: [{ texto: "Não sei o que é isso", valor: 0 }, { texto: "Tenho noção básica", valor: 0.5 }, { texto: "Sim, aplico com indicadores", valor: 1 }], peso: 2 },
  { question: "Você já fez planejamento de compras por demanda?", options: [{ texto: "Nunca fiz", valor: 0 }, { texto: "Já tentei algo básico", valor: 0.5 }, { texto: "Sim, com metas e previsões", valor: 1 }], peso: 2 },
  { question: "Você conhece métodos como Strategic Sourcing (compras estratégicas) ou TCO (custo total)?", options: [{ texto: "Não conheço", valor: 0 }, { texto: "Já estudei ou vi em curso", valor: 0.5 }, { texto: "Sim, aplico na prática", valor: 1 }], peso: 2 },
  { question: "Você já orientou colegas iniciantes na área?", options: [{ texto: "Nunca fiz isso", valor: 0 }, { texto: "Ajudei informalmente", valor: 0.5 }, { texto: "Fui mentor ou instrutor", valor: 1 }], peso: 2 },
  { question: "Você entende como compras impactam no fluxo de caixa?", options: [{ texto: "Nunca pensei nisso", valor: 0 }, { texto: "Tenho noção básica", valor: 0.5 }, { texto: "Consigo mensurar esse impacto", valor: 1 }], peso: 3 },
  { question: "Você tem plano de carreira definido em compras?", options: [{ texto: "Não sei para onde estou indo", valor: 0 }, { texto: "Estou explorando possibilidades", valor: 0.5 }, { texto: "Tenho metas claras definidas", valor: 1 }], peso: 1 },
  { question: "Você já analisou contratos de fornecimento, incluindo cláusulas como prazos, garantias ou reajustes?", options: [{ texto: "Nunca tive acesso a contratos", valor: 0 }, { texto: "Já vi algumas cláusulas, mas sem aprofundar", valor: 0.5 }, { texto: "Sim, analiso com atenção os termos contratuais", valor: 1 }], peso: 2 },
  { question: "Você já participou de eventos ou cursos da área?", options: [{ texto: "Nunca busquei isso", valor: 0 }, { texto: "Alguns, mas sem constância", valor: 0.5 }, { texto: "Sim, frequentemente", valor: 1 }], peso: 1 },
  { question: "Você acompanha tendências como ESG, IA ou automação?", options: [{ texto: "Não me envolvo com isso", valor: 0 }, { texto: "Ouço falar, mas não aprofundo", valor: 0.5 }, { texto: "Sim, estou atualizado", valor: 1 }], peso: 2 },
  { question: "Você já analisou como uma decisão de compra impacta o financeiro da empresa (ex: prazo, estoque, fluxo de caixa)?", options: [{ texto: "Nunca pensei nisso", valor: 0 }, { texto: "Já considerei, mas sem aprofundar", valor: 0.5 }, { texto: "Sim, analiso antes de decidir", valor: 1 }], peso: 3 },
  { question: "Você já usou IA, RPA ou automações nas compras?", options: [{ texto: "Nunca usei", valor: 0 }, { texto: "Já vi funcionando", valor: 0.5 }, { texto: "Sim, aplico no dia a dia", valor: 1 }], peso: 2 },
  { question: "Você sabe criar KPIs de desempenho em compras?", options: [{ texto: "Não sei criar", valor: 0 }, { texto: "Sei o conceito, mas não aplico", valor: 0.5 }, { texto: "Sim, crio indicadores relevantes", valor: 1 }], peso: 2 },
  { question: "Você acompanha indicadores de compras como saving, lead time ou curva ABC?", options: [{ texto: "Nunca analisei", valor: 0 }, { texto: "Acompanho alguns", valor: 0.5 }, { texto: "Sim, faço isso regularmente", valor: 1 }], peso: 2 },
  { question: "Você já participou da avaliação e homologação de fornecedores?", options: [{ texto: "Nunca atuei nisso", valor: 0 }, { texto: "Já apoiei o processo", valor: 0.5 }, { texto: "Sim, atuei diretamente com critérios de desempenho", valor: 1 }], peso: 3 },
  { question: "Você considera dados de estoque ou curva de giro antes de efetuar uma compra?", options: [{ texto: "Não, só atendo requisições", valor: 0 }, { texto: "Às vezes verifico o estoque", valor: 0.5 }, { texto: "Sim, analiso giro e saldo antes de comprar", valor: 1 }], peso: 3 },
  { question: "Você já participou de auditorias na área?", options: [{ texto: "Nunca participei", valor: 0 }, { texto: "Já fui envolvido", valor: 0.5 }, { texto: "Fui responsável por apresentar processos", valor: 1 }], peso: 2 },
  { question: "Você já analisou riscos de falha de fornecimento?", options: [{ texto: "Nunca analisei", valor: 0 }, { texto: "Já pensei sobre isso", valor: 0.5 }, { texto: "Sim, considero nas compras", valor: 1 }], peso: 2 },
  { question: "Você usa Excel, Power BI ou outros sistemas para relatórios?", options: [{ texto: "Nunca usei", valor: 0 }, { texto: "Tenho noção básica", valor: 0.5 }, { texto: "Sim, aplico na rotina", valor: 1 }], peso: 2 },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userData, setUserData] = useState({ nome: "", email: "" });
  const [resultado, setResultado] = useState<any>(null);

  const handleAnswer = (valor: number) => {
    const updatedAnswers = [...answers, valor];
    setAnswers(updatedAnswers);
    if (step + 1 < quizData.length) setStep(step + 1);
    else setShowForm(true);
  };

  const calcularPontuacao = (respostas: number[]) => {
    let pontuacaoTotal = 0;
    let pesoTotal = 0;

    respostas.forEach((valor, index) => {
      const pergunta = quizData[index];
      pontuacaoTotal += valor * pergunta.peso;
      pesoTotal += pergunta.peso;
    });

    return (pontuacaoTotal / pesoTotal) * 100;
  };

  const classificarNivel = (score: number) => {
    if (score < 15) return { nivel: "Estagiário", descricao: "Você está no início da jornada. Ideal para quem está aprendendo sobre a área." };
    if (score < 25) return { nivel: "Auxiliar de Compras", descricao: "Você está ganhando base. Foque em entender processos e sistemas." };
    if (score < 35) return { nivel: "Assistente de Compras", descricao: "Você já executa com apoio. Hora de buscar mais autonomia e visão fiscal." };
    if (score < 50) return { nivel: "Comprador Júnior", descricao: "Você tem atuação prática. Evolua em negociação e leitura técnica." };
    if (score < 60) return { nivel: "Comprador Pleno", descricao: "Você tem boa base técnica. Comece a pensar estrategicamente." };
    if (score < 70) return { nivel: "Comprador Sênior", descricao: "Você atua com estratégia e autonomia. Foco em liderança e indicadores." };
    if (score < 80) return { nivel: "Coordenador de Compras", descricao: "Você já lidera processos. Hora de dominar gestão de equipe e orçamento." };
    if (score < 90) return { nivel: "Gerente de Compras", descricao: "Você possui visão ampla. Atuação direta com estratégia, metas e resultado." };
    return { nivel: "Diretor de Compras", descricao: "Você pensa em nível de negócios. É referência em decisões estratégicas e gestão de riscos." };
  };

  const handleSubmit = () => {
    const totalScore = calcularPontuacao(answers);
    const resultadoFinal = classificarNivel(totalScore);
    setShowForm(false);
    setShowResult(true);
    setResultado(resultadoFinal);

 fetch("https://v1.nocodeapi.com/descomplicacompras/google_sheets/MNWslNUwIcSWYVyy?tabId=Pagina1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    values: [
      userData.nome,
      userData.email,
      resultadoFinal.nivel,
      new Date().toLocaleString()
    ]
  })
});
}; // <-- Essa chave estava faltando aqui (fecha handleSubmit)

const progresso = Math.round((step / quizData.length) * 100);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        Diagnóstico de Perfil em Compras
      </h1>
      <p style={{ textAlign: "center", fontSize: "1rem", color: "#555", marginBottom: "1.5rem" }}>
        por  @descomplicando.compras
      </p>

      {!showForm && !showResult ? (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              Pergunta {step + 1} de {quizData.length} ({progresso}%)
            </p>
            <div style={{ background: "#eee", borderRadius: "4px", height: "10px" }}>
              <div
                style={{
                  width: `${progresso}%`,
                  height: "10px",
                  background: "#FCB225",
                  borderRadius: "4px"
                }}
              />
            </div>
          </div>
          <h2>{quizData[step].question}</h2>

          {quizData[step].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.valor)}
              style={{
                display: "block",
                margin: "8px 0",
                padding: "12px",
                backgroundColor: "#FCB225",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {opt.texto}
            </button>
          ))}

          {step > 0 && (
            <button
              onClick={() => {
                const novasRespostas = [...answers];
                novasRespostas.pop();
                setAnswers(novasRespostas);
                setStep(step - 1);
              }}
              style={{
                marginTop: "12px",
                backgroundColor: "#ccc",
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ⬅ Voltar
            </button>
          )}
        </>
      ) : showForm ? (
        <>
          <h2>Antes de ver seu resultado, informe seus dados:</h2>
          <input
            placeholder="Nome completo"
            className="w-full p-2 border"
            value={userData.nome}
            onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
          />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="w-full p-2 border"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <button onClick={handleSubmit}>Ver Resultado</button>
        </>
      ) : (
        <>
          <h2>{resultado.nivel}</h2>
          <p>{resultado.descricao}</p>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "10px",
              backgroundColor: "#ccc",
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🔁 Refazer o teste
          </button>
        </>
      )}
    </div>
  );
};

export default App;
