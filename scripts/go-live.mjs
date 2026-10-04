// Uso:  node scripts/go-live.mjs            -> solo revisa (no cambia nada)
//       node scripts/go-live.mjs --apply    -> cambia noindex por index, follow en todas las páginas
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

const noindexRe = /[ \t]*<!-- TEMPORAL:[^>]*-->\r?\n[ \t]*<meta name="robots" content="noindex, nofollow">/;
const liveTag = '<meta name="robots" content="index, follow">';

let flipped = 0;
const blockers = [];
const warnings = [];
const footerPages = [];
const stockPages = [];

for (const f of htmlFiles) {
  const p = path.join(root, f);
  const html = fs.readFileSync(p, 'utf8');

  if (noindexRe.test(html)) {
    flipped++;
    if (apply) fs.writeFileSync(p, html.replace(noindexRe, '  ' + liveTag), 'utf8');
  } else if (/content="noindex, nofollow"/.test(html)) {
    blockers.push(`${f}: tiene noindex sin el comentario TEMPORAL; revísalo a mano`);
  }

  const pend = (html.match(/class="pendiente"/g) || []).length - (f === 'politica-garantias.html' ? 1 : 0);
  if (pend > 0) blockers.push(`${f}: ${pend} dato(s) pendiente(s) resaltado(s) en amarillo`);
  if (html.includes('class="draft-note"')) blockers.push(`${f}: aún muestra el aviso "Borrador pendiente de revisión legal"`);
  if (html.includes('[Borrador')) blockers.push(`${f}: aún tiene texto "[Borrador — revisar con un abogado]"`);
  if (/muestra de sitio web|Contenido de ejemplo/.test(html)) footerPages.push(f);
  const refs = (html.match(/Imagen de referencia/g) || []).length;
  if (refs > 0) stockPages.push(f);
}

if (footerPages.length) warnings.push(`El pie dice "muestra de sitio web" / "Contenido de ejemplo" en ${footerPages.length} páginas (${footerPages.join(", ")})`);
if (stockPages.length) warnings.push(`Fotos de banco con leyenda "Imagen de referencia" en ${stockPages.length} páginas: reemplazar por las del cliente (${stockPages.join(", ")})`);

const robotsTxt = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) blockers.push('robots.txt bloquea todo el sitio (Disallow: /)');
if (!/Sitemap:/i.test(robotsTxt)) warnings.push('robots.txt no declara el Sitemap');

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const f of htmlFiles.filter(f => f !== '404.html')) {
  if (!sitemap.includes('/' + f)) warnings.push(`sitemap.xml no incluye ${f}`);
}

console.log(`Páginas HTML: ${htmlFiles.length}`);
console.log(apply ? `Cambiadas a "index, follow": ${flipped}` : `Se cambiarían a "index, follow": ${flipped} (usa --apply para aplicarlo)`);
console.log('\nBLOQUEADORES (resolver antes de publicar):');
console.log(blockers.length ? blockers.map(b => ' - ' + b).join('\n') : ' (ninguno)');
console.log('\nAVISOS (revisar):');
console.log(warnings.length ? warnings.map(w => ' - ' + w).join('\n') : ' (ninguno)');
process.exitCode = blockers.length ? 1 : 0;
