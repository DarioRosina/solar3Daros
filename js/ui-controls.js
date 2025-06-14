// Gestione slider
const revolutionSlider = document.getElementById('revolutionSlider');
const rotationSlider = document.getElementById('rotationSlider');
const sizeSlider = document.getElementById('sizeSlider');
const revolutionValue = document.getElementById('revolutionValue');
const rotationValue = document.getElementById('rotationValue');
const sizeValue = document.getElementById('sizeValue');


// Funzione per aggiornare le informazioni del pianeta nel pannello info
function updatePlanetInfo(planetData) {
    const planetInfoElement = document.getElementById('planetInfo');
    planetInfoElement.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div class="planet-color" style="background-color: ${planetData.color}"></div>
            <h4 style="margin: 0;">${getTranslatedPlanetName(planetData.name)}</h4>
        </div>
        ${planetData.info[currentLanguage]}
    `;
}


// Creazione lista pianeti
function createPlanetList() {
    const planetList = document.getElementById('planetList');
    
    planetsData.forEach((planet, index) => {
        const planetItem = document.createElement('div');
        planetItem.classList.add('planet-item');
        planetItem.dataset.index = index;
        
        planetItem.innerHTML = `
            <div class="planet-color" style="background-color:${planet.color}"></div>
            <span>${planet.name}</span>
        `;
        
        planetItem.addEventListener('click', () => {
            // Rimuovi la classe selected da tutti gli elementi
            document.querySelectorAll('.planet-item.selected').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Seleziona questo pianeta
            planetItem.classList.add('selected');
            
            // Imposta pianeta selezionato
            selectedPlanet = planetObjects[index];
            controls.enableZoom = false;
            
            // Aggiunge classe al body per abilitare cursore pointer sui control-group
            document.body.classList.add('planet-selected');
            
            // Rimuovi la classe disabled da tutti i control-group (escluso quello della lista pianeti e controlli)
            document.querySelectorAll('.control-group').forEach(group => {
                if (!group.querySelector('#planetList') && group.id !== 'controlsGroup') {
                    group.classList.remove('disabled');
                }
            });
            
            // Abilita il controllo dimensione e aggiunge evidenziazione
            const sizeControlGroup = document.getElementById('sizeControlGroup');
            
            // Imposta il controllo dimensione come attivo per default
            activeMouseWheelControl = 'size';
            document.querySelectorAll('.control-group').forEach(group => {
                group.classList.remove('mouse-wheel-active');
            });
            sizeControlGroup.classList.add('mouse-wheel-active');
            
            // Aggiorna solo le informazioni del pianeta
            updatePlanetInfo(planet);                    
            // Reset degli slider ai valori centrali quando si seleziona un pianeta
            document.getElementById('revolutionSlider').value = 1.6;
            document.getElementById('revolutionValue').textContent = '1.6x';
            
            document.getElementById('rotationSlider').value = 1.6;
            document.getElementById('rotationValue').textContent = '1.6x';
            
            document.getElementById('sizeSlider').value = 1.3;
            document.getElementById('sizeValue').textContent = '1.3x';
            
            // Aggiorna le variabili globali ai valori centrali
            revolutionSpeed = 1.6;
            rotationSpeed = 1.6;
            planetScale = 0.35;
        });
        
        planetList.appendChild(planetItem);
    });
}


function deselectAllPlanets() {
    // Rimuovi la classe selected da tutti gli elementi
    document.querySelectorAll('.planet-item.selected').forEach(item => {
        item.classList.remove('selected');
    });

    // Disabilita tutti i controlli quando nessun pianeta è selezionato
    document.querySelectorAll('.control-group').forEach(group => {
        // Escludi il control-group che contiene la lista dei pianeti e quello dei controlli
        if (!group.contains(document.getElementById('planetList')) && 
            group.id !== 'controlsGroup') {
            group.classList.add('disabled');
        }
        group.classList.remove('mouse-wheel-active');
    });
    
    // Reset del controllo mouse wheel
    activeMouseWheelControl = 'size';
    
    // Resetta il pianeta selezionato
    selectedPlanet = null;
    controls.enableZoom = true;
    
    // Rimuove classe dal body per disabilitare cursore pointer sui control-group
    document.body.classList.remove('planet-selected');
    
    // Aggiorna le informazioni
    document.getElementById('planetInfo').textContent = "Nessun pianeta selezionato";
    
    // Reset degli slider ai valori centrali
    document.getElementById('revolutionSlider').value = 1.55;
    document.getElementById('revolutionValue').textContent = '1.6x';
    
    document.getElementById('rotationSlider').value = 1.55;
    document.getElementById('rotationValue').textContent = '1.6x';
    
    document.getElementById('sizeSlider').value = 1.25;
    document.getElementById('sizeValue').textContent = '1.3x';
    
    // Aggiorna le variabili globali ai valori centrali
    revolutionSpeed = 1.55;
    rotationSpeed = 1.55;
    planetScale = 0.35;
}

//  █     █    █    █     █ ██████  █       ███████ ██████  
//  █     █   █ █   ██    █ █     █ █       █       █     █ 
//  █     █  █   █  █ █   █ █     █ █       █       █     █ 
//  ███████ █     █ █  █  █ █     █ █       █████   ██████  
//  █     █ ███████ █   █ █ █     █ █       █       █   █   
//  █     █ █     █ █    ██ █     █ █       █       █    █  
//  █     █ █     █ █     █ ██████  ███████ ███████ █     █ 

// Inizializza tutti i controlli come disabilitati
document.querySelectorAll('.control-group').forEach(group => {
    // Escludi il control-group che contiene la lista dei pianeti e quello dei controlli
    if (!group.contains(document.getElementById('planetList')) && 
        group.id !== 'controlsGroup') {
        group.classList.add('disabled');
    }
});


// Event listeners per cambiare il controllo attivo del mouse wheel
document.getElementById('sizeControlGroup').addEventListener('click', () => {
    if (selectedPlanet) {
        activeMouseWheelControl = 'size';
        // Rimuovi evidenziazione da tutti i controlli
        document.querySelectorAll('.control-group').forEach(group => {
            group.classList.remove('mouse-wheel-active');
        });
        // Aggiungi evidenziazione al controllo attivo
        document.getElementById('sizeControlGroup').classList.add('mouse-wheel-active');
    }
});


// Trova il control-group che contiene il revolutionSlider
const revolutionControlGroup = document.getElementById('revolutionSlider').closest('.control-group');
revolutionControlGroup.addEventListener('click', () => {
    if (selectedPlanet) {
        activeMouseWheelControl = 'revolution';
        // Rimuovi evidenziazione da tutti i controlli
        document.querySelectorAll('.control-group').forEach(group => {
            group.classList.remove('mouse-wheel-active');
        });
        // Aggiungi evidenziazione al controllo attivo
        revolutionControlGroup.classList.add('mouse-wheel-active');
    }
});


// Trova il control-group che contiene il rotationSlider
const rotationControlGroup = document.getElementById('rotationSlider').closest('.control-group');
rotationControlGroup.addEventListener('click', () => {
    if (selectedPlanet) {
        activeMouseWheelControl = 'rotation';
        // Rimuovi evidenziazione da tutti i controlli
        document.querySelectorAll('.control-group').forEach(group => {
            group.classList.remove('mouse-wheel-active');
        });
        // Aggiungi evidenziazione al controllo attivo
        rotationControlGroup.classList.add('mouse-wheel-active');
    }
});


// Event listeners per Export e Import
document.getElementById('exportBtn').addEventListener('click', exportConfiguration);
document.getElementById('importBtn').addEventListener('click', openImportModal);


// Chiudi le modali cliccando fuori
window.onclick = function(event) {
    const exportModal = document.getElementById('exportModal');
    const importModal = document.getElementById('importModal');
    
    if (event.target === exportModal) {
        closeExportModal();
    }
    if (event.target === importModal) {
        closeImportModal();
    }
} 


revolutionSlider.addEventListener('input', () => {
    if (selectedPlanet) {
        revolutionSpeed = parseFloat(revolutionSlider.value);
        revolutionValue.textContent = `${revolutionSpeed.toFixed(1)}x`;
        updatePlanetRevolution();
    }
});


rotationSlider.addEventListener('input', () => {
    if (selectedPlanet) {
        rotationSpeed = parseFloat(rotationSlider.value);
        rotationValue.textContent = `${rotationSpeed.toFixed(1)}x`;
        updatePlanetRotation();
    }
});


sizeSlider.addEventListener('input', () => {
    if (selectedPlanet) {
        planetScale = parseFloat(sizeSlider.value);
        sizeValue.textContent = `${planetScale.toFixed(1)}x`;
        updatePlanetScale();
    }
});


// Gestione pulsanti
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Riprendi" : "Pausa";
});


resetBtn.addEventListener('click', () => {
    if (lastImportedConfig) {
        // Se c'è una configurazione importata, ripristinala
        
        // Ripristina slider ai valori importati
        if (lastImportedConfig.revolutionSpeed !== undefined) {
            revolutionSlider.value = lastImportedConfig.revolutionSpeed;
            revolutionSpeed = lastImportedConfig.revolutionSpeed;
            revolutionValue.textContent = lastImportedConfig.revolutionSpeed.toFixed(1) + "x";
        } else {
            revolutionSlider.value = 1.0;
            revolutionSpeed = 1.0;
            revolutionValue.textContent = "1.0x";
        }
        
        if (lastImportedConfig.rotationSpeed !== undefined) {
            rotationSlider.value = lastImportedConfig.rotationSpeed;
            rotationSpeed = lastImportedConfig.rotationSpeed;
            rotationValue.textContent = lastImportedConfig.rotationSpeed.toFixed(1) + "x";
        } else {
            rotationSlider.value = 1.0;
            rotationSpeed = 1.0;
            rotationValue.textContent = "1.0x";
        }
        
        if (lastImportedConfig.planetScale !== undefined) {
            sizeSlider.value = lastImportedConfig.planetScale;
            sizeValue.textContent = lastImportedConfig.planetScale.toFixed(1) + "x";
        } else {
            sizeSlider.value = 1.0;
            sizeValue.textContent = "1.0x";
        }
        
        // Ripristina i dati dei pianeti se presenti
        if (lastImportedConfig.planetsData) {
            lastImportedConfig.planetsData.forEach((savedPlanet, index) => {
                if (planetsData[index]) {
                    planetsData[index].radius = savedPlanet.radius;
                    planetsData[index].distance = savedPlanet.distance;
                    planetsData[index].revolution = savedPlanet.revolution;
                    planetsData[index].rotation = savedPlanet.rotation;
                }
            });
        }
        
        // Ripristina gli oggetti pianeta se presenti
        if (lastImportedConfig.planetObjects) {
            lastImportedConfig.planetObjects.forEach((savedObj, index) => {
                if (planetObjects[index]) {
                    planetObjects[index].baseRevolutionSpeed = savedObj.baseRevolutionSpeed;
                    planetObjects[index].baseRotationSpeed = savedObj.baseRotationSpeed;
                    planetObjects[index].currentAngle = savedObj.currentAngle;
                    
                    if (savedObj.individualRevolutionSpeed !== undefined) {
                        planetObjects[index].individualRevolutionSpeed = savedObj.individualRevolutionSpeed;
                    }
                    if (savedObj.individualRotationSpeed !== undefined) {
                        planetObjects[index].individualRotationSpeed = savedObj.individualRotationSpeed;
                    }
                    
                    if (savedObj.scale !== undefined) {
                        planetObjects[index].mesh.scale.set(savedObj.scale, savedObj.scale, savedObj.scale);
                        planetObjects[index].savedIndividualScale = true;
                    } else {
                        planetObjects[index].mesh.scale.set(1, 1, 1);
                    }
                }
            });
        } else {
            // Se non ci sono dati salvati per i pianeti, ripristina le dimensioni di default
            planetObjects.forEach(planetObj => {
                planetObj.mesh.scale.set(1, 1, 1);
            });
        }
        
        // Ripristina la posizione della camera se presente
        if (lastImportedConfig.camera) {
            if (lastImportedConfig.camera.position) {
                camera.position.set(
                    lastImportedConfig.camera.position.x,
                    lastImportedConfig.camera.position.y,
                    lastImportedConfig.camera.position.z
                );
            }
            if (lastImportedConfig.camera.target) {
                controls.target.set(
                    lastImportedConfig.camera.target.x,
                    lastImportedConfig.camera.target.y,
                    lastImportedConfig.camera.target.z
                );
            }
            controls.update();
        } else {
            // Se non c'è una camera salvata, usa la vista di default
            resetCameraView();
        }
        
    } else {
        // Se non c'è una configurazione importata, usa i valori di default
        revolutionSlider.value = 1.0;
        rotationSlider.value = 1.0;
        sizeSlider.value = 1.0;
        
        revolutionSpeed = 1.0;
        rotationSpeed = 1.0;
        
        revolutionValue.textContent = "1.0x";
        rotationValue.textContent = "1.0x";
        sizeValue.textContent = "1.0x";
        
        // Ripristina dimensioni pianeti
        planetObjects.forEach(planetObj => {
            planetObj.mesh.scale.set(1, 1, 1);
        });
        
        // Ripristina camera
        resetCameraView();
    }
    
    // Ripristina stato di pausa
    if (isPaused) {
        isPaused = false;
        pauseBtn.textContent = "Pausa";
    }
    
    // Deseleziona pianeta e disabilita controlli
    deselectAllPlanets();
    
    updatePlanetScale();
});


document.querySelectorAll('.language-flag').forEach(flag => {
    flag.addEventListener('click', () => {
        const lang = flag.getAttribute('data-lang');
        translatePage(lang);
    });
});


// Aggiungi event listener per evidenziare il JSON mentre viene digitato
const importJson = document.getElementById('importJson');
if (importJson) {
    let inputListenerEnabled = true;
    
    function handleInput() {
        if (!inputListenerEnabled) return;
        
        // Salva la posizione del cursore
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        let cursorOffset = 0;
        
        if (range) {
            // Calcola l'offset del cursore dal testo
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(importJson);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            cursorOffset = preCaretRange.toString().length;
        }
        
        // Applica evidenziazione Prism.js in tempo reale
        setTimeout(() => {
            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(importJson);
                
                // Ripristina la posizione del cursore
                if (cursorOffset > 0) {
                    const textNodes = [];
                    const walker = document.createTreeWalker(
                        importJson,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );
                    
                    let node;
                    while (node = walker.nextNode()) {
                        textNodes.push(node);
                    }
                    
                    let currentOffset = 0;
                    for (let i = 0; i < textNodes.length; i++) {
                        const nodeLength = textNodes[i].textContent.length;
                        if (currentOffset + nodeLength >= cursorOffset) {
                            const range = document.createRange();
                            const selection = window.getSelection();
                            const offsetInNode = cursorOffset - currentOffset;
                            
                            range.setStart(textNodes[i], Math.min(offsetInNode, nodeLength));
                            range.collapse(true);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            break;
                        }
                        currentOffset += nodeLength;
                    }
                }
            }
        }, 100);
    }
    
    importJson.addEventListener('input', handleInput);
    
    importJson.addEventListener('paste', function(e) {
        // Disabilita temporaneamente il listener INPUT
        inputListenerEnabled = false;
        
        // Permetti il comportamento predefinito del paste
        // Il testo verrà incollato mantenendo la formattazione originale
        
        // Riabilita il listener INPUT e applica l'evidenziazione dopo un breve ritardo
        setTimeout(() => {
            inputListenerEnabled = true;
            
            // Applica evidenziazione Prism.js dopo l'incolla
            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(importJson);
            }
        }, 200);
    });
}


// Funzione per gestire il movimento del mouse
function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetObjects.map(obj => obj.mesh));
    
    // Cambia il cursore quando si passa sopra un pianeta
    if (intersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
    } else {
        renderer.domElement.style.cursor = 'default';
    }
}


// Funzione per gestire la rotella del mouse
function onMouseWheel(event) {
    if (selectedPlanet) {
        event.preventDefault();
        event.stopPropagation();
        
        if (activeMouseWheelControl === 'size') {
            // Controllo dimensione (comportamento attuale)
            const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
            const currentScale = selectedPlanet.mesh.scale.x;
            const newScale = currentScale * scaleFactor;
            
            selectedPlanet.mesh.scale.set(newScale, newScale, newScale);
            
            // Aggiorna lo slider delle dimensioni
            let sliderValue;
            if (newScale >= 0.5 && newScale <= 2.0) {
                sliderValue = newScale;
            } else {
                sliderValue = Math.max(0.5, Math.min(2.0, newScale));
            }
            
            document.getElementById('sizeSlider').value = sliderValue;
            document.getElementById('sizeValue').textContent = `${newScale.toFixed(1)}x`;
            
        } else if (activeMouseWheelControl === 'revolution') {
            // Controllo velocità di rivoluzione
            const speedFactor = event.deltaY > 0 ? 0.9 : 1.1;
            const currentSpeed = revolutionSpeed;
            const newSpeed = Math.max(0, currentSpeed * speedFactor);
            
            revolutionSpeed = newSpeed;
            selectedPlanet.individualRevolutionSpeed = newSpeed;
            
            // Aggiorna lo slider della rivoluzione
            let sliderValue = Math.max(0, Math.min(100, newSpeed));
            document.getElementById('revolutionSlider').value = sliderValue;
            document.getElementById('revolutionValue').textContent = `${newSpeed.toFixed(1)}x`;
            
        } else if (activeMouseWheelControl === 'rotation') {
            // Controllo velocità di rotazione
            const speedFactor = event.deltaY > 0 ? 0.9 : 1.1;
            const currentSpeed = rotationSpeed;
            const newSpeed = Math.max(0, currentSpeed * speedFactor);
            
            rotationSpeed = newSpeed;
            selectedPlanet.individualRotationSpeed = newSpeed;
            
            // Aggiorna lo slider della rotazione
            let sliderValue = Math.max(0, Math.min(100, newSpeed));
            document.getElementById('rotationSlider').value = sliderValue;
            document.getElementById('rotationValue').textContent = `${newSpeed.toFixed(1)}x`;
        }
        
        return false;
    }
}


// Funzione per gestire il click del mouse
function onMouseClick(event) {
    // Calcola la posizione del mouse normalizzata (-1 a +1)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Aggiorna il raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Trova gli oggetti intersecati
    const intersects = raycaster.intersectObjects(planetObjects.map(obj => obj.mesh));
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const planetIndex = planetObjects.findIndex(planet => planet.mesh === clickedObject);
        
        if (planetIndex !== -1) {
            // Rimuovi la classe selected da tutti gli elementi
            document.querySelectorAll('.planet-item.selected').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Seleziona il pianeta corrispondente nella lista
            const planetItems = document.querySelectorAll('.planet-item');
            if (planetItems[planetIndex]) {
                planetItems[planetIndex].classList.add('selected');
            }
            
            selectedPlanet = planetObjects[planetIndex];
            controls.enableZoom = false;
            
            // Aggiunge classe al body per abilitare cursore pointer sui control-group
            document.body.classList.add('planet-selected');
            
            // Rimuovi la classe disabled da tutti i control-group (escluso quello della lista pianeti e controlli)
            document.querySelectorAll('.control-group').forEach(group => {
                if (!group.querySelector('#planetList') && group.id !== 'controlsGroup') {
                    group.classList.remove('disabled');
                }
            });
            
            // Abilita il controllo dimensione e aggiunge evidenziazione
            const sizeControlGroup = document.getElementById('sizeControlGroup');
            
            // Imposta il controllo dimensione come attivo per default
            activeMouseWheelControl = 'size';
            document.querySelectorAll('.control-group').forEach(group => {
                group.classList.remove('mouse-wheel-active');
            });
            sizeControlGroup.classList.add('mouse-wheel-active');
            
            // Aggiorna solo le informazioni del pianeta
            const planetData = planetsData[planetIndex];
            updatePlanetInfo(planetData);
            
            // Reset degli slider ai valori centrali quando si seleziona un pianeta
            document.getElementById('revolutionSlider').value = 1.55;
            document.getElementById('revolutionValue').textContent = '1.6x';
            
            document.getElementById('rotationSlider').value = 1.55;
            document.getElementById('rotationValue').textContent = '1.6x';
            
            document.getElementById('sizeSlider').value = 1.25;
            document.getElementById('sizeValue').textContent = '1.3x';
            
            // Aggiorna le variabili globali ai valori centrali
            revolutionSpeed = 1.55;
            rotationSpeed = 1.55;
            planetScale = 0.35;
        }
    } else {
        // Click nello spazio vuoto - deseleziona tutto
        deselectAllPlanets();
    }
}


// Inizializzazione
createStars();
initThreeJS();
createPlanetList();
// Initialize language selector
translatePage(currentLanguage);

// Verifica che planetObjects sia popolato prima di iniziare l'animazione
//console.log('planetObjects length:', planetObjects.length);
animate();

// Seleziona automaticamente la Terra
setTimeout(() => { document.querySelector(`.planet-item[data-index="2"]`).click(); }, 1000);