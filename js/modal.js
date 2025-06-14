// Funzioni per gestire le modali
function openImportModal() {
    document.getElementById('importModal').style.display = 'block';
    // Pulisci il contenuto precedente
    const importJson = document.getElementById('importJson');
    importJson.textContent = '';
    importJson.focus();
}


function closeExportModal() {
    document.getElementById('exportModal').style.display = 'none';
}


function closeImportModal() {
    document.getElementById('importModal').style.display = 'none';
    document.getElementById('importJson').textContent = '';
}


function copyToClipboard(event) {
    const configText = document.getElementById('configJson');
    const textToCopy = configText.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(function() {
        const button = event.target;
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;
        
        button.textContent = '✓ Copiato!';
        button.style.backgroundColor = '#00ff88';
        button.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.6)';
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'all 0.3s ease';
        
        // Usa la traduzione dinamica
        const message = translations[currentLanguage].copySuccess;
        showCopyNotification(message, 'success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBg || '#4CAF50';
            button.style.boxShadow = 'none';
            button.style.transform = 'scale(1)';
        }, 2000);
    }).catch(function(err) {
        console.error('Errore nella copia: ', err);
        
        // Fallback e gestione errore
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = '✓ Copiato!';
        button.style.backgroundColor = '#00ff88';
        
        const message = translations[currentLanguage].copySuccess;
        showCopyNotification(message, 'success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#4CAF50';
        }, 2000);
    });
}


// Funzione per mostrare notifiche toast
function showCopyNotification(message, type = 'success') {
    // Rimuovi notifiche esistenti
    const existingToast = document.querySelector('.copy-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Crea la notifica
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    
    // Stili per la notifica
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        backgroundColor: type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(255, 107, 107, 0.9)',
        color: '#000',
        borderRadius: '8px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        boxShadow: '0 4px 20px rgba(0, 255, 136, 0.4)',
        border: '1px solid rgba(0, 255, 136, 0.6)',
        backdropFilter: 'blur(10px)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Aggiungi al DOM
    document.body.appendChild(toast);
    
    // Animazione di entrata
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Rimozione automatica dopo 3 secondi
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}        


function downloadJSON() {
    const configText = document.getElementById('configJson').textContent;
    const blob = new Blob([configText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, '-');
    a.download = `solar-system-config-${localDateTime}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}