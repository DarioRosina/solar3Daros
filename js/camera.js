// Variabili camera
let camera, controls;

function resetCameraView() {
    // Se c'è una configurazione importata con dati della camera, usala
    if (lastImportedConfig && lastImportedConfig.camera) {
        if (lastImportedConfig.camera.position) {
            camera.position.set(
                lastImportedConfig.camera.position.x,
                lastImportedConfig.camera.position.y,
                lastImportedConfig.camera.position.z
            );
        } else {
            // Se non c'è una posizione salvata, usa quella di default
            camera.position.set(0, 50, 150);
        }
        
        if (lastImportedConfig.camera.target) {
            controls.target.set(
                lastImportedConfig.camera.target.x,
                lastImportedConfig.camera.target.y,
                lastImportedConfig.camera.target.z
            );
        } else {
            // Se non c'è un target salvato, usa quello di default
            controls.target.set(0, 0, 0);
        }
    } else {
        // Se non c'è una configurazione importata, usa i valori di default
        camera.position.set(0, 50, 150);
        controls.target.set(0, 0, 0);
    }
    
    controls.update();
}