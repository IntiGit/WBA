 class Artefakt {
    constructor(id, titel, kurzBeschreibung, langBeschreibung, echteDauer, dauer, aufgabenbereich) {
        if (kurzBeschreibung.length > 255) {
            throw new Error('Kurzbeschreibung darf maximal 255 Zeichen lang sein');
        }

        this.id = id;
        this.titel = titel;
        this.kurzBeschreibung = kurzBeschreibung;
        this.aufgabenbereich = aufgabenbereich;
        this.dauer = dauer;
        this.langBeschreibung = langBeschreibung;
        this.echteDauer = echteDauer;
    }
}

// {
//     "id": 1,
//     "name": "Projekt 1 - ER-Diagramm",
//     "shortdesc": "ER-Diagramm erstellen",
//     "longdesc": "Ein ER-Diagramm für den Projektmanager",
//     "planedtime": "7:30",
//     "realtime": "7:50",
//     "taskid": 1
// }