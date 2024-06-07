
class Aufgabenbereich {
    constructor(id, titel, kurzBeschreibung, projektid) {
        if (kurzBeschreibung.length > 255) {
            throw new Error('Kurzbeschreibung darf maximal 255 Zeichen lang sein');
        }

        this.id = id
        this.titel = titel;
        this.kurzBeschreibung = kurzBeschreibung;
        this.projektid = projektid;
    }
}
