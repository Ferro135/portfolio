type DashboardPreviewProps = {
  variant: "zentra" | "spazio";
};

const zentraStats = [
  ["24", "Clientes ativos"],
  ["18", "Sites em produção"],
  ["7", "Licenças ativas"],
  ["3", "Tickets abertos"],
];

const spazioStats = [
  ["R$ 12.450", "Faturamento"],
  ["R$ 8.230", "Despesas"],
  ["R$ 4.220", "Resultado"],
  ["3", "Cantinas"],
];

export function DashboardPreview({ variant }: DashboardPreviewProps) {
  const isZentra = variant === "zentra";
  const stats = isZentra ? zentraStats : spazioStats;
  const menu = isZentra
    ? ["Início", "Clientes", "Sites", "Licenças", "Financeiro", "Suporte"]
    : ["Início", "Vendas", "Financeiro", "Produtos", "Cantinas", "Relatórios"];

  return (
    <div className={`dashboard-preview dashboard-${variant}`} aria-hidden="true">
      <div className="dash-sidebar">
        <div className="dash-logo">
          <span className="dash-logo-mark" />
          {isZentra ? "Zentra" : "Spazio"}
        </div>
        <div className="dash-menu">
          {menu.map((item, index) => (
            <div className={`dash-menu-item ${index === 0 ? "active" : ""}`} key={item}>
              <span /> {item}
            </div>
          ))}
        </div>
      </div>

      <div className="dash-main">
        <div className="dash-topbar">
          <div>
            <small>Painel administrativo</small>
            <strong>Visão geral</strong>
          </div>
          <div className="dash-avatar">AD</div>
        </div>

        <div className="dash-stats">
          {stats.map(([value, label], index) => (
            <div className="dash-stat" key={label}>
              <span className={`dash-stat-icon i-${index}`} />
              <strong>{value}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div className="dash-chart-card">
            <div className="dash-card-heading">
              <strong>{isZentra ? "Crescimento" : "Vendas dos últimos 7 dias"}</strong>
              <span>Este mês</span>
            </div>
            <div className={isZentra ? "line-chart" : "bar-chart"}>
              {isZentra ? (
                <>
                  <div className="chart-grid-lines" />
                  <svg viewBox="0 0 300 105" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity=".26" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="area" d="M0 92 C34 78 45 84 75 67 S122 79 150 52 S206 61 232 30 S266 38 300 18 V105 H0 Z" />
                    <path className="line" d="M0 92 C34 78 45 84 75 67 S122 79 150 52 S206 61 232 30 S266 38 300 18" />
                  </svg>
                </>
              ) : (
                [52, 68, 44, 78, 57, 92, 72].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))
              )}
            </div>
            <div className="chart-labels">
              {(isZentra ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"] : ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]).map(
                (label) => <span key={label}>{label}</span>
              )}
            </div>
          </div>

          <div className="dash-side-card">
            <div className="dash-card-heading">
              <strong>{isZentra ? "Atividades recentes" : "Formas de pagamento"}</strong>
            </div>
            {isZentra ? (
              <div className="activity-list">
                {["Novo cliente cadastrado", "Site publicado", "Licença renovada", "Pagamento aprovado"].map((item, index) => (
                  <div className="activity" key={item}>
                    <span className={`activity-icon a-${index}`} />
                    <div><strong>{item}</strong><small>{index + 2} min atrás</small></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="payment-wrap">
                <div className="donut" />
                <div className="payment-legend">
                  <span><i className="l-1" /> PIX <b>52%</b></span>
                  <span><i className="l-2" /> Cartão <b>28%</b></span>
                  <span><i className="l-3" /> Dinheiro <b>15%</b></span>
                  <span><i className="l-4" /> Outros <b>5%</b></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
