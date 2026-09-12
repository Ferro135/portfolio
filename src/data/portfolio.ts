export const brand = {
  name: "NEXORA",
  tagline: "Produtos Digitais & Sistemas",
  description:
    "Sites, dashboards e sistemas web modernos, desenvolvidos com foco em experiência, performance e soluções funcionais.",
  availability: "Aceitando novos projetos",
};

const whatsappMessage = encodeURIComponent(
  "Olá! Vi o portfólio da NEXORA e gostaria de conversar sobre um projeto.",
);

export const contact = {
  github: "https://github.com/Ferro135",
  email: "",
  linkedin: "",
  whatsappBase: "https://wa.me/5516991576717",
  whatsapp: `https://wa.me/5516991576717?text=${whatsappMessage}`,
  whatsappDisplay: "+55 16 99157-6717",
};

export type ProjectId = "zentra" | "spazio";

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export type ProjectHotspot = {
  x: number;
  y: number;
  label: string;
  description: string;
};

export type Project = {
  id: ProjectId;
  number: string;
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  technicalHighlights: string[];
  challenge: string;
  solution: string;
  principles: string[];
  features: { title: string; description: string }[];
  impact: { title: string; description: string }[];
  transformation: { before: string[]; after: string[] };
  hotspots: ProjectHotspot[];
  gallery: ProjectGalleryItem[];
};

