
console.log("coucou2");
var grille1 = [0,0,0,0,0,2,2,3,0,0,0,3,1,0,0,3];
var grille2 = [0,0,0,1,2,2,0,0,0,0,0,0,0,3,3,3];
var grille3 = [0,0,0,3,0,1,0,3,0,0,0,3,0,2,2,0];
const bateau1 = 1;
const bateau2 = 2;
const bateau3 = 3;
const cellule = document.getElementsByClassName("cellule");

const XMAX = 4;
const YMAX = 4;

console.log(cellule);




document.getElementById("grille").innerHTML = "";
    let contenuHTML= "";
    for(var x = 0; x < XMAX; x++){
        
        contenuHTML += "<div id='grille"+(x)+"'>\n"
        
        for(var y = 0; y < YMAX; y++){
            contenuHTML += "<button type=\"button\" class=\"cellule\" id=\""+x+" "+y+"\" onClick=\"tir\"></button>\n";
        }
        
        contenuHTML += "</div>\n" 
    }

    document.getElementById("grille").innerHTML = contenuHTML;
{
}




