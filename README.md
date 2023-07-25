# Progetto winearound

Innanzitutto premetto che il progetto non è 100% come lo vorrei, pero' ci ho speso parecchio tempo (per via di problematiche che descrivero' piu' sotto), e ho cercato di arrivare a un compromesso che avesse un buon rapporto qualità/tempo speso: qui saranno descritti anche una serie di improvement che non sono riuscito ancora a fare, ma che se necessario sono disposto a spendere tempo per implementare.

## Come usare:

```bash
cd models 
npm i
cd ..

cd backend
npm i 
npm run start:dev

#altro terminale
cd frontend
npm i 
npm run dev
```

il sito poi è disponibile sulla porta 3001


## Backend

### Architettura

nel backend, abbiamo un semplice CRUD nestjs + prisma + sqlite. 
- nestjs perchè è il che avete detto di utilizzare, e volevo prendermi un po' avanti e impararlo in anticipo
- prisma perchè a mio parere è uno degli ORM piu' comodi del mondo node
- sqlite per non aver bisogno di un installazione di un db
inoltre, ho aggiunto un piccolo tocco personale: zod.
tramite nestjs-zod e nestjs-zod-prisma, genero automaticamente degli schema di Zod a partire dal database. Uso questi per creare schema zod per le varie richieste, e poi da questi genero i Dto di nestjs.
Risultato: modelli, type safe, in un terzo progetto (models), condiviso tra front-end e back-end. Una specie di grpc-over-rest molto rudimentale

### (Tirando le) somme:
- nestjs un po' verbose, ricorda un po' i framework stile spring/aspnetcore dei linguaggi compilati
- i nuovi decorator sono molto potenti
- non sono riuscito ad aggiungere test per mancanza di tempo, e non ho sviluppato in TDD puramente per andare piu' veloce (per via di una serie di motivi il tempo è scarseggiato)
- molto bello zod, come sempre

### Cose mancanti (che migliorerei)

- testing
- piu' commenti

## Frontend

### Architettura

nel frontend, classica app nextjs:
- app router, anche se in questo caso non serve a nulla, perchè la page principale è per forza di cose "use client"
- mui, fullcalendar, react-query come richiesto
- jotai per la gestione dati globale tramite atomi (come alternativa piu' moderna a redux)
  - il motivo per cui è stata aggiunta viene spiegato di seguito
- zod per interagire con l'API

### (Tirando le) somme:

- il sito di documentazione di fullcalendar è abbastanza pessimo
  - sono rimasto bloccato per almeno 4 ore sul drag degli eventi che non funzionava, alla fine bastava un update delle librerie...
- jotai è molto bella come libreria di state management, molto piu' leggera di redux
  - il motivo per cui l'avevo introdotta era per condividere gli eventi tra NavigationCalendar e DayCalendar, e poterli evidenziare sul calendario, ma ho scartato la feature per mancanza di tempo
- mui ottima come al solito, permette di fare interfaccie decenti senza troppo incasinarsi di CSS
  - pero' c'è voluto un po' per incastrare bene fullcalendar che stasse nel giusto spazio
- next dev è abbastanza lento a fare il primo load, e ho dovuto riavviare il dev server parecchie volte
- next non è stato di grande aiuto considerando che era tutto use client
- react-query è ottima anche se non sono 100% sicuro di aver ben ottimizzato i rerender, anche se ci ho provato
  - un po' laborioso fare l'optimistic rendering e invalidare la cache a mano, spero ci sia un modo piu' smart di farlo di come ho fatto io
- ho provato a simulare il layout di google calendar, spero sia abbastanza decente, al netto che non ho stilizzato eventi e fullcalendar (sempre per mancanza di tempo)

### Cose mancanti (che migliorerei)

- testing
- fare uso dello storybook, che ho aggiunto ma poi usato abbastanza poco
- piu' commenti
- ripulire un po' il codice, anche se non credo sia proprio pessimo, solo un po' rushed
  - quantomeno è indicativo del codice che scrivo sotto deadline (haha)
- piu' separazione dei provider dentro il layout, al posto che dentro alla page
- stile piu' carino al fullcalendar

## Repo

- ho provato a fare una cosa stile monorepo ma senza lerna/npm workspace e altro
  - funziona bene ma non benissimo


# NOTA BENE:

il motivo per cui ho avuto problemi di tempo è che siamo stati colpiti la settimana scorsa da una fortissima grandinata.
Questa grandinata mi ha distrutto completamente l'automobile, ha danneggiato il condominio, e generalmente mi ha causato un sacco di stress in quanto ha messo la mia vita un po' sottosopra.
Per questo motivo ho rimandato la consegna, e anche per questo motivo consegno adesso, anche se potrei rimandare di nuovo: è un periodo molto pesante, e lo stress di voler fare un buon esercizio (per ottenere la posizione, per la quale sono molto entusiasta) non ha aiutato moltissimo. Inoltre non vorrei fare brutta figura, e sembrare di essere una persona che non sa mantenere una deadline.
Se lo vorrai saro' disposto a continuare e finire l'esercizio nella sua completezza, ma credo che anche se mancano diverse cose, già cio che c'è possa dimostrare che sono una figura valida a livello di sviluppo. per questo lo consegno in uno stato "incompleto" (seppure funzionante, in tutti i punti descritti dalla consegna).

Mi auguro che tu possa trovare questo esercizio soddisfacente negli standard che si addicono a Winearound, e mi auguro di poter ricevere tue notizie presto.

Grazie di tutto e buona code review! :)