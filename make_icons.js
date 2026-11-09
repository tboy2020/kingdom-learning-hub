const sharp = require('C:\\Users\\adego\\Documents\\DealStudio-Backend\\node_modules\\sharp');
const OUT = 'C:\\Users\\adego\\Documents\\KingdomLearningHub\\icons\\';
const fs = require('fs');
if(!fs.existsSync(OUT)) fs.mkdirSync(OUT, {recursive:true});

const defs = `
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2d4a"/><stop offset="1" stop-color="#0b1627"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e3a8"/><stop offset="1" stop-color="#e3bd5a"/></linearGradient>
</defs>`;

// small crown
const crown = `
<g>
  <path d="M196,150 L196,112 L228,138 L256,98 L284,138 L316,112 L316,150 Z" fill="url(#g)"/>
  <rect x="194" y="146" width="124" height="20" rx="6" fill="url(#g)"/>
</g>`;

// open book: two fanned pages with a gold cover
const book = `
<g>
  <!-- spine shadow -->
  <path d="M256,214 L256,392" stroke="#0b1627" stroke-width="10" opacity="0.5"/>
  <!-- left page -->
  <path d="M256,214 C210,188 150,186 116,196 L116,372 C150,362 210,364 256,390 Z" fill="url(#g)"/>
  <!-- right page -->
  <path d="M256,214 C302,188 362,186 396,196 L396,372 C362,362 302,364 256,390 Z" fill="url(#g)"/>
  <!-- page lines -->
  <g stroke="#0b1627" stroke-width="6" opacity="0.35" stroke-linecap="round">
    <path d="M150,232 C180,226 216,228 238,240"/>
    <path d="M150,268 C180,262 216,264 238,276"/>
    <path d="M150,304 C180,298 216,300 238,312"/>
    <path d="M374,232 C344,226 308,228 286,240"/>
    <path d="M374,268 C344,262 308,264 286,276"/>
    <path d="M374,304 C344,298 308,300 286,312"/>
  </g>
</g>`;

function svg(maskable){
  const inner = maskable
    ? `<g transform="translate(256,256) scale(0.72) translate(-256,-256)">${crown}${book}</g>`
    : `${crown}${book}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${defs}<rect width="512" height="512" rx="96" fill="url(#bg)"/>${inner}</svg>`;
}
function svgSquare(){ return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${defs}<rect width="512" height="512" fill="#0f1e33"/>${crown}${book}</svg>`; }

async function run(){
  await sharp(Buffer.from(svg(false))).resize(192,192).png().toFile(OUT+'icon-192.png');
  await sharp(Buffer.from(svg(false))).resize(512,512).png().toFile(OUT+'icon-512.png');
  await sharp(Buffer.from(svg(true))).resize(512,512).png().toFile(OUT+'icon-maskable-512.png');
  await sharp(Buffer.from(svgSquare())).resize(180,180).png().toFile(OUT+'apple-touch-icon-180.png');
  console.log('learning hub icons written to '+OUT);
}
run().catch(function(e){ console.log('ERR '+e.message); process.exit(1); });
