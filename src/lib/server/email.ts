type EmailPayload = { to: string; subject: string; html: string };

export async function sendEmail(payload: EmailPayload) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from || !payload.to) return { sent: false };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, ...payload }),
    cache: "no-store",
  });
  return { sent: response.ok };
}

export async function notifyNewLead(lead: { name: string; email?: string; company?: string; project_type: string; details?: string }) {
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (notify) {
    await sendEmail({
      to: notify,
      subject: `Novo lead NEXORA — ${lead.name}`,
      html: `<h2>Novo lead</h2><p><strong>Nome:</strong> ${escapeHtml(lead.name)}</p><p><strong>Empresa:</strong> ${escapeHtml(lead.company || "-")}</p><p><strong>Tipo:</strong> ${escapeHtml(lead.project_type)}</p><p>${escapeHtml(lead.details || "")}</p>`,
    });
  }
  if (lead.email) {
    await sendEmail({
      to: lead.email,
      subject: "Recebemos seu briefing — NEXORA",
      html: `<p>Olá, ${escapeHtml(lead.name)}.</p><p>Recebemos seu briefing na NEXORA. Vamos usar essas informações como contexto para a conversa e entraremos em contato pelo canal informado.</p><p>Obrigado!</p>`,
    });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char] || char));
}
