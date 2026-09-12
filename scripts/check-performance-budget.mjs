import fs from "node:fs";
import path from "node:path";

const limits={maxSingleJs:400*1024,maxTotalJs:2*1024*1024,maxImage:750*1024,maxVideo:12*1024*1024};
let failed=false;
function walk(dir){if(!fs.existsSync(dir))return[];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const js=walk('.next/static').filter(f=>f.endsWith('.js'));const total=js.reduce((n,f)=>n+fs.statSync(f).size,0);const largest=js.sort((a,b)=>fs.statSync(b).size-fs.statSync(a).size)[0];if(largest){const size=fs.statSync(largest).size;console.log(`Maior JS: ${(size/1024).toFixed(1)} KB — ${largest}`);if(size>limits.maxSingleJs){console.error('Budget falhou: chunk JS individual acima de 400 KB');failed=true}}console.log(`JS estático total: ${(total/1024).toFixed(1)} KB`);if(total>limits.maxTotalJs){console.error('Budget falhou: JS total acima de 2 MB');failed=true}
for(const file of walk('public')){const ext=path.extname(file).toLowerCase();const size=fs.statSync(file).size;if(['.png','.jpg','.jpeg','.webp','.avif'].includes(ext)&&size>limits.maxImage){console.error(`Imagem acima de 750 KB: ${file} ${(size/1024).toFixed(1)} KB`);failed=true}if(['.mp4','.webm'].includes(ext)&&size>limits.maxVideo){console.error(`Vídeo acima de 12 MB: ${file} ${(size/1024/1024).toFixed(1)} MB`);failed=true}}
if(failed)process.exit(1);console.log('Performance budget dentro dos limites.');