export const projects: Project[] = [
  {
    id: "zentra",
    number: "01",
    slug: "zentra",
    title: "Zentra",
    eyebrow: "SaaS • Gestão • Automação",
    category: "Plataforma SaaS",
    description:
      "Plataforma criada para centralizar a gestão de clientes, licenças, projetos e operações digitais em um único painel.",
    longDescription:
      "O resultado é uma visão operacional mais clara, com estados importantes reunidos no mesmo lugar e menos dependência de verificações manuais espalhadas por diferentes ferramentas.",
    tags: ["SaaS", "Dashboard", "Automação"],
    technicalHighlights: ["Supabase", "Vercel", "API de licenças", "Provisionamento e automações"],
    challenge:
      "Organizar clientes, sites, licenças e publicações sem depender de várias telas, planilhas ou processos manuais desconectados.",
    solution:
      "Um painel centralizado, responsivo e orientado a status, com informações essenciais sempre acessíveis e fluxos preparados para automações.",
    principles: ["Visão centralizada", "Status claros", "Fluxos simples", "Automação"],
    features: [
      {
        title: "Clientes e projetos",
        description: "Organização dos projetos e clientes em uma visão única, com acesso rápido às informações principais.",
      },
      {
        title: "Licenças e estados",
        description: "Acompanhamento de licenças, validade e estados importantes sem depender de verificações manuais.",
      },
      {
        title: "Publicação e operações",
        description: "Estrutura pensada para acompanhar publicações, deploys e rotinas digitais do ecossistema.",
      },
      {
        title: "Interface responsiva",
        description: "Leitura e ações prioritárias preservadas em diferentes tamanhos de tela.",
      },
    ],
    impact: [
      {
        title: "Operação centralizada",
        description: "Clientes, licenças, projetos e estados operacionais passam a compartilhar o mesmo contexto de gestão.",
      },
      {
        title: "Menos conferência manual",
        description: "Status importantes ficam visíveis no painel, reduzindo a necessidade de procurar informações em ferramentas separadas.",
      },
      {
        title: "Base para automação",
        description: "A estrutura foi pensada para conectar publicação, licenciamento e provisionamento a fluxos automatizados.",
      },
    ],
    transformation: {
      before: [
        "Informações distribuídas entre ferramentas e verificações manuais.",
        "Dificuldade para visualizar rapidamente o que está ativo ou exige atenção.",
        "Rotinas de publicação e licenciamento pouco centralizadas.",
      ],
      after: [
        "Painel único para acompanhar clientes, projetos, licenças e operações.",
        "Estados claros e prioridades visíveis desde a visão geral.",
        "Fluxos preparados para automações e crescimento do ecossistema.",
      ],
    },
    hotspots: [
      { x: 27, y: 23, label: "Indicadores", description: "Resumo rápido de clientes, licenças, receita e projetos online." },
      { x: 68, y: 48, label: "Status do sistema", description: "Saúde das integrações e serviços importantes em uma leitura direta." },
      { x: 86, y: 48, label: "Atividades", description: "Histórico recente para entender o que mudou sem procurar em várias telas." },
      { x: 55, y: 82, label: "Operações", description: "Licenças e projetos reunidos na mesma visão operacional." },
    ],
    gallery: [
      {
        src: "/projects/zentra/overview.webp",
        alt: "Dashboard do Zentra com indicadores, status do sistema, atividades e operações",
        label: "Visão geral",
        width: 1600,
        height: 791,
      },
      {
        src: "/projects/zentra/dashboard-detail.webp",
        alt: "Detalhe do dashboard do Zentra mostrando indicadores e status do sistema",
        label: "Dashboard e status",
        width: 1600,
        height: 496,
      },
      {
        src: "/projects/zentra/operations-detail.webp",
        alt: "Detalhe das áreas operacionais do Zentra com licenças e projetos",
        label: "Operações",
        width: 1600,
        height: 316,
      },
    ],
  },
  {
    id: "spazio",
    number: "02",
    slug: "spazio-gestao",
    title: "Spazio Gestão",
    eyebrow: "Financeiro • Operação • Dashboard",
    category: "Sistema administrativo",
    description:
      "Sistema desenvolvido para simplificar a gestão financeira e operacional de múltiplas cantinas, com foco em clareza e facilidade de uso.",
    longDescription:
      "O resultado é uma rotina mais direta para acompanhar vendas, estoque, caixa, pendências e resultados, sem exigir familiaridade avançada com sistemas de gestão.",
    tags: ["Financeiro", "Dashboard", "Gestão"],
    technicalHighlights: ["Aplicação web", "Gestão multiunidade", "Controle de acesso", "Fluxos financeiros"],
    challenge:
      "Controlar diferentes unidades, valores, funcionários e permissões sem tornar o sistema confuso para quem precisa usá-lo no dia a dia.",
    solution:
      "Uma experiência visual direta, com dashboards objetivos, visão por unidade, permissões por função e possibilidade de corrigir registros sem complicação.",
    principles: ["Simplicidade", "Permissões claras", "Visão financeira", "Uso no celular"],
    features: [
      {
        title: "Visão por unidade",
        description: "Cada unidade pode ser acompanhada de forma independente, evitando mistura de informações e acessos indevidos.",
      },
      {
        title: "Financeiro objetivo",
        description: "Faturamento, custos, despesas e resultado operacional apresentados de forma fácil de interpretar.",
      },
      {
        title: "Contas e permissões",
        description: "Acessos ajustados por função para que cada pessoa veja apenas o que realmente precisa utilizar.",
      },
      {
        title: "Correções sem atrito",
        description: "Fluxos preparados para revisar e corrigir informações inseridas incorretamente sem refazer todo o processo.",
      },
    ],
    impact: [
      {
        title: "Rotina mais direta",
        description: "Ações frequentes como vender, conferir caixa, estoque e pendências ficam acessíveis logo na entrada do sistema.",
      },
      {
        title: "Leitura financeira simples",
        description: "Entradas, gastos e resultado aparecem com linguagem direta para facilitar decisões no dia a dia.",
      },
      {
        title: "Gestão por responsabilidade",
        description: "A visão por unidade e as permissões ajudam cada pessoa a acessar apenas o que faz sentido para sua função.",
      },
    ],
    transformation: {
      before: [
        "Operação distribuída entre controles e rotinas com diferentes níveis de complexidade.",
        "Informações financeiras difíceis de interpretar rapidamente por usuários menos técnicos.",
        "Risco de mistura entre unidades, funções e permissões.",
      ],
      after: [
        "Atalhos claros para as ações que realmente fazem parte da rotina diária.",
        "Resumo financeiro apresentado com linguagem simples e hierarquia visual forte.",
        "Contexto por cantina e responsabilidades separadas por função.",
      ],
    },
    hotspots: [
      { x: 28, y: 43, label: "Ações rápidas", description: "Venda, pedidos, estoque, caixa e fechamento organizados por tarefa." },
      { x: 46, y: 68, label: "Resumo do dia", description: "Entradas, gastos e saldo em linguagem simples para leitura rápida." },
      { x: 73, y: 77, label: "Pendências", description: "O que exige atenção fica separado do restante da interface." },
      { x: 12, y: 50, label: "Navegação por rotina", description: "Menu estruturado pelo trabalho diário, não por termos técnicos." },
    ],
    gallery: [
      {
        src: "/projects/spazio/overview.webp",
        alt: "Tela inicial do Spazio Gestão com ações rápidas, indicadores e gestão das cantinas",
        label: "Visão geral",
        width: 1600,
        height: 803,
      },
      {
        src: "/projects/spazio/dashboard-detail.webp",
        alt: "Detalhe do Spazio Gestão com ações rápidas e indicadores operacionais",
        label: "Rotina e indicadores",
        width: 1600,
        height: 636,
      },
      {
        src: "/projects/spazio/operations-detail.webp",
        alt: "Detalhe do Spazio Gestão com informações operacionais e pendências",
        label: "Operação e pendências",
        width: 1600,
        height: 378,
      },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Entendimento",
    description: "Mapeamos o problema, o público, as prioridades e o que precisa funcionar de verdade antes de pensar na interface.",
  },
  {
    number: "02",
    title: "Interface",
    description: "Organizamos fluxos, hierarquia e direção visual para tornar o produto claro antes de aumentar a complexidade técnica.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description: "Transformamos a solução em código, integrações e dados com atenção a responsividade, manutenção e performance.",
  },
  {
    number: "04",
    title: "Publicação & evolução",
    description: "Publicamos, acompanhamos o produto e deixamos uma base preparada para correções, melhorias e novos recursos.",
  },
];

export const capabilities = [
  { title: "Sites institucionais", description: "Presença digital rápida, responsiva e alinhada ao posicionamento da marca." },
  { title: "SaaS & produtos digitais", description: "Aplicações com contas, regras de negócio, planos, dados e evolução contínua." },
  { title: "Dashboards", description: "Informação organizada para facilitar leitura, acompanhamento e tomada de decisão." },
  { title: "Sistemas administrativos", description: "Fluxos internos, permissões, cadastros, financeiro e operação em um único ambiente." },
  { title: "Painéis internos", description: "Ferramentas para equipes controlarem processos sem depender de planilhas desconectadas." },
  { title: "Automações & integrações", description: "Conexões entre APIs e serviços para reduzir tarefas repetitivas e falhas manuais." },
];

export const faqs = [
  {
    question: "A NEXORA desenvolve sistemas do zero?",
    answer: "Sim. O projeto pode começar apenas com o problema e os objetivos. A partir disso, estruturamos fluxos, interface, desenvolvimento e publicação.",
  },
  {
    question: "Vocês também trabalham em sistemas que já existem?",
    answer: "Sim. Podemos revisar interfaces, responsividade, estrutura de código, fluxos, integrações e pontos que estejam dificultando manutenção ou uso.",
  },
  {
    question: "O projeto inclui publicação e deploy?",
    answer: "Pode incluir. A entrega pode abranger configuração de hospedagem, domínio, variáveis de ambiente, banco de dados e processo de atualização.",
  },
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer: "Depende do escopo. Um site institucional e um sistema com autenticação, banco de dados e regras de negócio têm necessidades diferentes. O prazo é definido após entender o projeto.",
  },
  {
    question: "A NEXORA trabalha com manutenção e evolução?",
    answer: "Sim. Produtos digitais raramente terminam na primeira publicação. A estrutura é pensada para receber correções, melhorias e novas funcionalidades.",
  },
  {
    question: "Como pedir um orçamento?",
    answer: "Use a página de contato para preencher um briefing rápido. No final, você pode enviar as informações prontas pelo WhatsApp e iniciar a conversa com mais contexto.",
  },
];

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  project?: string;
};

// Mantido vazio de propósito: a NEXORA não publica depoimentos fictícios.
// Quando houver autorização de um cliente real, basta adicionar aqui.
export const testimonials: Testimonial[] = [];

export const technologyGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend & dados",
    items: ["Node.js", "Supabase", "PostgreSQL", "APIs"],
  },
  {
    title: "Deploy & fluxo",
    items: ["Vercel", "GitHub", "Git"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
