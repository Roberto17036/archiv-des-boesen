/**
 * ARCHIV DES BÖSEN – DAS SERIENKILLER-DOSSIER
 * Kriminologische Datenbank & forensische Fallakten
 */

const INITIAL_KILLERS = [
  {
    id: "killer-1",
    name: "Harold Shipman",
    alias: "Dr. Tod (Doctor Death)",
    confirmedVictims: 218,
    suspectedVictims: "250+",
    activePeriod: "1975–1998",
    country: "Großbritannien",
    status: "In Haft verstorben (Suizid)",
    hallmark: "Seriöser Hausarzt, der das uneingeschränkte Vertrauen seiner Patienten ausnutzte; injizierte älteren Damen tödliche Überdosen Diamorphin (Heroin) und fälschte eigenhändig deren Testamente sowie Krankenakten zu seinen Gunsten.",
    description: "Harold Shipman gilt als einer der opferreichsten Serienmörder der Kriminalgeschichte. Als angesehener Arzt in Hyde bei Manchester tötete er jahrzehntelang unbemerkt. Der Verdacht kam erst auf, als er das Testament einer wohlhabenden Patientin fälschte und sich als Alleinerbe einsetzte.",
    tags: ["Arzt", "Gift", "Heroin", "Erbschleicherei", "Todesurteil"],
    updatedAt: "2026-10-20T12:00:00.000Z",
    createdAt: "2026-10-20T10:00:00.000Z"
  },
  {
    id: "killer-2",
    name: "Pedro Alonso López",
    alias: "Das Monster der Anden",
    confirmedVictims: 110,
    suspectedVictims: "300+",
    activePeriod: "1969–1980",
    country: "Kolumbien / Ecuador / Peru",
    status: "Unbekannt (Nach Haftentlassung verschwunden)",
    hallmark: "Entführte und erdrosselte junge indigene Mädchen auf abgelegenen Märkten entlang der Anden; führte Ermittler nach seiner Festnahme zu über 50 Massengräbern in Ecuador.",
    description: "Pedro López nutzte die Armut und Unübersichtlichkeit in Südamerika schamlos aus. Nach seiner Verurteilung in Ecuador wurde er 1998 nach Verbüßung der Höchststrafe überraschend entlassen und nach Kolumbien abgeschoben – seither fehlt von ihm jede Spur.",
    tags: ["Südamerika", "Massengräber", "Verschwunden", "Höchststrafe"],
    updatedAt: "2026-10-20T12:05:00.000Z",
    createdAt: "2026-10-20T10:05:00.000Z"
  },
  {
    id: "killer-3",
    name: "Andrei Romanowitsch Tschikatilo",
    alias: "Der Schlächter von Rostow",
    confirmedVictims: 53,
    suspectedVictims: "56+",
    activePeriod: "1978–1990",
    country: "Sowjetunion (Russland/Ukraine)",
    status: "Hingerichtet (Genickschuss 1994)",
    hallmark: "Extrem sadistische Verstümmelungen, Kannibalismus und Ausstechen der Augen; operierte unbemerkt an sowjetischen Bahnhöfen und in Waldstücken, während die Staatsführung leugnete, dass es Serienmörder im Sozialismus gebe.",
    description: "Tschikatilo war Lehrer und Familienvater. Seine Taten lösten eine der größten Menschenjagden der Sowjetunion aus. Erst durch gezielte forensische Profilerstellung und DNA-Spuren konnte er 1990 überführt und 1994 exekutiert werden.",
    tags: ["Sowjetunion", "Kannibalismus", "Verstümmelung", "Waldmorde", "Hingerichtet"],
    updatedAt: "2026-10-20T12:10:00.000Z",
    createdAt: "2026-10-20T10:10:00.000Z"
  },
  {
    id: "killer-4",
    name: "John Wayne Gacy",
    alias: "The Killer Clown (Pogo der Clown)",
    confirmedVictims: 33,
    suspectedVictims: "33+",
    activePeriod: "1972–1978",
    country: "USA (Illinois)",
    status: "Hingerichtet (Giftspritze 1994)",
    hallmark: "Perfektes bürgerliches Doppelleben als geachteter Bauunternehmer und ehrenamtlicher Kinderclown 'Pogo'; lockte Jugendliche mit Jobangeboten in sein Haus und verscharrte 29 Leichen im Kriechraum unter seinen eigenen Dielen.",
    description: "Gacy galt in seiner Nachbarschaft als hilfsbereiter Bürger und Parteimitglied. Der modrige Geruch in seinem Haus verriet ihn schließlich: Ermittler entdeckten ein regelrechtes Beinhaus im Fundament. Seine clownesken Gemälde aus der Todeszelle wurden später makabere Sammlerobjekte.",
    tags: ["Clown", "Doppelleben", "Kriechraum", "USA", "Hingerichtet"],
    updatedAt: "2026-10-20T12:15:00.000Z",
    createdAt: "2026-10-20T10:15:00.000Z"
  },
  {
    id: "killer-5",
    name: "Ted Bundy",
    alias: "The Lady Killer",
    confirmedVictims: 30,
    suspectedVictims: "36–100+",
    activePeriod: "1974–1978",
    country: "USA",
    status: "Hingerichtet (Elektrischer Stuhl 1989)",
    hallmark: "Extrem manipulativer, charismatischer Jurastudent; täuschte Behinderungen (Gipsarm, Gehkrücken) oder Polizeiausweise vor, um hilfsbereite Frauen zu seinem VW Käfer zu locken; floh spektakulär zweimal aus der Haft.",
    description: "Bundy revolutionierte das moderne FBI-Profiling. Vor Gericht verteidigte er sich zeitweise selbst und scharte weibliche Bewunderinnen um sich. Wenige Stunden vor seiner Hinrichtung auf dem elektrischen Stuhl 'Old Sparky' legte er zahlreiche Geständnisse ab.",
    tags: ["Charisma", "VW Käfer", "Gefängnisausbruch", "Bissspuren", "Elektrischer Stuhl"],
    updatedAt: "2026-10-20T12:20:00.000Z",
    createdAt: "2026-10-20T10:20:00.000Z"
  },
  {
    id: "killer-6",
    name: "Jeffrey Dahmer",
    alias: "The Milwaukee Cannibal / Monster",
    confirmedVictims: 17,
    suspectedVictims: "17",
    activePeriod: "1978–1991",
    country: "USA (Wisconsin)",
    status: "Im Gefängnis erschlagen (1994)",
    hallmark: "Nekrophilie, Kannibalismus und grausame neurochirurgische Bohrversuche am lebenden Gehirn, um gefügige willenlose 'Zombies' zu erschaffen; konservierte Skelette, Schädel und Körperteile in Säurefässern und Kühltruhen.",
    description: "Dahmers grausige Taten blieben jahrelang unentdeckt, bis einem Opfer im Juli 1991 mit Handschellen die Flucht auf die Straße gelang. Polizisten fanden in Dahmers Apartment 213 einen wahren Albtraum aus menschlichen Trophäen.",
    tags: ["Kannibalismus", "Nekrophilie", "Milwaukee", "Säurefass", "Erschlagen"],
    updatedAt: "2026-10-20T12:25:00.000Z",
    createdAt: "2026-10-20T10:25:00.000Z"
  },
  {
    id: "killer-7",
    name: "Jack the Ripper",
    alias: "Der Schlachter von Whitechapel",
    confirmedVictims: 5,
    suspectedVictims: "11+",
    activePeriod: "1888",
    country: "Großbritannien (London)",
    status: "Ungeklärt / Nie gefasst",
    hallmark: "Schlitzte Prostituierten bei Nacht im düsteren Londoner East End die Kehle auf, entfernte Organe mit chirurgischer Präzision; schickte makabere Briefe an Scotland Yard ('From Hell') mitsamt einer halben menschlichen Niere.",
    description: "Der Urvater der modernen Serienmörder-Faszination. Trotz hunderten Verdächtigen von Barbieren bis zum königlichen Leibarzt konnte seine wahre Identität bis heute nicht zweifelsfrei geklärt werden.",
    tags: ["Ungelöst", "Viktorianisch", "From Hell", "Chirurgisch", "Nebelmorde"],
    updatedAt: "2026-10-20T12:30:00.000Z",
    createdAt: "2026-10-20T10:30:00.000Z"
  },
  {
    id: "killer-8",
    name: "Zodiac Killer",
    alias: "Das Phantom von San Francisco",
    confirmedVictims: 5,
    suspectedVictims: "37 behauptet",
    activePeriod: "1968–1969",
    country: "USA (Kalifornien)",
    status: "Ungeklärt / Nie gefasst",
    hallmark: "Trug bei Morden an Liebespaaren eine schwarze Henkerskapuze mit weißem Fadenkreuz-Symbol; erpresste Zeitungen mit verschlüsselten Chiffren (Kryptogrammen) und drohte mit Schulbus-Attentaten.",
    description: "Der Zodiac Killer spielte ein perfides Katz-und-Maus-Spiel mit der Polizei und der Öffentlichkeit. Einige seiner komplexen 340-Zeichen-Chiffren konnten erst über 50 Jahre später durch internationale Codeknacker entschlüsselt werden.",
    tags: ["Ungelöst", "Kryptogramme", "Fadenkreuz", "Chiffren", "Liebespaare"],
    updatedAt: "2026-10-20T12:35:00.000Z",
    createdAt: "2026-10-20T10:35:00.000Z"
  },
  {
    id: "killer-9",
    name: "Aileen Wuornos",
    alias: "Damsel of Death / Monster",
    confirmedVictims: 7,
    suspectedVictims: "7+",
    activePeriod: "1989–1990",
    country: "USA (Florida)",
    status: "Hingerichtet (Giftspritze 2002)",
    hallmark: "Eine der berüchtigtsten weiblichen Serienmörderinnen; erschoss Freier entlang der Schnellstraßen in Florida aus nächster Nähe mit einer Kaliber .22 Pistole und stahl deren Fahrzeuge.",
    description: "Wuornos' Leben und Taten inspirierten zahlreiche Dokumentationen und den oscarprämierten Kinofilm 'Monster'. Sie gab an, aus Notwehr gegen gewalttätige Freier gehandelt zu haben, wurde jedoch 1992 zum Tode verurteilt und 2002 hingerichtet.",
    tags: ["Weibliche Mörderin", "Highway", "Pistole", "Verfilmung", "Hingerichtet"],
    updatedAt: "2026-10-20T12:40:00.000Z",
    createdAt: "2026-10-20T10:40:00.000Z"
  },
  {
    id: "killer-10",
    name: "Ed Gein",
    alias: "The Butcher of Plainfield",
    confirmedVictims: 2,
    suspectedVictims: "Zahlreiche Leichenschändungen",
    activePeriod: "1954–1957",
    country: "USA (Wisconsin)",
    status: "In Psychiatrie verstorben (1984)",
    hallmark: "Grub frisch beerdigte Leichen auf Friedhöfen aus; fertigte Lampenschirme, Masken, Westen und Geschirr aus menschlicher Haut und Knochen; historische Vorlage für Norman Bates (Psycho) und Leatherface.",
    description: "Obwohl ihm 'nur' zwei Morde direkt nachgewiesen wurden, brannte sich Ed Gein wegen der unvorstellbaren Funde auf seiner Farm in Plainfield in das kollektive Gedächtnis der Popkultur ein.",
    tags: ["Leichenschändung", "Hautmasken", "Psycho-Vorlage", "Plainfield", "Psychiatrie"],
    updatedAt: "2026-10-20T12:45:00.000Z",
    createdAt: "2026-10-20T10:45:00.000Z"
  }
];

