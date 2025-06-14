function importConfiguration() {
    const importJson = document.getElementById('importJson');
    const jsonText = importJson.textContent.trim();
    
    if (!jsonText) {
        const message = translations[currentLanguage].importError || 'Inserisci una configurazione JSON valida.';
        showCopyNotification(message, 'error');
        return;
    }
    
    try {
        const parameters = JSON.parse(jsonText);
        
        // Salva la configurazione importata per il reset
        lastImportedConfig = JSON.parse(JSON.stringify(parameters));
        
        // Ripristina i valori degli slider
        if (parameters.revolutionSpeed !== undefined) {
            revolutionSpeed = parameters.revolutionSpeed;
            document.getElementById('revolutionSlider').value = revolutionSpeed;
            document.getElementById('revolutionValue').textContent = revolutionSpeed.toFixed(1) + 'x';
        }
        
        if (parameters.rotationSpeed !== undefined) {
            rotationSpeed = parameters.rotationSpeed;
            document.getElementById('rotationSlider').value = rotationSpeed;
            document.getElementById('rotationValue').textContent = rotationSpeed.toFixed(1) + 'x';
        }
        
        if (parameters.planetScale !== undefined) {
            planetScale = parameters.planetScale;
            document.getElementById('sizeSlider').value = planetScale;
            document.getElementById('sizeValue').textContent = planetScale.toFixed(1) + 'x';
        }
        
        // Ripristina i dati dei pianeti se presenti
        if (parameters.planetsData) {
            parameters.planetsData.forEach((savedPlanet, index) => {
                if (planetsData[index]) {
                    planetsData[index].radius = savedPlanet.radius;
                    planetsData[index].distance = savedPlanet.distance;
                    planetsData[index].revolution = savedPlanet.revolution;
                    planetsData[index].rotation = savedPlanet.rotation;
                }
            });
        }
        
        // Ripristina gli oggetti pianeta se presenti
        if (parameters.planetObjects) {
            parameters.planetObjects.forEach((savedObj, index) => {
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
                    }
                }
            });
        }
        
        // Ripristina la posizione della camera se presente
        if (parameters.camera) {
            if (parameters.camera.position) {
                camera.position.set(
                    parameters.camera.position.x,
                    parameters.camera.position.y,
                    parameters.camera.position.z
                );
            }
            if (parameters.camera.target) {
                controls.target.set(
                    parameters.camera.target.x,
                    parameters.camera.target.y,
                    parameters.camera.target.z
                );
            }
            controls.update();
        }
        
        updatePlanetScale();

        // Mostra notifica di successo
        const message = translations[currentLanguage].importSuccess || 'Configurazione importata con successo!';
        showCopyNotification(message, 'success');
        
        closeImportModal();
        
    } catch (error) {
        console.error('Errore nel parsing JSON:', error);
        // Sostituisci alert con showCopyNotification
        const message = translations[currentLanguage].importError || 'Errore: La configurazione JSON non è valida. Controlla il formato e riprova.';
        showCopyNotification(message, 'error');
    }
}


function exportConfiguration() {
    // Calcola il timestamp con ora locale
    const now = new Date();
    const localTimestamp = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
    
    const parameters = {
        timestamp: localTimestamp,
        camera: {
            position: {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
            },
            target: {
                x: controls.target.x,
                y: controls.target.y,
                z: controls.target.z
            }
        },
        planetsData: planetsData.map(planet => ({
            name: planet.name,
            radius: planet.radius,
            distance: planet.distance,
            revolution: planet.revolution,
            rotation: planet.rotation,
            color: planet.color
        })),
        planetObjects: planetObjects.map(obj => ({
            name: obj.data.name,
            baseRevolutionSpeed: obj.baseRevolutionSpeed,
            baseRotationSpeed: obj.baseRotationSpeed,
            currentAngle: obj.currentAngle,
            individualRevolutionSpeed: obj.individualRevolutionSpeed || 1.0,
            individualRotationSpeed: obj.individualRotationSpeed || 1.0,
            scale: obj.mesh.scale.x
        }))
    };
    
    const jsonString = JSON.stringify(parameters, null, 2);
    const codeElement = document.getElementById('configJson');

    // Pulire il contenuto precedente
    codeElement.innerHTML = '';
    codeElement.textContent = jsonString;

    // Assicurarsi che la classe sia impostata correttamente
    codeElement.className = 'language-json'; 

    // Applica l'evidenziazione della sintassi
    Prism.highlightElement(codeElement);
    
    document.getElementById('exportModal').style.display = 'block';
}