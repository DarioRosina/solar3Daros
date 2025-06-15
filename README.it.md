Benvenuto nel progetto!  
🔗 [English version (README.md)](README.md)

# 🌌 Sistema Solare 3D Interattivo
> Un'esperienza immersiva per esplorare il sistema solare in 3D con animazioni realistiche e controlli interattivi.

## 🎬 Demo

**Demo Online:** Prova la versione live qui: [https://solar3-daros.vercel.app/](https://solar3-daros.vercel.app/)

![Anteprima Interfaccia solar3Daros](screenshot/previewInterface_002.gif)

## 🚀 Caratteristiche Principali

### 🌍 Visualizzazione 3D Realistica

- **Rendering 3D avanzato** con Three.js
- **Animazioni fluide** di rivoluzione e rotazione planetaria
- **Effetto stelle** di sfondo per un'atmosfera spaziale
- **Controlli camera** OrbitControls per navigazione libera

### 🎮 Controlli Interattivi

- **Selezione pianeti** tramite click
- **Slider dinamici** per controllare:
  - 📏 Dimensioni dei pianeti (0.5x - 2.0x)
  - 🌎 Velocità di rivoluzione (0x - 100x)
  - 🔄 Velocità di rotazione (0x - 100x)
- **Controllo mouse wheel** per regolazioni rapide
- **Pausa/Riprendi** mette in pausa o riprende le animazioni
- **Reset** ripristina configurazione
- **Reset View** ripristina configurazione della vista camera

### 🌐 Sistema Multilingue

- **Italiano** 🇮🇹
- **English** 🇬🇧

### 💾 Import/Export Configurazioni

- **Esportazione JSON** delle configurazioni personalizzate
- **Importazione** configurazioni salvate
- **Download automatico** file JSON
- **Copia negli appunti** con un click
- **Syntax highlighting** per JSON con Prism.js

### 📊 Informazioni Planetarie

- **Pannello informativo** dettagliato per ogni pianeta
- **Dati scientifici** accurati
- **Colori realistici** per ogni corpo celeste
- **Effetti emissivi** per simulare l'illuminazione

## 📝 Note di Design

1. Al caricamento della pagina **le dimensioni dei pianeti** vengono scalate mantenendo le proporzioni rispetto alla Terra.

2. Per rendere l'applicazione più gradevole visivamente, alcune proporzioni relative alle distanze come quelle tra **Giove e i pianeti più esterni del Sistema Solare** non sono state rispettate. Per lo stesso motivo, al **Sole** non è stata applicata né la dimensione né la distanza reale.

3. **Gli anelli di Saturno** non oscillano realmente in questo modo ma l'effetto è stato inserito per aggiungere un tocco più divertente al progetto.

## 🛠️ Tecnologie Utilizzate

- **Three.js** (v0.140.0) - Rendering 3D
- **OrbitControls** - Controlli camera
- **Prism.js** - Syntax highlighting JSON
- **CSS3** - Animazioni e styling moderno
- **Vanilla JavaScript** - Logica applicativa
- **HTML5** - Struttura semantica

## 🏗️ Architettura del Progetto
```
solar3daros/
├── index.html              # Pagina principale
├── css/                    # Fogli di stile
│   ├── main.css                # Stili principali
│   ├── controls.css            # Stili controlli UI
│   ├── planets.css             # Stili lista pianeti
│   ├── modal.css               # Stili modali
│   └── json.css                # Stili syntax highlighting
├── js/                     # Moduli JavaScript
│   ├── config.js               # Configurazioni e traduzioni
│   ├── planets-data.js         # Dati scientifici pianeti
│   ├── solar-system.js         # Logica rendering 3D
│   ├── ui-controls.js          # Gestione interfaccia utente
│   ├── camera.js               # Controlli camera
│   ├── import-export.js        # Funzionalità I/O
│   └── modal.js                # Gestione modali
```


## 🎯 Funzionalità Avanzate

### 🎨 Personalizzazione Visiva

- **Scaling individuale** dei pianeti
- **Controllo velocità** indipendente per ogni pianeta
- **Evidenziazione hover** sui pianeti
- **Cursore dinamico** che cambia su elementi interattivi

### ⚡ Performance

- **Rendering ottimizzato** con requestAnimationFrame
- **Gestione memoria** efficiente
- **Responsive design** per tutti i dispositivi
- **Caricamento asincrono** delle risorse

### 🔧 Configurabilità

- **Salvataggio stato** completo dell'applicazione
- **Ripristino configurazioni** personalizzate
- **Validazione JSON** robusta
- **Notifiche utente** per feedback immediato

## 🚀 Come Iniziare

1. **Clona il repository**
2. **Apri `index.html`** in un browser moderno
3. **Esplora il sistema solare** cliccando sui pianeti
4. **Personalizza** le impostazioni con i controlli
5. **Salva** le tue configurazioni preferite

## 🎮 Controlli

| Azione | Controllo |
|--------|----------|
| **Ruota vista** | Click + Drag |
| **Zoom** | Mouse Wheel (quando nessun pianeta è selezionato) |
| **Seleziona pianeta** | Click sul pianeta (o sul nome del pianeta) |
| **Modifica proprietà** | Mouse Wheel (quando pianeta selezionato) |
| **Pausa/Riprendi** | Pulsante Pausa |
| **Reset** | Pulsante Ripristina |
| **Reset view** | Pulsante per il ripristino della visuale  |

## 📱 Compatibilità

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- 📱 **Mobile** responsive

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di:
- 🐛 Segnalare bug
- 💡 Proporre nuove funzionalità
- 🔧 Migliorare il codice
- 📖 Migliorare la documentazione

## 👨‍💻 Autore

**GitHub:** [daros](https://github.com/dariorosina)

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

---

**Sviluppato con ❤️**