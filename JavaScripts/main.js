/* const tour = document.querySelector("#tour"); */
const alert = document.querySelector(".alert");
const messageJ1 = document.querySelector("#j1");
const messageJ2 = document.querySelector("#j2");
var nbBateauSaisie = 0;

var joueurEnCours = "Vous";
var finJeu = false;

function jouer(ligne,colonne){
    jouerCase(ligne,colonne);
    var celluleIA = IA.getCellule();
    jouerCase(celluleIA.ligne,celluleIA.colonne)
}
function jouerCase(ligne, colonne){
    if(!finJeu){
        jeu.jouerCase(ligne,colonne);
        jeu.afficherGrille();
        if(jeu.verificationFinJeu(joueurEnCours)){
            gererFinJeu();
        }
        if(joueurEnCours === "Vous"){
            joueurEnCours = "Capitain Devdev";
        } else {
            joueurEnCours = "Vous";
        }
    }
}

function initialisationTableau(nbBateau){
    jeu.nbCaseJ1 = 0;
    jeu.nbCaseJ2 = 0;
    finJeu = false;
    joueurEnCours = "Vous";
    alert.classList.add("d-none");
    
    jeu.initialisation(nbBateau);
    jeu.afficherGrille();
}

function gererFinJeu(){
    finJeu = true;
    var contentAlert = "Partie terminée, le gagnant est : " + joueurEnCours + "<br />";
    contentAlert += '<button type="button" class="btn btn-secondary" onClick = initialisationTableau('+nbBateauSaisie+')>Recommencer</button>';
    afficherAlert(contentAlert,1);
}

function afficherAlert(txt, type){
    if(type===1){
        alert.classList.add("alert-success");
        alert.classList.remove("alert-danger");
    } else {
        alert.classList.remove("alert-success");
        alert.classList.add("alert-danger");
    }
    alert.innerHTML = txt;
    alert.classList.remove("d-none");
}

function startGame(){
    nbBateauSaisie = parseInt(document.querySelector("#nbBateau").value);
    if(nbBateauSaisie < 2) afficherAlert("Le nb de bateau doit être supérieur à 2",2);
    if(nbBateauSaisie > 4) afficherAlert("Le nb de bateau doit être inférieur à 5",2);
    if(nbBateauSaisie >=2 && nbBateauSaisie <=4) initialisationTableau(nbBateauSaisie);
}