const STORAGE_KEY = "serial_killer_dossier_v2";

let state = {
  killers: [],
  searchTerm: "",
  selectedStatus: "ALL",
  selectedCountry: "ALL",
  sortBy: "victims-desc",
  currentView: "grid", // 'grid' | 'table'
  activeKiller: null
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  renderApp();
});

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state.killers = JSON.parse(raw);
    } else {
      state.killers = [...INITIAL_KILLERS];
      saveData();
    }
  } catch (err) {
    console.error("Fehler beim Laden:", err);
    state.killers = [...INITIAL_KILLERS];
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.killers));
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
    showToast("Speicherfehler!", "error");
  }
}

function setupEventListeners() {
  // Suche
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchTerm = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("hidden", state.searchTerm.length === 0);
      }
      renderApp();
    });
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchTerm = "";
      clearSearchBtn.classList.add("hidden");
      renderApp();
      searchInput.focus();
    });
  }

  // Tastaturkürzel
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput?.focus();
    } else if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Sortierung & Filter
  document.getElementById("sort-select")?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderApp();
  });

  document.getElementById("status-filter-select")?.addEventListener("change", (e) => {
    state.selectedStatus = e.target.value;
    renderApp();
  });

  document.getElementById("country-filter-select")?.addEventListener("change", (e) => {
    state.selectedCountry = e.target.value;
    renderApp();
  });

  // Ansichtswechsel
  document.getElementById("view-grid-btn")?.addEventListener("click", () => setView("grid"));
  document.getElementById("view-table-btn")?.addEventListener("click", () => setView("table"));

  // Modals & Forms
  document.getElementById("btn-add-killer")?.addEventListener("click", () => openKillerModal(null));
  document.getElementById("btn-add-killer-empty")?.addEventListener("click", () => openKillerModal(null));
  document.getElementById("close-modal-btn")?.addEventListener("click", closeKillerModal);
  document.getElementById("cancel-modal-btn")?.addEventListener("click", closeKillerModal);
  document.getElementById("killer-form")?.addEventListener("submit", handleSaveKiller);

  // Detail Modal
  document.getElementById("close-detail-modal-btn")?.addEventListener("click", closeDetailModal);
  document.getElementById("detail-edit-btn")?.addEventListener("click", () => {
    const killer = state.activeKiller;
    closeDetailModal();
    if (killer) openKillerModal(killer);
  });
  document.getElementById("detail-copy-btn")?.addEventListener("click", copyDossierToClipboard);

  // Tools Menu
  const toolsMenuBtn = document.getElementById("tools-menu-btn");
  const toolsMenu = toolsMenuBtn?.nextElementSibling;
  if (toolsMenuBtn && toolsMenu) {
    toolsMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toolsMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", () => toolsMenu.classList.add("hidden"));
  }

  // Import / Export
  document.getElementById("export-json-btn")?.addEventListener("click", exportAsJSON);
  document.getElementById("export-csv-btn")?.addEventListener("click", exportAsCSV);
  document.getElementById("import-file-input")?.addEventListener("change", handleImportJSON);
  document.getElementById("reset-data-btn")?.addEventListener("click", resetToDefaultData);

  // Backdrop Klick
  document.getElementById("killer-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "killer-modal") closeKillerModal();
  });
  document.getElementById("detail-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "detail-modal") closeDetailModal();
  });
}

