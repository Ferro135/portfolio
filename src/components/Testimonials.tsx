import { testimonials } from "@/data/portfolio";

export function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section className="section testimonial-section" aria-labelledby="depoimentos-titulo" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Confiança</span>
            <h2 id="depoimentos-titulo">O que dizem sobre o trabalho.</h2>
          </div>
          <p>Somente depoimentos reais e autorizados aparecem nesta seção.</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <blockquote key={`${testimonial.name}-${testimonial.project ?? "nexora"}`}>
              <p>“{testimonial.quote}”</p>
              <footer>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role ?? testimonial.project ?? "Cliente NEXORA"}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
