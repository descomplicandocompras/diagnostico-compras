// App.tsx
import { useState } from "react";
import "./App.css";

// Quiz de Nível
const quizNivel = [
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

// Quiz de Negociação
const quizNegociacao = [
  { question: "Antes de negociar, você estrutura um plano com objetivos claros, critérios de sucesso e limites de concessão?", options: [{ texto: "Não, entro sem preparação estruturada", valor: 0 }, { texto: "Tenho uma ideia geral, mas nada formal", valor: 0.5 }, { texto: "Sim, defino metas, limites e estratégia com antecedência", valor: 1 }], peso: 3 },
{ question: "Você já analisou os custos ocultos (como impostos, frete, armazenagem) antes de decidir por um fornecedor?", options: [{ texto: "Nunca analisei esses pontos", valor: 0 }, { texto: "Analisei em casos específicos", valor: 0.5 }, { texto: "Sim, sempre considero o custo total de aquisição (TCO)", valor: 1 }], peso: 3 },
{ question: "Durante uma negociação tensa com fornecedor exclusivo, você:...", options: [{ texto: "Aceita as condições por falta de alternativa", valor: 0 }, { texto: "Negocia pequenos ajustes para amenizar os impactos", valor: 0.5 }, { texto: "Apresenta dados, histórico de não conformidade e busca reequilibrar tecnicamente", valor: 1 }], peso: 3 },
{ question: "Você já estruturou uma proposta visual com dados de consumo, curva ABC ou saving para defender sua negociação?", options: [{ texto: "Nunca usei ferramentas para isso", valor: 0 }, { texto: "Já fiz algo básico em planilha", valor: 0.5 }, { texto: "Sim, uso gráficos, benchmarks e KPIs para sustentar minha argumentação", valor: 1 }], peso: 2 },
{ question: "Você revisa cláusulas contratuais como reajuste, SLA, penalidades e prazo de vigência antes de assinar?", options: [{ texto: "Confio no jurídico e assino", valor: 0 }, { texto: "Dou uma olhada rápida", valor: 0.5 }, { texto: "Sim, discuto cláusulas críticas com o jurídico e solicito ajustes se necessário", valor: 1 }], peso: 2 },
{ question: "Ao negociar prazo de entrega em uma situação crítica de produção, você:...", options: [{ texto: "Aceita a primeira promessa para não atrasar", valor: 0 }, { texto: "Negocia verbalmente e torce para que funcione", valor: 0.5 }, { texto: "Documenta o impacto, propõe alternativas e valida com planejamento", valor: 1 }], peso: 3 },
{ question: "Você já aplicou a técnica de ancoragem para influenciar o valor de referência de uma proposta?", options: [{ texto: "Nunca utilizei", valor: 0 }, { texto: "Usei informalmente, sem estratégia clara", valor: 0.5 }, { texto: "Sim, uso valores de mercado ou históricos como referência para conduzir a negociação", valor: 1 }], peso: 2 },
{ question: "Você sabe calcular e apresentar o ‘saving’ obtido em uma negociação?", options: [{ texto: "Não sei como calcular saving", valor: 0 }, { texto: "Tenho ideia, mas não uso na prática", valor: 0.5 }, { texto: "Sim, calculo, registro e comunico os ganhos", valor: 1 }], peso: 2 },
{ question: "Após fechar uma negociação, você costuma realizar follow-up estruturado com o fornecedor?", options: [{ texto: "Não, só falo se tiver problema", valor: 0 }, { texto: "Faço acompanhamentos pontuais", valor: 0.5 }, { texto: "Sim, acompanho entrega, performance e faço reuniões de alinhamento", valor: 1 }], peso: 2 },
{ question: "Você consegue explicar de forma técnica e objetiva por que uma proposta foi rejeitada ou aceita?", options: [{ texto: "Não costumo justificar", valor: 0 }, { texto: "Justifico com base em preço e prazos apenas", valor: 0.5 }, { texto: "Sim, justifico com critérios técnicos, fiscais e estratégicos", valor: 1 }], peso: 2 },
{ question: "O fornecedor atrasou a entrega de um item crítico e está pedindo reajuste. O que você faz?", options: [{ texto: "Aceita para não prejudicar a produção", valor: 0 }, { texto: "Negocia um novo prazo sem reajuste", valor: 0.5 }, { texto: "Documenta o impacto, reverte o reajuste e renegocia com base contratual", valor: 1 }], peso: 3 },
{ question: "Durante uma reunião, o fornecedor diz: 'Esse é o menor preço possível'. Qual sua reação mais estratégica?", options: [{ texto: "Aceita para garantir o desconto", valor: 0 }, { texto: "Pede mais prazo para avaliar internamente", valor: 0.5 }, { texto: "Apresenta referências de mercado e força nova ancoragem", valor: 1 }], peso: 2 },
{ question: "Você recebeu duas propostas: uma com melhor preço, outra com melhor prazo e condição de pagamento. O que faz?", options: [{ texto: "Fecha com o menor preço", valor: 0 }, { texto: "Conversa com o financeiro e escolhe o melhor prazo", valor: 0.5 }, { texto: "Monta um comparativo completo (TCO) e decide com base no melhor custo-benefício", valor: 1 }], peso: 3 },
{ question: "Ao pedir uma redução de preço, o fornecedor responde: 'Vou perder margem'. O que você responde?", options: [{ texto: "Então deixa assim mesmo", valor: 0 }, { texto: "Pede outra condição como frete incluso", valor: 0.5 }, { texto: "Explora a margem real, volume e prazo para encontrar ganho mútuo", valor: 1 }], peso: 3 },
{ question: "Você descobre que outro comprador da empresa aceitou uma condição pior que a sua. O que faz?", options: [{ texto: "Não interfere, cada um cuida do seu", valor: 0 }, { texto: "Comenta com o colega para ajustar nas próximas", valor: 0.5 }, { texto: "Reporta com dados e ajuda a padronizar a negociação", valor: 1 }], peso: 2 },
{ question: "Durante a negociação de um contrato, qual cláusula merece maior atenção inicial?", options: [{ texto: "Prazo de entrega", valor: 0 }, { texto: "Condições de pagamento", valor: 0.5 }, { texto: "Reajuste, SLA e penalidades", valor: 1 }], peso: 2 },
{ question: "Você precisa renegociar uma condição que foi mal acordada no contrato anterior. O que faz?", options: [{ texto: "Pede por e-mail uma condição melhor", valor: 0 }, { texto: "Explica o impacto e tenta renegociar informalmente", valor: 0.5 }, { texto: "Agenda reunião, apresenta histórico e propõe reequilíbrio técnico", valor: 1 }], peso: 3 },
{ question: "Você já enfrentou situações de impasse e transformou o fornecedor em parceiro estratégico no futuro?", options: [{ texto: "Nunca aconteceu", valor: 0 }, { texto: "Aconteceu por acaso", valor: 0.5 }, { texto: "Sim, reverti situações difíceis e fortalecei a relação", valor: 1 }], peso: 3 },
{ question: "Você sabe usar o silêncio, a pausa e a escuta ativa como estratégia durante uma negociação?", options: [{ texto: "Não, costumo preencher todos os espaços", valor: 0 }, { texto: "Às vezes, mas sem intenção clara", valor: 0.5 }, { texto: "Sim, uso pausas e escuta como ferramentas de influência", valor: 1 }], peso: 2 },
{ question: "Você utiliza dados internos (estoque, curva ABC, urgência) para fundamentar prazos e preços em uma negociação?", options: [{ texto: "Nunca usei isso como argumento", valor: 0 }, { texto: "Já citei informalmente", valor: 0.5 }, { texto: "Sim, levo dados reais da empresa para compor a argumentação", valor: 1 }], peso: 2 },
{ question: "Você já conduziu uma renegociação contratual com base em mudança de cenário (ex: inflação, crise logística)?", options: [{ texto: "Nunca participei disso", valor: 0 }, { texto: "Participei, mas só como apoio", valor: 0.5 }, { texto: "Sim, conduzi com proposta estruturada e reequilíbrio contratual", valor: 1 }], peso: 2 },
{ question: "Você sabe o que é BATNA (melhor alternativa à negociação) e como ela protege sua posição?", options: [{ texto: "Nunca ouvi falar", valor: 0 }, { texto: "Já vi em cursos", valor: 0.5 }, { texto: "Sim, estruturo minha BATNA antes de negociar", valor: 1 }], peso: 3 },
{ question: "Você já negociou contratos com fornecedores internacionais ou em outro idioma?", options: [{ texto: "Nunca passei por isso", valor: 0 }, { texto: "Já tive contato com apoio de tradutor", valor: 0.5 }, { texto: "Sim, conduzi negociação com fornecedor estrangeiro com autonomia técnica", valor: 1 }], peso: 3 },
{ question: "Você aplica o conceito de ganho mútuo (win-win) nas negociações?", options: [{ texto: "Não, foco só no que é melhor para a empresa", valor: 0 }, { texto: "Aplico em alguns casos", valor: 0.5 }, { texto: "Sim, busco sempre criar valor para ambos os lados", valor: 1 }], peso: 2 },
{ question: "Você já precisou renegociar com fornecedor em situação de monopólio (única opção de fornecimento)?", options: [{ texto: "Aceitei as condições", valor: 0 }, { texto: "Consegui pequenos ajustes", valor: 0.5 }, { texto: "Conduzi negociação técnica mesmo com baixa margem de manobra", valor: 1 }], peso: 3 },
{ question: "Você consegue adaptar seu estilo de comunicação conforme o perfil do fornecedor (técnico, comercial, agressivo)?", options: [{ texto: "Não costumo adaptar", valor: 0 }, { texto: "Às vezes ajusto o tom", valor: 0.5 }, { texto: "Sim, ajusto abordagem conforme perfil e contexto", valor: 1 }], peso: 2 },
{ question: "Você já antecipou riscos de fornecimento e ajustou cláusulas ou garantias contratuais antes do problema acontecer?", options: [{ texto: "Não previ esse tipo de risco", valor: 0 }, { texto: "Já considerei mas sem formalizar", valor: 0.5 }, { texto: "Sim, adaptei o contrato com base em análise de risco", valor: 1 }], peso: 3 },
{ question: "Você sabe negociar cláusulas de reajuste (índice, frequência, teto)?", options: [{ texto: "Nunca me envolvi nisso", valor: 0 }, { texto: "Já vi em contrato, mas não participei", valor: 0.5 }, { texto: "Sim, discuto e proponho reajustes com base técnica", valor: 1 }], peso: 2 },
{ question: "Você já precisou negociar algo fora do escopo do comprador (jurídico, qualidade, técnico)?", options: [{ texto: "Nunca atuei fora da minha área", valor: 0 }, { texto: "Apoiei outros setores informalmente", valor: 0.5 }, { texto: "Sim, conduzi negociações multidisciplinares com suporte interno", valor: 1 }], peso: 3 },
{ question: "Você já transformou uma proposta inicial sem competitividade em uma proposta vantajosa?", options: [{ texto: "Nunca consegui", valor: 0 }, { texto: "Consegui após muita insistência", valor: 0.5 }, { texto: "Sim, reestruturei escopo, condições ou volume para torná-la viável", valor: 1 }], peso: 2 },
{ question: "Você costuma registrar aprendizados após negociações críticas?", options: [{ texto: "Nunca reflito sobre isso", valor: 0 }, { texto: "Penso por alto", valor: 0.5 }, { texto: "Sim, documento e melhoro meu processo de negociação continuamente", valor: 1 }], peso: 2 },
{ question: "Você já liderou uma negociação 100% sozinho com impacto relevante para a empresa?", options: [{ texto: "Nunca conduzi sozinho", valor: 0 }, { texto: "Já participei como apoio", valor: 0.5 }, { texto: "Sim, conduzi com autonomia, estratégia e entreguei resultado", valor: 1 }], peso: 3 },
{ question: "Você costuma criar cenários comparativos entre fornecedores (prazo, condição de pagamento, risco, histórico)?", options: [{ texto: "Nunca fiz esse tipo de comparação", valor: 0 }, { texto: "Faço isso em casos pontuais", valor: 0.5 }, { texto: "Sim, comparo todos os fatores críticos antes de decidir", valor: 1 }], peso: 2 },
{ question: "Você já propôs soluções alternativas para reduzir custo sem impactar a qualidade do produto?", options: [{ texto: "Nunca pensei nisso", valor: 0 }, { texto: "Já sugeri ideias de forma informal", valor: 0.5 }, { texto: "Sim, redesenhei escopo ou volume gerando saving sustentável", valor: 1 }], peso: 3 },
{ question: "Você entende como a negociação afeta diretamente o fluxo de caixa e o orçamento da empresa?", options: [{ texto: "Nunca pensei nisso", valor: 0 }, { texto: "Tenho noção geral", valor: 0.5 }, { texto: "Sim, analiso os impactos financeiros antes de fechar", valor: 1 }], peso: 3 },
{ question: "Você já desconsiderou uma proposta aparentemente barata após analisar composição de custo, tributos e riscos logísticos?", options: [{ texto: "Nunca fiz esse tipo de análise", valor: 0 }, { texto: "Já aconteceu, mas sem método definido", valor: 0.5 }, { texto: "Sim, identifiquei riscos ocultos e escolhi a opção mais estratégica", valor: 1 }], peso: 3 }
];

const App = () => {
  const [tipoQuiz, setTipoQuiz] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const quizData = tipoQuiz === "nivel" ? quizNivel : tipoQuiz === "negociacao" ? quizNegociacao : [];

  const handleAnswer = (valor: number) => {
    const updatedAnswers = [...answers, valor];
    setAnswers(updatedAnswers);
    if (step + 1 < quizData.length) setStep(step + 1);
    else handleSubmit(updatedAnswers);
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

  const classificarNivelCompras = (score: number) => {
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
  
  const classificarNivelNegociacao = (score: number) => {
    if (score < 20) return { nivel: "Operacional", descricao: "Você atua de forma reativa. Precisa desenvolver visão estratégica e controle emocional." };
    if (score < 40) return { nivel: "Tático", descricao: "Você negocia com consistência, mas ainda há espaço para evoluir em análise e influência." };
    if (score < 70) return { nivel: "Negociador Estratégico", descricao: "Você domina técnicas, pensa no todo e gera valor real para a empresa." };
    return { nivel: "Negociador de Alta Performance", descricao: "Você atua como referência. Alta capacidade analítica, emocional e técnica." };
  };

  const handleSubmit = (respostas: number[]) => {
    const totalScore = calcularPontuacao(respostas);
    const resultadoFinal = tipoQuiz === "nivel" 
  ? classificarNivelCompras(totalScore) 
  : classificarNivelNegociacao(totalScore);
    setResultado(resultadoFinal);
    setShowResult(true);
  };

  const handleBack = () => {
    if (step > 0) {
      const novasRespostas = [...answers];
      novasRespostas.pop();
      setAnswers(novasRespostas);
      setStep(step - 1);
    }
  };

  if (!tipoQuiz) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>Qual quiz você quer fazer?</h1>
        <button onClick={() => setTipoQuiz("nivel")} style={{ margin: 10, padding: 15, backgroundColor: "#FCB225", borderRadius: 6 }}>📊 Quiz de Nível</button>
        <button onClick={() => setTipoQuiz("negociacao")} style={{ margin: 10, padding: 15, backgroundColor: "#FCB225", borderRadius: 6 }}>💼 Quiz de Negociação</button>
      </div>
    );
  }

  const progresso = Math.round((step / quizData.length) * 100);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>{tipoQuiz === "nivel" ? "Diagnóstico de Perfil em Compras" : "Diagnóstico de Negociação"}</h1>
      <p style={{ textAlign: "center", color: "#555" }}>por @descomplicando.compras</p>

      {!showResult ? (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <p>Pergunta {step + 1} de {quizData.length} ({progresso}%)</p>
            <div style={{ background: "#eee", borderRadius: "4px", height: "10px" }}>
              <div style={{ width: `${progresso}%`, height: "10px", background: "#FCB225", borderRadius: "4px" }} />
            </div>
          </div>

          <h2 style={{ textAlign: "center" }}>{quizData[step].question}</h2>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {quizData[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.valor)}
                style={{ margin: "8px 0", padding: "12px 24px", backgroundColor: "#FCB225", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", width: "100%", maxWidth: "400px" }}
              >
                {opt.texto}
              </button>
            ))}
          </div>

          {step > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleBack}
                style={{ marginTop: "12px", backgroundColor: "#ccc", padding: "10px 24px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
              >
                ⬅ Voltar
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>{resultado.nivel}</h2>
          <p style={{ textAlign: "center" }}>{resultado.descricao}</p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: "20px", backgroundColor: "#ccc", padding: "10px 24px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              🔁 Refazer o teste
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
