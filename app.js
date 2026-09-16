const CONT_COLORS = {
  Africa:   getComputedStyle(document.documentElement).getPropertyValue('--africa').trim(),
  Asia:     getComputedStyle(document.documentElement).getPropertyValue('--asia').trim(),
  Europe:   getComputedStyle(document.documentElement).getPropertyValue('--europe').trim(),
  Americas: getComputedStyle(document.documentElement).getPropertyValue('--americas').trim(),
  Oceania:  getComputedStyle(document.documentElement).getPropertyValue('--oceania').trim(),
};
const CONTINENTS = ["All","Africa","Asia","Europe","Americas","Oceania"];

let state = { q: "", continent: "All", openRow: null, mapHighlight: "All", openOther: null };

function flagUrl(c, w){ return `https://flagcdn.com/w${w||80}/${c.iso2}.png`; }

/* Renders a flag image for entities with a real iso2 code, or a text
   fallback box (initials) for unrecognized/uncoded territories. */
function flagBlock(t, cls){
  if(t.iso2){
    const w = cls.includes('lg') ? 160 : (cls.includes('sm') ? 40 : 80);
    return `<img class="${cls}" src="${flagUrl(t,w)}" loading="lazy" alt="${t.name || t.country} flag">`;
  }
  const label = (t.name || t.country).split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return `<div class="${cls} flag-fallback">${label}</div>`;
}

function fmt(n){ return n.toLocaleString('en-US'); }
function fmtShort(n){
  if(n >= 1e9) return (n/1e9).toFixed(2)+"B";
  if(n >= 1e6) return (n/1e6).toFixed(1)+"M";
  if(n >= 1e3) return (n/1e3).toFixed(0)+"K";
  return String(n);
}

/* ---------------- Chips ---------------- */
function renderChips(){
  const wrap = document.getElementById('chips');
  wrap.innerHTML = "";
  CONTINENTS.forEach(c=>{
    const el = document.createElement('button');
    el.className = 'chip' + (state.continent===c ? ' active':'');
    const dot = c==="All" ? "" : `<span class="dot" style="background:${CONT_COLORS[c]}"></span>`;
    el.innerHTML = `${dot}${c}`;
    el.onclick = ()=>{
      state.continent = c; state.mapHighlight = c;
      renderChips(); renderList(); drawMap(); renderDashboard(); renderOthers();
    };
    wrap.appendChild(el);
  });
}

/* ---------------- Explore list ---------------- */
function filteredCountries(){
  const q = state.q.trim().toLowerCase();
  return COUNTRIES.filter(c=>{
    if(state.continent !== "All" && c.continent !== state.continent) return false;
    if(!q) return true;
    return c.country.toLowerCase().includes(q) ||
           c.capital.toLowerCase().includes(q) ||
           c.lang.toLowerCase().includes(q) ||
           c.currency.toLowerCase().includes(q) ||
           c.religion.toLowerCase().includes(q) ||
           c.subregion.toLowerCase().includes(q);
  }).sort((a,b)=> a.country.localeCompare(b.country));
}

function attrHtml(k,v,full){
  return `<div class="attr${full?' full':''}"><div class="k">${k}</div><div class="v">${v}</div></div>`;
}

