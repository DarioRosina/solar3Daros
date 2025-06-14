// Variabili Three.js
let scene, renderer;
let revolutionSpeed = 1.0;
let rotationSpeed = 1.0;
let planetScale = 0.35;

// Inizializzazione Three.js
function initThreeJS() {
    // Creazione scena
    scene = new THREE.Scene();
    
    // Creazione camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 150); // Aumentato da (0, 30, 100)
    
    // Creazione renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(document.getElementById('solarSystem').clientWidth, document.getElementById('solarSystem').clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('solarSystem').appendChild(renderer.domElement);
    
    // Controlli
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 30;
    controls.maxDistance = 200;
    
    // Inizializza mouse e raycaster
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    
    // Aggiungi l'event listener per il click del mouse
    renderer.domElement.addEventListener('click', onMouseClick, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    
    // Aggiungi l'event listener per la rotella del mouse
    renderer.domElement.addEventListener('wheel', onMouseWheel, false);
    
    // Luce ambiente
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    // Luce direzionale (sole)
    const sunLight = new THREE.PointLight(0xffffff, 1.5, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // Creazione sole
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32); // Ridotto da 6 a 5
    const sunMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffff00,
        emissive: 0xffaa00,
        emissiveIntensity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Effetto bagliore per il sole
    const sunGlowGeometry = new THREE.SphereGeometry(7, 32, 32); // Ridotto da 8 a 7
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff8800,
        transparent: true,
        opacity: 0.3
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);
    
    // Creazione pianeti
    createPlanets();
    updatePlanetScale(); 
    // Gestione resize
    window.addEventListener('resize', onWindowResize);
}

// Creazione stelle
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posizione casuale
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Dimensione casuale
        const size = Math.random() * 3;
        
        // Durata animazione casuale
        const duration = 2 + Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

// Animazione
function animate() {
    if (!isPaused) {
        planetObjects.forEach(planetObj => {
            if (planetObj.individualRevolutionSpeed === undefined) {
                planetObj.individualRevolutionSpeed = 1.0;
            }
            if (planetObj.individualRotationSpeed === undefined) {
                planetObj.individualRotationSpeed = 1.0;
            }
            
            // Rivoluzione orbitale - ora usa la velocità individuale
            planetObj.currentAngle += planetObj.baseRevolutionSpeed * planetObj.individualRevolutionSpeed;
            
            // Calcola la nuova posizione orbitale
            const distance = planetObj.data.distance;
            planetObj.group.position.x = Math.cos(planetObj.currentAngle) * distance;
            planetObj.group.position.z = Math.sin(planetObj.currentAngle) * distance;
            
            // Rotazione attorno al proprio asse - ora usa la velocità individuale
            planetObj.mesh.rotation.y += planetObj.baseRotationSpeed * planetObj.individualRotationSpeed;
        });
    }
    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function createPlanets() {
    // Definizione delle velocità di rotazione per ogni pianeta (da Mercurio a Nettuno)
    const rotationSpeeds = [0.1, 0.08, 0.05, 0.04, 0.15, 0.12, 0.09, 0.08]; // Mercury to Neptune

    planetsData.forEach((planetData, index) => {
        // Gruppo per il pianeta (per la rivoluzione)
        const planetGroup = new THREE.Group();
        
        // Posizione iniziale casuale per evitare allineamento
        const initialAngle = Math.random() * Math.PI * 2;
        
        // Calcola velocità individuali basate sui dati reali
        const baseRevolutionSpeed = 0.02 / planetData.revolution;
        const baseRotationSpeed = rotationSpeeds[index] || 0.01;
        
        // Sfera del pianeta con texture per rendere visibile la rotazione
        const planetGeometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
        
        // Crea una texture procedurale con pattern
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        
        // Sfondo del colore del pianeta
        context.fillStyle = planetData.color;
        context.fillRect(0, 0, 256, 128);
        
        // Aggiungi linee verticali per rendere visibile la rotazione
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2;
        context.globalAlpha = 0.3;
        for (let i = 0; i < 256; i += 32) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, 128);
            context.stroke();
        }
        
        // Aggiungi alcune macchie casuali
        context.fillStyle = '#000000';
        context.globalAlpha = 0.2;
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 128;
            const radius = Math.random() * 10 + 5;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        const planetMaterial = new THREE.MeshPhongMaterial({ 
            map: texture,
            emissive: planetData.emissive || 0x000000,
            shininess: 30
        });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        
        // Anelli per Saturno
        if (planetData.hasRings) {
            const ringGeometry = new THREE.RingGeometry(planetData.radius * 1.5, planetData.radius * 2.2, 64);
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: 0xddddbb,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 3;
            planet.add(ring);
        }
        
        planetGroup.add(planet);
        
        // Posiziona il pianeta con angolo iniziale casuale
        planetGroup.position.x = Math.cos(initialAngle) * planetData.distance;
        planetGroup.position.z = Math.sin(initialAngle) * planetData.distance;
        planetGroup.rotation.y = initialAngle;
        
        scene.add(planetGroup);
        
        // Debug temporaneo
        //console.log(`${planetData.name} posizionato a distanza ${planetData.distance}, raggio ${planetData.radius}`);
        const orbitGeometry = new THREE.RingGeometry(planetData.distance - 0.1, planetData.distance + 0.1, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x4488ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
        
        // Salva oggetto pianeta per animazioni - VERSIONE CORRETTA
        planetObjects.push({
            group: planetGroup,
            mesh: planet,
            data: planetData,
            baseRevolutionSpeed: baseRevolutionSpeed,
            baseRotationSpeed: baseRotationSpeed,
            individualRevolutionSpeed: 1.0, // Aggiunta proprietà individuale
            individualRotationSpeed: 1.0, // Aggiunta proprietà individuale per rotazione
            currentAngle: initialAngle  // Memorizza l'angolo corrente
        });
        
        //console.log(`${planetData.name}: Rev=${baseRevolutionSpeed.toFixed(6)}, Rot=${baseRotationSpeed.toFixed(6)}`);
    });
}


function onWindowResize() {
    camera.aspect = document.getElementById('solarSystem').clientWidth / document.getElementById('solarSystem').clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('solarSystem').clientWidth, document.getElementById('solarSystem').clientHeight);
}


function updatePlanetScale() {
    if (selectedPlanet) {
        selectedPlanet.mesh.scale.set(planetScale, planetScale, planetScale);
    } else {
        // Applica a tutti i pianeti quando nessuno è selezionato
        // Ma solo se non hanno una scala individuale salvata
        planetObjects.forEach(planetObj => {
            // Controlla se il pianeta ha una scala individuale salvata
            if (!planetObj.savedIndividualScale) {
                planetObj.mesh.scale.set(planetScale, planetScale, planetScale);
            }
        });
    }
}   


function updatePlanetRevolution() {
    if (selectedPlanet) {
        // Applica solo al pianeta selezionato
        selectedPlanet.individualRevolutionSpeed = revolutionSpeed;
    }
    // Rimosso il controllo globale quando nessun pianeta è selezionato
}


function updatePlanetRotation() {
    if (selectedPlanet) {
        // Applica solo al pianeta selezionato
        selectedPlanet.individualRotationSpeed = rotationSpeed;
    }
    // Rimosso il controllo globale quando nessun pianeta è selezionato
}

