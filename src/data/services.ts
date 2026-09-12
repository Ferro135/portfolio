export type Service = {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  deliverables: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    id: "sites",
    number: "01",
    title: "Sites institucionais",
    shortDescription: "Presença digital rápida, responsiva e alinhada ao posicionamento da marca.",
    description:
      "Sites pensados para apresentar uma empresa, serviço ou produto com clareza, boa performance e uma experiência consistente em diferentes telas.",
    deliverables: [
      "Arquitetura de páginas e conteúdo",
      "Interface responsiva",
      "SEO técnico básico",
      "Integração de contato e conversão",
      "Deploy e configuração de domínio",
    ],
    idealFor: ["empresas", "serviços", "marcas", "lançamentos"],
  },
  {
    id: "saas",
    number: "02",
    title: "SaaS & produtos digitais",
    shortDescription: "Aplicações com contas, regras de negócio, dados e evolução contínua.",
    description:
      "Produtos web construídos para resolver um fluxo real de negócio, com estrutura preparada para autenticação, planos, dados, integrações e crescimento.",
    deliverables: [
      "Mapeamento de fluxos",
      "Painel e área autenticada",
      "Banco de dados",
      "Integrações e APIs",
      "Deploy e evolução",
    ],
    idealFor: ["novos produtos", "operações recorrentes", "serviços digitais"],
  },
  {
    id: "dashboards",
    number: "03",
    title: "Dashboards",
    shortDescription: "Informação organizada para facilitar leitura, acompanhamento e decisão.",
    description:
      "Painéis para transformar dados e rotinas em uma visão clara, com indicadores relevantes, filtros e hierarquia visual orientada à tarefa.",
    deliverables: [
      "Indicadores e KPIs",
      "Filtros e recortes",
      "Visualização responsiva",
      "Integração com fontes de dados",
      "Estados e alertas operacionais",
    ],
    idealFor: ["gestão", "financeiro", "operações", "monitoramento"],
  },
  {
    id: "sistemas",
    number: "04",
    title: "Sistemas administrativos",
    shortDescription: "Fluxos internos, permissões, cadastros, financeiro e operação num só ambiente.",
    description:
      "Sistemas internos desenhados para reduzir passos manuais, organizar responsabilidades e deixar a operação mais fácil para quem usa todos os dias.",
    deliverables: [
      "Perfis e permissões",
      "Cadastros e operações",
      "Fluxos financeiros",
      "Histórico e auditoria",
      "Experiência mobile",
    ],
    idealFor: ["equipes", "multiunidades", "operações internas"],
  },
  {
    id: "paineis",
    number: "05",
    title: "Painéis internos",
    shortDescription: "Ferramentas sob medida para equipes deixarem de depender de planilhas desconectadas.",
    description:
      "Interfaces internas para centralizar tarefas, acompanhamento e informação sem expor complexidade desnecessária ao usuário final.",
    deliverables: [
      "Ferramentas internas",
      "Controle por função",
      "Pesquisa e filtros",
      "Ações rápidas",
      "Histórico operacional",
    ],
    idealFor: ["backoffice", "suporte", "operações", "administração"],
  },
  {
    id: "automacoes",
    number: "06",
    title: "Automações & integrações",
    shortDescription: "Conexões entre APIs e serviços para reduzir tarefas repetitivas e falhas manuais.",
    description:
      "Integrações que fazem sistemas conversarem entre si, eliminando conferências manuais e preparando a operação para escalar com menos atrito.",
    deliverables: [
      "Integração de APIs",
      "Webhooks",
      "Sincronização de dados",
      "Automação de estados",
      "Logs e tratamento de falhas",
    ],
    idealFor: ["SaaS", "operações digitais", "fluxos repetitivos"],
  },
];

export const serviceProcess = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entender o problema, os usuários, o fluxo atual e o que realmente precisa mudar.",
  },
  {
    number: "02",
    title: "Escopo",
    description: "Transformar a necessidade em entregáveis, prioridades e um caminho de implementação.",
  },
  {
    number: "03",
    title: "Construção",
    description: "Interface, código, dados e integrações avançam juntos com validações ao longo do projeto.",
  },
  {
    number: "04",
    title: "Entrega & evolução",
    description: "Publicação, documentação essencial e uma base pronta para correções e novas etapas.",
  },
];
