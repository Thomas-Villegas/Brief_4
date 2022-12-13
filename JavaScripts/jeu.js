var jeu = {
    nbColonne :9,
    nbLigne : 9,
    grille : [],

    nbCaseJ1 : 0,
    nbCaseJ2 : 0,

    initialisation : function(nbBateau){
        this.nbColonne = nbBateau * 2 +1;
        this.nbLigne = nbBateau * 2 +1;
        this.grille = toolbox.initialiserTableauVide(this.nbLigne,this.nbColonne,0);

        for(var i =1 ; i <= nbBateau;i++){
            this.positionnerBateau((i+1),1);
            this.nbCaseJ1 += i+1;
            this.positionnerBateau((i+1),2);
            this.nbCaseJ2 += i+1;
        }
    },

    positionnerBateau : function(taille,joueur){
        var bateau = {};
        var positionTermine = false;
        while(!positionTermine){
            var tailleXMax =0;
            var tailleYMax = 0;
            var isHorizontal = Math.floor(Math.random() * 2);
            if(isHorizontal){
                tailleXMax = this.nbLigne -(taille-1);
                tailleYMax = this.nbColonne;
            } else {
                tailleXMax = this.nbLigne;
                tailleYMax = this.nbColonne - (taille-1);
            }
            var xAlea = Math.floor(Math.random() * tailleXMax);
            var yAlea = Math.floor(Math.random() * tailleYMax);
    
            var isCaseVide = true;
            for(var i =1 ; i <= taille && isCaseVide; i++){
                bateau["case"+i] = this.getCaseCreationBateau(xAlea, yAlea, isHorizontal, i);
                isCaseVide = this.verifCaseVide(bateau["case"+i]);
            }
            if(isCaseVide) positionTermine = true;
        }
        this.enregistrerGrille(bateau,joueur);
    },
    getCaseCreationBateau : function(xAlea,yAlea,isHorizontal,numCase){
        var cellule = {};
        if(isHorizontal){
            cellule.x = xAlea + (numCase-1);
            cellule.y = yAlea;
        } else {
            cellule.x = xAlea;
            cellule.y = yAlea + (numCase-1);
        }
        return cellule;
    },
    verifCaseVide : function(caseB){
        if(this.grille[caseB.x][caseB.y] === 0) return true;
        return false;
    },
    enregistrerGrille : function (bateau,joueur){
        for(var cellule in bateau){
            this.grille[bateau[cellule].x][bateau[cellule].y] = joueur;
        }
    },

    afficherGrille : function(){
        const jeu = document.querySelector("#jeu");
        jeu.innerHTML = "";
        var ratio = (100 - (10 * (this.nbColonne-9)+1));
        //2 bateaux --> 5 colonnes --> 90 px
        //3 bateaux --> 7 colonnes --> 70px
        //4 bateaux --> 9 colonnes --> 50px
        
        var content = "<table class='grille-border'>";
            for(var i=0; i < this.nbLigne;i++){
                content += "<tr class='d-flex'>";
                for(var j=0 ; j < this.nbColonne;j++){
                    content += "<td class='d-flex grille-border' style='width:"+ratio+"px;height:"+ratio+"px'>";
                    if(this.grille[i][j]=== 0){
                        content += "<button id='play' class='btn-grille p-2' style='width:"+ratio+"px;height:"+ratio+"px' onClick='jouer("+i+","+j+")'></button>";
                    } 
                    if(this.grille[i][j]=== 1){
                        content += "<img src='./images/bateau.png' style='width:"+(ratio - "1px")+"px;height:"+(ratio - "1px")+"px' class='bg-info rounded-circle p-2'/>";
                    } 
                    if(this.grille[i][j]=== 2){
                        content += "<button id='play' class='btn-grille p-2' style='width:"+ratio+"px;height:"+ratio+"px' onClick='jouer("+i+","+j+")'></button>";
                    }
                    if(this.grille[i][j]=== 3){
                        content += "<img src='./images/croix_noir.png' class='p-2' style='width:"+ratio+"px;height:"+ratio+"px'/>";
                    }
                    if(this.grille[i][j]=== 4){
                        content += "<img src='./images/icon_explosion.png' class='bg-info rounded-circle p-2' style='width:"+(ratio - "2px")+"px;height:"+(ratio - "2px")+"px'/>";
                    } 
                    if(this.grille[i][j]=== 5){
                        content += "<img src='./images/icon_explosion.png' class='bg-danger rounded-circle p-2' style='width:"+(ratio - "2px")+"px;height:"+(ratio - "2px")+"px'/>";
                    }
                    content += "</td>";
                }
                content += "</tr>";
            }
        content += "</table>";
        jeu.innerHTML = content;
    },
    jouerCase : function(ligne,colonne){
        if(this.grille[ligne][colonne]=== 0){
            this.grille[ligne][colonne] = 3;
        }
        if(this.grille[ligne][colonne] === 1) {
            this.nbCaseJ1--;
            this.grille[ligne][colonne] = 4;
        }
        if(this.grille[ligne][colonne] === 2) {
            this.nbCaseJ2--;
            this.grille[ligne][colonne] = 5;
        }
    },
    verificationFinJeu : function(){
        if(this.nbCaseJ1 <=0 || this.nbCaseJ2 <=0) return true;
    }
}