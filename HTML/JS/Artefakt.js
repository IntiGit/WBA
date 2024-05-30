
class Artefakt {
    constructor(id, titel, kurzBeschreibung, aufgabenbereich, dauer) {
        if (kurzBeschreibung.length > 255) {
            throw new Error('Kurzbeschreibung darf maximal 255 Zeichen lang sein');
        }

        this.id = id;
        this.titel = titel;
        this.kurzBeschreibung = kurzBeschreibung;
        this.aufgabenbereich = aufgabenbereich;
        this.dauer = dauer;
    }
}