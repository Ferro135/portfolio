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
