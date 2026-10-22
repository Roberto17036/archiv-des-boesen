document.addEventListener('DOMContentLoaded', () => {
    // 0. Automatische Bereinigung doppelter Container & Grid-Sicherung
    const alleContainer = document.querySelectorAll('.container');
    if (alleContainer.length > 1) {
        for (let i = 1; i < alleContainer.length; i++) {
            alleContainer[i].remove();
        }
    }

    const hauptContainer = document.querySelector('.container') || document.body;

    if (!document.getElementById('archiv-auto-grid-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'archiv-auto-grid-styles';
        styleTag.textContent = `
            .container { max-width: 1280px !important; width: 100%; margin: 0 auto; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
            .kpi-card { background: linear-gradient(145deg, #161316 0%, #100d10 100%); border: 1px solid #3b171b; border-radius: 12px; padding: 16px 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.6); display: flex; flex-direction: column; }
            .kpi-label { font-size: 0.73rem; text-transform: uppercase; letter-spacing: 1px; color: #ff7373; font-weight: 700; }
            .kpi-value { font-size: 2rem; font-weight: 900; color: #ff3b3b; margin: 6px 0 4px; line-height: 1; }
            .kpi-sub { font-size: 0.76rem; color: #888; }
            #archiv-liste { list-style: none; padding: 0; margin: 20px 0 0 0; display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 20px !important; align-items: stretch; }
            .archiv-item { margin-bottom: 0 !important; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(155deg, #171417 0%, #110e11 100%); border: 1px solid #33181b; border-top: 3px solid #cc1111; border-radius: 12px; padding: 20px; position: relative; }
            .form-actions { display: flex; gap: 12px; align-items: center; }
            .btn-cancel { background: #262022; color: #ccc; border: 1px solid #44383b; padding: 13px 22px; border-radius: 8px; cursor: pointer; font-weight: 700; width: auto; }
            .btn-cancel:hover { background: #382e31; color: #fff; }
            .btn-cancel.hidden { display: none; }
            @media (max-width: 1024px) { .kpi-grid, #archiv-liste { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 680px) { .kpi-grid, #archiv-liste { grid-template-columns: 1fr !important; } }
        `;
        document.head.appendChild(styleTag);
    }

    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');
    const speichernBtn = document.getElementById('btn-speichern');
    const toggleFormBtn = document.getElementById('btn-toggle-form');
    const sucheInput = document.getElementById('suche-input');

    // Baut automatisch das separate Feld für Modus Operandi (weiß) + Fallakte (grau) ins Formular ein
    if (form && !document.getElementById('modus')) {
        const alteBeschreibungGroup = document.getElementById('beschreibung')?.parentElement;
        if (alteBeschreibungGroup) {
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

    if (!document.getElementById('kpi-bar') && hauptContainer) {
        const kpiSection = document.createElement('section');
        kpiSection.id = 'kpi-bar';
        kpiSection.className = 'kpi-grid';
        kpiSection.innerHTML = `
            <div class="kpi-card">
                <span class="kpi-label">Opfer gesamt (Bestätigt)</span>
                <span id="stat-total-victims" class="kpi-value">0</span>
                <span class="kpi-sub">Summe aller erfassten Akten</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-label">Höchste Opferzahl</span>
                <span id="stat-highest-victims" class="kpi-value">0</span>
                <span id="stat-highest-name" class="kpi-sub">–</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-label">Erfasste Fallakten</span>
                <span id="stat-total-killers" class="kpi-value" style="color:#fff;">0</span>
                <span class="kpi-sub">Weltweit synchronisiert</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-label" style="color:#fbbf24;">Ungelöste Phantome</span>
                <span id="stat-unsolved" class="kpi-value" style="color:#fbbf24;">0</span>
                <span class="kpi-sub">Nie gefasst / Ungeklärt</span>
            </div>
        `;
        const zielElement = document.getElementById('live-status-bar') || form || listenElement;
        if (zielElement && zielElement.parentNode) {
            zielElement.parentNode.insertBefore(kpiSection, zielElement);
        }
    }

    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const refreshBtn = document.getElementById('btn-refresh');
    const abbrechenBtn = document.getElementById('btn-abbrechen');
    const editIndexInput = document.getElementById('edit-index');
    const formUeberschrift = document.getElementById('form-ueberschrift') || (form ? form.querySelector('h3') : null);

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
            if (wirdGeoeffnet) {
                formularZuruecksetzen();
                form.classList.remove('hidden');
                toggleFormBtn.textContent = '✕ Formular schließen';
            } else {
                formularZuruecksetzen();
                form.classList.add('hidden');
                toggleFormBtn.textContent = '+ Neue Fallakte anlegen';
            }
        });
    }

    if (abbrechenBtn && form) {
        abbrechenBtn.addEventListener('click', () => {
            formularZuruecksetzen();
            form.classList.add('hidden');
            if (toggleFormBtn) toggleFormBtn.textContent = '+ Neue Fallakte anlegen';
        });
    }

    // CLOUD-DATENBANK KONFIGURATION (JSONBin.io v3 API)
    const BIN_ID = '6ad88424ac6210605a451855';
    const dollar = String.fromCharCode(36);
    const MASTER_KEY = dollar + '2a' + dollar + '10' + dollar + 'j8SdQmHLglHfQa9O3s./YuXHtf/cYQ3Zjqs0nk3sWx4Bv19KCcUx2';
    const DATABASE_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;
    const LOESCH_PASSWORT = 'geheim123';

    let meinArchiv = [];
    let letzterDatenHash = '';
    let istAmSpeichern = false;
    let suchbegriff = '';

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

    // Trennt Modus Operandi (weiß in der roten Box) und Fallakte (grau darunter) sauber auf
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

    function extrahiereEintraege(resBody) {
        const record = resBody && resBody.record !== undefined ? resBody.record : resBody;
        if (Array.isArray(record)) return record;
        if (record && Array.isArray(record.eintraege)) return record.eintraege;
        if (record && Array.isArray(record.killers)) return record.killers;
        return [];
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

    // Öffnet das Formular mit allen Daten des gewählten Eintrags zum Bearbeiten
    function starteBearbeitung(index) {
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

        if (editIndexInput) editIndexInput.value = String(index);
        if (titelInput) titelInput.value = name;
        if (aliasInput) aliasInput.value = eintrag.alias || '';
        if (opferInput) opferInput.value = opfer;
        if (landInput) landInput.value = eintrag.country || '';
        if (zeitraumInput) zeitraumInput.value = eintrag.activePeriod || '';
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
        } else if (beschreibungInput) {
            beschreibungInput.value = details ? `${modus}\n\n${details}` : modus;
        }

        if (formUeberschrift) {
            formUeberschrift.textContent = `Fallakte bearbeiten: ${name}`;
        }
        if (speichernBtn) {
            speichernBtn.textContent = 'Änderungen weltweit speichern';
        }
        if (abbrechenBtn) {
            abbrechenBtn.classList.remove('hidden');
        }

        form.classList.remove('hidden');
        if (toggleFormBtn) {
            toggleFormBtn.textContent = '✕ Formular schließen';
        }

        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (titelInput) titelInput.focus();
    }

    function ansichtRendern(erzwingen = false) {
        const aktuellerHash = JSON.stringify(meinArchiv) + '||' + suchbegriff;
        if (!erzwingen && aktuellerHash === letzterDatenHash) {
            return;
        }
        letzterDatenHash = aktuellerHash;

        aktualisiereStatistiken();
        if (!listenElement) return;
        listenElement.innerHTML = '';

        const gefiltert = meinArchiv
            .map((eintrag, index) => ({ eintrag, index, opfer: ermittleOpferzahl(eintrag) }))
            .filter(({ eintrag }) => {
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
                    eintrag.status
                ].join(' ').toLowerCase();
                return volltext.includes(suchbegriff);
            })
            .sort((a, b) => b.opfer - a.opfer);

        if (gefiltert.length === 0) {
            listenElement.innerHTML = '<p style="grid-column: 1 / -1; color: #888; text-align: center; padding: 30px 0;">Keine passende Fallakte gefunden.</p>';
            return;
        }

        gefiltert.forEach(({ eintrag, index, opfer }) => {
            const name = escapeHtml(eintrag.name || String(eintrag.titel || 'Unbekannter Eintrag').split('–')[0].trim());
            const alias = escapeHtml(eintrag.alias || 'Fallakte');
            const land = escapeHtml(eintrag.country || 'Weltweit');
            const zeitraum = escapeHtml(eintrag.activePeriod || eintrag.datum || 'Unbekannt');
            const status = escapeHtml(eintrag.status || 'Archiviert');
            const { modus, details } = trenneModusUndFallakte(eintrag);
            const hallmarkHtml = escapeHtml(modus);
            const detailsHtml = escapeHtml(details);
            const vermutet = escapeHtml(eintrag.suspectedVictims || `${opfer}+`);

            const li = document.createElement('li');
            li.className = 'archiv-item';
            li.innerHTML = `
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
                        <div>
                            <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-family:monospace;">${alias}</div>
                            <h3 style="margin:3px 0 0 0;color:#fff;font-size:1.25rem;">${name}</h3>
                        </div>
                        <div style="background:radial-gradient(circle,#7f1d1d 0%,#450a0a 100%);border:1px solid #ef4444;border-radius:9px;padding:6px 10px;text-align:center;min-width:64px;flex-shrink:0;">
                            <strong style="display:block;font-size:1.25rem;color:#fff;line-height:1;">${opfer}</strong>
                            <span style="font-size:0.62rem;text-transform:uppercase;color:#fca5a5;">Opfer</span>
                        </div>
                    </div>

                    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#1c181c;border:1px solid #2e262e;color:#ccc;">📍 ${land}</span>
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#1c181c;border:1px solid #2e262e;color:#ccc;">⏱ ${zeitraum}</span>
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#2b1114;border:1px solid #5c1d24;color:#fca5a5;">${status}</span>
                    </div>

                    <div style="background:rgba(40,10,14,0.55);border-left:3px solid #ef4444;border-radius:4px 8px 8px 4px;padding:10px 12px;margin-bottom:12px;font-size:0.85rem;color:#e2e2e2;line-height:1.45;">
                        <span style="font-size:0.68rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-weight:700;margin-bottom:4px;display:block;">Was ihn ausmachte (Modus Operandi)</span>
                        ${hallmarkHtml}
                    </div>

                    ${detailsHtml ? `<p style="font-size:0.84rem;color:#aaa;line-height:1.5;margin:0 0 16px 0;white-space:pre-line;">${detailsHtml}</p>` : ''}
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid #241a1d;margin-top:auto;gap:8px;">
                    <small style="color:#777;font-size:0.75rem;">Vermutet: <strong style="color:#ccc;">${vermutet}</strong></small>
                    <div style="display:flex;align-items:center;gap:6px;">
                        <button type="button" class="btn-loeschen" data-index="${index}" style="position:static;background:#221618;color:#ff6666;border:1px solid #442226;padding:5px 11px;font-size:0.75rem;font-weight:600;border-radius:6px;cursor:pointer;width:auto;">Löschen</button>
                        <button type="button" class="btn-bearbeiten" data-index="${index}" style="position:static;background:#1f242d;color:#60a5fa;border:1px solid #2e3b4e;padding:5px 11px;font-size:0.75rem;font-weight:600;border-radius:6px;cursor:pointer;width:auto;">Bearbeiten</button>
                    </div>
                </div>
            `;
            listenElement.appendChild(li);
        });

        // Lösch-Buttons aktivieren
        document.querySelectorAll('.btn-loeschen').forEach((button) => {
            button.addEventListener('click', (e) => {
                const indexZumLoeschen = Number(e.currentTarget.getAttribute('data-index'));
                const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diese Fallakte weltweit zu löschen:');
                if (pwEingabe === LOESCH_PASSWORT) {
                    eintragLoeschen(indexZumLoeschen);
                } else if (pwEingabe !== null) {
                    alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                }
            });
        });

        // Bearbeiten-Buttons rechts neben Löschen aktivieren
        document.querySelectorAll('.btn-bearbeiten').forEach((button) => {
            button.addEventListener('click', (e) => {
                const indexZumBearbeiten = Number(e.currentTarget.getAttribute('data-index'));
                starteBearbeitung(indexZumBearbeiten);
            });
        });
    }

    async function datenLaden(zeigeLadeStatus = false) {
        if (istAmSpeichern) return;
        if (zeigeLadeStatus) setzeStatus('syncing', 'Synchronisiere mit Cloud...');

        try {
            const response = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': MASTER_KEY },
                cache: 'no-store'
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const resBody = await response.json();
            meinArchiv = extrahiereEintraege(resBody);
            localStorage.setItem('archivDatenBackup', JSON.stringify(meinArchiv));

            ansichtRendern();

            const uhrzeit = new Date().toLocaleTimeString('de-DE');
            setzeStatus('online', `Live verbunden (${meinArchiv.length} Akten • Stand: ${uhrzeit} Uhr)`);
        } catch (error) {
            console.error('Cloud-Ladefehler:', error);
            setzeStatus('error', 'Offline-Backup aktiv');
        }
    }

    async function speichereArchivInCloud(neuesArchiv) {
        const payload = neuesArchiv.length > 0 ? neuesArchiv : { eintraege: [] };
        const response = await fetch(DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
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

            const name = titelInput ? titelInput.value.trim() : '';
            const alias = aliasInput && aliasInput.value.trim() ? aliasInput.value.trim() : 'Fallakte';
            const opfer = opferInput ? (parseInt(opferInput.value, 10) || 1) : 1;
            const land = landInput && landInput.value.trim() ? landInput.value.trim() : 'Weltweit';
            const zeitraum = zeitraumInput && zeitraumInput.value.trim() ? zeitraumInput.value.trim() : new Date().toLocaleDateString('de-DE');
            const status = statusInput ? statusInput.value : 'Ungeklärt / Nie gefasst';

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
                const latestResp = await fetch(`${DATABASE_URL}/latest`, {
                    method: 'GET',
                    headers: { 'X-Master-Key': MASTER_KEY },
                    cache: 'no-store'
                });
                if (latestResp.ok) {
                    meinArchiv = extrahiereEintraege(await latestResp.json());
                }

                const aktualisierterEintrag = {
                    id: bearbeitungsIndex >= 0 && meinArchiv[bearbeitungsIndex] ? meinArchiv[bearbeitungsIndex].id : 'killer-' + Date.now(),
                    name: name,
                    alias: alias,
                    confirmedVictims: opfer,
                    suspectedVictims: bearbeitungsIndex >= 0 && meinArchiv[bearbeitungsIndex]?.suspectedVictims
                        ? meinArchiv[bearbeitungsIndex].suspectedVictims
                        : `${opfer}+`,
                    activePeriod: zeitraum,
                    country: land,
                    status: status,
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
                if (toggleFormBtn) toggleFormBtn.textContent = '+ Neue Fallakte anlegen';

                ansichtRendern(true);
                setzeStatus('online', bearbeitungsIndex >= 0
                    ? `Änderungen gespeichert! (${meinArchiv.length} Akten)`
                    : `Eintrag veröffentlicht! (${meinArchiv.length} Akten)`);
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
            const latestResp = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': MASTER_KEY },
                cache: 'no-store'
            });
            if (latestResp.ok) {
                meinArchiv = extrahiereEintraege(await latestResp.json());
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

    if (sucheInput) {
        sucheInput.addEventListener('input', (e) => {
            suchbegriff = e.target.value.trim().toLowerCase();
            ansichtRendern(true);
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => datenLaden(true));
    }

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') datenLaden(false);
    });

    datenLaden(true);
    setInterval(() => datenLaden(false), 5000);
});