function renderList(){
  const items = filteredCountries();
  document.getElementById('countline').textContent = `${items.length} of 195 countries`;
  const list = document.getElementById('list');
  if(items.length === 0){
    list.innerHTML = `<div class="empty">No country matches "${state.q}".<br>Try a different search or clear the continent filter.</div>`;
    return;
  }
  list.innerHTML = items.map(c=>{
    const open = state.openRow === c.iso3;
    return `
    <div class="row${open?' open':''}" data-iso="${c.iso3}">
      <div class="row-head" onclick="toggleRow('${c.iso3}')">
        <img class="flag sm" src="${flagUrl(c,40)}" loading="lazy" alt="${c.country} flag">
        <span class="dot" style="background:${CONT_COLORS[c.continent]}"></span>
        <div class="rt">
          <div class="country">${c.country}</div>
          <div class="capital">${c.capital} &middot; ${c.subregion}</div>
        </div>
        <div class="pop">${fmtShort(c.population)}</div>
        <div class="chev">&#9656;</div>
      </div>
      <div class="detail">
        <div class="detail-inner">
          <div class="detail-flagrow">
            <img class="flag lg" src="${flagUrl(c,160)}" loading="lazy" alt="${c.country} flag">
            <div class="v">ISO ${c.iso3} &middot; ${c.iso2.toUpperCase()}</div>
          </div>
          <div class="attr-grid">
            ${attrHtml("Continent", c.continent)}
            ${attrHtml("Coastal type", c.coastal)}
            ${attrHtml("Area", fmt(c.area) + " km&sup2;")}
            ${attrHtml("Population", fmt(c.population))}
            ${attrHtml("Latitude, Longitude", c.lat.toFixed(2)+", "+c.lon.toFixed(2))}
            ${attrHtml("Currency", c.currency + " (" + c.currency_code + ")")}
            ${attrHtml("Official language", c.lang, true)}
            ${attrHtml("Major religion", c.religion, true)}
            ${attrHtml("Terrain", c.terrain, true)}
            ${attrHtml("Climate", c.climate, true)}
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
}

function toggleRow(iso){
  state.openRow = (state.openRow === iso) ? null : iso;
  renderList();
  if(state.openRow){
    requestAnimationFrame(()=>{
      const el = document.querySelector(`.row[data-iso="${iso}"]`);
      if(el) el.scrollIntoView({block:"nearest", behavior:"smooth"});
    });
  }
}

/* ---------------- Dashboard ---------------- */
function renderDashboard(){
  const el = document.getElementById('dashboard');
  const dc = state.continent;
  const scope = dc === "All" ? COUNTRIES : COUNTRIES.filter(c=>c.continent===dc);

  const totalPop = scope.reduce((s,c)=>s+c.population,0);
  const totalArea = scope.reduce((s,c)=>s+c.area,0);

  // Breakdown by continent always spans the full 195 for comparison purposes.
  const byCont = {};
  CONTINENTS.slice(1).forEach(c=> byCont[c] = {count:0,pop:0,area:0});
  COUNTRIES.forEach(c=>{ byCont[c.continent].count++; byCont[c.continent].pop+=c.population; byCont[c.continent].area+=c.area; });

  const maxPop = Math.max(...Object.values(byCont).map(v=>v.pop));
  const maxArea = Math.max(...Object.values(byCont).map(v=>v.area));

  const popBars = CONTINENTS.slice(1).map(c=>{
    const v = byCont[c];
    const pct = (v.pop/maxPop*100).toFixed(1);
    const hl = c===dc ? ' highlighted' : '';
    return `<div class="bar-row${hl}"><div class="blabel">${c}</div><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${CONT_COLORS[c]}"></div></div><div class="bval">${fmtShort(v.pop)}</div></div>`;
  }).join("");

  const areaBars = CONTINENTS.slice(1).map(c=>{
    const v = byCont[c];
    const pct = (v.area/maxArea*100).toFixed(1);
    const hl = c===dc ? ' highlighted' : '';
    return `<div class="bar-row${hl}"><div class="blabel">${c}</div><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${CONT_COLORS[c]}"></div></div><div class="bval">${fmt(v.area)}</div></div>`;
  }).join("");

  const topPop = [...scope].sort((a,b)=>b.population-a.population).slice(0,10);
  const topArea = [...scope].sort((a,b)=>b.area-a.area).slice(0,10);
  const topDensity = [...scope].map(c=>({...c, density:c.population/c.area}))
                        .sort((a,b)=>b.density-a.density).slice(0,10);

  const rankList = (arr, valueFn) => arr.length ? arr.map((c,i)=>
    `<div class="rank-item"><span class="n">${i+1}</span><span class="nm">${c.country}</span><span class="vv">${valueFn(c)}</span></div>`
  ).join("") : `<div class="rank-item"><span class="nm" style="color:var(--text-dim)">No data</span></div>`;

  const suffix = dc === "All" ? "" : ` in ${dc}`;

  const statCards = dc === "All" ? `
    <div class="stat-grid">
      <div class="stat-card"><div class="num">195</div><div class="lbl">Countries covered</div></div>
      <div class="stat-card"><div class="num">${fmtShort(totalPop)}</div><div class="lbl">Total population</div></div>
      <div class="stat-card"><div class="num">${fmtShort(totalArea)}</div><div class="lbl">Total area (km&sup2;)</div></div>
      <div class="stat-card"><div class="num">5</div><div class="lbl">Continents</div></div>
    </div>` : `
    <div class="stat-grid">
      <div class="stat-card"><div class="num">${scope.length}</div><div class="lbl">Countries in ${dc}</div></div>
      <div class="stat-card"><div class="num">${fmtShort(totalPop)}</div><div class="lbl">Population</div></div>
      <div class="stat-card"><div class="num">${fmtShort(totalArea)}</div><div class="lbl">Total area (km&sup2;)</div></div>
      <div class="stat-card"><div class="num">${totalArea?(totalPop/totalArea).toFixed(0):'0'}</div><div class="lbl">Avg. density /km&sup2;</div></div>
    </div>`;

  el.innerHTML = `
    ${statCards}

    <div class="section-title">Population by continent</div>
    ${popBars}

    <div class="section-title">Area by continent</div>
    ${areaBars}

    <div class="section-title">Top 10 most populous${suffix}</div>
    <div class="rank-list">${rankList(topPop, c=>fmtShort(c.population))}</div>

    <div class="section-title">Top 10 largest by area${suffix}</div>
    <div class="rank-list">${rankList(topArea, c=>fmt(c.area)+" km²")}</div>

    <div class="section-title">Top 10 most densely populated${suffix}</div>
    <div class="rank-list">${rankList(topDensity, c=>c.density.toFixed(0)+"/km²")}</div>
  `;
}

