
class Projekt {
    constructor(id, titel, kurzBeschreibung, langBeschreibung, logo,maintainer, startDatum, endDatum) {
        if (kurzBeschreibung.length > 255) {
            throw new Error('Kurzbeschreibung darf maximal 255 Zeichen lang sein');
        }

        this.id = id;
        this.titel = titel;
        this.kurzBeschreibung = kurzBeschreibung;
        this.langBeschreibung = langBeschreibung;
        this.maintainer = maintainer;
        this.logo = logo;
        this.startDatum = startDatum;
        this.endDatum = endDatum;
    }
}

// {
//     "id": 1,
//     "name": "Implementierung des Projektmanagers",
//     "shortdesc": "Das Semesterprojekt für WBA.",
//     "longdesc": "In diesem Projekt lernen Sie die Grundlangen der Webentwicklung an einem einfachen Projekt kennen.",
//     "logourl": "https://scl.fh-bielefeld.de/WBA/projectmanager.avif",
//     "maintainer": "Grit Behrens",
//     "start": "2024-04-01T08:20:28.438Z",
//     "end": "2024-07-17T08:20:28.438Z"
// },