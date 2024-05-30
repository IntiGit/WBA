
class Aufgabenbereich {
    constructor(id, titel, kurzBeschreibung) {
        if (kurzBeschreibung.length > 255) {
            throw new Error('Kurzbeschreibung darf maximal 255 Zeichen lang sein');
        }

        this.id = id
        this.titel = titel;
        this.kurzBeschreibung = kurzBeschreibung;
    }
}