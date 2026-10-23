(function () {
    if (window.__archivScriptBereitsGeladen) return;
    window.__archivScriptBereitsGeladen = true;
    const origAddEventListener = document.addEventListener.bind(document);
    let hauptListenerRegistriert = false;
    document.addEventListener = function (type, listener, options) {
        if (type === 'DOMContentLoaded') {
            if (hauptListenerRegistriert) {
                console.warn('Alter/doppelter Code-Block in app.js wurde automatisch blockiert.');
                return;
            }
            hauptListenerRegistriert = true;
        }
        return origAddEventListener(type, listener, options);
    };
})();

document.addEventListener('DOMContentLoaded', (__initEvent) => {
    if (__initEvent && typeof __initEvent.stopImmediatePropagation === 'function') {
        __initEvent.stopImmediatePropagation();
    }
    // =========================================================================
    // 0. AUTOMATISCHE SEITEN-BEREINIGUNG & KOMPLETTES DESIGN-UPGRADE
    // =========================================================================
    const alleContainer = document.querySelectorAll('.container');
    if (alleContainer.length > 1) {
        for (let i = 1; i < alleContainer.length; i++) {
            alleContainer[i].remove();
        }
    }

    const hauptContainer = document.querySelector('.container') || document.body;

    // Blut-Banner ganz oben einfügen
    if (!document.getElementById('blood-top-banner')) {
        const bloodBanner = document.createElement('div');
        bloodBanner.id = 'blood-top-banner';
        bloodBanner.className = 'blood-drip-bar';
        document.body.prepend(bloodBanner);
    }

    // Vollständiges CSS für alle Features, Berechtigungs-Badges & Live-Chat injizieren
    if (!document.getElementById('archiv-complete-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'archiv-complete-styles';
        styleTag.textContent = `
            body { padding-top: 0 !important; background-color: #070608 !important; }
            .blood-drip-bar {
                height: 10px;
                background: linear-gradient(90deg, #450a0a, #dc2626, #7f1d1d, #ef4444, #450a0a);
                box-shadow: 0 3px 15px rgba(220, 38, 38, 0.65);
                margin-bottom: 24px;
            }
            .crime-tape-bar {
                background: repeating-linear-gradient(-45deg, #881111, #881111 14px, #0d090a 14px, #0d090a 28px);
                border-top: 1px solid #ef4444;
                border-bottom: 1px solid #ef4444;
                color: #fecaca;
                font-family: monospace;
                font-size: 0.72rem;
                letter-spacing: 3px;
                text-align: center;
                padding: 4px 10px;
                margin-bottom: 22px;
                border-radius: 6px;
                text-transform: uppercase;
                font-weight: 700;
            }
            .container { max-width: 1320px !important; width: 100%; margin: 0 auto; padding: 0 18px 90px; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
            .kpi-card { background: linear-gradient(145deg, #161215 0%, #0f0c0f 100%); border: 1px solid #3b171b; border-radius: 12px; padding: 16px 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.6); display: flex; flex-direction: column; }
            .kpi-label { font-size: 0.73rem; text-transform: uppercase; letter-spacing: 1px; color: #ff7373; font-weight: 700; }
            .kpi-value { font-size: 2rem; font-weight: 900; color: #ff3b3b; margin: 6px 0 4px; line-height: 1; }
            .kpi-sub { font-size: 0.76rem; color: #888; }

            /* Filter-Pills & Steuerleiste */
            .filter-bar-wrap { margin-bottom: 18px; display: flex; flex-direction: column; gap: 12px; }
            .region-pills { display: flex; flex-wrap: wrap; gap: 8px; }
            .pill-btn {
                background: #141114;
                color: #b3b3b3;
                border: 1px solid #2e1d21;
                padding: 7px 13px;
                border-radius: 999px;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                width: auto;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
            }
            .pill-btn:hover { border-color: #ef4444; color: #fff; background: #221215; }
            .pill-btn.active { background: linear-gradient(135deg, #b91c1c, #7f1d1d); color: #fff; border-color: #f87171; box-shadow: 0 0 12px rgba(220,38,38,0.4); }
            .pill-count { background: rgba(0,0,0,0.45); padding: 1px 7px; border-radius: 999px; font-size: 0.7rem; color: #fca5a5; }

            .controls-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                align-items: center;
                justify-content: space-between;
                background: #120f12;
                border: 1px solid #2b1619;
                padding: 12px 14px;
                border-radius: 12px;
                margin-bottom: 22px;
            }
            .controls-left { display: flex; flex: 1; gap: 10px; align-items: center; min-width: 240px; }
            .controls-right { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
            .sort-select {
                background: #1a1518;
                color: #e5e5e5;
                border: 1px solid #3b2024;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 0.82rem;
                width: auto;
                cursor: pointer;
            }
            .view-btn, .random-btn, .admin-btn, .chat-top-btn {
                background: #1c1518;
                color: #e5e5e5;
                border: 1px solid #3b2024;
                padding: 10px 14px;
                border-radius: 8px;
                font-size: 0.82rem;
                font-weight: 600;
                cursor: pointer;
                width: auto;
                white-space: nowrap;
                transition: all 0.2s ease;
            }
            .view-btn.active { background: #7f1d1d; color: #fff; border-color: #ef4444; }
            .random-btn:hover, .view-btn:hover, .admin-btn:hover, .chat-top-btn:hover { border-color: #ef4444; color: #fff; background: #2d161b; }
            .admin-btn.admin-unlocked {
                background: linear-gradient(135deg, #065f46, #047857);
                color: #ecfdf5;
                border-color: #10b981;
                box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
            }

            /* 3er-Grid (Standard) */
            #archiv-liste.grid-mode {
                list-style: none;
                padding: 0;
                margin: 20px 0 0 0;
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 20px !important;
                align-items: stretch;
            }

            /* Historischer Zeitstrahl (Timeline-Modus) */
            #archiv-liste.timeline-mode {
                list-style: none;
                padding: 10px 0 10px 28px;
                margin: 20px 0 0 12px;
                display: flex !important;
                flex-direction: column !important;
                gap: 22px !important;
                border-left: 3px solid #991b1b;
                position: relative;
            }
            #archiv-liste.timeline-mode .archiv-item { position: relative; }
            #archiv-liste.timeline-mode .archiv-item::before {
                content: attr(data-year);
                position: absolute;
                left: -46px;
                top: 18px;
                background: #991b1b;
                color: #fff;
                font-family: monospace;
                font-size: 0.72rem;
                font-weight: 800;
                padding: 3px 7px;
                border-radius: 6px;
                border: 1px solid #f87171;
                box-shadow: 0 0 10px rgba(220,38,38,0.5);
            }

            /* Karten-Styling */
            .archiv-item {
                margin-bottom: 0 !important;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background: linear-gradient(155deg, #171317 0%, #100d10 100%);
                border: 1px solid #33181b;
                border-top: 3px solid #cc1111;
                border-radius: 12px;
                padding: 20px;
                position: relative;
                box-shadow: 0 10px 25px rgba(0,0,0,0.65);
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .archiv-item:hover { transform: translateY(-4px); border-color: #ef4444; }
            .archiv-item.own-entry { border-top-color: #10b981; }

            /* Schräger Stempel */
            .dossier-stamp {
                display: inline-block;
                font-family: monospace;
                font-size: 0.65rem;
                font-weight: 900;
                letter-spacing: 1.5px;
                padding: 2px 7px;
                border-radius: 4px;
                text-transform: uppercase;
                transform: rotate(-2deg);
            }
            .stamp-executed { background: rgba(127,29,29,0.35); color: #fca5a5; border: 1px dashed #ef4444; }
            .stamp-unsolved { background: rgba(120,53,15,0.35); color: #fde68a; border: 1px dashed #f59e0b; }
            .stamp-prison { background: rgba(39,39,42,0.6); color: #d4d4d8; border: 1px dashed #71717a; }

            /* Mugshot / Avatar */
            .mugshot-box {
                width: 52px;
                height: 52px;
                border-radius: 10px;
                background: #1a1113;
                border: 1px solid #5c1d24;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                flex-shrink: 0;
                position: relative;
            }
            .mugshot-box img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: grayscale(85%) contrast(125%);
            }

            /* Tag-Pills auf Karte */
            .tag-chip {
                font-size: 0.68rem;
                font-family: monospace;
                padding: 2px 7px;
                border-radius: 4px;
                background: rgba(127, 29, 29, 0.28);
                color: #fca5a5;
                border: 1px solid rgba(185, 28, 28, 0.35);
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .tag-chip:hover { background: #991b1b; color: #fff; }

            /* Vollbild-Dossier-Modal */
            .dossier-modal-backdrop {
                position: fixed;
                inset: 0;
                background: rgba(5, 3, 5, 0.88);
                backdrop-filter: blur(6px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
                overflow-y: auto;
            }
            .dossier-modal-backdrop.hidden { display: none !important; }
            .dossier-modal-box {
                background: #130f13;
                border: 2px solid #991b1b;
                border-radius: 16px;
                max-width: 720px;
                width: 100%;
                padding: 26px;
                color: #f4f4f5;
                box-shadow: 0 25px 60px rgba(0,0,0,0.95), 0 0 30px rgba(220,38,38,0.2);
                max-height: 90vh;
                overflow-y: auto;
            }

            /* =========================================================
               LIVE-CHAT WIDGET (ERMITTLER-FUNK) STYLING
               ========================================================= */
            .livechat-fab {
                position: fixed;
                bottom: 22px;
                right: 22px;
                z-index: 9500;
                background: linear-gradient(135deg, #b91c1c, #7f1d1d);
                color: #fff;
                border: 1px solid #f87171;
                border-radius: 999px;
                padding: 13px 20px;
                font-size: 0.9rem;
                font-weight: 800;
                cursor: pointer;
                width: auto;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 10px 30px rgba(220, 38, 38, 0.55);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .livechat-fab:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 14px 35px rgba(220, 38, 38, 0.75);
            }
            .livechat-dot {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                background: #22c55e;
                box-shadow: 0 0 8px #22c55e;
                display: inline-block;
            }
            .livechat-unread {
                background: #fff;
                color: #991b1b;
                font-size: 0.72rem;
                font-weight: 900;
                padding: 2px 7px;
                border-radius: 999px;
            }
            .livechat-unread.hidden { display: none !important; }

            .livechat-window {
                position: fixed;
                bottom: 82px;
                right: 22px;
                width: 370px;
                max-width: calc(100vw - 32px);
                height: 510px;
                max-height: calc(100vh - 120px);
                background: #110d11;
                border: 2px solid #991b1b;
                border-radius: 16px;
                z-index: 9500;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                box-shadow: 0 20px 55px rgba(0,0,0,0.92), 0 0 25px rgba(220,38,38,0.25);
            }
            .livechat-window.hidden { display: none !important; }

            .livechat-header {
                background: linear-gradient(90deg, #450a0a, #7f1d1d);
                padding: 12px 15px;
                border-bottom: 1px solid #ef4444;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 8px;
            }
            .livechat-messages {
                flex: 1;
                padding: 14px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
                background: radial-gradient(circle at center, #161015 0%, #0b090b 100%);
            }
            .chat-bubble {
                max-width: 86%;
                padding: 9px 12px;
                border-radius: 12px;
                font-size: 0.82rem;
                line-height: 1.45;
                position: relative;
                word-wrap: break-word;
            }
            .chat-bubble.other-msg {
                align-self: flex-start;
                background: #1c161b;
                border: 1px solid #332026;
                color: #e5e5e5;
                border-bottom-left-radius: 3px;
            }
            .chat-bubble.own-msg {
                align-self: flex-end;
                background: rgba(127, 29, 29, 0.45);
                border: 1px solid #dc2626;
                color: #fff;
                border-bottom-right-radius: 3px;
            }
            .chat-bubble.admin-msg {
                border-color: #f59e0b !important;
                background: linear-gradient(145deg, rgba(120, 53, 15, 0.45), rgba(69, 10, 10, 0.6)) !important;
            }
            .chat-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 8px;
                margin-bottom: 3px;
                font-size: 0.7rem;
            }
            .chat-author { font-weight: 800; color: #fca5a5; }
            .chat-admin-badge {
                background: #f59e0b;
                color: #000;
                font-size: 0.62rem;
                font-weight: 900;
                padding: 1px 5px;
                border-radius: 4px;
                margin-left: 4px;
                text-transform: uppercase;
            }
            .chat-time { color: #777; font-size: 0.66rem; }
            .chat-del-btn {
                background: transparent;
                border: none;
                color: #888;
                font-size: 0.7rem;
                cursor: pointer;
                padding: 0 3px;
                width: auto;
            }
            .chat-del-btn:hover { color: #ef4444; }

            .livechat-emojis {
                display: flex;
                gap: 6px;
                padding: 6px 12px;
                background: #140f14;
                border-top: 1px solid #26171b;
                overflow-x: auto;
            }
            .emoji-quick-btn {
                background: #1f171e;
                border: 1px solid #362229;
                border-radius: 6px;
                padding: 3px 8px;
                font-size: 0.85rem;
                cursor: pointer;
                width: auto;
                transition: background 0.15s;
            }
            .emoji-quick-btn:hover { background: #7f1d1d; }

            .livechat-form {
                padding: 10px 12px;
                background: #161116;
                border-top: 1px solid #2e1a1f;
                display: flex;
                flex-direction: column;
                gap: 7px;
            }
            .livechat-input-row {
                display: flex;
                gap: 7px;
            }

            /* Footer Backup Bar */
            .archiv-footer {
                margin-top: 45px;
                padding-top: 20px;
                border-top: 1px solid #2b1417;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                font-size: 0.8rem;
                color: #777;
            }
            .btn-backup {
                background: #181316;
                color: #fca5a5;
                border: 1px solid #4d1f24;
                padding: 8px 14px;
                border-radius: 8px;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                width: auto;
            }
            .btn-backup:hover { background: #7f1d1d; color: #fff; }

            .form-actions { display: flex; gap: 12px; align-items: center; }
            .btn-cancel { background: #262022; color: #ccc; border: 1px solid #44383b; padding: 13px 22px; border-radius: 8px; cursor: pointer; font-weight: 700; width: auto; }
            .btn-cancel.hidden { display: none; }

            @media (max-width: 1024px) { .kpi-grid, #archiv-liste.grid-mode { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 680px) { .kpi-grid, #archiv-liste.grid-mode { grid-template-columns: 1fr !important; } }
        `;
        document.head.appendChild(styleTag);
    }

    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');
    const speichernBtn = document.getElementById('btn-speichern');
    let toggleFormBtn = document.getElementById('btn-toggle-form');
    let sucheInput = document.getElementById('suche-input');

    if (listenElement) {
        listenElement.classList.add('grid-mode');
    }

    // Crime-Tape unter dem Header einfügen
    const headerEl = document.querySelector('.header') || document.querySelector('h1');
    if (headerEl && !document.getElementById('crime-tape-banner')) {
        const tape = document.createElement('div');
        tape.id = 'crime-tape-banner';
        tape.className = 'crime-tape-bar';
        tape.textContent = '⚠ CRIME SCENE DO NOT CROSS // FORENSISCHES ARCHIV DES BÖSEN // STRENG VERTRAULICH ⚠';
        headerEl.parentNode.insertBefore(tape, headerEl.nextSibling);
    }

    // =========================================================================
    // BERECHTIGUNGS- & KOMBI-SCHUTZ-SYSTEM (Browser-ID + Ersteller-PIN + Admin)
    // =========================================================================
    const ADMIN_PASSWORT = 'geheim123';

    let meineErstellerId = localStorage.getItem('archivCreatorId');
    if (!meineErstellerId) {
        meineErstellerId = 'creator-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem('archivCreatorId', meineErstellerId);
    }

    let istAdminAktiv = localStorage.getItem('archivAdminUnlocked') === 'true';

    function istEigenerBeitrag(eintrag) {
        if (!eintrag) return false;
        return Boolean(eintrag.creatorId && eintrag.creatorId === meineErstellerId);
    }

    // Erweiterte Felder ins Formular einbauen
    if (form && !document.getElementById('modus')) {
        const alteBeschreibungGroup = document.getElementById('beschreibung')?.parentElement;
        if (alteBeschreibungGroup) {
            const zusatzRow = document.createElement('div');
            zusatzRow.className = 'form-row';
            zusatzRow.innerHTML = `
                <div class="form-group">
                    <label for="skulls">Grausamkeits-Stufe (1–5 💀)</label>
                    <select id="skulls">
                        <option value="5">💀💀💀💀💀 (Extrem / Höchststufe)</option>
                        <option value="4">💀💀💀💀 (Sehr hoch)</option>
                        <option value="3">💀💀💀 (Hoch)</option>
                        <option value="2">💀💀 (Mittel)</option>
                        <option value="1">💀 (Niedrig)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tags-input">Merkmale / Tags (mit Komma)</label>
                    <input type="text" id="tags-input" placeholder="z. B. Kannibalismus, Spitzel, Gift">
                </div>
                <div class="form-group">
                    <label for="eingereicht-von">Eingereicht von (Dein Name)</label>
                    <input type="text" id="eingereicht-von" placeholder="z. B. Roberto">
                </div>
            `;
            alteBeschreibungGroup.parentNode.insertBefore(zusatzRow, alteBeschreibungGroup);

            const forensikRow = document.createElement('div');
            forensikRow.className = 'form-row';
            forensikRow.style.gridTemplateColumns = '1.4fr 1.2fr 1fr';
            forensikRow.innerHTML = `
                <div class="form-group">
                    <label for="forensik-input">🔬 Forensischer Beweis / Überführung</label>
                    <input type="text" id="forensik-input" placeholder="z. B. DNA-Spur, Bissspuren, Fund im Fundament...">
                </div>
                <div class="form-group">
                    <label for="bild-url">Fahndungsfoto Bild-URL (optional)</label>
                    <input type="text" id="bild-url" placeholder="https://... (.jpg / .png)">
                </div>
                <div class="form-group">
                    <label for="author-pin">🔐 Eigener Bearbeitungs-PIN (optional)</label>
                    <input type="password" id="author-pin" placeholder="z. B. 4-stelliger PIN für später">
                </div>
            `;
            alteBeschreibungGroup.parentNode.insertBefore(forensikRow, alteBeschreibungGroup);

            const modusGroup = document.createElement('div');
            modusGroup.className = 'form-group';
            modusGroup.innerHTML = `
                <label for="modus">Was ihn ausmachte – Modus Operandi (wird weiß in der roten Box angezeigt) *</label>
                <textarea id="modus" rows="2" placeholder="z. B. Vorgehensweise, Taktik, markante Merkmale des Täters..." required></textarea>
            `;
            alteBeschreibungGroup.parentNode.insertBefore(modusGroup, alteBeschreibungGroup);

            const beschrLabel = alteBeschreibungGroup.querySelector('label');
            const beschrTextarea = document.getElementById('beschreibung');
            if (beschrLabel) {
                beschrLabel.textContent = 'Fallakte / Hintergrundgeschichte (wird grau unter der Box angezeigt)';
            }
            if (beschrTextarea) {
                beschrTextarea.removeAttribute('required');
                beschrTextarea.placeholder = 'z. B. Ermittlungen, Rolle als Spitzel, Festnahme, Gerichtsurteil...';
            }
        }
    }

    if (form && !document.getElementById('edit-index')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'edit-index';
        hiddenInput.value = '';
        form.prepend(hiddenInput);
    }

    if (form && speichernBtn && !document.getElementById('btn-abbrechen')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-actions';
        speichernBtn.parentNode.insertBefore(wrapper, speichernBtn);
        wrapper.appendChild(speichernBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.id = 'btn-abbrechen';
        cancelBtn.className = 'btn-cancel hidden';
        cancelBtn.textContent = 'Abbrechen';
        wrapper.appendChild(cancelBtn);
    }

    // Schnellfilter-Pills, Sortierung, Zeitstrahl, Zufalls-Button, Live-Chat & Admin-Login einbauen
    const toolbarEl = document.querySelector('.toolbar');
    if (toolbarEl && !document.getElementById('filter-bar-container')) {
        const filterWrap = document.createElement('div');
        filterWrap.id = 'filter-bar-container';
        filterWrap.className = 'filter-bar-wrap';
        filterWrap.innerHTML = `
            <div id="region-pills" class="region-pills"></div>
        `;
        toolbarEl.parentNode.insertBefore(filterWrap, toolbarEl);

        toolbarEl.className = 'controls-row';
        toolbarEl.innerHTML = `
            <div class="controls-left">
                <input type="text" id="suche-input" placeholder="🔍 Fallakte, Ort, Merkmal suchen (z. B. Haarmann, Bundy, Gift, Hannover)...">
            </div>
            <div class="controls-right">
                <select id="sort-select" class="sort-select" title="Sortierung wählen">
                    <option value="victims-desc">🔥 Meiste Opfer zuerst</option>
                    <option value="victims-asc">Opferzahl (Niedrigste zuerst)</option>
                    <option value="year-asc">⏳ Chronologisch (ab 1888)</option>
                    <option value="shock-desc">💀 Meiste Schock-Stimmen</option>
                    <option value="name-asc">🔤 Alphabetisch (A–Z)</option>
                </select>
                <button type="button" id="btn-view-grid" class="view-btn active" title="3er-Kachel-Ansicht">🗂️ 3er-Kacheln</button>
                <button type="button" id="btn-view-timeline" class="view-btn" title="Historischer Zeitstrahl">⏳ Zeitstrahl</button>
                <button type="button" id="btn-random-dossier" class="random-btn" title="Zufällige Fallakte öffnen">🎲 Zufalls-Akte</button>
                <button type="button" id="btn-open-chat-top" class="chat-top-btn" title="Live-Chat öffnen">💬 Live-Chat</button>
                <button type="button" id="btn-admin-mode" class="admin-btn" title="Als Administrator an-/abmelden">🔐 Admin-Login</button>
                <button type="button" id="btn-toggle-form" class="btn-toggle">+ Neue Fallakte</button>
            </div>
        `;
        sucheInput = document.getElementById('suche-input');
        toggleFormBtn = document.getElementById('btn-toggle-form');
    }

    // Vollbild-Dossier-Modal im Body anlegen
    if (!document.getElementById('dossier-detail-modal')) {
        const modal = document.createElement('div');
        modal.id = 'dossier-detail-modal';
        modal.className = 'dossier-modal-backdrop hidden';
        modal.innerHTML = `
            <div class="dossier-modal-box" id="dossier-modal-content"></div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'dossier-detail-modal') {
                modal.classList.add('hidden');
            }
        });
    }

    // =========================================================================
    // LIVE-CHAT WIDGET IM BODY ERSTELLEN
    // =========================================================================
    if (!document.getElementById('archiv-livechat-widget')) {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'archiv-livechat-widget';
        const gespeicherterName = localStorage.getItem('archivChatNickname') || '';

        chatContainer.innerHTML = `
            <!-- Schwebender Button unten rechts -->
            <button type="button" id="livechat-fab-btn" class="livechat-fab">
                <span class="livechat-dot"></span>
                <span>💬 Ermittler-Livechat</span>
                <span id="livechat-unread-badge" class="livechat-unread hidden">0</span>
            </button>

            <!-- Aufklappbares Live-Chat-Fenster -->
            <div id="livechat-window" class="livechat-window hidden">
                <div class="livechat-header">
                    <div>
                        <div style="font-weight:800;font-size:0.92rem;color:#fff;display:flex;align-items:center;gap:7px;">
                            <span class="livechat-dot"></span>
                            <span>ERMITTLER-FUNK (LIVE)</span>
                        </div>
                        <div id="livechat-substatus" style="font-size:0.68rem;color:#fca5a5;">Echtzeit-Übertragung aktiv</div>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;">
                        <button type="button" id="livechat-clear-btn" title="Gesamten Chat leeren (Admin)" style="display:none;width:auto;background:rgba(0,0,0,0.4);color:#fca5a5;border:1px solid #f87171;padding:4px 8px;border-radius:6px;font-size:0.7rem;cursor:pointer;">🗑️ Leeren</button>
                        <button type="button" id="livechat-close-btn" title="Chat minimieren" style="width:auto;background:rgba(0,0,0,0.35);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:4px 9px;border-radius:6px;font-size:0.8rem;cursor:pointer;font-weight:700;">✕</button>
                    </div>
                </div>

                <div id="livechat-messages" class="livechat-messages">
                    <div style="color:#888;font-size:0.8rem;text-align:center;margin-top:20px;">Lade Live-Chat...</div>
                </div>

                <div class="livechat-emojis">
                    <button type="button" class="emoji-quick-btn" data-emoji="🕵️">🕵️</button>
                    <button type="button" class="emoji-quick-btn" data-emoji="💀">💀</button>
                    <button type="button" class="emoji-quick-btn" data-emoji="🩸">🩸</button>
                    <button type="button" class="emoji-quick-btn" data-emoji="🔍">🔍</button>
                    <button type="button" class="emoji-quick-btn" data-emoji="😱">😱</button>
                    <button type="button" class="emoji-quick-btn" data-emoji="⚖️">⚖️</button>
                    <button type="button" class="emoji-quick-btn" data-emoji="🚨">🚨</button>
                </div>

                <form id="livechat-form" class="livechat-form">
                    <input type="text" id="livechat-name" placeholder="Dein Name / Rufzeichen..." value="${gespeicherterName.replace(/"/g, '&quot;')}" required style="padding:7px 10px;font-size:0.78rem;background:#0b090b;border:1px solid #331b1e;color:#fca5a5;border-radius:6px;font-weight:600;">
                    <div class="livechat-input-row">
                        <input type="text" id="livechat-input" placeholder="Nachricht an alle schreiben..." required maxlength="400" style="flex:1;padding:9px 11px;font-size:0.83rem;background:#0b090b;border:1px solid #3b2024;color:#fff;border-radius:7px;">
                        <button type="submit" id="livechat-send-btn" style="width:auto;padding:9px 15px;background:#b91c1c;color:#fff;border:none;border-radius:7px;font-weight:800;font-size:0.82rem;cursor:pointer;">Senden</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(chatContainer);
    }

    // Footer mit JSON-Backup-Download anlegen
    if (hauptContainer && !document.getElementById('archiv-footer-bar')) {
        const footer = document.createElement('footer');
        footer.id = 'archiv-footer-bar';
        footer.className = 'archiv-footer';
        footer.innerHTML = `
            <div>🩸 <strong>ARCHIV DES BÖSEN</strong> – Weltweite kriminologische Live-Datenbank (Auto-Sync alle 5 Sek.)</div>
            <div style="display:flex;gap:10px;align-items:center;">
                <button type="button" id="btn-export-json" class="btn-backup">💾 Komplettes Archiv als JSON-Backup sichern</button>
            </div>
        `;
        hauptContainer.appendChild(footer);
    }

    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const refreshBtn = document.getElementById('btn-refresh');
    const abbrechenBtn = document.getElementById('btn-abbrechen');
    const editIndexInput = document.getElementById('edit-index');
    const formUeberschrift = document.getElementById('form-ueberschrift') || (form ? form.querySelector('h3') : null);
    const adminBtn = document.getElementById('btn-admin-mode');

    // =========================================================================
    // GOOGLE FIREBASE REALTIME DATABASE KONFIGURATION (100% KOSTENLOS & STABIL)
    // =========================================================================
    const FIREBASE_BASE_URL = 'https://archiv-des-boesen-default-rtdb.europe-west1.firebasedatabase.app';
    const DATABASE_URL = FIREBASE_BASE_URL + '/archiv.json';
    const CHAT_DATABASE_URL = FIREBASE_BASE_URL + '/chat.json';

    // Fest integrierte Original-Fallakten als Sofort-Anzeige & Ausfallschutz
    const STANDARD_FALLAKTEN = [
        {
            id: 'killer-1792587172221',
            name: 'Fritz Haarmann',
            alias: 'Der Schlächter von Hannover',
            confirmedVictims: 24,
            suspectedVictims: '27+',
            activePeriod: '1918 – 1924',
            startYear: 1918,
            country: 'Deutschland (Hannover)',
            status: 'Hingerichtet (Fallbeil 1925)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Fritz_Haarmann_%281879-1925%29.jpg',
            forensicFact: 'Angeschwemmte menschliche Schädel an der Leine führten zur Hausdurchsuchung; Kleidungsstücke der Opfer wurden bei ihm entdeckt.',
            submittedBy: 'Roberto',
            shockCount: 19,
            tags: ['Polizeispitzel', 'Hannover', 'Kehlkopf-Biss', 'Leine', 'Fallbeil'],
            notes: [
                {
                    autor: 'Kriminal-Archiv',
                    text: 'Historische Vorlage für das Theaterstück und den preisgekrönten Film „Der Totmacher“ (1995) mit Götz George.',
                    datum: '22.10.2026'
                }
            ],
            hallmark: 'Er tötete seine Opfer meist durch Beißen in den Hals oder den Kehlkopf sowie durch Erwürgen, zerstückelte die Leichen und warf die Überreste in die Leine.',
            description: 'Die Rolle als Polizeispitzel: Dass die Mordserie über Jahre unentdeckt blieb, lag auch daran, dass Haarmann der Kriminalpolizei als Informant (sogenannter „Vigilant“) diente. Hinweise aus der Bevölkerung gegen ihn wurden deshalb lange Zeit nicht ernst genommen.',
            titel: 'Fritz Haarmann – „Der Schlächter von Hannover“ (24 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Er tötete seine Opfer meist durch Beißen in den Hals oder den Kehlkopf sowie durch Erwürgen, zerstückelte die Leichen und warf die Überreste in die Leine.\n\nFALLAKTE: Die Rolle als Polizeispitzel: Dass die Mordserie über Jahre unentdeckt blieb, lag auch daran, dass Haarmann der Kriminalpolizei als Informant (sogenannter „Vigilant“) diente. Hinweise aus der Bevölkerung gegen ihn wurden deshalb lange Zeit nicht ernst genommen.',
            datum: 'Ära: 1918 – 1924 | Ort: Deutschland | Status: Hingerichtet'
        },
        {
            id: 'killer-1',
            name: 'Harold Shipman',
            alias: 'Dr. Tod (Doctor Death)',
            confirmedVictims: 218,
            suspectedVictims: '250+',
            activePeriod: '1975–1998',
            startYear: 1975,
            country: 'Großbritannien',
            status: 'In Haft verstorben (Suizid)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Harold_Shipman_mug_shot.jpg',
            forensicFact: 'Überführt durch ein gefälschtes 386.000-Pfund-Testament auf einer Schreibmaschine und nachträglich manipulierte digitale Patientenakten.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 34,
            tags: ['Arzt', 'Giftmörder', 'Heroin', 'Erbschleicherei', 'Engel des Todes'],
            notes: [
                {
                    autor: 'Forensik-Leitstelle',
                    text: 'Die offizielle Shipman-Untersuchung bestätigte mindestens 218 Morde – die höchste nachgewiesene Opferzahl eines modernen Einzeltäters.',
                    datum: '21.10.2026'
                }
            ],
            hallmark: 'Seriöser Hausarzt, der das uneingeschränkte Vertrauen seiner Patienten ausnutzte; injizierte älteren Damen tödliche Überdosen Diamorphin (Heroin) und fälschte eigenhändig deren Testamente sowie Krankenakten zu seinen Gunsten.',
            description: 'Harold Shipman gilt als einer der opferreichsten Serienmörder der Kriminalgeschichte. Als angesehener Arzt in Hyde bei Manchester tötete er jahrzehntelang unbemerkt. Der Verdacht kam erst auf, als er das Testament einer wohlhabenden Patientin fälschte und sich als Alleinerbe einsetzte.',
            titel: 'Harold Shipman – „Dr. Tod“ (218 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Seriöser Hausarzt, der das uneingeschränkte Vertrauen seiner Patienten ausnutzte; injizierte älteren Damen tödliche Überdosen Diamorphin (Heroin) und fälschte eigenhändig deren Testamente sowie Krankenakten zu seinen Gunsten.\n\nFALLAKTE: Harold Shipman gilt als einer der opferreichsten Serienmörder der Kriminalgeschichte (250+ vermutete Opfer). Als angesehener Arzt in Hyde bei Manchester tötete er jahrzehntelang unbemerkt.',
            datum: 'Ära: 1975–1998 | Ort: Großbritannien | Status: In Haft verstorben (Suizid)'
        },
        {
            id: 'killer-2',
            name: 'Pedro Alonso López',
            alias: 'Das Monster der Anden',
            confirmedVictims: 110,
            suspectedVictims: '300+',
            activePeriod: '1969–1980',
            startYear: 1969,
            country: 'Kolumbien / Ecuador / Peru (Südamerika)',
            status: 'Ungeklärt / Nie gefasst',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Predo_Lopez.png',
            forensicFact: 'Eine Sturzflut legte 1980 ein erstes Massengrab frei; López führte die Polizei danach persönlich zu 53 weiteren Gräbern.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 28,
            tags: ['Südamerika', 'Massengräber', 'Verschwunden', 'Anden'],
            notes: [
                {
                    autor: 'Interpol-Vermerk',
                    text: 'Wurde 1998 wegen guter Führung entlassen und ist seitdem spurlos untergetaucht. Seit 2002 besteht ein neuer Haftbefehl von Interpol.',
                    datum: '21.10.2026'
                }
            ],
            hallmark: 'Entführte und erdrosselte junge indigene Mädchen auf abgelegenen Märkten entlang der Anden; führte Ermittler nach seiner Festnahme zu über 50 Massengräbern in Ecuador.',
            description: 'Pedro López nutzte die Armut und Unübersichtlichkeit in Südamerika schamlos aus. Nach seiner Verurteilung in Ecuador wurde er 1998 nach Verbüßung der Höchststrafe überraschend entlassen und nach Kolumbien abgeschoben – seither fehlt von ihm jede Spur.',
            titel: 'Pedro Alonso López – „Das Monster der Anden“ (110 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Entführte und erdrosselte junge indigene Mädchen auf abgelegenen Märkten entlang der Anden; führte Ermittler nach seiner Festnahme zu über 50 Massengräbern in Ecuador.\n\nFALLAKTE: Pedro López (300+ vermutete Opfer) nutzte die Armut und Unübersichtlichkeit in Südamerika schamlos aus. Nach seiner Verurteilung in Ecuador wurde er 1998 überraschend entlassen – seither fehlt von ihm jede Spur.',
            datum: 'Ära: 1969–1980 | Ort: Kolumbien / Ecuador / Peru | Status: Ungeklärt / Verschwunden'
        },
        {
            id: 'killer-3',
            name: 'Andrei Romanowitsch Tschikatilo',
            alias: 'Der Schlächter von Rostow',
            confirmedVictims: 53,
            suspectedVictims: '56+',
            activePeriod: '1978–1990',
            startYear: 1978,
            country: 'Sowjetunion (Russland/Ukraine)',
            status: 'Hingerichtet (Genickschuss 1994)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/59/Chikatilo-mugshot.jpg',
            forensicFact: 'Überführt durch Polizeikontrollen an Waldbahnhöfen ("Operation Waldstreifen"), eine frische Bisswunde am Finger und psychiatrisches Profiling.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 25,
            tags: ['Sowjetunion', 'Kannibalismus', 'Verstümmelung', 'Waldmorde', 'Hingerichtet'],
            notes: [],
            hallmark: 'Extrem sadistische Verstümmelungen, Kannibalismus und Ausstechen der Augen; operierte unbemerkt an sowjetischen Bahnhöfen und in Waldstücken, während die Staatsführung leugnete, dass es Serienmörder im Sozialismus gebe.',
            description: 'Tschikatilo war Lehrer und Familienvater. Seine Taten lösten eine der größten Menschenjagden der Sowjetunion aus. Erst durch gezielte forensische Profilerstellung und DNA-Spuren konnte er 1990 überführt und 1994 exekutiert werden.',
            titel: 'Andrei Tschikatilo – „Der Schlächter von Rostow“ (53 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Extrem sadistische Verstümmelungen, Kannibalismus und Ausstechen der Augen; operierte unbemerkt an sowjetischen Bahnhöfen und in Waldstücken, während die Staatsführung leugnete, dass es Serienmörder im Sozialismus gebe.\n\nFALLAKTE: Tschikatilo war Lehrer und Familienvater. Seine Taten lösten eine der größten Menschenjagden der Sowjetunion aus. 1990 überführt und 1994 hingerichtet.',
            datum: 'Ära: 1978–1990 | Ort: Sowjetunion | Status: Hingerichtet (1994)'
        },
        {
            id: 'killer-4',
            name: 'John Wayne Gacy',
            alias: 'The Killer Clown (Pogo der Clown)',
            confirmedVictims: 33,
            suspectedVictims: '33+',
            activePeriod: '1972–1978',
            startYear: 1972,
            country: 'USA (Illinois)',
            status: 'Hingerichtet (Giftspritze 1994)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/John_Wayne_Gacy_1978_mugshot.jpg',
            forensicFact: 'Eine Quittung eines verschwundenen Teenagers in Gacys Haus und Verwesungsgeruch aus den Heizungsschächten führten zum Kriechraum.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 31,
            tags: ['Clown', 'Doppelleben', 'Kriechraum', 'USA', 'Hingerichtet'],
            notes: [],
            hallmark: 'Perfektes bürgerliches Doppelleben als geachteter Bauunternehmer und ehrenamtlicher Kinderclown "Pogo"; lockte Jugendliche mit Jobangeboten in sein Haus und verscharrte 29 Leichen im Kriechraum unter seinen eigenen Dielen.',
            description: 'Gacy galt in seiner Nachbarschaft als hilfsbereiter Bürger und Parteimitglied. Der modrige Geruch in seinem Haus verriet ihn schließlich: Ermittler entdeckten ein regelrechtes Beinhaus im Fundament. Seine clownesken Gemälde aus der Todeszelle wurden später makabere Sammlerobjekte.',
            titel: 'John Wayne Gacy – „The Killer Clown / Pogo“ (33 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Perfektes bürgerliches Doppelleben als geachteter Bauunternehmer und ehrenamtlicher Kinderclown "Pogo"; lockte Jugendliche mit Jobangeboten in sein Haus und verscharrte 29 Leichen im Kriechraum unter seinen eigenen Dielen.\n\nFALLAKTE: Der modrige Geruch in seinem Haus verriet ihn schließlich: Ermittler entdeckten ein regelrechtes Beinhaus im Fundament.',
            datum: 'Ära: 1972–1978 | Ort: USA (Illinois) | Status: Hingerichtet (Giftspritze 1994)'
        },
        {
            id: 'killer-5',
            name: 'Ted Bundy',
            alias: 'The Lady Killer',
            confirmedVictims: 30,
            suspectedVictims: '36–100+',
            activePeriod: '1974–1978',
            startYear: 1974,
            country: 'USA',
            status: 'Hingerichtet (Elektrischer Stuhl 1989)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ted_Bundy_headshot.jpg',
            forensicFact: 'Forensischer Durchbruch: Ein markanter Zahnabdruck (Bissspur) am Körper eines Opfers im Chi-Omega-Studentinnenwohnheim überführte ihn vor Gericht.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 29,
            tags: ['Charisma', 'VW Käfer', 'Gefängnisausbruch', 'Bissspuren', 'Elektrischer Stuhl'],
            notes: [],
            hallmark: 'Extrem manipulativer, charismatischer Jurastudent; täuschte Behinderungen (Gipsarm, Gehkrücken) oder Polizeiausweise vor, um hilfsbereite Frauen zu seinem VW Käfer zu locken; floh spektakulär zweimal aus der Haft.',
            description: 'Bundy revolutionierte das moderne FBI-Profiling. Vor Gericht verteidigte er sich zeitweise selbst und scharte weibliche Bewunderinnen um sich. Wenige Stunden vor seiner Hinrichtung auf dem elektrischen Stuhl "Old Sparky" legte er zahlreiche Geständnisse ab.',
            titel: 'Ted Bundy – „The Lady Killer“ (30 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Extrem manipulativer, charismatischer Jurastudent; täuschte Behinderungen (Gipsarm, Gehkrücken) oder Polizeiausweise vor, um hilfsbereite Frauen zu seinem VW Käfer zu locken; floh spektakulär zweimal aus der Haft.\n\nFALLAKTE: Bundy revolutionierte das moderne FBI-Profiling. Vor seiner Hinrichtung auf dem elektrischen Stuhl legte er zahlreiche Geständnisse ab (36–100+ vermutete Opfer).',
            datum: 'Ära: 1974–1978 | Ort: USA | Status: Hingerichtet (Elektrischer Stuhl 1989)'
        },
        {
            id: 'killer-6',
            name: 'Jeffrey Dahmer',
            alias: 'The Milwaukee Cannibal / Monster',
            confirmedVictims: 17,
            suspectedVictims: '17',
            activePeriod: '1978–1991',
            startYear: 1978,
            country: 'USA (Wisconsin)',
            status: 'Im Gefängnis erschlagen (1994)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Jeffrey_Dahmer_Milwaukee_Police_1991_mugshot.jpg',
            forensicFact: 'Das geplante 18. Opfer Tracy Edwards konnte mit einer Handschelle am Handgelenk auf die Straße fliehen und führte eine Polizeistreife zu Apartment 213.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 38,
            tags: ['Kannibalismus', 'Nekrophilie', 'Milwaukee', 'Säurefass', 'Erschlagen'],
            notes: [],
            hallmark: 'Nekrophilie, Kannibalismus und grausame neurochirurgische Bohrversuche am lebenden Gehirn, um gefügige willenlose "Zombies" zu erschaffen; konservierte Skelette, Schädel und Körperteile in Säurefässern und Kühltruhen.',
            description: 'Dahmers grausige Taten blieben jahrelang unentdeckt, bis einem Opfer im Juli 1991 mit Handschellen die Flucht auf die Straße gelang. Polizisten fanden in Dahmers Apartment 213 einen wahren Albtraum aus menschlichen Trophäen.',
            titel: 'Jeffrey Dahmer – „The Milwaukee Cannibal“ (17 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Nekrophilie, Kannibalismus und grausame neurochirurgische Bohrversuche am lebenden Gehirn, um gefügige willenlose "Zombies" zu erschaffen; konservierte Skelette, Schädel und Körperteile in Säurefässern und Kühltruhen.\n\nFALLAKTE: Dahmers grausige Taten blieben jahrelang unentdeckt, bis einem Opfer im Juli 1991 mit Handschellen die Flucht gelang.',
            datum: 'Ära: 1978–1991 | Ort: USA (Wisconsin) | Status: Im Gefängnis erschlagen (1994)'
        },
        {
            id: 'killer-7',
            name: 'Jack the Ripper',
            alias: 'Der Schlachter von Whitechapel',
            confirmedVictims: 5,
            suspectedVictims: '11+',
            activePeriod: '1888',
            startYear: 1888,
            country: 'Großbritannien (London)',
            status: 'Ungeklärt / Nie gefasst',
            skulls: 4,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/JacktheRipper1888.jpg',
            forensicFact: 'Anatomische Kenntnisse bei der Organentnahme ließen Ermittler auf einen Chirurgen, Fleischer oder Präparator schließen.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 22,
            tags: ['Ungelöst', 'Viktorianisch', 'From Hell', 'Chirurgisch', 'Nebelmorde'],
            notes: [],
            hallmark: 'Schlitzte Prostituierten bei Nacht im düsteren Londoner East End die Kehle auf, entfernte Organe mit chirurgischer Präzision; schickte makabere Briefe an Scotland Yard ("From Hell") mitsamt einer halben menschlichen Niere.',
            description: 'Der Urvater der modernen Serienmörder-Faszination. Trotz hunderten Verdächtigen von Barbieren bis zum königlichen Leibarzt konnte seine wahre Identität bis heute nicht zweifelsfrei geklärt werden.',
            titel: 'Jack the Ripper – „Der Schlachter von Whitechapel“ (5 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Schlitzte Prostituierten bei Nacht im düsteren Londoner East End die Kehle auf, entfernte Organe mit chirurgischer Präzision; schickte makabere Briefe an Scotland Yard ("From Hell") mitsamt einer halben menschlichen Niere.\n\nFALLAKTE: Der Urvater der modernen Serienmörder-Faszination. Seine wahre Identität wurde nie zweifelsfrei geklärt.',
            datum: 'Ära: 1888 | Ort: Großbritannien (London) | Status: Ungeklärt / Nie gefasst'
        },
        {
            id: 'killer-8',
            name: 'Zodiac Killer',
            alias: 'Das Phantom von San Francisco',
            confirmedVictims: 5,
            suspectedVictims: '37 behauptet',
            activePeriod: '1968–1969',
            startYear: 1968,
            country: 'USA (Kalifornien)',
            status: 'Ungeklärt / Nie gefasst',
            skulls: 4,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Zodiac-Killer.jpg',
            forensicFact: 'Blutige Stücke des Hemdes von Taxifahrer Paul Stine wurden als Beweis für seine Täterschaft an Zeitungsredaktionen geschickt.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 21,
            tags: ['Ungelöst', 'Kryptogramme', 'Fadenkreuz', 'Chiffren', 'Liebespaare'],
            notes: [],
            hallmark: 'Trug bei Morden an Liebespaaren eine schwarze Henkerskapuze mit weißem Fadenkreuz-Symbol; erpresste Zeitungen mit verschlüsselten Chiffren (Kryptogrammen) und drohte mit Schulbus-Attentaten.',
            description: 'Der Zodiac Killer spielte ein perfides Katz-und-Maus-Spiel mit der Polizei und der Öffentlichkeit. Einige seiner komplexen 340-Zeichen-Chiffren konnten erst über 50 Jahre später durch internationale Codeknacker entschlüsselt werden.',
            titel: 'Zodiac Killer – „Das Phantom von San Francisco“ (5 bestätigte, 37 behauptete Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Trug bei Morden an Liebespaaren eine schwarze Henkerskapuze mit weißem Fadenkreuz-Symbol; erpresste Zeitungen mit verschlüsselten Chiffren (Kryptogrammen) und drohte mit Schulbus-Attentaten.\n\nFALLAKTE: Spielte ein perfides Katz-und-Maus-Spiel mit Polizei und Medien. Seine 340-Zeichen-Chiffre wurde erst nach über 50 Jahren geknackt.',
            datum: 'Ära: 1968–1969 | Ort: USA (Kalifornien) | Status: Ungeklärt / Nie gefasst'
        },
        {
            id: 'killer-9',
            name: 'Aileen Wuornos',
            alias: 'Damsel of Death / Monster',
            confirmedVictims: 7,
            suspectedVictims: '7+',
            activePeriod: '1989–1990',
            startYear: 1989,
            country: 'USA (Florida)',
            status: 'Hingerichtet (Giftspritze 2002)',
            skulls: 3,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Aileen_Wuornos_%284x5_cropped%29.jpg',
            forensicFact: 'Überführt durch einen blutigen Handabdruck im Fahrzeug eines Opfers sowie Pfandhaus-Quittungen mit ihrem eigenen Daumenabdruck.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 14,
            tags: ['Weibliche Mörderin', 'Highway', 'Pistole', 'Verfilmung', 'Hingerichtet'],
            notes: [],
            hallmark: 'Eine der berüchtigtsten weiblichen Serienmörderinnen; erschoss Freier entlang der Schnellstraßen in Florida aus nächster Nähe mit einer Kaliber .22 Pistole und stahl deren Fahrzeuge.',
            description: 'Wuornos\' Leben und Taten inspirierten zahlreiche Dokumentationen und den oscarprämierten Kinofilm "Monster". Sie gab an, aus Notwehr gegen gewalttätige Freier gehandelt zu haben, wurde jedoch 1992 zum Tode verurteilt und 2002 hingerichtet.',
            titel: 'Aileen Wuornos – „Damsel of Death / Monster“ (7 bestätigte Opfer)',
            beschreibung: 'WAS IHN AUSMACHTE: Eine der berüchtigtsten weiblichen Serienmörderinnen; erschoss Freier entlang der Schnellstraßen in Florida aus nächster Nähe mit einer Kaliber .22 Pistole und stahl deren Fahrzeuge.\n\nFALLAKTE: Ihr Leben inspirierte den oscarprämierten Film "Monster". Sie wurde 1992 zum Tode verurteilt und 2002 hingerichtet.',
            datum: 'Ära: 1989–1990 | Ort: USA (Florida) | Status: Hingerichtet (Giftspritze 2002)'
        },
        {
            id: 'killer-10',
            name: 'Ed Gein',
            alias: 'The Butcher of Plainfield',
            confirmedVictims: 2,
            suspectedVictims: 'Zahlreiche Leichenschändungen',
            activePeriod: '1954–1957',
            startYear: 1954,
            country: 'USA (Wisconsin)',
            status: 'In Psychiatrie verstorben (1984)',
            skulls: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Ed-Gein.jpeg',
            forensicFact: 'Eine Kaufquittung für Frostschutzmittel im Laden des letzten Opfers Bernice Worden führte die Sheriffs direkt zu Geins Horror-Farm.',
            submittedBy: 'Forensik-Archiv',
            shockCount: 27,
            tags: ['Leichenschändung', 'Hautmasken', 'Psycho-Vorlage', 'Plainfield', 'Psychiatrie'],
            notes: [],
            hallmark: 'Grub frisch beerdigte Leichen auf Friedhöfen aus; fertigte Lampenschirme, Masken, Westen und Geschirr aus menschlicher Haut und Knochen; historische Vorlage für Norman Bates (Psycho) und Leatherface.',
            description: 'Obwohl ihm "nur" zwei Morde direkt nachgewiesen wurden, brannte sich Ed Gein wegen der unvorstellbaren Funde auf seiner Farm in Plainfield in das kollektive Gedächtnis der Popkultur ein.',
            titel: 'Ed Gein – „The Butcher of Plainfield“ (2 Morde + zahlreiche Leichenschändungen)',
            beschreibung: 'WAS IHN AUSMACHTE: Grub frisch beerdigte Leichen auf Friedhöfen aus; fertigte Lampenschirme, Masken, Westen und Geschirr aus menschlicher Haut und Knochen; historische Vorlage für Norman Bates (Psycho), Leatherface und Buffalo Bill.\n\nFALLAKTE: Die unvorstellbaren Funde auf seiner Farm in Plainfield brannten sich tief in die Kriminal- und Filmgeschichte ein.',
            datum: 'Ära: 1954–1957 | Ort: USA (Wisconsin) | Status: In Psychiatrie verstorben (1984)'
        }
    ];

    function ladeLokalesBackup() {
        try {
            const gespeichert = JSON.parse(localStorage.getItem('archivDatenBackup') || 'null');
            if (Array.isArray(gespeichert) && gespeichert.length > 0) {
                return gespeichert;
            }
        } catch (_) {}
        return JSON.parse(JSON.stringify(STANDARD_FALLAKTEN));
    }

    let meinArchiv = ladeLokalesBackup();
    let letzterDatenHash = '';
    let istAmSpeichern = false;
    let suchbegriff = '';
    let aktiverFilter = 'ALL';
    let aktiveSortierung = 'victims-desc';
    let aktuellerAnsichtsModus = 'grid';

    // Aktualisiert die Optik des Admin-Buttons & Chat-Admin-Tools
    function aktualisiereAdminButton() {
        const clearChatBtn = document.getElementById('livechat-clear-btn');
        if (clearChatBtn) {
            clearChatBtn.style.display = istAdminAktiv ? 'inline-block' : 'none';
        }
        if (!adminBtn) return;
        if (istAdminAktiv) {
            adminBtn.classList.add('admin-unlocked');
            adminBtn.innerHTML = '👑 Admin aktiv (Vollzugriff)';
            adminBtn.title = 'Du bist als Admin eingeloggt und kannst jeden Beitrag direkt bearbeiten/löschen. Klicke zum Abmelden.';
        } else {
            adminBtn.classList.remove('admin-unlocked');
            adminBtn.innerHTML = '🔐 Admin-Login';
            adminBtn.title = 'Für Roberto: Mit Admin-Passwort anmelden, um alle Beiträge frei zu bearbeiten';
        }
    }
    aktualisiereAdminButton();

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            if (istAdminAktiv) {
                if (confirm('Möchtest du den Admin-Vollzugriff für diesen Browser wieder sperren (Abmelden)?')) {
                    istAdminAktiv = false;
                    localStorage.removeItem('archivAdminUnlocked');
                    aktualisiereAdminButton();
                    ansichtRendern(true);
                    rendereChatNachrichten(true);
                }
            } else {
                const eingabe = prompt('👑 Bitte gib dein Administrator-Passwort ein, um den Vollzugriff für alle Beiträge & den Livechat freizuschalten:');
                if (eingabe === ADMIN_PASSWORT) {
                    istAdminAktiv = true;
                    localStorage.setItem('archivAdminUnlocked', 'true');
                    aktualisiereAdminButton();
                    ansichtRendern(true);
                    rendereChatNachrichten(true);
                    alert('✅ Admin-Modus aktiviert! Du kannst jetzt jeden Beitrag direkt bearbeiten/löschen und schreibst im Livechat mit Admin-Krone.');
                } else if (eingabe !== null) {
                    alert('❌ Falsches Admin-Passwort!');
                }
            }
        });
    }

    // Zentrale Schutz-Prüfung für Bearbeiten & Löschen
    function pruefeZugriffsRecht(index, aktionName = 'bearbeiten') {
        const eintrag = meinArchiv[index];
        if (!eintrag) return false;

        if (istAdminAktiv) return true;

        if (istEigenerBeitrag(eintrag)) {
            if (aktionName === 'löschen') {
                return confirm(`Möchtest du deinen eigenen Beitrag „${eintrag.name || 'Fallakte'}“ wirklich unwiderruflich löschen?`);
            }
            return true;
        }

        const erstellerName = eintrag.submittedBy || 'Archiv';
        const hatPin = Boolean(eintrag.authorPin && String(eintrag.authorPin).trim() !== '');

        const hinweisText = hatPin
            ? `🔒 Geschützter Beitrag von „${erstellerName}“!\n\nNur der Ersteller oder der Admin kann diese Fallakte ${aktionName}.\nBitte gib deinen persönlichen Ersteller-PIN (oder das Admin-Passwort) ein:`
            : `🔒 Geschützte Fallakte!\n\nDieser Eintrag gehört zum offiziellen Archiv (${erstellerName}).\nNur der Administrator kann diesen Beitrag ${aktionName}.\n\nBitte Admin-Passwort eingeben:`;

        const codeEingabe = prompt(hinweisText);
        if (codeEingabe === null) return false;

        if (codeEingabe === ADMIN_PASSWORT) {
            istAdminAktiv = true;
            localStorage.setItem('archivAdminUnlocked', 'true');
            aktualisiereAdminButton();
            return true;
        }

        if (hatPin && codeEingabe.trim() === String(eintrag.authorPin).trim()) {
            return true;
        }

        alert(`⛔ Zugriff verweigert! Du kannst nur deine eigenen Beiträge ${aktionName} (oder benötigst das Admin-Passwort).`);
        return false;
    }

    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function setzeStatus(typ, nachricht) {
        if (statusIndicator) {
            if (typ === 'online') {
                statusIndicator.style.background = '#22c55e';
                statusIndicator.style.boxShadow = '0 0 8px #22c55e';
            } else if (typ === 'syncing') {
                statusIndicator.style.background = '#eab308';
                statusIndicator.style.boxShadow = '0 0 8px #eab308';
            } else {
                statusIndicator.style.background = '#ef4444';
                statusIndicator.style.boxShadow = '0 0 8px #ef4444';
            }
        }
        if (statusText) {
            statusText.textContent = nachricht;
        }
    }

    function ermittleOpferzahl(eintrag) {
        if (eintrag.confirmedVictims !== undefined && !isNaN(Number(eintrag.confirmedVictims))) {
            return Number(eintrag.confirmedVictims);
        }
        const match = String(eintrag.titel || '').match(/\((\d+)\s+bestätigte/i);
        return match ? Number(match[1]) : 1;
    }

    function ermittleStartJahr(eintrag) {
        if (eintrag.startYear) return Number(eintrag.startYear);
        const match = String(eintrag.activePeriod || eintrag.datum || '').match(/(\d{4})/);
        return match ? Number(match[1]) : 2000;
    }

    function trenneModusUndFallakte(eintrag) {
        let modus = String(eintrag.hallmark || '').trim();
        let details = String(eintrag.description || '').trim();

        if (!details && modus.includes('\n\n')) {
            const teile = modus.split(/\n\s*\n/);
            modus = teile[0].replace(/^WAS IHN AUSMACHTE:\s*/i, '').trim();
            details = teile.slice(1).join('\n\n').replace(/^FALLAKTE:\s*/i, '').trim();
        } else if (!modus && eintrag.beschreibung) {
            const voll = String(eintrag.beschreibung).trim();
            if (voll.includes('\n\n')) {
                const teile = voll.split(/\n\s*\n/);
                modus = teile[0].replace(/^WAS IHN AUSMACHTE:\s*/i, '').trim();
                details = teile.slice(1).join('\n\n').replace(/^FALLAKTE:\s*/i, '').trim();
            } else {
                modus = voll.replace(/^WAS IHN AUSMACHTE:\s*/i, '').trim();
            }
        }

        return {
            modus: modus || 'Keine Angabe zum Modus Operandi.',
            details: details
        };
    }

    function holeStempelDaten(statusStr) {
        const s = String(statusStr || '').toLowerCase();
        if (s.includes('ungeklärt') || s.includes('nie gefasst') || s.includes('verschwunden')) {
            return { klasse: 'stamp-unsolved', text: '❓ PHANTOM // UNGELÖST' };
        }
        if (s.includes('hingerichtet') || s.includes('elektrischer') || s.includes('fallbeil') || s.includes('giftspritze')) {
            return { klasse: 'stamp-executed', text: '⚡ GEFASST // EXEKUTIERT' };
        }
        return { klasse: 'stamp-prison', text: '🔒 GEFASST // IN HAFT VERSTORBEN' };
    }

    function extrahiereEintraege(resBody) {
        if (!resBody) return [];
        const record = resBody.record !== undefined ? resBody.record : resBody;
        if (Array.isArray(record)) return record.filter(Boolean);
        if (record && Array.isArray(record.eintraege)) return record.eintraege.filter(Boolean);
        if (record && Array.isArray(record.killers)) return record.killers.filter(Boolean);
        if (typeof record === 'object' && record !== null) {
            return Object.values(record).filter(item => item && typeof item === 'object' && (item.name || item.titel));
        }
        return [];
    }

    function formularZuruecksetzen() {
        if (!form) return;
        form.reset();
        if (editIndexInput) editIndexInput.value = '';
        if (formUeberschrift) formUeberschrift.textContent = 'Neue Fallakte weltweit eintragen';
        if (speichernBtn) speichernBtn.textContent = 'Eintrag weltweit speichern';
        if (abbrechenBtn) abbrechenBtn.classList.add('hidden');
    }

    if (toggleFormBtn && form) {
        toggleFormBtn.addEventListener('click', () => {
            const wirdGeoeffnet = form.classList.contains('hidden');
            formularZuruecksetzen();
            if (wirdGeoeffnet) {
                form.classList.remove('hidden');
                toggleFormBtn.textContent = '✕ Formular schließen';
            } else {
                form.classList.add('hidden');
                toggleFormBtn.textContent = '+ Neue Fallakte';
            }
        });
    }

    if (abbrechenBtn && form) {
        abbrechenBtn.addEventListener('click', () => {
            formularZuruecksetzen();
            form.classList.add('hidden');
            if (toggleFormBtn) toggleFormBtn.textContent = '+ Neue Fallakte';
        });
    }

    function rendereFilterPills() {
        const container = document.getElementById('region-pills');
        if (!container) return;

        const filterOptionen = [
            { id: 'ALL', label: '📁 Alle Fallakten', pruefe: () => true },
            { id: 'MINE', label: '✨ Meine Beiträge', pruefe: (k) => istEigenerBeitrag(k) },
            { id: 'DE', label: '🇩🇪 Deutschland', pruefe: (k) => String(k.country || '').toLowerCase().includes('deutschland') },
            { id: 'USA', label: '🇺🇸 USA', pruefe: (k) => String(k.country || '').toLowerCase().includes('usa') },
            { id: 'UK', label: '🇬🇧 Großbritannien', pruefe: (k) => String(k.country || '').toLowerCase().includes('großbritannien') || String(k.country || '').toLowerCase().includes('london') },
            { id: 'OTHER_REG', label: '🌍 UdSSR & Südamerika', pruefe: (k) => {
                const c = String(k.country || '').toLowerCase();
                return c.includes('sowjet') || c.includes('russland') || c.includes('kolumbien') || c.includes('südamerika');
            }},
            { id: 'EXECUTED', label: '⚡ Hingerichtet', pruefe: (k) => String(k.status || '').toLowerCase().includes('hingerichtet') },
            { id: 'UNSOLVED', label: '❓ Nie gefasst / Phantom', pruefe: (k) => {
                const s = String(k.status || '').toLowerCase();
                return s.includes('ungeklärt') || s.includes('nie gefasst');
            }}
        ];

        container.innerHTML = filterOptionen.map(f => {
            const anzahl = meinArchiv.filter(f.pruefe).length;
            const aktiv = aktiverFilter === f.id ? 'active' : '';
            return `
                <button type="button" class="pill-btn ${aktiv}" data-filter="${f.id}">
                    <span>${f.label}</span>
                    <span class="pill-count">${anzahl}</span>
                </button>
            `;
        }).join('');

        container.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                aktiverFilter = btn.getAttribute('data-filter');
                ansichtRendern(true);
            });
        });
    }

    function aktualisiereStatistiken() {
        const anzahlKillers = meinArchiv.length;
        let opferGesamt = 0;
        let hoechsteOpfer = 0;
        let hoechsterName = '–';
        let ungeloest = 0;

        meinArchiv.forEach((eintrag) => {
            const opfer = ermittleOpferzahl(eintrag);
            opferGesamt += opfer;

            const saubererName = eintrag.name || String(eintrag.titel || 'Unbekannt').split('–')[0].trim();
            if (opfer > hoechsteOpfer) {
                hoechsteOpfer = opfer;
                hoechsterName = saubererName;
            }

            const statusStr = String(eintrag.status || eintrag.datum || '').toLowerCase();
            if (statusStr.includes('ungeklärt') || statusStr.includes('nie gefasst') || statusStr.includes('verschwunden')) {
                ungeloest++;
            }
        });

        const elTotalVictims = document.getElementById('stat-total-victims');
        const elHighestVictims = document.getElementById('stat-highest-victims');
        const elHighestName = document.getElementById('stat-highest-name');
        const elTotalKillers = document.getElementById('stat-total-killers');
        const elUnsolved = document.getElementById('stat-unsolved');
        const elBadge = document.getElementById('eintraege-anzahl');

        if (elTotalVictims) elTotalVictims.textContent = opferGesamt.toLocaleString('de-DE');
        if (elHighestVictims) elHighestVictims.textContent = hoechsteOpfer.toLocaleString('de-DE');
        if (elHighestName) elHighestName.textContent = hoechsterName !== '–' ? `Spitzenreiter: ${hoechsterName}` : '–';
        if (elTotalKillers) elTotalKillers.textContent = String(anzahlKillers);
        if (elUnsolved) elUnsolved.textContent = String(ungeloest);
        if (elBadge) elBadge.textContent = String(anzahlKillers);
    }

    function starteBearbeitung(index) {
        if (!pruefeZugriffsRecht(index, 'bearbeiten')) return;

        const eintrag = meinArchiv[index];
        if (!eintrag || !form) return;

        const { modus, details } = trenneModusUndFallakte(eintrag);
        const opfer = ermittleOpferzahl(eintrag);
        const name = eintrag.name || String(eintrag.titel || '').split('–')[0].trim();

        const titelInput = document.getElementById('titel');
        const aliasInput = document.getElementById('alias');
        const opferInput = document.getElementById('opfer');
        const landInput = document.getElementById('land');
        const zeitraumInput = document.getElementById('zeitraum');
        const statusInput = document.getElementById('status');
        const modusInput = document.getElementById('modus');
        const beschreibungInput = document.getElementById('beschreibung');
        const skullsInput = document.getElementById('skulls');
        const tagsInput = document.getElementById('tags-input');
        const eingereichtInput = document.getElementById('eingereicht-von');
        const forensikInput = document.getElementById('forensik-input');
        const bildUrlInput = document.getElementById('bild-url');
        const authorPinInput = document.getElementById('author-pin');

        if (editIndexInput) editIndexInput.value = String(index);
        if (titelInput) titelInput.value = name;
        if (aliasInput) aliasInput.value = eintrag.alias || '';
        if (opferInput) opferInput.value = opfer;
        if (landInput) landInput.value = eintrag.country || '';
        if (zeitraumInput) zeitraumInput.value = eintrag.activePeriod || '';
        if (skullsInput) skullsInput.value = String(eintrag.skulls || 5);
        if (tagsInput) tagsInput.value = Array.isArray(eintrag.tags) ? eintrag.tags.join(', ') : '';
        if (eingereichtInput) eingereichtInput.value = eintrag.submittedBy || '';
        if (forensikInput) forensikInput.value = eintrag.forensicFact || '';
        if (bildUrlInput) bildUrlInput.value = eintrag.imageUrl || '';
        if (authorPinInput) authorPinInput.value = eintrag.authorPin || '';

        if (statusInput) {
            const aktStatus = eintrag.status || 'Hingerichtet';
            const existiert = Array.from(statusInput.options).some(opt => opt.value === aktStatus);
            if (!existiert) {
                const neueOpt = document.createElement('option');
                neueOpt.value = aktStatus;
                neueOpt.textContent = aktStatus;
                statusInput.appendChild(neueOpt);
            }
            statusInput.value = aktStatus;
        }

        if (modusInput && beschreibungInput) {
            modusInput.value = modus;
            beschreibungInput.value = details;
        }

        if (formUeberschrift) formUeberschrift.textContent = `Fallakte bearbeiten: ${name}`;
        if (speichernBtn) speichernBtn.textContent = 'Änderungen weltweit speichern';
        if (abbrechenBtn) abbrechenBtn.classList.remove('hidden');

        form.classList.remove('hidden');
        if (toggleFormBtn) toggleFormBtn.textContent = '✕ Formular schließen';

        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (titelInput) titelInput.focus();
    }

    function oeffneDossierModal(index) {
        const eintrag = meinArchiv[index];
        if (!eintrag) return;

        const modal = document.getElementById('dossier-detail-modal');
        const content = document.getElementById('dossier-modal-content');
        if (!modal || !content) return;

        const opfer = ermittleOpferzahl(eintrag);
        const name = escapeHtml(eintrag.name || String(eintrag.titel || '').split('–')[0].trim());
        const alias = escapeHtml(eintrag.alias || 'Fallakte');
        const land = escapeHtml(eintrag.country || 'Weltweit');
        const zeitraum = escapeHtml(eintrag.activePeriod || 'Unbekannt');
        const vermutet = escapeHtml(eintrag.suspectedVictims || `${opfer}+`);
        const { modus, details } = trenneModusUndFallakte(eintrag);
        const skullsCount = Math.min(5, Math.max(1, Number(eintrag.skulls) || 5));
        const skullsStr = '💀'.repeat(skullsCount);
        const stempel = holeStempelDaten(eintrag.status);
        const tags = Array.isArray(eintrag.tags) ? eintrag.tags : [];
        const notes = Array.isArray(eintrag.notes) ? eintrag.notes : [];
        const forensik = escapeHtml(eintrag.forensicFact || 'Keine spezifischen forensischen Details hinterlegt.');
        const eingereichtVon = escapeHtml(eintrag.submittedBy || 'Forensik-Archiv');
        const darfDirektBearbeiten = istAdminAktiv || istEigenerBeitrag(eintrag);

        content.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid #38181c;padding-bottom:16px;margin-bottom:18px;">
                <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
                        <span class="dossier-stamp ${stempel.klasse}">${stempel.text}</span>
                        <span style="font-size:0.75rem;color:#888;font-family:monospace;">AKTE #${index + 1} • EINGEREICHT VON: ${eingereichtVon.toUpperCase()}</span>
                    </div>
                    <h2 style="margin:0;font-size:1.75rem;color:#fff;">${name}</h2>
                    <div style="color:#ff6666;font-family:monospace;font-size:0.9rem;margin-top:3px;">„${alias}“ • Gefahrenstufe: ${skullsStr}</div>
                </div>
                <div style="background:radial-gradient(circle,#7f1d1d 0%,#450a0a 100%);border:1px solid #ef4444;border-radius:12px;padding:10px 16px;text-align:center;min-width:85px;">
                    <strong style="display:block;font-size:1.7rem;color:#fff;line-height:1;">${opfer}</strong>
                    <span style="font-size:0.68rem;text-transform:uppercase;color:#fca5a5;">Bestätigte Opfer</span>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:#0b090b;border:1px solid #2b1619;padding:12px;border-radius:10px;margin-bottom:16px;font-size:0.82rem;">
                <div><span style="color:#777;display:block;font-size:0.7rem;text-transform:uppercase;">Tatort / Region</span><strong style="color:#eee;">📍 ${land}</strong></div>
                <div><span style="color:#777;display:block;font-size:0.7rem;text-transform:uppercase;">Aktive Jahre</span><strong style="color:#eee;">⏱ ${zeitraum}</strong></div>
                <div><span style="color:#777;display:block;font-size:0.7rem;text-transform:uppercase;">Dunkelziffer / Vermutet</span><strong style="color:#f87171;">🩸 ${vermutet}</strong></div>
            </div>

            <div style="background:rgba(45,10,15,0.65);border-left:4px solid #ef4444;border-radius:4px 10px 10px 4px;padding:14px 16px;margin-bottom:14px;">
                <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-weight:700;margin-bottom:5px;">Was ihn ausmachte (Modus Operandi & Signatur)</div>
                <div style="color:#fff;font-size:0.92rem;line-height:1.55;">${escapeHtml(modus)}</div>
            </div>

            ${details ? `
            <div style="background:#0d0b0d;border:1px solid #261a1d;border-radius:10px;padding:14px 16px;margin-bottom:14px;">
                <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:700;margin-bottom:5px;">Hintergrundgeschichte & Ermittlungsakte</div>
                <div style="color:#bbb;font-size:0.88rem;line-height:1.6;white-space:pre-line;">${escapeHtml(details)}</div>
            </div>` : ''}

            <div style="background:#12161f;border:1px solid #1e293b;border-radius:10px;padding:12px 15px;margin-bottom:16px;font-size:0.84rem;">
                <strong style="color:#60a5fa;display:block;font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">🔬 Forensischer Beweis & Überführung</strong>
                <span style="color:#cbd5e1;">${forensik}</span>
            </div>

            ${tags.length > 0 ? `
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">
                ${tags.map(t => `<span class="tag-chip">#${escapeHtml(t)}</span>`).join('')}
            </div>` : ''}

            <!-- COMMUNITY ERMITTLER-NOTIZEN -->
            <div style="border-top:1px solid #2e181b;padding-top:16px;margin-top:10px;">
                <h4 style="margin:0 0 10px 0;font-size:0.9rem;color:#fca5a5;">💬 Ermittler-Notizen & Hinweise (${notes.length})</h4>
                <div id="modal-notes-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;max-height:160px;overflow-y:auto;">
                    ${notes.length === 0
                        ? '<div style="color:#666;font-size:0.8rem;font-style:italic;">Noch keine Ermittler-Notizen vorhanden. Füge den ersten Hinweis hinzu!</div>'
                        : notes.map((n, nIdx) => `
                            <div style="background:#0c0a0c;border:1px solid #26181a;border-radius:8px;padding:8px 12px;font-size:0.8rem;display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                                <div>
                                    <strong style="color:#ff8080;">${escapeHtml(n.autor || 'Ermittler')}</strong>
                                    <span style="color:#666;font-size:0.72rem;"> • ${escapeHtml(n.datum || '')}</span>
                                    <div style="color:#ddd;margin-top:3px;">${escapeHtml(n.text)}</div>
                                </div>
                                <button type="button" class="btn-note-del" data-nidx="${nIdx}" title="Notiz löschen (Admin)" style="background:transparent;border:none;color:#666;cursor:pointer;font-size:0.75rem;width:auto;padding:2px 5px;">✕</button>
                            </div>
                        `).join('')}
                </div>

                <form id="modal-note-form" style="display:flex;gap:8px;flex-wrap:wrap;">
                    <input type="text" id="note-author" placeholder="Dein Name" style="width:140px;padding:8px 10px;font-size:0.8rem;background:#0b090b;border:1px solid #331b1e;color:#fff;border-radius:6px;">
                    <input type="text" id="note-text" placeholder="Hinweis, Film-/Buch-Referenz oder Fakt ergänzen..." required style="flex:1;min-width:180px;padding:8px 10px;font-size:0.8rem;background:#0b090b;border:1px solid #331b1e;color:#fff;border-radius:6px;">
                    <button type="submit" style="width:auto;padding:8px 14px;font-size:0.8rem;background:#991b1b;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">+ Notiz speichern</button>
                </form>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:14px;border-top:1px solid #2b1619;">
                <button type="button" id="modal-copy-btn" style="width:auto;background:#1c1619;color:#ccc;border:1px solid #382428;padding:8px 14px;border-radius:8px;font-size:0.8rem;cursor:pointer;">📋 Akte kopieren</button>
                <div style="display:flex;gap:8px;">
                    <button type="button" id="modal-edit-btn" style="width:auto;background:#1f242d;color:#60a5fa;border:1px solid #2e3b4e;padding:8px 14px;border-radius:8px;font-size:0.8rem;cursor:pointer;font-weight:600;">
                        ${darfDirektBearbeiten ? '✏️ Akte bearbeiten' : '🔒 Akte bearbeiten (PIN/Admin)'}
                    </button>
                    <button type="button" id="modal-close-btn" style="width:auto;background:#33181b;color:#fff;border:1px solid #5c1d24;padding:8px 16px;border-radius:8px;font-size:0.8rem;cursor:pointer;font-weight:700;">Schließen</button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');

        document.getElementById('modal-close-btn')?.addEventListener('click', () => modal.classList.add('hidden'));
        document.getElementById('modal-edit-btn')?.addEventListener('click', () => {
            modal.classList.add('hidden');
            starteBearbeitung(index);
        });
        document.getElementById('modal-copy-btn')?.addEventListener('click', () => {
            const copyText = `FALLAKTE: ${eintrag.name} (${eintrag.alias})\nOpfer: ${opfer} bestätigt\nTatort: ${eintrag.country} (${eintrag.activePeriod})\nModus Operandi: ${modus}\nFallakte: ${details}`;
            navigator.clipboard.writeText(copyText);
            alert('Fallakte in die Zwischenablage kopiert!');
        });

        document.getElementById('modal-note-form')?.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const autorVal = document.getElementById('note-author')?.value.trim() || 'Anonymer Ermittler';
            const textVal = document.getElementById('note-text')?.value.trim();
            if (!textVal) return;

            istAmSpeichern = true;
            try {
                const latestResp = await fetch(DATABASE_URL, {
                    method: 'GET',
                    cache: 'no-store'
                });
                if (latestResp.ok) {
                    const geladen = extrahiereEintraege(await latestResp.json());
                    if (geladen.length > 0) meinArchiv = geladen;
                }

                if (meinArchiv[index]) {
                    if (!Array.isArray(meinArchiv[index].notes)) meinArchiv[index].notes = [];
                    meinArchiv[index].notes.push({
                        autor: autorVal,
                        text: textVal,
                        datum: new Date().toLocaleDateString('de-DE')
                    });
                    await speichereArchivInCloud(meinArchiv);
                    ansichtRendern(true);
                    oeffneDossierModal(index);
                }
            } catch (e) {
                alert('Fehler beim Speichern der Notiz.');
            } finally {
                istAmSpeichern = false;
            }
        });

        content.querySelectorAll('.btn-note-del').forEach(btn => {
            btn.addEventListener('click', async () => {
                const nIdx = Number(btn.getAttribute('data-nidx'));
                if (!istAdminAktiv) {
                    const pw = prompt('Admin-Passwort zum Löschen dieser Notiz:');
                    if (pw !== ADMIN_PASSWORT) return;
                }
                istAmSpeichern = true;
                try {
                    meinArchiv[index].notes.splice(nIdx, 1);
                    await speichereArchivInCloud(meinArchiv);
                    ansichtRendern(true);
                    oeffneDossierModal(index);
                } finally {
                    istAmSpeichern = false;
                }
            });
        });
    }

    // Haupt-Render-Funktion
    function ansichtRendern(erzwingen = false) {
        const aktuellerHash = JSON.stringify(meinArchiv) + '||' + suchbegriff + '||' + aktiverFilter + '||' + aktiveSortierung + '||' + aktuellerAnsichtsModus + '||' + istAdminAktiv;
        if (!erzwingen && aktuellerHash === letzterDatenHash) {
            return;
        }
        letzterDatenHash = aktuellerHash;

        aktualisiereStatistiken();
        rendereFilterPills();
        if (!listenElement) return;

        listenElement.className = aktuellerAnsichtsModus === 'timeline' ? 'timeline-mode' : 'grid-mode';
        listenElement.innerHTML = '';

        const gefiltert = meinArchiv
            .map((eintrag, index) => ({
                eintrag,
                index,
                opfer: ermittleOpferzahl(eintrag),
                jahr: ermittleStartJahr(eintrag),
                shocks: Number(eintrag.shockCount) || 0
            }))
            .filter(({ eintrag }) => {
                const c = String(eintrag.country || '').toLowerCase();
                const s = String(eintrag.status || '').toLowerCase();
                if (aktiverFilter === 'MINE' && !istEigenerBeitrag(eintrag)) return false;
                if (aktiverFilter === 'DE' && !c.includes('deutschland')) return false;
                if (aktiverFilter === 'USA' && !c.includes('usa')) return false;
                if (aktiverFilter === 'UK' && !c.includes('großbritannien') && !c.includes('london')) return false;
                if (aktiverFilter === 'OTHER_REG' && !c.includes('sowjet') && !c.includes('russland') && !c.includes('kolumbien') && !c.includes('südamerika')) return false;
                if (aktiverFilter === 'EXECUTED' && !s.includes('hingerichtet')) return false;
                if (aktiverFilter === 'UNSOLVED' && !s.includes('ungeklärt') && !s.includes('nie gefasst')) return false;

                if (!suchbegriff) return true;
                const volltext = [
                    eintrag.name,
                    eintrag.alias,
                    eintrag.titel,
                    eintrag.hallmark,
                    eintrag.description,
                    eintrag.beschreibung,
                    eintrag.country,
                    eintrag.activePeriod,
                    eintrag.status,
                    eintrag.forensicFact,
                    ...(Array.isArray(eintrag.tags) ? eintrag.tags : [])
                ].join(' ').toLowerCase();
                return volltext.includes(suchbegriff);
            })
            .sort((a, b) => {
                if (aktuellerAnsichtsModus === 'timeline' || aktiveSortierung === 'year-asc') {
                    return a.jahr - b.jahr;
                }
                if (aktiveSortierung === 'victims-asc') return a.opfer - b.opfer;
                if (aktiveSortierung === 'shock-desc') return b.shocks - a.shocks;
                if (aktiveSortierung === 'name-asc') {
                    return String(a.eintrag.name || '').localeCompare(String(b.eintrag.name || ''), 'de');
                }
                return b.opfer - a.opfer;
            });

        if (gefiltert.length === 0) {
            listenElement.innerHTML = '<p style="grid-column: 1 / -1; color: #888; text-align: center; padding: 30px 0;">Keine passende Fallakte für diesen Filter gefunden.</p>';
            return;
        }

        gefiltert.forEach(({ eintrag, index, opfer, jahr, shocks }) => {
            const name = escapeHtml(eintrag.name || String(eintrag.titel || 'Unbekannter Eintrag').split('–')[0].trim());
            const alias = escapeHtml(eintrag.alias || 'Fallakte');
            const land = escapeHtml(eintrag.country || 'Weltweit');
            const zeitraum = escapeHtml(eintrag.activePeriod || eintrag.datum || 'Unbekannt');
            const { modus, details } = trenneModusUndFallakte(eintrag);
            const hallmarkHtml = escapeHtml(modus);
            const detailsHtml = escapeHtml(details);
            const skullsCount = Math.min(5, Math.max(1, Number(eintrag.skulls) || 5));
            const skullsStr = '💀'.repeat(skullsCount);
            const stempel = holeStempelDaten(eintrag.status);
            const tags = Array.isArray(eintrag.tags) ? eintrag.tags : [];
            const notesCount = Array.isArray(eintrag.notes) ? eintrag.notes.length : 0;
            const forensik = eintrag.forensicFact ? escapeHtml(eintrag.forensicFact) : '';
            const eingereichtVon = escapeHtml(eintrag.submittedBy || 'Archiv');

            const eigener = istEigenerBeitrag(eintrag);
            const darfDirektBearbeiten = istAdminAktiv || eigener;

            const mugshotHtml = eintrag.imageUrl
                ? `<div class="mugshot-box"><img src="${escapeHtml(eintrag.imageUrl)}" alt="${name}" onerror="this.outerHTML='<span style=\\'font-size:1.5rem;\\'>🕵️</span>'"></div>`
                : `<div class="mugshot-box" title="Forensisches Dossier-Profil">
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.6">
                       <path d="M12 2C7.03 2 3 6.03 3 11c0 3.32 1.8 6.22 4.47 7.78V21a1 1 0 001 1h7.06a1 1 0 001-1v-2.22C19.2 17.22 21 14.32 21 11c0-4.97-4.03-9-9-9zM9 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 17v3M14 17v3"/>
                     </svg>
                   </div>`;

            const li = document.createElement('li');
            li.className = `archiv-item ${eigener ? 'own-entry' : ''}`;
            li.setAttribute('data-year', String(jahr));
            li.innerHTML = `
                <div>
                    <!-- Stempel & Gefahrenstufe oben -->
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:6px;">
                        <span class="dossier-stamp ${stempel.klasse}">${stempel.text}</span>
                        <span title="Grausamkeits-/Gefahrenstufe: ${skullsCount} von 5" style="font-size:0.75rem;letter-spacing:1px;">${skullsStr}</span>
                    </div>

                    <!-- Mugshot, Name & Opfer-Badge -->
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
                        <div style="display:flex;align-items:center;gap:11px;">
                            ${mugshotHtml}
                            <div>
                                <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-family:monospace;">${alias}</div>
                                <h3 class="btn-open-dossier" data-index="${index}" style="margin:2px 0 0 0;color:#fff;font-size:1.22rem;cursor:pointer;transition:color 0.15s;" onmouseover="this.style.color='#ff4d4d'" onmouseout="this.style.color='#fff'">${name}</h3>
                            </div>
                        </div>
                        <div style="background:radial-gradient(circle,#7f1d1d 0%,#450a0a 100%);border:1px solid #ef4444;border-radius:9px;padding:6px 10px;text-align:center;min-width:62px;flex-shrink:0;">
                            <strong style="display:block;font-size:1.22rem;color:#fff;line-height:1;">${opfer}</strong>
                            <span style="font-size:0.6rem;text-transform:uppercase;color:#fca5a5;">Opfer</span>
                        </div>
                    </div>

                    <!-- Meta-Badges -->
                    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#1c181c;border:1px solid #2e262e;color:#ccc;">📍 ${land}</span>
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#1c181c;border:1px solid #2e262e;color:#ccc;">⏱ ${zeitraum}</span>
                        <span style="font-size:0.7rem;padding:3px 8px;border-radius:5px;background:#181418;border:1px solid #2a202a;color:#999;">👤 ${eingereichtVon}</span>
                        ${eigener ? `<span style="font-size:0.7rem;padding:3px 8px;border-radius:5px;background:rgba(16,185,129,0.18);border:1px solid #10b981;color:#6ee7b7;font-weight:700;">✨ Dein Beitrag</span>` : ''}
                    </div>

                    <!-- Modus Operandi (WEISS in der roten Box) -->
                    <div style="background:rgba(40,10,14,0.55);border-left:3px solid #ef4444;border-radius:4px 8px 8px 4px;padding:10px 12px;margin-bottom:11px;font-size:0.84rem;color:#f1f1f1;line-height:1.45;">
                        <span style="font-size:0.66rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-weight:700;margin-bottom:4px;display:block;">Was ihn ausmachte (Modus Operandi)</span>
                        ${hallmarkHtml}
                    </div>

                    <!-- Fallakte / Hintergrund (GRAU darunter) -->
                    ${detailsHtml ? `<p style="font-size:0.83rem;color:#a3a3a3;line-height:1.5;margin:0 0 12px 0;white-space:pre-line;">${detailsHtml}</p>` : ''}

                    <!-- Forensik-Hinweis -->
                    ${forensik ? `
                    <div style="background:rgba(15,23,42,0.55);border-left:2px solid #3b82f6;padding:7px 10px;border-radius:4px;margin-bottom:12px;font-size:0.76rem;color:#93c5fd;">
                        <strong>🔬 Forensik:</strong> ${forensik}
                    </div>` : ''}

                    <!-- Anklickbare FBI-Profiling-Tags -->
                    ${tags.length > 0 ? `
                    <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;">
                        ${tags.map(t => `<span class="tag-chip" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`).join('')}
                    </div>` : ''}
                </div>

                <!-- Karten-Footer: Schock-Button, Akte öffnen, Löschen & Bearbeiten -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid #241a1d;margin-top:auto;gap:6px;flex-wrap:wrap;">
                    <div style="display:flex;align-items:center;gap:6px;">
                        <button type="button" class="btn-shock" data-index="${index}" title="Fall als besonders verstörend markieren (Live-Counter)" style="background:#1c1215;color:#fca5a5;border:1px solid #442026;padding:4px 9px;font-size:0.73rem;border-radius:6px;cursor:pointer;width:auto;">
                            💀 ${shocks}
                        </button>
                        <button type="button" class="btn-open-dossier" data-index="${index}" title="Vollständige Akte & Ermittler-Notizen öffnen" style="background:#19161b;color:#ddd;border:1px solid #332b38;padding:4px 9px;font-size:0.73rem;border-radius:6px;cursor:pointer;width:auto;">
                            📂 Akte ${notesCount > 0 ? `(${notesCount})` : ''}
                        </button>
                    </div>

                    <div style="display:flex;align-items:center;gap:6px;">
                        <button type="button" class="btn-loeschen" data-index="${index}" title="${darfDirektBearbeiten ? 'Eintrag löschen' : 'Geschützt: Nur Ersteller oder Admin'}" style="position:static;background:#221618;color:${darfDirektBearbeiten ? '#ff6666' : '#885555'};border:1px solid #442226;padding:5px 10px;font-size:0.74rem;font-weight:600;border-radius:6px;cursor:pointer;width:auto;">
                            ${darfDirektBearbeiten ? 'Löschen' : '🔒 Löschen'}
                        </button>
                        <button type="button" class="btn-bearbeiten" data-index="${index}" title="${darfDirektBearbeiten ? 'Deinen Beitrag direkt bearbeiten' : 'Geschützt: Nur für Ersteller oder Admin bearbeitbar'}" style="position:static;background:#1f242d;color:${darfDirektBearbeiten ? '#60a5fa' : '#7c8ba1'};border:1px solid #2e3b4e;padding:5px 10px;font-size:0.74rem;font-weight:600;border-radius:6px;cursor:pointer;width:auto;">
                            ${darfDirektBearbeiten ? '✏️ Bearbeiten' : '🔒 Bearbeiten'}
                        </button>
                    </div>
                </div>
            `;
            listenElement.appendChild(li);
        });

        listenElement.querySelectorAll('.tag-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const tag = chip.getAttribute('data-tag') || '';
                suchbegriff = tag.toLowerCase();
                if (sucheInput) sucheInput.value = tag;
                ansichtRendern(true);
            });
        });

        listenElement.querySelectorAll('.btn-open-dossier').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = Number(e.currentTarget.getAttribute('data-index'));
                oeffneDossierModal(idx);
            });
        });

        listenElement.querySelectorAll('.btn-shock').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const idx = Number(e.currentTarget.getAttribute('data-index'));
                if (!meinArchiv[idx]) return;
                meinArchiv[idx].shockCount = (Number(meinArchiv[idx].shockCount) || 0) + 1;
                ansichtRendern(true);
                try {
                    await speichereArchivInCloud(meinArchiv);
                } catch (_) {}
            });
        });

        listenElement.querySelectorAll('.btn-loeschen').forEach((button) => {
            button.addEventListener('click', (e) => {
                const indexZumLoeschen = Number(e.currentTarget.getAttribute('data-index'));
                if (pruefeZugriffsRecht(indexZumLoeschen, 'löschen')) {
                    eintragLoeschen(indexZumLoeschen);
                }
            });
        });

        listenElement.querySelectorAll('.btn-bearbeiten').forEach((button) => {
            button.addEventListener('click', (e) => {
                const indexZumBearbeiten = Number(e.currentTarget.getAttribute('data-index'));
                starteBearbeitung(indexZumBearbeiten);
            });
        });
    }

    async function datenLaden(zeigeLadeStatus = false) {
        if (istAmSpeichern) return;
        if (zeigeLadeStatus) setzeStatus('syncing', 'Synchronisiere mit Google Cloud...');

        try {
            const response = await fetch(DATABASE_URL, {
                method: 'GET',
                cache: 'no-store'
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const resBody = await response.json();
            const geladeneEintraege = extrahiereEintraege(resBody);

            if (geladeneEintraege.length > 0) {
                meinArchiv = geladeneEintraege;
            } else {
                // Falls die Google-Datenbank leer sein sollte, automatisch mit den 11 Original-Akten befüllen
                meinArchiv = ladeLokalesBackup();
                await speichereArchivInCloud(meinArchiv);
            }

            localStorage.setItem('archivDatenBackup', JSON.stringify(meinArchiv));
            ansichtRendern();

            const uhrzeit = new Date().toLocaleTimeString('de-DE');
            setzeStatus('online', `Google Cloud aktiv (${meinArchiv.length} Akten • ${uhrzeit} Uhr)`);
        } catch (error) {
            console.error('Cloud-Ladefehler:', error);
            if (!meinArchiv || meinArchiv.length === 0) {
                meinArchiv = ladeLokalesBackup();
            }
            ansichtRendern();
            setzeStatus('error', `Lokales Backup aktiv (${meinArchiv.length} Akten)`);
        }
    }

    async function speichereArchivInCloud(neuesArchiv) {
        localStorage.setItem('archivDatenBackup', JSON.stringify(neuesArchiv));
        const payload = neuesArchiv.length > 0 ? neuesArchiv : { eintraege: [] };
        const response = await fetch(DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return await response.json();
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titelInput = document.getElementById('titel');
            const aliasInput = document.getElementById('alias');
            const opferInput = document.getElementById('opfer');
            const landInput = document.getElementById('land');
            const zeitraumInput = document.getElementById('zeitraum');
            const statusInput = document.getElementById('status');
            const modusInput = document.getElementById('modus');
            const beschreibungInput = document.getElementById('beschreibung');
            const skullsInput = document.getElementById('skulls');
            const tagsInput = document.getElementById('tags-input');
            const eingereichtInput = document.getElementById('eingereicht-von');
            const forensikInput = document.getElementById('forensik-input');
            const bildUrlInput = document.getElementById('bild-url');
            const authorPinInput = document.getElementById('author-pin');

            const name = titelInput ? titelInput.value.trim() : '';
            const alias = aliasInput && aliasInput.value.trim() ? aliasInput.value.trim() : 'Fallakte';
            const opfer = opferInput ? (parseInt(opferInput.value, 10) || 1) : 1;
            const land = landInput && landInput.value.trim() ? landInput.value.trim() : 'Weltweit';
            const zeitraum = zeitraumInput && zeitraumInput.value.trim() ? zeitraumInput.value.trim() : new Date().toLocaleDateString('de-DE');
            const status = statusInput ? statusInput.value : 'Ungeklärt / Nie gefasst';
            const skulls = skullsInput ? Number(skullsInput.value) || 5 : 5;
            const tags = tagsInput && tagsInput.value.trim()
                ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
                : [];
            const submittedBy = eingereichtInput && eingereichtInput.value.trim() ? eingereichtInput.value.trim() : 'Community';
            const forensicFact = forensikInput ? forensikInput.value.trim() : '';
            const imageUrl = bildUrlInput ? bildUrlInput.value.trim() : '';
            const authorPin = authorPinInput ? authorPinInput.value.trim() : '';

            let hallmark = '';
            let description = '';

            if (modusInput) {
                hallmark = modusInput.value.trim();
                description = beschreibungInput ? beschreibungInput.value.trim() : '';
            } else if (beschreibungInput) {
                const rohtext = beschreibungInput.value.trim();
                if (rohtext.includes('\n\n')) {
                    const teile = rohtext.split(/\n\s*\n/);
                    hallmark = teile[0].trim();
                    description = teile.slice(1).join('\n\n').trim();
                } else {
                    hallmark = rohtext;
                }
            }

            if (!name || !hallmark) return;

            const bearbeitungsIndex = editIndexInput && editIndexInput.value !== '' ? Number(editIndexInput.value) : -1;

            istAmSpeichern = true;
            if (speichernBtn) {
                speichernBtn.disabled = true;
                speichernBtn.textContent = 'Wird weltweit gespeichert...';
            }
            setzeStatus('syncing', 'Sende Daten an die Cloud...');

            try {
                const latestResp = await fetch(DATABASE_URL, {
                    method: 'GET',
                    cache: 'no-store'
                });
                if (latestResp.ok) {
                    const geladen = extrahiereEintraege(await latestResp.json());
                    if (geladen.length > 0) meinArchiv = geladen;
                }

                const altesObjekt = bearbeitungsIndex >= 0 && meinArchiv[bearbeitungsIndex] ? meinArchiv[bearbeitungsIndex] : {};

                const aktualisierterEintrag = {
                    ...altesObjekt,
                    id: altesObjekt.id || 'killer-' + Date.now(),
                    creatorId: altesObjekt.creatorId || meineErstellerId,
                    authorPin: authorPin || altesObjekt.authorPin || '',
                    name: name,
                    alias: alias,
                    confirmedVictims: opfer,
                    suspectedVictims: altesObjekt.suspectedVictims || `${opfer}+`,
                    activePeriod: zeitraum,
                    country: land,
                    status: status,
                    skulls: skulls,
                    tags: tags.length > 0 ? tags : (altesObjekt.tags || []),
                    submittedBy: submittedBy,
                    forensicFact: forensicFact,
                    imageUrl: imageUrl,
                    shockCount: altesObjekt.shockCount || 1,
                    notes: Array.isArray(altesObjekt.notes) ? altesObjekt.notes : [],
                    hallmark: hallmark,
                    description: description,
                    titel: `${name}${alias ? ` – „${alias}“` : ''} (${opfer} bestätigte Opfer)`,
                    beschreibung: `WAS IHN AUSMACHTE: ${hallmark}${description ? `\n\nFALLAKTE: ${description}` : ''}`,
                    datum: `Ära: ${zeitraum} | Ort: ${land} | Status: ${status}`
                };

                if (bearbeitungsIndex >= 0 && bearbeitungsIndex < meinArchiv.length) {
                    meinArchiv[bearbeitungsIndex] = aktualisierterEintrag;
                } else {
                    meinArchiv.unshift(aktualisierterEintrag);
                }

                await speichereArchivInCloud(meinArchiv);

                formularZuruecksetzen();
                form.classList.add('hidden');
                if (toggleFormBtn) toggleFormBtn.textContent = '+ Neue Fallakte';

                ansichtRendern(true);
                setzeStatus('online', bearbeitungsIndex >= 0
                    ? `Änderungen gespeichert! (${meinArchiv.length} Akten)`
                    : `Dein Beitrag wurde veröffentlicht! (${meinArchiv.length} Akten)`);
            } catch (error) {
                alert('Fehler beim Speichern in der Cloud.');
            } finally {
                istAmSpeichern = false;
                if (speichernBtn) {
                    speichernBtn.disabled = false;
                    speichernBtn.textContent = 'Eintrag weltweit speichern';
                }
            }
        });
    }

    async function eintragLoeschen(index) {
        istAmSpeichern = true;
        setzeStatus('syncing', 'Lösche Eintrag aus der Cloud...');
        try {
            const latestResp = await fetch(DATABASE_URL, {
                method: 'GET',
                cache: 'no-store'
            });
            if (latestResp.ok) {
                const geladen = extrahiereEintraege(await latestResp.json());
                if (geladen.length > 0) meinArchiv = geladen;
            }

            if (index >= 0 && index < meinArchiv.length) {
                meinArchiv.splice(index, 1);
                await speichereArchivInCloud(meinArchiv);
                ansichtRendern(true);
                setzeStatus('online', `Gelöscht (${meinArchiv.length} Akten verbleibend)`);
            }
        } catch (error) {
            alert('Fehler beim Löschen: ' + error.message);
        } finally {
            istAmSpeichern = false;
        }
    }

    // =========================================================================
    // LIVE-CHAT LOGIK (ECHTZEIT-GOOGLE-FIREBASE-SYNCHRONISATION)
    // =========================================================================
    let chatNachrichten = [];
    let letzterChatHash = '';
    let chatIstOffen = false;
    let chatAmSenden = false;
    let bekannteNachrichtenAnzahl = 0;

    const chatFabBtn = document.getElementById('livechat-fab-btn');
    const chatTopBtn = document.getElementById('btn-open-chat-top');
    const chatWindow = document.getElementById('livechat-window');
    const chatCloseBtn = document.getElementById('livechat-close-btn');
    const chatClearBtn = document.getElementById('livechat-clear-btn');
    const chatMessagesEl = document.getElementById('livechat-messages');
    const chatForm = document.getElementById('livechat-form');
    const chatNameInput = document.getElementById('livechat-name');
    const chatTextInput = document.getElementById('livechat-input');
    const chatUnreadBadge = document.getElementById('livechat-unread-badge');
    const chatSubstatus = document.getElementById('livechat-substatus');

    function toggleLiveChat(oeffnen) {
        if (!chatWindow) return;
        chatIstOffen = oeffnen !== undefined ? oeffnen : chatWindow.classList.contains('hidden');
        if (chatIstOffen) {
            chatWindow.classList.remove('hidden');
            if (chatUnreadBadge) {
                chatUnreadBadge.textContent = '0';
                chatUnreadBadge.classList.add('hidden');
            }
            bekannteNachrichtenAnzahl = chatNachrichten.length;
            if (chatMessagesEl) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
            chatTextInput?.focus();
        } else {
            chatWindow.classList.add('hidden');
        }
    }

    chatFabBtn?.addEventListener('click', () => toggleLiveChat());
    chatTopBtn?.addEventListener('click', () => toggleLiveChat(true));
    chatCloseBtn?.addEventListener('click', () => toggleLiveChat(false));

    document.querySelectorAll('.emoji-quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!chatTextInput) return;
            chatTextInput.value += btn.getAttribute('data-emoji') || '';
            chatTextInput.focus();
        });
    });

    function extrahiereChatListe(resBody) {
        if (!resBody) return [];
        const rec = resBody.record !== undefined ? resBody.record : resBody;
        if (rec && Array.isArray(rec.messages)) return rec.messages.filter(Boolean);
        if (Array.isArray(rec)) return rec.filter(Boolean);
        if (typeof rec === 'object' && rec !== null) {
            if (rec.text && rec.autor) return [rec];
            return Object.values(rec).filter(item => item && typeof item === 'object' && item.text);
        }
        return [];
    }

    async function speichereChatInCloud(neueListe) {
        // Behalte maximal die letzten 80 Nachrichten für schnelle Ladezeiten
        const gekuerzt = neueListe.slice(-80);
        const response = await fetch(CHAT_DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gekuerzt)
        });
        if (!response.ok) throw new Error(`Chat HTTP ${response.status}`);
        return await response.json();
    }

    function rendereChatNachrichten(erzwingen = false) {
        const hash = JSON.stringify(chatNachrichten) + '||' + istAdminAktiv;
        if (!erzwingen && hash === letzterChatHash) return;
        letzterChatHash = hash;

        if (!chatMessagesEl) return;

        if (chatNachrichten.length === 0) {
            chatMessagesEl.innerHTML = '<div style="color:#777;font-size:0.8rem;text-align:center;margin-top:30px;">Noch keine Funk-Nachrichten. Schreibe die erste Nachricht!</div>';
            return;
        }

        chatMessagesEl.innerHTML = chatNachrichten.map((msg, idx) => {
            const eigene = msg.creatorId && msg.creatorId === meineErstellerId;
            const darfLoeschen = istAdminAktiv || eigene;
            const klassen = [
                'chat-bubble',
                eigene ? 'own-msg' : 'other-msg',
                msg.isAdmin ? 'admin-msg' : ''
            ].filter(Boolean).join(' ');

            return `
                <div class="${klassen}">
                    <div class="chat-meta">
                        <div>
                            <span class="chat-author">${escapeHtml(msg.autor || 'Ermittler')}</span>
                            ${msg.isAdmin ? '<span class="chat-admin-badge">👑 ADMIN</span>' : ''}
                        </div>
                        <div style="display:flex;align-items:center;gap:4px;">
                            <span class="chat-time">${escapeHtml(msg.zeit || '')}</span>
                            ${darfLoeschen ? `<button type="button" class="chat-del-btn" data-cidx="${idx}" title="Nachricht löschen">✕</button>` : ''}
                        </div>
                    </div>
                    <div style="color:#f4f4f5;white-space:pre-wrap;">${escapeHtml(msg.text)}</div>
                </div>
            `;
        }).join('');

        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;

        chatMessagesEl.querySelectorAll('.chat-del-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const cIdx = Number(btn.getAttribute('data-cidx'));
                const zielMsg = chatNachrichten[cIdx];
                if (!zielMsg) return;
                if (!istAdminAktiv && zielMsg.creatorId !== meineErstellerId) return;

                chatAmSenden = true;
                try {
                    chatNachrichten.splice(cIdx, 1);
                    rendereChatNachrichten(true);
                    await speichereChatInCloud(chatNachrichten);
                } finally {
                    chatAmSenden = false;
                }
            });
        });
    }

    async function ladeChatNachrichten() {
        if (chatAmSenden) return;
        try {
            const resp = await fetch(CHAT_DATABASE_URL, {
                method: 'GET',
                cache: 'no-store'
            });
            if (!resp.ok) return;
            const data = await resp.json();
            const neueListe = extrahiereChatListe(data);

            // Ungelesen-Zähler aktualisieren, wenn das Chatfenster geschlossen ist
            if (!chatIstOffen && bekannteNachrichtenAnzahl > 0 && neueListe.length > bekannteNachrichtenAnzahl) {
                const diff = neueListe.length - bekannteNachrichtenAnzahl;
                if (chatUnreadBadge) {
                    chatUnreadBadge.textContent = String(diff);
                    chatUnreadBadge.classList.remove('hidden');
                }
            } else if (chatIstOffen || bekannteNachrichtenAnzahl === 0) {
                bekannteNachrichtenAnzahl = neueListe.length;
            }

            chatNachrichten = neueListe;
            rendereChatNachrichten();
            if (chatSubstatus) {
                chatSubstatus.textContent = `${chatNachrichten.length} Nachrichten im Funkkanal (Google Cloud)`;
            }
        } catch (_) {
            rendereChatNachrichten(true);
        }
    }

    chatForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameVal = chatNameInput ? chatNameInput.value.trim() : 'Ermittler';
        const textVal = chatTextInput ? chatTextInput.value.trim() : '';
        if (!textVal) return;

        localStorage.setItem('archivChatNickname', nameVal);
        if (chatTextInput) chatTextInput.value = '';

        const jetzt = new Date();
        const neueMsg = {
            id: 'msg-' + Date.now(),
            autor: nameVal || 'Ermittler',
            isAdmin: istAdminAktiv,
            creatorId: meineErstellerId,
            text: textVal,
            zeit: jetzt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr',
            datum: jetzt.toLocaleDateString('de-DE')
        };

        chatAmSenden = true;
        try {
            const resp = await fetch(CHAT_DATABASE_URL, {
                method: 'GET',
                cache: 'no-store'
            });
            if (resp.ok) {
                chatNachrichten = extrahiereChatListe(await resp.json());
            }
            chatNachrichten.push(neueMsg);
            bekannteNachrichtenAnzahl = chatNachrichten.length;
            rendereChatNachrichten(true);
            await speichereChatInCloud(chatNachrichten);
        } catch (err) {
            alert('Nachricht konnte nicht gesendet werden.');
        } finally {
            chatAmSenden = false;
        }
    });

    // Admin: Gesamten Chatverlauf leeren
    chatClearBtn?.addEventListener('click', async () => {
        if (!istAdminAktiv) return;
        if (!confirm('Möchtest du als Admin wirklich den gesamten Live-Chat leeren?')) return;
        chatAmSenden = true;
        try {
            chatNachrichten = [{
                id: 'msg-' + Date.now(),
                autor: 'Archiv-Leitung',
                isAdmin: true,
                creatorId: meineErstellerId,
                text: 'Der Funkkanal wurde vom Administrator bereinigt.',
                zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
            }];
            rendereChatNachrichten(true);
            await speichereChatInCloud(chatNachrichten);
        } finally {
            chatAmSenden = false;
        }
    });

    // Event-Listener für Suche, Sortierung, Ansichts-Umschalter, Zufalls-Akte & JSON-Backup
    if (sucheInput) {
        sucheInput.addEventListener('input', (e) => {
            suchbegriff = e.target.value.trim().toLowerCase();
            ansichtRendern(true);
        });
    }

    document.getElementById('sort-select')?.addEventListener('change', (e) => {
        aktiveSortierung = e.target.value;
        ansichtRendern(true);
    });

    const btnGrid = document.getElementById('btn-view-grid');
    const btnTimeline = document.getElementById('btn-view-timeline');

    btnGrid?.addEventListener('click', () => {
        aktuellerAnsichtsModus = 'grid';
        btnGrid.classList.add('active');
        btnTimeline?.classList.remove('active');
        ansichtRendern(true);
    });

    btnTimeline?.addEventListener('click', () => {
        aktuellerAnsichtsModus = 'timeline';
        btnTimeline.classList.add('active');
        btnGrid?.classList.remove('active');
        ansichtRendern(true);
    });

    document.getElementById('btn-random-dossier')?.addEventListener('click', () => {
        if (meinArchiv.length === 0) return;
        const zufallsIndex = Math.floor(Math.random() * meinArchiv.length);
        oeffneDossierModal(zufallsIndex);
    });

    document.getElementById('btn-export-json')?.addEventListener('click', () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(meinArchiv, null, 2));
        const a = document.createElement('a');
        a.setAttribute('href', dataStr);
        a.setAttribute('download', `archiv-des-boesen-backup-${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(a);
        a.click();
        a.remove();
    });

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => datenLaden(true));
    }

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            datenLaden(false);
            ladeChatNachrichten();
        }
    });

    // Sofort beim Öffnen alle Fallakten anzeigen (0 ms Wartezeit) & dann mit Google Cloud synchronisieren
    ansichtRendern(true);
    datenLaden(true);
    ladeChatNachrichten();
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            datenLaden(false);
            ladeChatNachrichten();
        }
    }, 5000);
});