function setView(view) {
  state.currentView = view;
  renderViewToggleState();
  renderList();
}

function renderViewToggleState() {
  const gridBtn = document.getElementById("view-grid-btn");
  const tableBtn = document.getElementById("view-table-btn");
  if (!gridBtn || !tableBtn) return;

  if (state.currentView === "grid") {
    gridBtn.className = "p-1.5 rounded-md bg-red-800 text-white shadow transition-colors";
    tableBtn.className = "p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors";
  } else {
    tableBtn.className = "p-1.5 rounded-md bg-red-800 text-white shadow transition-colors";
    gridBtn.className = "p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors";
  }
}

function renderApp() {
  renderStats();
  renderCountryPills();
  renderViewToggleState();
  renderList();
}

function getFilteredAndSortedKillers() {
  return state.killers
    .filter((k) => {
      if (state.selectedStatus !== "ALL" && k.status !== state.selectedStatus) {
        return false;
      }
      if (state.selectedCountry !== "ALL" && !k.country.includes(state.selectedCountry)) {
        return false;
      }
      if (state.searchTerm) {
        const query = state.searchTerm;
        const inName = k.name.toLowerCase().includes(query);
        const inAlias = (k.alias || "").toLowerCase().includes(query);
        const inHallmark = k.hallmark.toLowerCase().includes(query);
        const inCountry = k.country.toLowerCase().includes(query);
        const inDesc = k.description.toLowerCase().includes(query);
        const inTags = k.tags.some((t) => t.toLowerCase().includes(query));
        if (!inName && !inAlias && !inHallmark && !inCountry && !inDesc && !inTags) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (state.sortBy) {
        case "victims-desc":
          return b.confirmedVictims - a.confirmedVictims;
        case "victims-asc":
          return a.confirmedVictims - b.confirmedVictims;
        case "name-asc":
          return a.name.localeCompare(b.name, "de");
        case "name-desc":
          return b.name.localeCompare(a.name, "de");
        case "updated-desc":
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        default:
          return 0;
      }
    });
}

function renderStats() {
  const totalKillers = state.killers.length;
  const totalVictims = state.killers.reduce((acc, k) => acc + (Number(k.confirmedVictims) || 0), 0);
  const unsolvedCount = state.killers.filter((k) => k.status.includes("Ungeklärt")).length;
  const highestVictims = Math.max(...state.killers.map((k) => Number(k.confirmedVictims) || 0), 0);

  document.getElementById("stat-total-killers").textContent = totalKillers;
  document.getElementById("stat-total-victims").textContent = totalVictims.toLocaleString("de-DE");
  document.getElementById("stat-highest-victims").textContent = highestVictims;
  document.getElementById("stat-unsolved").textContent = unsolvedCount;
}

function renderCountryPills() {
  const container = document.getElementById("country-pills");
  if (!container) return;

  const countries = ["ALL", "USA", "Großbritannien", "Sowjetunion", "Südamerika"];
  container.innerHTML = countries
    .map((c) => {
      const isSelected = state.selectedCountry === c;
      const label = c === "ALL" ? "Alle Regionen" : c;
      const count = c === "ALL" ? state.killers.length : state.killers.filter((k) => k.country.includes(c)).length;

      const activeClass = isSelected
        ? "bg-red-800 text-white border-red-600 shadow-md shadow-red-950"
        : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-red-900/60 hover:text-zinc-200";

      return `
        <button 
          onclick="selectCountry('${escapeHtml(c)}')" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${activeClass}">
          <span>${escapeHtml(label)}</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? "bg-red-950 text-red-200" : "bg-black text-zinc-500"}">${count}</span>
        </button>
      `;
    })
    .join("");
}

window.selectCountry = function (c) {
  state.selectedCountry = c;
  renderApp();
};

function renderList() {
  const container = document.getElementById("content-view-container");
  const emptyState = document.getElementById("empty-state");
  const resultsCountEl = document.getElementById("results-count");
  if (!container) return;

  const filtered = getFilteredAndSortedKillers();

  if (resultsCountEl) {
    resultsCountEl.textContent = `${filtered.length} von ${state.killers.length} Killer-Dossiers`;
  }

  if (filtered.length === 0) {
    container.innerHTML = "";
    emptyState?.classList.remove("hidden");
    return;
  }

  emptyState?.classList.add("hidden");

  if (state.currentView === "grid") {
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.map((k) => renderCard(k)).join("")}
      </div>
    `;
  } else {
    container.innerHTML = renderTable(filtered);
  }
}

function renderCard(item) {
  const statusColor = getStatusBadgeStyle(item.status);

  return `
    <div class="killer-card rounded-xl p-5 flex flex-col justify-between shadow-2xl relative group">
      <div>
        <!-- Header: Alias & Opferzahl -->
        <div class="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div class="text-[11px] font-mono tracking-widest text-red-400 uppercase">
              ${escapeHtml(item.alias || "UNBEKANNTER ALIAS")}
            </div>
            <h3 
              onclick="openDetailModal('${item.id}')"
              class="text-xl font-extrabold text-zinc-100 hover:text-red-400 transition-colors cursor-pointer tracking-tight mt-0.5">
              ${escapeHtml(item.name)}
            </h3>
          </div>

          <!-- ROTE OPFERZAHL BADGE -->
          <div class="victim-count-badge flex flex-col items-center justify-center px-3 py-1.5 rounded-lg text-center flex-shrink-0">
            <span class="text-xl font-black text-red-100 leading-none">${item.confirmedVictims}</span>
            <span class="text-[9px] font-bold text-red-300 uppercase tracking-tighter">Opfer</span>
          </div>
        </div>

        <!-- Meta Ribbon (Land & Jahre & Status) -->
        <div class="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
          <span class="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
            📍 ${escapeHtml(item.country)}
          </span>
          <span class="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]">
            ⏱ ${escapeHtml(item.activePeriod)}
          </span>
          <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${statusColor}">
            ${escapeHtml(item.status)}
          </span>
        </div>

        <!-- WAS IHN AUSMACHTE (SPEZIAL-BOX) -->
        <div class="hallmark-box p-3 rounded-lg mb-3">
          <div class="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold mb-1 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clip-rule="evenodd"/></svg>
            Was ihn ausmachte (Modus Operandi)
          </div>
          <p class="text-xs text-zinc-300 leading-relaxed italic">
            "${escapeHtml(item.hallmark)}"
          </p>
        </div>

        <!-- Kurzbeschreibung -->
        <p class="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
          ${escapeHtml(item.description)}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-1 mb-4">
          ${item.tags
            .map(
              (tag) => `
            <span class="inline-block px-1.5 py-0.5 rounded text-[10px] bg-red-950/40 text-red-300 border border-red-900/30">
              #${escapeHtml(tag)}
            </span>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Footer Aktionen -->
      <div class="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <span class="text-[11px] text-zinc-500 font-mono">Vermutet: <span class="text-zinc-300">${escapeHtml(item.suspectedVictims)}</span></span>

        <div class="flex items-center gap-1">
          <button onclick="openDetailModal('${item.id}')" title="Akte einsehen" class="px-2.5 py-1 rounded bg-zinc-800 hover:bg-red-900/60 text-zinc-200 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]">
            <span>Akte öffnen</span>
            <svg class="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <button onclick="openKillerModalById('${item.id}')" title="Bearbeiten" class="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deleteKiller('${item.id}')" title="Löschen" class="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-rose-500 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderTable(items) {
  return `
    <div class="bg-zinc-900 rounded-xl border border-red-950/60 overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-zinc-300">
          <thead class="bg-black/80 text-[11px] uppercase font-mono tracking-wider text-red-400 border-b border-red-950">
            <tr>
              <th scope="col" class="py-3 px-4">Killer & Beiname</th>
              <th scope="col" class="py-3 px-4 text-center">Opfer (Bestätigt)</th>
              <th scope="col" class="py-3 px-4">Was ihn ausmachte (Profil)</th>
              <th scope="col" class="py-3 px-4">Region & Ära</th>
              <th scope="col" class="py-3 px-4">Status</th>
              <th scope="col" class="py-3 px-4 text-right">Akte</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/60">
            ${items
              .map((k) => {
                const statusColor = getStatusBadgeStyle(k.status);
                return `
                <tr class="hover:bg-red-950/20 transition-colors">
                  <td class="py-3.5 px-4">
                    <div 
                      onclick="openDetailModal('${k.id}')"
                      class="font-bold text-zinc-100 hover:text-red-400 cursor-pointer">
                      ${escapeHtml(k.name)}
                    </div>
                    <div class="text-xs text-red-400 font-mono">${escapeHtml(k.alias || "–")}</div>
                  </td>
                  <td class="py-3.5 px-4 text-center">
                    <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-md text-sm font-black bg-red-950 text-red-200 border border-red-800">
                      ${k.confirmedVictims}
                    </span>
                    <div class="text-[10px] text-zinc-500 font-mono mt-0.5">${escapeHtml(k.suspectedVictims)} vermutet</div>
                  </td>
                  <td class="py-3.5 px-4 max-w-md">
                    <p class="text-xs text-zinc-300 line-clamp-2 italic leading-relaxed">
                      "${escapeHtml(k.hallmark)}"
                    </p>
                  </td>
                  <td class="py-3.5 px-4 whitespace-nowrap text-xs text-zinc-400">
                    <div>📍 ${escapeHtml(k.country)}</div>
                    <div class="text-[11px] text-zinc-500 font-mono mt-0.5">⏱ ${escapeHtml(k.activePeriod)}</div>
                  </td>
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${statusColor}">
                      ${escapeHtml(k.status)}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 whitespace-nowrap text-right">
                    <div class="inline-flex items-center gap-1.5">
                      <button onclick="openDetailModal('${k.id}')" title="Akte einsehen" class="p-1.5 rounded hover:bg-zinc-800 text-red-400 hover:text-red-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                      <button onclick="openKillerModalById('${k.id}')" title="Bearbeiten" class="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-amber-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button onclick="deleteKiller('${k.id}')" title="Löschen" class="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-rose-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Modal für Erstellung / Bearbeitung
window.openKillerModalById = function (id) {
  const k = state.killers.find((item) => item.id === id);
  if (k) openKillerModal(k);
};

function openKillerModal(killer = null) {
  state.activeKiller = killer;
  const modal = document.getElementById("killer-modal");
  const modalTitle = document.getElementById("modal-title");
  const submitBtn = document.getElementById("submit-killer-btn");

  if (killer) {
    modalTitle.textContent = "Fallakte bearbeiten: " + killer.name;
    submitBtn.textContent = "Änderungen archivieren";

    document.getElementById("form-id").value = killer.id;
    document.getElementById("form-name").value = killer.name;
    document.getElementById("form-alias").value = killer.alias || "";
    document.getElementById("form-victims").value = killer.confirmedVictims;
    document.getElementById("form-suspected").value = killer.suspectedVictims || "";
    document.getElementById("form-active-period").value = killer.activePeriod;
    document.getElementById("form-country").value = killer.country;
    document.getElementById("form-status").value = killer.status;
    document.getElementById("form-hallmark").value = killer.hallmark;
    document.getElementById("form-tags").value = (killer.tags || []).join(", ");
    document.getElementById("form-description").value = killer.description;
  } else {
    modalTitle.textContent = "Neues Serienkiller-Dossier anlegen";
    submitBtn.textContent = "In Akte aufnehmen";

    document.getElementById("killer-form").reset();
    document.getElementById("form-id").value = "";
    document.getElementById("form-status").value = "Hingerichtet";
  }

  modal.classList.remove("hidden");
  document.getElementById("form-name").focus();
}

function closeKillerModal() {
  document.getElementById("killer-modal").classList.add("hidden");
  state.activeKiller = null;
}

function handleSaveKiller(e) {
  e.preventDefault();

  const id = document.getElementById("form-id").value;
  const name = document.getElementById("form-name").value.trim();
  const alias = document.getElementById("form-alias").value.trim();
  const confirmedVictims = parseInt(document.getElementById("form-victims").value, 10) || 0;
  const suspectedVictims = document.getElementById("form-suspected").value.trim() || `${confirmedVictims}+`;
  const activePeriod = document.getElementById("form-active-period").value.trim();
  const country = document.getElementById("form-country").value.trim();
  const status = document.getElementById("form-status").value;
  const hallmark = document.getElementById("form-hallmark").value.trim();
  const tagsRaw = document.getElementById("form-tags").value;
  const description = document.getElementById("form-description").value.trim();

  if (!name || !hallmark || !activePeriod || !country) {
    showToast("Bitte fülle alle Pflichtfelder aus!", "error");
    return;
  }

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const now = new Date().toISOString();

  if (id) {
    const idx = state.killers.findIndex((k) => k.id === id);
    if (idx !== -1) {
      state.killers[idx] = {
        ...state.killers[idx],
        name,
        alias,
        confirmedVictims,
        suspectedVictims,
        activePeriod,
        country,
        status,
        hallmark,
        tags,
        description,
        updatedAt: now
      };
      showToast("Fallakte erfolgreich aktualisiert!", "success");
    }
  } else {
    const newKiller = {
      id: "killer-" + Date.now(),
      name,
      alias,
      confirmedVictims,
      suspectedVictims,
      activePeriod,
      country,
      status,
      hallmark,
      tags,
      description,
      createdAt: now,
      updatedAt: now
    };
    state.killers.unshift(newKiller);
    showToast("Neues Dossier zur Datenbank hinzugefügt!", "success");
  }

  saveData();
  closeKillerModal();
  renderApp();
}

// Detailansicht (Akte öffnen)
window.openDetailModal = function (id) {
  const k = state.killers.find((item) => item.id === id);
  if (!k) return;

  state.activeKiller = k;
  const modal = document.getElementById("detail-modal");

  document.getElementById("detail-name").textContent = k.name;
  document.getElementById("detail-alias").textContent = k.alias || "KEIN OFFIZIELLER ALIAS";
  document.getElementById("detail-victims").textContent = k.confirmedVictims;
  document.getElementById("detail-suspected").textContent = k.suspectedVictims;
  document.getElementById("detail-period").textContent = k.activePeriod;
  document.getElementById("detail-country").textContent = k.country;
  document.getElementById("detail-status").textContent = k.status;
  document.getElementById("detail-status").className = `inline-flex px-2.5 py-1 rounded text-xs font-semibold ${getStatusBadgeStyle(k.status)}`;

  document.getElementById("detail-hallmark").textContent = k.hallmark;
  document.getElementById("detail-description").textContent = k.description;

  const tagsContainer = document.getElementById("detail-tags");
  tagsContainer.innerHTML = k.tags
    .map(
      (t) => `
    <span class="inline-block px-2.5 py-1 rounded text-xs font-mono bg-red-950/60 text-red-300 border border-red-900/40">
      #${escapeHtml(t)}
    </span>
  `
    )
    .join("");

  modal.classList.remove("hidden");
};

function closeDetailModal() {
  document.getElementById("detail-modal").classList.add("hidden");
}

function copyDossierToClipboard() {
  if (!state.activeKiller) return;
  const k = state.activeKiller;
  const text = `=== FALLAKTE: ${k.name.toUpperCase()} ===\nBeiname: ${k.alias}\nOpfer: ${k.confirmedVictims} bestätigt (vermutet: ${k.suspectedVictims})\nJahre: ${k.activePeriod} | Tatort: ${k.country}\nStatus: ${k.status}\n\nWAS IHN AUSMACHTE:\n${k.hallmark}\n\nKRIMINALGESCHICHTE:\n${k.description}`;

  navigator.clipboard
    .writeText(text)
    .then(() => showToast("Fallakte in die Zwischenablage kopiert!", "success"))
    .catch(() => showToast("Kopieren fehlgeschlagen.", "error"));
}

window.deleteKiller = function (id) {
  const k = state.killers.find((item) => item.id === id);
  if (!k) return;

  if (confirm(`Möchtest du das Dossier zu "${k.name}" wirklich dauerhaft vernichten?`)) {
    state.killers = state.killers.filter((item) => item.id !== id);
    saveData();
    renderApp();
    showToast("Dossier gelöscht.", "info");
  }
};

function closeAllModals() {
  closeKillerModal();
  closeDetailModal();
}

function exportAsJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.killers, null, 2));
  const a = document.createElement("a");
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `serienkiller-archiv-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast("JSON-Archiv heruntergeladen!", "success");
}

function exportAsCSV() {
  if (state.killers.length === 0) return;
  const headers = ["ID", "Name", "Beiname", "Opfer_Bestaetigt", "Opfer_Vermutet", "Aktive_Jahre", "Land", "Status", "Was_ihn_ausmachte", "Kriminalgeschichte"];
  const rows = state.killers.map((k) => [
    `"${k.id}"`,
    `"${escapeCsv(k.name)}"`,
    `"${escapeCsv(k.alias)}"`,
    k.confirmedVictims,
    `"${escapeCsv(k.suspectedVictims)}"`,
    `"${escapeCsv(k.activePeriod)}"`,
    `"${escapeCsv(k.country)}"`,
    `"${escapeCsv(k.status)}"`,
    `"${escapeCsv(k.hallmark)}"`,
    `"${escapeCsv(k.description)}"`
  ]);

  const csv = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `serienkiller-dossier-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("CSV-Tabelle heruntergeladen!", "success");
}

function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        if (confirm(`${imported.length} Dossiers importieren und zusammenführen?`)) {
          const ids = new Set(state.killers.map((k) => k.id));
          imported.forEach((k) => {
            if (!ids.has(k.id)) state.killers.push(k);
          });
          saveData();
          renderApp();
          showToast(`${imported.length} Dossiers importiert!`, "success");
        }
      }
    } catch (err) {
      showToast("Ungültige JSON-Datei.", "error");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

function resetToDefaultData() {
  if (confirm("Möchtest du die Datenbank auf die 10 berüchtigtsten Original-Serienkiller zurücksetzen?")) {
    state.killers = [...INITIAL_KILLERS];
    saveData();
    renderApp();
    showToast("Datenbank auf Original-Dossiers zurückgesetzt.", "info");
  }
}

function getStatusBadgeStyle(status) {
  if (status.includes("Hingerichtet")) {
    return "bg-red-950 text-red-200 border border-red-800";
  }
  if (status.includes("Ungeklärt") || status.includes("Nie gefasst") || status.includes("Unbekannt")) {
    return "bg-amber-950 text-amber-200 border border-amber-800";
  }
  if (status.includes("In Haft") || status.includes("Gefängnis")) {
    return "bg-zinc-800 text-zinc-300 border border-zinc-700";
  }
  return "bg-zinc-900 text-zinc-300 border border-zinc-800";
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeCsv(text) {
  if (!text) return "";
  return String(text).replace(/"/g, '""');
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  let bg = "bg-zinc-900 text-zinc-100 border border-red-900 shadow-2xl";
  if (type === "success") bg = "bg-red-950 text-red-100 border border-red-600 shadow-red-950/60";
  if (type === "error") bg = "bg-rose-950 text-rose-100 border border-rose-600";

  toast.className = `toast-enter flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-mono font-semibold ${bg}`;
  toast.innerHTML = `<span>⚠️ ${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
