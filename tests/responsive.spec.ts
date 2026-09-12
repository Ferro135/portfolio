import { expect, test } from "@playwright/test";

const widths = [320, 375, 390, 430, 768, 1024, 1440];
const pages = [
  "/",
  "/servicos",
  "/projetos",
  "/resultados",
  "/agendar",
  "/contato",
  "/sobre",
  "/projetos/zentra",
  "/projetos/spazio-gestao",
  "/en",
  "/en/services",
  "/en/projects",
  "/en/contact",
];

for (const width of widths) {
  for (const path of pages) {
    test(`${path} sem overflow em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });

      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
      }));

      expect(
        Math.max(metrics.scrollWidth, metrics.bodyScrollWidth),
        `Overflow horizontal em ${path} @ ${width}px`,
      ).toBeLessThanOrEqual(metrics.clientWidth + 2);

      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("header")).toBeVisible();
    });
  }
}
