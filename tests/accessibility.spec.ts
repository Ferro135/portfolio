import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const pages=['/','/servicos','/projetos','/resultados','/contato','/sobre','/agendar','/projetos/zentra','/projetos/spazio-gestao','/en','/en/services','/en/projects','/en/contact'];
for(const path of pages){test(`axe ${path}`,async({page})=>{await page.goto(path,{waitUntil:'networkidle'});const results=await new AxeBuilder({page}).disableRules(['color-contrast']).analyze();const serious=results.violations.filter(v=>['serious','critical'].includes(v.impact||''));expect(serious,JSON.stringify(serious,null,2)).toEqual([])})}
