// Variabili globali
let currentLanguage = 'en';

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let activeMouseWheelControl = 'size'; // 'size' o 'revolution'
let isPaused = false;

// Variabili globali per salvare l'ultima configurazione importata
let lastImportedConfig = null;

// Translation system
const translations = {
    it: {
        title: "Sistema Solare 3D Interattivo",
        subtitle: "Esplora il sistema solare in 3D con animazioni realistiche",
        controlPanel: "Pannello di Controllo",
        planets: "Pianeti",
        planetSize: "Dimensione Pianeta",
        small: "Piccolo",
        large: "Grande",
        revolutionSpeed: "Velocità di Rivoluzione",
        rotationSpeed: "Velocità di Rotazione",
        slow: "Lento",
        fast: "Veloce",
        controls: "Controlli",
        pause: "Pausa",
        resume: "Riprendi",
        reset: "Ripristina",
        export: "📤 Esporta",
        import: "📥 Importa",
        importBtn: "Importa",
        resetView: "Reset Vista",
        planetInfo: "Informazioni Pianeta",
        selectPlanet: "Seleziona un pianeta per visualizzare le informazioni",
        exportConfig: "Esporta Configurazione",
        importConfig: "Importa Configurazione",
        exportInstructions: "Copia la configurazione JSON sottostante e salvala in un file per importarla successivamente:",
        importInstructions: "Incolla la configurazione JSON che hai precedentemente esportato:",
        copyToClipboard: "Copia negli Appunti",
        downloadJSON: "Scarica JSON",
        cancel: "Annulla",
        copySuccess: "Configurazione copiata negli appunti!",
        copyError: "Errore durante la copia negli appunti",
        importSuccess: "Configurazione importata con successo!",
        importError: "Configurazione JSON non valida. Controlla il formato."
    },
    en: {
        title: "Interactive 3D Solar System",
        subtitle: "Explore the solar system in 3D with realistic animations",
        controlPanel: "Control Panel",
        planets: "Planets",
        planetSize: "Planet Size",
        small: "Small",
        large: "Large",
        revolutionSpeed: "Revolution Speed",
        rotationSpeed: "Rotation Speed",
        slow: "Slow",
        fast: "Fast",
        controls: "Controls",
        pause: "Pause",
        resume: "Resume",
        reset: "Reset",
        export: "📤 Export",
        import: "📥 Import",
        importBtn: "Import",
        resetView: "Reset View",
        planetInfo: "Planet Information",
        selectPlanet: "Select a planet to view information",
        exportConfig: "Export Configuration",
        importConfig: "Import Configuration",
        exportInstructions: "Copy the JSON configuration below and save it to a file for later import:",
        importInstructions: "Paste the JSON configuration you previously exported:",
        copyToClipboard: "Copy to Clipboard",
        downloadJSON: "Download JSON",
        cancel: "Cancel",
        copySuccess: "Configuration copied to clipboard!",
        copyError: "Error copying to clipboard",
        importSuccess: "Configuration imported successfully!",
        importError: "Invalid JSON configuration. Please check the format."
    }
};


// Traduzioni pianeti come variabile globale
const planetTranslations = {
    it: {
        "Mercury": "Mercurio",
        "Venus": "Venere",
        "Earth": "Terra",
        "Mars": "Marte",
        "Jupiter": "Giove",
        "Saturn": "Saturno",
        "Uranus": "Urano",
        "Neptune": "Nettuno"
    },
    en: {
        "Mercurio": "Mercury",
        "Venere": "Venus",
        "Terra": "Earth",
        "Marte": "Mars",
        "Giove": "Jupiter",
        "Saturno": "Saturn",
        "Urano": "Uranus",
        "Nettuno": "Neptune"
    }
};


function translatePage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update language flags
    document.querySelectorAll('.language-flag').forEach(flag => {
        flag.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update planet data translations
    updatePlanetTranslations();

    // Update selected planet info if a planet is currently selected
    if (selectedPlanet && selectedPlanet.data && selectedPlanet.data.name) {
        const planetData = planetsData.find(p => p.name === selectedPlanet.data.name);
        if (planetData) {
            updatePlanetInfo(planetData);
        }
    }
}


function updatePlanetTranslations() {
    // Update planet names in the list
    document.querySelectorAll('.planet-item').forEach(item => {
        const planetIndex = parseInt(item.dataset.index);
        const originalPlanetName = planetsData[planetIndex].name;
        const translatedName = getTranslatedPlanetName(originalPlanetName);
        item.querySelector('span').textContent = translatedName;
    });
}


// Funzione helper per ottenere il nome tradotto
function getTranslatedPlanetName(planetName) {
    return planetTranslations[currentLanguage] && planetTranslations[currentLanguage][planetName] 
        ? planetTranslations[currentLanguage][planetName] 
        : planetName;
}
