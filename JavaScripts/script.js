/* Création tableau avec GPTchat */

const tableau = [];
let compteur0 = 0;
let compteur1 = 0;
let compteur2 = 0;
let compteur3 = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

while (compteur0 < 10 || compteur1 < 1 || compteur2 < 2 || compteur3 < 3) {
  const ligne = [];
  for (let j = 0; j < 4; j++) {
    const nombreAleatoire = Math.floor(Math.random() * 7);
    if (nombreAleatoire < 1 && compteur1 < 1) {
      ligne.push(1);
      compteur1++;
    } else if (nombreAleatoire < 3 && compteur2 < 2) {
      ligne.push(2);
      compteur2++;
    } else if (nombreAleatoire < 6 && compteur3 < 3) {
      ligne.push(3);
      compteur3++;
    } else if (compteur0 < 10) {
      ligne.push(0);
      compteur0++;
    }
  }
  if (ligne.length === 4) {
    tableau.push(ligne);
  }
  if (tableau.length === 4) {
    break;
  }
}
shuffle(tableau);



/* ----- Fonction lancement du jeu (start) ----- */
let regleJeu = document.getElementById("container_regle");
let btnStart = document.getElementById("container_start");
let nameForm = document.getElementById("container_nameForm");

function start() {
    let valueText = document.getElementById("nameForm").value;

    if (valueText === '') {
        alert('Tu as oublier de mettre ton nom petit pirate !')
    }
    else {
        regleJeu.remove();
        btnStart.remove();
        nameForm.remove();
        document.getElementById("container_jeu").hidden = false;
        document.getElementById("row_jeu").hidden = false;
        document.getElementById("col_jeu").hidden = false;
        document.getElementById("grille_jeu").hidden = false;
        pseudo.push(valueText);

        creationGrille();
    }
};



/* ----- Fonction création de la grille & affectation des pions ----- */

function creationGrille(){
    const xMax = 4;
    const yMax = 4;

    // Création de la grille //
    document.getElementById("grille_jeu").innerHTML = "";
    let grilleJeu= "";

    for(var x = 0; x < xMax; x++){

        grilleJeu += "<div id='grille"+(x)+"'>\n";

        for(var y = 0; y < yMax; y++){
            grilleJeu += "<button type='button' class='cellule' id='"+x+" "+y+"' clicked='false'></button>\n";
        }

        grilleJeu += "</div>\n";
    }
    document.getElementById("grille_jeu").innerHTML = grilleJeu;

    // Affectation des pions sur les cellules //
    for(var x = 0; x < xMax; x++){
        for(var y = 0; y < yMax; y++){
            document.getElementById(x+" "+y).value = tableau[x][y];
        }
    }
    game();
}



/* ----- Fonction changement d'image au clic sur une case ----- */
const pion1 = 20;
const pion2 = 10;
const pion3 = 5;
const eau = -5;
const pionFind = 1;
var tabScore = [];
var ennemiesClicked = [];
let pseudo = [];

function game(){
    const cellules = document.querySelectorAll(".cellule");

    for (let i = 0; i < cellules.length; i++) {

        cellules[i].addEventListener("click", function() {

            var valueCellule = cellules[i].value;
            var celluleSelected = cellules[i];
            var isClicked = celluleSelected.getAttribute('clicked');

        
                if (isClicked == "false"){
                    if (valueCellule == 0){
                        celluleSelected.classList.add('case_eau');
                        celluleSelected.setAttribute('clicked', 'true');
                        tabScore.push(eau);
                    } else if (valueCellule == 1){
                        celluleSelected.classList.add('case_pion1');
                        celluleSelected.setAttribute('clicked', 'true');
                        tabScore.push(pion1);
                        ennemiesClicked.push(pionFind);
                    } else if (valueCellule == 2){
                        celluleSelected.classList.add('case_pion2');
                        celluleSelected.setAttribute('clicked', 'true');
                        tabScore.push(pion2);
                        ennemiesClicked.push(pionFind);
                    } else if (valueCellule == 3){
                        celluleSelected.classList.add('case_pion3');
                        celluleSelected.setAttribute('clicked', 'true');
                        tabScore.push(pion3);
                        ennemiesClicked.push(pionFind);
                    }

                    /* Fin de jeu */

                    if (ennemiesClicked.length === 6){
                        var score = 0;

                        for (let i = 0; i < tabScore.length; i++) {
                            score += tabScore[i];
                        }

                        document.getElementById("message_fin").innerHTML = ""

                        let textEndGame = ""
                        textEndGame += "SCORE :<br>"+pseudo+" &emsp;&emsp;&emsp; "+score+""
                        
                        document.getElementById("message_fin").innerHTML = textEndGame;

                        finDeJeu();

                    }
                }
        });
    }
}

function finDeJeu(){
    document.getElementById("container_fin").hidden = false;
    document.getElementById("row_fin").hidden = false;
    document.getElementById("col_fin").hidden = false;
    document.getElementById("message_fin").hidden = false;
    document.getElementById("container_restart").hidden = false;
    document.getElementById("row_restart").hidden = false;
    document.getElementById("btn_restart").hidden = false;

    document.getElementById("container_jeu").hidden = true;
    document.getElementById("grille_jeu").hidden = true;
    document.getElementById("row_jeu").hidden = true;
}

function restart(){
    window.location.reload();
}

/* ----- Fonction Musique ----- */

function play(idPlayer, btn) {
    var player = document.querySelector('#' + idPlayer);
    var btn = document.getElementById("audio");

    if (player.paused) {
        player.play();
        btn.classList.add('on');
        btn.classList.remove('off');
    } else {
        player.pause();
        btn.classList.add('off');
        btn.classList.remove('on');
    }
}