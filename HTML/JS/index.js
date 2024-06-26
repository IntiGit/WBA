let projekte = [];
let aufgabenbereiche = [];
let artefakte = [];
let pab_verbindungen = [];
let pa_verbindungen = [];

let projects = '';
let tasks = '';
let artefacts = '';

const projectAPI_url = "https://scl.fh-bielefeld.de/WBA/projectsAPI";

// const projectjson_url = "https://scl.fh-bielefeld.de/WBA/projects.json";  
// const taskjson_url = "https://scl.fh-bielefeld.de/WBA/tasks.json";    
// const artefactjson_url =  "https://scl.fh-bielefeld.de/WBA/artefacts.json";

const projectjson_url = "projects.json"; 
const taskjson_url = "tasks.json"; 
const artefactjson_url =  "artefacts.json";  


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


class Projekt_Artefakt {
  constructor(projektID, artefaktID) {
      this.projektID = projektID;
      this.artefaktID = artefaktID;
  }
}

class Projekt_Aufgabenbereich {
  constructor(projektID, aufgabenbereichID) {
      this.projektID = projektID;
      this.aufgabenbereichID = aufgabenbereichID;
  }
}

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


let option = {
  methods: "POST",
  mode: 'cors',
  headers: {
  'Access-Control-Allow-Origin':'*'
  }
}


function load_data(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function load(){
  try {
    projects = await load_data(projectjson_url);
    tasks = await load_data(taskjson_url);
    artefacts = await load_data(artefactjson_url);
  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
  }
}
function processProjects() {
  projects.forEach((project) => {
    const newProject = new Projekt(
      project.id,
      project.name,
      project.shortdesc,
      project.longdesc,
      project.logourl,
      project.maintainer,
      project.start,
      project.end
    );
    projekte.push(newProject);
  });
}

function processTasks() {
  tasks.forEach((task) => {
    const newTask = new Aufgabenbereich(
      task.id,
      task.name,
      task.shortdesc,
      task.project
    );

 
    aufgabenbereiche.push(newTask);
  });
}

function processArtefacts() {
  artefacts.forEach((artefact) => {
    const newArtefact = new Artefakt(
      artefact.id,
      artefact.name,
      artefact.shortdesc,
      artefact.longdesc,
      artefact.realtime,
      artefact.planedtime,
      artefact.taskid
      
    );
    artefakte.push(newArtefact);
  });
}


function sendNewProjekt(data) {
  if (localStorage.getItem("projekt")){
    const projekt = JSON.parse(localStorage.getItem("projekt"))
    localStorage.removeItem("projekt")
    sendNewProjekt(projekt)
   
  }
  else{
    fetch(projectjson_url, { // dient hier nur für den Status OK , sonst bitte projectAPI_url
    }).then(response => {
        console.log(response)
        console.log("Neues Projekt an Server gesendet.");
    })
    .catch(error => {
      localStorage.setItem("projekt", JSON.stringify( data ))
      console.log("Im Local Storage abgespeichert")
    });
  }
};

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



// Asynchrone Funktion zum Laden und Verarbeiten der Daten
async function main() {
  await load();

  if (projects) {
    processProjects();
    console.log(projekte)
  }

  if (tasks) {
    processTasks(); 
    console.log(aufgabenbereiche)
  }

  if (artefacts) {
    processArtefacts();
    console.log(artefakte)
  }

  const data = {
    projekt: 1,
    artefakt: 2,
    task: 3
  }
  
  projekte.forEach((projekt) =>{
    aufgabenbereiche.forEach((t)=>{
          if (t.projektid === projekt.id){
            pab_verbindungen.push(new Projekt_Aufgabenbereich(projekt.id, t.id));
          }
      });
  });

  pab_verbindungen.forEach((pa) =>{
      artefakte.forEach((a)=>{
        if (a.aufgabenbereich == pa.aufgabenbereichID){
          pa_verbindungen.push(new Projekt_Artefakt(pa.projektID, a.id))
          
        }
      })
  })



  console.log(pa_verbindungen);
  console.log(pab_verbindungen);


  
sendNewProjekt(data);

  
  
  
}

main()