/* ---------------- Map ---------------- */
let mapPoints = [];
function drawMap(){
  const canvas = document.getElementById('mapcanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = "#0C1420";
  ctx.fillRect(0,0,W,H);

  const padL=34, padR=10, padT=10, padB=10;
  const lonMin=-180, lonMax=180, latMin=-60, latMax=85;
  const x = lon => padL + (lon-lonMin)/(lonMax-lonMin) * (W-padL-padR);
  const y = lat => padT + (1 - (lat-latMin)/(latMax-latMin)) * (H-padT-padB);

  // graticule
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for(let g=-180; g<=180; g+=30){ ctx.beginPath(); ctx.moveTo(x(g),padT); ctx.lineTo(x(g),H-padB); ctx.stroke(); }
  for(let g=-60; g<=85; g+=30){ ctx.beginPath(); ctx.moveTo(padL,y(g)); ctx.lineTo(W-padR,y(g)); ctx.stroke(); }
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath(); ctx.moveTo(padL,y(0)); ctx.lineTo(W-padR,y(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x(0),padT); ctx.lineTo(x(0),H-padB); ctx.stroke();

  const maxPop = Math.max(...COUNTRIES.map(c=>c.population));
  mapPoints = [];
  COUNTRIES.forEach(c=>{
    const px = x(c.lon), py = y(c.lat);
    const r = 2 + Math.sqrt(c.population/maxPop) * 13;
    const dim = state.mapHighlight !== "All" && state.mapHighlight !== c.continent;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI*2);
    ctx.fillStyle = dim ? "rgba(255,255,255,0.10)" : CONT_COLORS[c.continent];
    ctx.globalAlpha = dim ? 0.5 : 0.9;
    ctx.fill();
    ctx.globalAlpha = 1;
    if(!dim){
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
    mapPoints.push({x:px,y:py,r:Math.max(r,6),c});
  });
}

function renderMapLegend(){
  const el = document.getElementById('maplegend');
  el.innerHTML = CONTINENTS.slice(1).map(c=>
    `<span><span class="dot" style="background:${CONT_COLORS[c]}"></span>${c}</span>`
  ).join("");
}

function setupMapInteraction(){
  const canvas = document.getElementById('mapcanvas');
  const tooltip = document.getElementById('tooltip');
  function handle(clientX, clientY){
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width/rect.width, scaleY = canvas.height/rect.height;
    const mx = (clientX-rect.left)*scaleX, my = (clientY-rect.top)*scaleY;
    let hit = null, best = 1e9;
    mapPoints.forEach(p=>{
      const d = Math.hypot(p.x-mx, p.y-my);
      if(d < p.r+4 && d < best){ best = d; hit = p; }
    });
    if(hit){
      tooltip.style.display = "block";
      tooltip.style.left = (hit.x/scaleX - 10) + "px";
      tooltip.style.top = (hit.y/scaleY - 34) + "px";
      tooltip.textContent = `${hit.c.country} — ${fmtShort(hit.c.population)}`;
    } else {
      tooltip.style.display = "none";
    }
  }
  canvas.addEventListener('click', e=> handle(e.clientX, e.clientY));
  canvas.addEventListener('touchstart', e=>{
    const t = e.touches[0];
    handle(t.clientX, t.clientY);
  }, {passive:true});
}

/* ---------------- Game ---------------- */
const GAME_MODES = [
  { id:"flag2country",    label:"Flag \u2192 Country" },
  { id:"country2flag",    label:"Country \u2192 Flag" },
  { id:"capital2country", label:"City \u2192 Country" },
  { id:"country2capital", label:"Country \u2192 City" },
  { id:"popcompare",      label:"Bigger population?" },
  { id:"areacompare",     label:"Bigger by area?" },
];

let game = {
  mode: "flag2country",
  continent: "All",
  score: 0,
  streak: 0,
  best: 0,
  total: 0,
  q: null,       // current question object; q.userAnswer set once answered
};

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function sample(arr, n){ return shuffle(arr).slice(0,n); }
function randCountry(pool, exclude){
  let c;
  do { c = pool[Math.floor(Math.random()*pool.length)]; }
  while(exclude && exclude.some(x=>x.iso3===c.iso3));
  return c;
}
function gamePool(){
  return game.continent === "All" ? COUNTRIES : COUNTRIES.filter(c=>c.continent===game.continent);
}

function buildQuestion(mode){
  const pool = gamePool();
  if(mode === "flag2country" || mode === "capital2country"){
    const target = randCountry(pool);
    const distractors = sample(pool.filter(c=>c.iso3!==target.iso3), 3);
    const options = shuffle([target, ...distractors]);
    return { mode, target, options, kind:"mc-text", userAnswer:null };
  }
  if(mode === "country2flag"){
    const target = randCountry(pool);
    const distractors = sample(pool.filter(c=>c.iso3!==target.iso3), 3);
    const options = shuffle([target, ...distractors]);
    return { mode, target, options, kind:"mc-flag", userAnswer:null };
  }
  if(mode === "country2capital"){
    const target = randCountry(pool);
    const distractorPool = pool.filter(c=>c.iso3!==target.iso3 && c.capital!==target.capital);
    const distractors = sample(distractorPool, 3);
    const options = shuffle([target, ...distractors]);
    return { mode, target, options, kind:"mc-text", userAnswer:null };
  }
  if(mode === "popcompare" || mode === "areacompare"){
    const a = randCountry(pool);
    const b = randCountry(pool, [a]);
    return { mode, a, b, kind:"compare", userAnswer:null };
  }
}

function questionPrompt(q){
  switch(q.mode){
    case "flag2country": return "Which country does this flag belong to?";
    case "country2flag": return `Which flag belongs to ${q.target.country}?`;
    case "capital2country": return "Which country is this city the capital of?";
    case "country2capital": return `What is the capital of ${q.target.country}?`;
    case "popcompare": return "Which country has the larger population?";
    case "areacompare": return "Which country is larger by land area?";
  }
}

function newQuestion(){
  game.q = buildQuestion(game.mode);
  renderGame();
}

function renderModeChips(){
  return `<div class="game-modes">${GAME_MODES.map(m=>
    `<button class="mode-btn${game.mode===m.id?' active':''}" onclick="setGameMode('${m.id}')">${m.label}</button>`
  ).join("")}</div>`;
}

function renderGameContinentChips(){
  const pool = gamePool();
  return `
    <div class="chips" style="margin:0 0 6px;">${CONTINENTS.map(c=>{
      const dot = c==="All" ? "" : `<span class="dot" style="background:${CONT_COLORS[c]}"></span>`;
      return `<button class="chip${game.continent===c?' active':''}" onclick="setGameContinent('${c}')">${dot}${c}</button>`;
    }).join("")}</div>
    <div class="game-sub-big" style="text-align:left; margin:0 0 16px;">Practicing ${pool.length} ${game.continent==="All" ? "countries worldwide" : "countries in "+game.continent}</div>`;
}

function setGameMode(id){
  game.mode = id;
  newQuestion();
}
function setGameContinent(c){
  game.continent = c;
  newQuestion();
}

function registerAnswer(correct){
  game.total++;
  if(correct){
    game.score++;
    game.streak++;
    if(game.streak > game.best) game.best = game.streak;
  } else {
    game.streak = 0;
  }
}

function answerMC(idx){
  const q = game.q;
  if(q.userAnswer !== null) return;
  const correctIdx = q.options.findIndex(o=>o.iso3===q.target.iso3);
  q.userAnswer = idx;
  q.correct = (idx === correctIdx);
  registerAnswer(q.correct);
  renderGame();
}

function answerCompare(side){
  const q = game.q;
  if(q.userAnswer !== null) return;
  const metricKey = q.mode === "popcompare" ? "population" : "area";
  q.winner = q.a[metricKey] >= q.b[metricKey] ? 'a' : 'b';
  q.userAnswer = side;
  q.correct = (side === q.winner);
  registerAnswer(q.correct);
  renderGame();
}

function renderGame(){
  const el = document.getElementById('gamewrap');
  const q = game.q;
  const answered = q.userAnswer !== null;

  const scorebar = `
    <div class="game-scorebar">
      <div class="game-score">
        <div class="gs">SCORE<br><b>${game.score}</b></div>
        <div class="gs">PLAYED<br><b>${game.total}</b></div>
        <div class="gs">BEST STREAK<br><b>${game.best}</b></div>
      </div>
      <div class="streak-pill">\u{1F525} ${game.streak}</div>
    </div>`;

  const nextBtn = `<button class="game-next" onclick="newQuestion()">Next question \u2192</button>`;

  let body = "";
  if(q.kind === "mc-text"){
    const correctIdx = q.options.findIndex(o=>o.iso3===q.target.iso3);
    const showFlag = (q.mode === "flag2country");
    const showCapitalPrompt = (q.mode === "capital2country");
    body = `
      <div class="game-card">
        <div class="game-prompt-lbl">${questionPrompt(q)}</div>
        ${showFlag ? `<img class="game-flag-big" src="${flagUrl(q.target,320)}" alt="flag">` : ""}
        ${showCapitalPrompt ? `<div class="game-country-big">${q.target.capital}</div><div class="game-sub-big">${q.target.subregion}</div>` : ""}
        <div class="opt-grid">
          ${q.options.map((o,i)=>{
            const label = (q.mode==="country2capital") ? o.capital : o.country;
            let cls = "opt-btn";
            if(answered){
              if(i === correctIdx) cls += " correct";
              else if(i === q.userAnswer) cls += " wrong";
            }
            return `<button class="${cls}" ${answered?'disabled':''} onclick="answerMC(${i})">${label}</button>`;
          }).join("")}
        </div>
        <div class="game-feedback${answered ? (q.correct?' correct':' wrong') : ''}">${
          answered ? (q.correct ? "Correct!" : `Not quite — that was ${q.target.country}.`) : ""
        }</div>
        ${answered ? nextBtn : ""}
      </div>`;
  } else if(q.kind === "mc-flag"){
    const correctIdx = q.options.findIndex(o=>o.iso3===q.target.iso3);
    body = `
      <div class="game-card">
        <div class="game-prompt-lbl">${questionPrompt(q)}</div>
        <div class="game-country-big" style="margin-bottom:6px;">${q.target.country}</div>
        <div class="opt-grid flags">
          ${q.options.map((o,i)=>{
            let cls = "opt-btn flagopt";
            if(answered){
              if(i === correctIdx) cls += " correct";
              else if(i === q.userAnswer) cls += " wrong";
            }
            return `<button class="${cls}" ${answered?'disabled':''} onclick="answerMC(${i})"><img src="${flagUrl(o,160)}" alt="flag option"></button>`;
          }).join("")}
        </div>
        <div class="game-feedback${answered ? (q.correct?' correct':' wrong') : ''}">${
          answered ? (q.correct ? "Correct!" : `Not quite — that was ${q.target.country}'s flag.`) : ""
        }</div>
        ${answered ? nextBtn : ""}
      </div>`;
  } else if(q.kind === "compare"){
    const metric = q.mode === "popcompare" ? "population" : "area";
    const fmtFn = q.mode === "popcompare" ? fmtShort : (n)=>fmt(n)+" km\u00B2";
    const clsFor = (side) => {
      let cls = "vs-card";
      if(answered){
        if(side === q.winner) cls += " correct";
        else if(side === q.userAnswer) cls += " wrong";
      }
      return cls;
    };
    body = `
      <div class="game-card">
        <div class="game-prompt-lbl">${questionPrompt(q)}</div>
        <div class="vs-row">
          <div class="${clsFor('a')}" onclick="answerCompare('a')">
            <img class="flag lg" style="margin:0 auto 8px;" src="${flagUrl(q.a,160)}" alt="flag">
            <div class="vc-name">${q.a.country}</div>
            <div class="vc-sub">${answered ? fmtFn(q.a[metric]) : "&nbsp;"}</div>
          </div>
          <div class="vs-or">vs</div>
          <div class="${clsFor('b')}" onclick="answerCompare('b')">
            <img class="flag lg" style="margin:0 auto 8px;" src="${flagUrl(q.b,160)}" alt="flag">
            <div class="vc-name">${q.b.country}</div>
            <div class="vc-sub">${answered ? fmtFn(q.b[metric]) : "&nbsp;"}</div>
          </div>
        </div>
        <div class="game-feedback${answered ? (q.correct?' correct':' wrong') : ''}">${
          answered ? (q.correct ? "Correct!" : `Not quite — ${q[q.winner].country} was larger.`) : ""
        }</div>
        ${answered ? nextBtn : ""}
      </div>`;
  }

  el.innerHTML = renderModeChips() + renderGameContinentChips() + scorebar + body;
}

/* ---------------- Others (non-195 territories & states) ---------------- */
function filteredTerritories(){
  return TERRITORIES.filter(t=> state.continent==="All" || t.continent===state.continent)
    .sort((a,b)=>a.name.localeCompare(b.name));
}

function toggleOther(id){
  state.openOther = (state.openOther === id) ? null : id;
  renderOthers();
  if(state.openOther){
    requestAnimationFrame(()=>{
      const el = document.querySelector(`.row[data-id="${id}"]`);
      if(el) el.scrollIntoView({block:"nearest", behavior:"smooth"});
    });
  }
}

function renderOthers(){
  const el = document.getElementById('others');
  const items = filteredTerritories();

  const rows = items.map(t=>{
    const open = state.openOther === t.id;
    return `
    <div class="row${open?' open':''}" data-id="${t.id}">
      <div class="row-head" onclick="toggleOther('${t.id}')">
        ${flagBlock(t,'flag sm')}
        <span class="dot" style="background:${CONT_COLORS[t.continent]}"></span>
        <div class="rt">
          <div class="country">${t.name}</div>
          <div class="capital">${t.capital} &middot; ${t.status}</div>
        </div>
        <div class="pop">${fmtShort(t.population)}</div>
        <div class="chev">&#9656;</div>
      </div>
      <div class="detail">
        <div class="detail-inner">
          <div class="detail-flagrow">
            ${flagBlock(t,'flag lg')}
            <div class="v">${t.continent}</div>
          </div>
          <div class="attr-grid">
            ${attrHtml("Political status", t.status, true)}
            ${attrHtml("Capital / main city", t.capital)}
            ${attrHtml("Area", fmt(t.area) + " km&sup2;")}
            ${attrHtml("Population", fmt(t.population))}
            ${attrHtml("Latitude, Longitude", t.lat.toFixed(2)+", "+t.lon.toFixed(2))}
            ${attrHtml("Currency", t.currency + " (" + t.currency_code + ")")}
            ${attrHtml("Language", t.lang, true)}
          </div>
        </div>
      </div>
    </div>`;
  }).join("");

  el.innerHTML = `
    <div class="count-line">${items.length} territories &amp; non-UN entities${state.continent==="All" ? "" : " in "+state.continent}</div>
    ${rows || `<div class="empty">No entries for this continent.</div>`}
  `;
}

/* ---------------- Tabs ---------------- */
function setupTabs(){
  document.querySelectorAll('.tabbtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tabbtn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('view-'+btn.dataset.view).classList.add('active');
      if(btn.dataset.view === 'map'){ drawMap(); }
      if(btn.dataset.view === 'game' && !game.q){ newQuestion(); }
    });
  });
}

/* ---------------- Init ---------------- */
document.getElementById('search').addEventListener('input', e=>{
  state.q = e.target.value;
  renderList();
});

renderChips();
renderList();
renderDashboard();
renderMapLegend();
setupMapInteraction();
setupTabs();
drawMap();
renderOthers();
