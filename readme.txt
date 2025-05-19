README - Avvio del Progetto Pasticceria

Questa guida spiega i passaggi da seguire per eseguire correttamente il sito web della Pasticceria in locale.

------------------------------------------------------------
1) Clonare la repository
------------------------------------------------------------
Clona questo progetto nel tuo computer tramite Git oppure scaricalo come file .zip ed estrailo.

Esempio con Git:
git clone https://github.com/tuo-utente/tuo-repo.git

------------------------------------------------------------
2) Installare Node.js (se non già installato)
------------------------------------------------------------
Verifica se Node.js è installato aprendo un terminale e digitando:

    node -v

Se il comando non restituisce un numero di versione, installa Node.js.
All'interno della cartella `Appoggio` è presente il file di installazione.

------------------------------------------------------------
3) Installare JSON Server
------------------------------------------------------------
Apri il terminale e installa json-server globalmente:

    npm install -g json-server

------------------------------------------------------------
3.1) Problema comune su PowerShell:
------------------------------------------------------------
Se ricevi questo errore:

    npm : Impossibile caricare il file C:\Program Files\nodejs\npm.ps1. 
    L'esecuzione di script è disabilitata nel sistema in uso.

Soluzione:
Apri PowerShell come **Amministratore** ed esegui:

    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Conferma digitando `S` quando richiesto.

------------------------------------------------------------
3.2) Riprova ad installare JSON Server:
------------------------------------------------------------

    npm install -g json-server

------------------------------------------------------------
4) Avvio del progetto
------------------------------------------------------------
Una volta completati tutti i passaggi precedenti, per avviare tutto automaticamente:

➤ Esegui il file `start.bat` che si trova all’interno della cartella principale del progetto.

Questo comando:
- Avvia il server backend (JSON Server)
- Avvia il frontend (Vite)

------------------------------------------------------------
5) Accesso al sito
------------------------------------------------------------
Una volta avviato tutto correttamente, il sito sarà accessibile all’indirizzo:

    http://localhost:5173

------------------------------------------------------------
Contatti
------------------------------------------------------------
Per problemi o domande, contatta lo sviluppatore del progetto.
