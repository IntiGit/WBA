
class Sortierer {
    constructor() {
        this.nachDatum = []
        this.nachLaufzeit = []
    }

    sortierenDatum(projekte) {
        this.nachDatum = projekte;

        this.nachDatum.sort((a, b) => {
            return new Date(a.startDatum) - new Date(b.startDatum);
        });

        return this.nachDatum;
    }

    sortierenLaufzeit(projekte) {
        this.nachLaufzeit = projekte;

        this.nachLaufzeit.sort((a, b) => {
            return berechneProjektlaufzeit(a.id) - berechneProjektlaufzeit(b.id);
        });

        return this.nachLaufzeit;
    }
}