import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const routes = JSON.parse(fs.readFileSync(path.join(root,'routes.json'),'utf8'));
const paths = new Set([...Object.values(routes).map(x=>x.html), 'concept/index.html', 'guide/index.html', '404.html']);
const html = fs.readFileSync(path.join(root,'src/index.html'),'utf8');
for (const file of paths) {
  const target=path.join(root,'dist',file);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,html);
}
fs.copyFileSync(path.join(root,'src/app.js'),path.join(root,'dist/rigvyn.js'));
fs.copyFileSync(path.join(root,'src/styles.css'),path.join(root,'dist/rigvyn.css'));
console.log(`Built RIGVYN frontend: ${paths.size} route entries.`);
