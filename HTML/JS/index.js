
let projekte = [];
let aufgabenbereiche = [];
let artefakte = [];
let pab_verbindungen = [];
let pa_verbindungen = [];

// Aufgabenbereiche
aufgabenbereiche.push(new Aufgabenbereich(0, 'Bereich A', 'coole Beschreibung'));
aufgabenbereiche.push(new Aufgabenbereich(1, 'Bereich B', 'tolle Beschreibung'));

// Artefakte
artefakte.push(new Artefakt(0, "Artefakt 1", "cooles Artefakt", aufgabenbereiche[0], 10.0))
artefakte.push(new Artefakt(1, "Artefakt 2", "noch cooleres Artefakt", aufgabenbereiche[0], 20.0))

artefakte.push(new Artefakt(2, "Artefakt 3", "viel cooleres Artefakt", aufgabenbereiche[1], 0.5))
artefakte.push(new Artefakt(3, "Artefakt 4", "sehr viel cooleres Artefakt", aufgabenbereiche[1], 3.0))

// Projekte
projekte.push(new Projekt(0, "Projekt e0183a5f", "TEST", "./TestLogo.png", "1970-01-01"))
projekte.push(new Projekt(1, "Projekt e0104afb", "test", "./TestLogo.png", "1111-11-11"))
projekte.push(new Projekt(2, "Projekt e0483d5a", "tEsT", "./TestLogo.png", "2112-12-21"))

// Projekt-Artefakt Verbindungen
pa_verbindungen.push(new Projekt_Artefakt(projekte[0].id, artefakte[0].id, 12))
pa_verbindungen.push(new Projekt_Artefakt(projekte[0].id, artefakte[1].id, 21))

pa_verbindungen.push(new Projekt_Artefakt(projekte[1].id, artefakte[2].id, 1))
pa_verbindungen.push(new Projekt_Artefakt(projekte[1].id, artefakte[3].id, 2))

pa_verbindungen.push(new Projekt_Artefakt(projekte[2].id, artefakte[1].id, 18))
pa_verbindungen.push(new Projekt_Artefakt(projekte[2].id, artefakte[3].id, 3))

// Projekt-Aufgabenbereich Verbindungen
pab_verbindungen.push(new Projekt_Aufgabenbereich(projekte[0].id, aufgabenbereiche[0].id))

pab_verbindungen.push(new Projekt_Aufgabenbereich(projekte[1].id, aufgabenbereiche[1].id))

pab_verbindungen.push(new Projekt_Aufgabenbereich(projekte[2].id, aufgabenbereiche[0].id))
pab_verbindungen.push(new Projekt_Aufgabenbereich(projekte[2].id, aufgabenbereiche[1].id))


function berechneProjektlaufzeit(projektID) {
    let laufzeit = 0
    for(let verbindung of pa_verbindungen) {
      if(verbindung.projektID == projektID) {
        for(let artefakt of artefakte) {
          if(artefakt.id == verbindung.artefaktID) {
            laufzeit += artefakt.dauer;
          }
        }
      }
    }
    return laufzeit;
}

// Laufzeit Funktion Test
console.log("Laufzeit Projekt 0: ", berechneProjektlaufzeit(projekte[0].id))
console.log("Laufzeit Projekt 1: ", berechneProjektlaufzeit(projekte[1].id))
console.log("Laufzeit Projekt 2: ", berechneProjektlaufzeit(projekte[2].id))

console.log("------------------")

// Sortierer Test
let sortierer = new Sortierer()
console.log("Nach Datum:")
console.log(sortierer.sortierenDatum(projekte))
console.log("Nach Laufzeit:")
console.log(sortierer.sortierenLaufzeit(projekte))

console.log("------------------")

// Translator Test
let translator = new Translator()
translator.neueSpracheHinzufügen("ES")
translator.neueUebersetzungHinzufügen("ES", "Kurzbeschreibung", "Breve descripción")
translator.neueUebersetzungHinzufügen("DE", "Hallo", "Hallo")
translator.neueUebersetzungHinzufügen("EN", "Hallo", "Hello")

console.log(translator.getUebersetzung("Kurzbeschreibung", "ES"))
console.log(translator.getUebersetzung("Hallo", "DE"))
console.log(translator.getUebersetzung("Hallo", "EN"))
console.log(translator.getUebersetzung("Projekt", "ES"))    // Existiert nicht -> gibt leeren String zurück
console.log(translator.getUebersetzung("fhskjyxsj", "DE")) // Existiert nicht -> gibt leeren String zurück


