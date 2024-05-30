

class Translator {
    constructor() {
        this.sprachen = new Map([
            ["DE", 0],
            ["EN", 1],
        ]);

        this.uebersetzungen = new Map([
            ["Projekt", ["Projekt", "Project"]],
            ["Menü", ["Menü", "Menu"]],
            ["Kurzbeschreibung", ["Kurzbeschreibung", "Short Description"]]
        ]);
    }

    // Neue Sprache hinzufügen z.B. Spanisch:  Translator.neueSprache("ES")
    neueSpracheHinzufügen(sprache) {
        //Wenn es die Sprache schon gibt mach nix
        if(this.sprachen.has(sprache)) {
            return;
        }
        //Sprache in das Array aller Sprachen aufnehmen (Index ist der nächst höhere aus der Liste)
        this.sprachen.set(sprache, this.sprachen.size);

        //Alle Übersetzungen für diese Sprache auf auf "" setzten
        for (let key of this.uebersetzungen.keys()) {
            let eintrag = this.uebersetzungen.get(key);
            eintrag[this.sprachen.get(sprache)] = "";
        }
    }

    // Neue Übersetzung hinzufügen (von Deutsch zu X)
    // sprache = Sprache in die Übersetzt wird
    // wortDE = Wort auf Deutsch
    // wortX = Wort in der anderen Sprache
    neueUebersetzungHinzufügen(sprache, wortDE, wortX) {
        if (!this.sprachen.has(sprache)) {
            return;
        }
        let eintrag = this.uebersetzungen.get(wortDE)
        // Wenn es das deutsche Wort noch nicht in der Map gibt wird es angelegt
        // und mit den Übersetzungen(Deutsch, X) eingetragen
        if(eintrag === undefined) {
            let neuerEintrag = [wortDE];
            let index = this.sprachen.get(sprache)
            neuerEintrag[index] = wortX;
            //Bei allen anderen Sprachen die Übersetzung auf "" setzten
            for(let i = 1; i < this.sprachen.size; i++) {
                if(i != index) {
                    neuerEintrag[i] = "";
                }
            }
            this.uebersetzungen.set(wortDE, neuerEintrag)

        } else {
            //Wenn es das deutsche Wort gibt die Übersetzung einfügen
            eintrag[this.sprachen.get(sprache)] = wortX;
            this.uebersetzungen.set(wortDE, eintrag);
        }
    }

    getUebersetzung(wortDE, sprache) {
        if(!this.uebersetzungen.has(wortDE) ) {
            return "";
        }
        if(!this.sprachen.has(sprache)) {
            return "";
        }
        return this.uebersetzungen.get(wortDE)[this.sprachen.get(sprache)];
    }

}