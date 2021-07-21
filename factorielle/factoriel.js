function fact(nb) {
    console.log("On rentre dans la fonction fact(" + nb + ")");
    let result;
    //5 est supérieur à 1 donc on va à else
    if (nb <= 1) {
        console.log("Fin de la fonction fact(" + nb + ")");
        result = 1;
    } else {
        // on obtient nb - 5 = 4 ==> donc début fact(4) ... 4 toujours inférieur à 1 .. ainsi de suite jusqu'à 1 donc fonction terminé  ainsi on sort en on retourne result 
        result = nb * fact(nb - 1);
        console.log("Fin de la fonction fact(" + nb + ")");
    }
    return result;
}