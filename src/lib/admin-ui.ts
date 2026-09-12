export const leadStatusOptions = [
  "new",
  "contacted",
  "proposal_sent",
  "approved",
  "in_progress",
  "completed",
  "archived",
] as const;

export const proposalStatusOptions = [
  "draft",
  "sent",
  "accepted",
  "rejected",
  "expired",
] as const;

export const appointmentStatusOptions = [
  "requested",
  "confirmed",
  "cancelled",
  "completed",
] as const;

const statusLabels: Record<string, string> = {
  new: "Novo",
  contacted: "Em contato",
  proposal_sent: "Proposta enviada",
  approved: "Aprovado",
  in_progress: "Em andamento",
  completed: "Concluído",
  archived: "Arquivado",
  draft: "Rascunho",
  sent: "Enviada",
  accepted: "Aceita",
  rejected: "Recusada",
  expired: "Expirada",
  requested: "Solicitado",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
};

export function adminStatusLabel(value: string) {
  return statusLabels[value] || value.replaceAll("_", " ");
}

export function formatAdminDate(value?: string | null, withTime = false) {
  if (!value) return "—";
  if (!withTime && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    ...(withTime ? { timeStyle: "short" as const } : {}),
  }).format(parsed);
}

export function formatAdminCurrency(cents?: number | null, currency = "BRL") {
  if (!cents) return "Valor a definir";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function isWithinHours(date: string, hours: number) {
  const time = new Date(date).getTime();
  return Number.isFinite(time) && Date.now() - time <= hours * 60 * 60 * 1000;
}

export function ageInDays(date: string) {
  const time = new Date(date).getTime();
  if (!Number.isFinite(time)) return 0;
  return Math.max(0, Math.floor((Date.now() - time) / 86_400_000));
}
