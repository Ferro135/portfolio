export const brand = {
  name: "NEXORA",
  tagline: "Digital Products & Systems",
  description:
    "Sites, dashboards e sistemas web modernos, desenvolvidos com foco em experiência, performance e soluções funcionais.",
  availability: "Aceitando novos projetos",
};

export const contact = {
  github: "https://github.com/Ferro135",
  email: "",
  linkedin: "",
  whatsapp: "https://wa.me/5516991576717",
};

export type ProjectId = "zentra" | "spazio";

export type Project = {
  id: ProjectId;
  imageSrc?: string;
  imageAlt?: string;
  number: string;
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  technologies: string[];
  challenge: string;
  solution: string;
  principles: string[];
  features: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    id: "zentra",
    number: "01",
    slug: "zentra",
    title: "Zentra",
    eyebrow: "SaaS • Gestão • Automação",
    category: "Plataforma SaaS",
    imageSrc: "/projects/zentra-dashboard.webp",
    imageAlt: "Dashboard real do Zentra com visão geral, licenças, projetos e atividades recentes",
    description:
      "Plataforma criada para centralizar a gestão de clientes, licenças, sites e operações digitais em um único painel.",
    longDescription:
      "O Zentra concentra tarefas que antes ficavam espalhadas entre diferentes ferramentas. O foco do produto é oferecer uma visão clara do que está ativo, do que precisa de atenção e do que pode ser automatizado.",
    tags: ["SaaS", "Dashboard", "Gestão"],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    challenge:
      "Organizar clientes, sites, licenças e publicações sem depender de várias telas, planilhas ou processos manuais desconectados.",
    solution:
      "Um painel centralizado, responsivo e orientado a status, com as informações essenciais sempre acessíveis e fluxos preparados para automações.",
    principles: ["Visão centralizada", "Status claros", "Fluxos simples", "Automação"],
    features: [
      {
        title: "Clientes e sites",
        description: "Organização dos projetos e clientes em uma visão única, com acesso rápido às informações principais.",
      },
      {
        title: "Licenças e estados",
        description: "Acompanhamento de licenças, validade e estados importantes sem depender de verificações manuais.",
      },
      {
        title: "Publicação e operações",
        description: "Estrutura pensada para acompanhar publicações, deploys e outras rotinas digitais do ecossistema.",
      },
      {
        title: "Painel responsivo",
        description: "Interface adaptada para desktop e dispositivos móveis, mantendo leitura e ações prioritárias acessíveis.",
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
    imageSrc: "/projects/spazio-dashboard.webp",
    imageAlt: "Dashboard real do Spazio Gestão com visão geral das cantinas, vendas, caixa e estoque",
    description:
      "Sistema desenvolvido para simplificar a gestão financeira e operacional de múltiplas cantinas, com foco em clareza e facilidade de uso.",
    longDescription:
      "O Spazio Gestão foi pensado para transformar informações financeiras e operacionais em ações simples. A interface prioriza leitura fácil, poucos passos e permissões adequadas para cada função.",
    tags: ["Financeiro", "Dashboard", "Gestão"],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
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
        description: "Faturamento, custos, despesas e resultado operacional apresentados de forma visual e fácil de interpretar.",
      },
      {
        title: "Contas e permissões",
        description: "Acessos ajustados por função para que cada pessoa veja apenas o que realmente precisa usar.",
      },
      {
        title: "Correções sem atrito",
        description: "Fluxos preparados para revisar e corrigir informações inseridas incorretamente sem refazer todo o processo.",
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
    title: "Deploy & workflow",
    items: ["Vercel", "GitHub", "Git"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
