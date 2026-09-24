# Site — Dra. Mariana Furuse

Site institucional em **HTML + CSS (Tailwind) + JS puro**, sem framework/backend. Pronto para publicar em qualquer servidor estático (Hostinger, Vercel, Netlify, cPanel, etc).

## Estrutura

```
index.html              → página inicial (hero, sobre, casos em destaque, FAQ, contato)
servicos.html            → página "Serviços & Casos" — todos os tratamentos com fotos reais de antes/depois
assets/
  css/styles.css         → CSS final gerado pelo Tailwind (já compilado, não editar direto)
  js/main.js              → menu mobile, sliders antes/depois (múltiplas instâncias), FAQ, filtros, lista de serviços, formulário
  logos/                   → logo e símbolo extraídos do PDF de identidade visual (fundos transparentes) + favicons
  fotos/                   → fotos da clínica (fachada, consultório, recepção) + placeholders antigos (não usados mais)
  casos/                   → fotos reais de pacientes (antes/depois de limpeza, clareamento, estética; placa de bruxismo; protetores esportivos)
src/input.css             → fonte do CSS (Tailwind) — editar aqui e rebuildar
source/fotos-originais/    → fotos originais em alta resolução (não usadas no site, só backup)
tailwind.config.js         → cores da marca, fontes, etc.
robots.txt                 → libera indexação e aponta para o sitemap
sitemap.xml                 → mapa do site (index.html + servicos.html) para o Google
site.webmanifest            → manifesto PWA (ícone, cores, nome curto)
package.json
```

## Como editar e gerar o CSS de novo

```bash
npm install
npm run build   # gera assets/css/styles.css (minificado)
npm run dev     # gera e fica observando mudanças (watch mode)
```

## Como publicar (deploy)

O site é 100% estático. Basta subir estes arquivos/pastas para a raiz do servidor:

- `index.html`
- `servicos.html`
- `assets/`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`

Não é necessário Node.js no servidor — o Tailwind já foi compilado para `assets/css/styles.css`. `node_modules`, `src/`, `source/`, `tailwind.config.js` e `package.json` **não precisam ir para o servidor** (são só ferramentas de desenvolvimento).

## SEO — o que já está implementado

- **Título e meta description únicos** em cada página, com palavras-chave locais ("dentista em Araçatuba SP").
- **Canonical URL**, **Open Graph** e **Twitter Card** (compartilhamento em WhatsApp/Facebook/Instagram mostra imagem, título e descrição corretos).
- **Dados estruturados (JSON-LD)**, lidos pelo Google para exibir informações ricas nos resultados de busca:
  - `Dentist` (endereço, geolocalização, horário de funcionamento, avaliação, CROSP) no `index.html`.
  - `FAQPage` (as 7 perguntas do FAQ) no `index.html`.
  - `BreadcrumbList` e `ItemList` (lista de serviços) no `servicos.html`.
- **`robots.txt`** liberando indexação total + apontando para o `sitemap.xml`.
- **`sitemap.xml`** listando as duas páginas para o Google rastrear.
- **`site.webmanifest`** para ícone/PWA em celulares.
- **Performance/Core Web Vitals:** `width`/`height` explícitos nas imagens (evita layout shift), `loading="lazy"` nas imagens fora da primeira tela, `fetchpriority="high"` na foto do hero.
- **Meta geo tags** (`geo.region`, `geo.placename`) reforçando a relevância local para "Araçatuba".

⚠️ **Antes de publicar**, troque `https://www.marianafuruse.com.br/` (usado no canonical, OG, sitemap e JSON-LD) pelo domínio real, se for diferente. Depois de publicar, cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie o `sitemap.xml` para acelerar a indexação.

## Pendências / próximos passos

- **Depoimentos adicionais:** o site atual tem só um depoimento (o único disponível no site original). O carrossel de 5 pontos foi simplificado — se houver mais avaliações, posso montar um carrossel de verdade.
- **Mapa:** usa o Google Maps embutido via iframe simples (sem chave de API). Funciona direto ao publicar num servidor com internet.
- **Analytics:** considerar adicionar Google Analytics/Meta Pixel para acompanhar visitas e conversões (agendamentos via WhatsApp).
- **⚠️ Atenção — Publicidade odontológica (CFO):** as seções de "antes e depois" (clareamento, estética, limpeza) seguem o Código de Ética Odontológica (Art. 38 e correlatos), que restringe a divulgação de resultados estéticos comparativos. Recomendo que a Dra. Mariana (ou o setor de compliance do CRO-SP) revise essas seções antes da publicação, para confirmar que o texto de consentimento/disclaimer usado ("Fotos reais de pacientes, cedidas para fins ilustrativos...") está de acordo com as normas vigentes do Conselho.

## Paleta e tipografia (identidade visual)

Seguem o manual de marca da Dra. Mariana (definidos em `tailwind.config.js`):

- Verde `#66857b` (primária) · Bege `#e4ded0` · Areia `#b9aa8d` — o site usa só essas três cores (mais tons claros do bege para fundo).
- Tipografia primária **Antigua** e secundária **Acumin Variable Concept**. Como são fontes pagas, o site carrega por enquanto as alternativas gratuitas mais próximas do Google Fonts: **Jost Light** (títulos) e **Archivo** (textos).
- Para usar as fontes oficiais: coloque os arquivos licenciados em `assets/fonts/` e declare `@font-face` com os nomes `Antigua` e `Acumin Variable Concept` no `src/input.css`. Elas já estão em primeiro lugar na lista de fontes, então passam a valer automaticamente depois do `npm run build`.
- Horário de atendimento: segunda a sábado, com agendamento prévio.
