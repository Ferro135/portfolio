import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/servicos",
  "/projetos",
  "/resultados",
  "/contato",
  "/sobre",
  "/agendar",
  "/projetos/zentra",
  "/projetos/spazio-gestao",
  "/en",
  "/en/services",
  "/en/projects",
  "/en/contact",
];

for (const path of pages) {
  test(`axe ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });

    // @axe-core/playwright and @playwright/test can expose Page from
    // slightly different playwright-core patch versions. At runtime they are
    // compatible for AxeBuilder; the cast avoids a false-positive TS mismatch.
    const results = await new AxeBuilder({ page: page as never })
      .disableRules(["color-contrast"])
      .analyze();

    const serious = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact || ""),
    );

    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
