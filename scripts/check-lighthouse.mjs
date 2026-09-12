import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] || ".lighthouse-reports";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => name.endsWith(".json")) : [];

if (!files.length) {
  console.error("Nenhum relatório Lighthouse encontrado em", dir);
  process.exit(1);
}

const thresholds = {
  performance: 0.65,
  accessibility: 0.9,
  "best-practices": 0.85,
  seo: 0.9,
};

let failed = false;
for (const file of files) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const scores = Object.fromEntries(
    Object.keys(thresholds).map((key) => [key, report.categories?.[key]?.score ?? 0]),
  );
  console.log(`\n${file}`);
  for (const [key, score] of Object.entries(scores)) {
    const minimum = thresholds[key];
    const ok = score >= minimum;
    console.log(`${ok ? "✓" : "✗"} ${key}: ${Math.round(score * 100)} (mínimo ${Math.round(minimum * 100)})`);
    if (!ok) failed = true;
  }
}

if (failed) {
  console.error("\nA auditoria encontrou uma regressão abaixo dos limites definidos.");
  process.exit(1);
}
console.log("\nLighthouse dentro dos limites definidos.");
