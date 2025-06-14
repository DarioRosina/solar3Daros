// Dati dei pianeti
const planetsData = [
    { 
        name: "Mercurio", 
        radius: 2, 
        distance: 10,
        revolution: 0.24, 
        rotation: 58.6, 
        color: "#C8C8C8", 
        info: {
            it: "Il pianeta più vicino al Sole. Completa un'orbita in 88 giorni terrestri.",
            en: "The closest planet to the Sun. Completes an orbit in 88 Earth days."
        },
        emissive: 0x222222
    },
    { 
        name: "Venere", 
        radius: 3.7, 
        distance: 18,
        revolution: 0.62, 
        rotation: 243, 
        color: "#E6BC6A", 
        info: {
            it: "Il pianeta più caldo del sistema solare con una temperatura superficiale di 462°C.",
            en: "The hottest planet in the solar system with a surface temperature of 462°C."
        },
        emissive: 0x5a3d1c
    },
    { 
        name: "Terra", 
        radius: 3.9, 
        distance: 26,
        revolution: 1, 
        rotation: 1, 
        color: "#6B93D6", 
        info: {
            it: "L'unico pianeta noto per sostenere la vita. Ha un satellite naturale, la Luna.",
            en: "The only known planet to support life. It has a natural satellite, the Moon."
        },
        emissive: 0x0a3a6b
    },
    { 
        name: "Marte", 
        radius: 2.1, 
        distance: 34,
        revolution: 1.88, 
        rotation: 1.03, 
        color: "#C1440E", 
        info: {
            it: "Chiamato il Pianeta Rosso per il suo colore caratteristico dovuto all'ossido di ferro.",
            en: "Called the Red Planet for its characteristic color due to iron oxide."
        },
        emissive: 0x4d1a0a
    },
    { 
        name: "Giove", 
        radius: 11, 
        distance: 82,
        revolution: 11.86, 
        rotation: 0.41, 
        color: "#C88B3A", 
        info: {
            it: "Il pianeta più grande del sistema solare. Ha una famosa tempesta chiamata Grande Macchia Rossa.",
            en: "The largest planet in the solar system. It has a famous storm called the Great Red Spot."
        },
        emissive: 0x5a3d1c
    },
    { 
        name: "Saturno", 
        radius: 9.5, 
        distance: 130,
        revolution: 29.46, 
        rotation: 0.44, 
        color: "#E3E0C0", 
        info: {
            it: "Noto per i suoi spettacolari anelli composti principalmente da ghiaccio e polvere.",
            en: "Known for its spectacular rings composed mainly of ice and dust."
        },
        emissive: 0x8f886d,
        hasRings: true
    },
    { 
        name: "Urano", 
        radius: 8.5, 
        distance: 178,
        revolution: 84.01, 
        rotation: 0.72, 
        color: "#C1E2E2", 
        info: {
            it: "Un gigante ghiacciato con una caratteristica inclinazione assiale di 98 gradi.",
            en: "An ice giant with a characteristic axial tilt of 98 degrees."
        },
        emissive: 0x2d5a5a
    },
    { 
        name: "Nettuno", 
        radius: 8.3, 
        distance: 226,
        revolution: 164.8, 
        rotation: 0.67, 
        color: "#5B5DDF", 
        info: {
            it: "Il pianeta più ventoso del sistema solare, con venti che superano i 2.000 km/h.",
            en: "The windiest planet in the solar system, with winds exceeding 2,000 km/h."
        },
        emissive: 0x1a1a66
    }
];

// Variabili globali pianeti
let planetObjects = [];
let selectedPlanet = null;