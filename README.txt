README - Avvio del Progetto “Pasticceria”

Questa guida illustra i passaggi necessari per eseguire correttamente il sito web della Pasticceria in locale.

────────────────────────────────────────────────────────────
1) Clonare la repository
────────────────────────────────────────────────────────────
Clona il progetto tramite Git o scaricalo come file .zip ed estrailo.

Con Git:
    git clone https://github.com/C-Pascale/pasticceria

────────────────────────────────────────────────────────────
2) Installare Node.js (se non già presente)
────────────────────────────────────────────────────────────
Verifica l’installazione aprendo un terminale e digitando:

    node -v

Se non ottieni una versione, installa Node.js.  
È disponibile un file di installazione all’interno della cartella `Appoggio`.

────────────────────────────────────────────────────────────
3) Installare JSON Server
────────────────────────────────────────────────────────────
Apri il terminale ed esegui il comando:

    npm install -g json-server

────────────────────────────────────────────────────────────
3.1) Problema comune su PowerShell
────────────────────────────────────────────────────────────
Se ricevi un errore simile a:

    npm : Impossibile caricare il file C:\Program Files\nodejs\npm.ps1.
    L'esecuzione di script è disabilitata nel sistema in uso.

Soluzione:
Apri PowerShell **come amministratore** ed esegui il comando:

    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Conferma digitando `S` se richiesto.  
Dopodiché, ripeti il comando di installazione:

    npm install -g json-server

────────────────────────────────────────────────────────────
4) Avviare il progetto
────────────────────────────────────────────────────────────
Per avviare frontend e backend contemporaneamente:

    ➤ Esegui il file `start.bat` presente nella cartella principale del progetto.

Il file esegue:
- Il backend (JSON Server)
- Il frontend (tramite Vite)

────────────────────────────────────────────────────────────
5) Accesso all’applicazione
────────────────────────────────────────────────────────────
Una volta avviato, il sito sarà disponibile al seguente indirizzo:

    http://localhost:5173

────────────────────────────────────────────────────────────
Contatti
────────────────────────────────────────────────────────────
Per problemi, dubbi o chiarimenti, contattare lo sviluppatore del progetto.
