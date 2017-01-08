
var array_images=[];
var c1;
var c2;
var pairs=0;
var pause=false;
var num_images=6;

// we create an array of possible images of size num_images*2 because we want to have each image two times
for(var i=0;i<num_images;i++){
    var image = new Image();
    image.src = "../Images/t" + (i+1) + ".jpg";
    array_images.push(image);
    array_images.push(image);

}
// console.log(array_images);

// we create our namespace
var myMemoryGame = {};

// we sorted randomly our array

myMemoryGame.shuffle=function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
var click=0;
array_images=myMemoryGame.shuffle(array_images);




// on affiche le dos de la carte au click du joueur
myMemoryGame.memoryClick=function(event){
    console.log("clicked");
if(!pause ) {
    if (click === 0) {
        // on save la variable 1 en global storage
        c1 = event.target.childNodes[1];
        console.log(c1);
        // montrer l'image associee au click1'
        c1.style.display = "inline-block";
        console.log(click);
        click++;
    }

    else {
        // montrer l'image associee au click2'
        c2 = event.target.childNodes[1];
        c2.style.display = "inline-block";
        click++;
        console.log(click);
        pause=true;
        myMemoryGame.checkPairs();


    }
}
};

// on associe une image du tableau a chaque carte
for(var j=0;j<array_images.length;j++){
    // console.log(array_images.length);
    // console.log(typeof ("image"+(j+1)));
    var face=document.getElementById('image'+(j+1));
    var newImage = document.createElement("img");
    newImage.src=array_images[j].src;
    // cacher l'image
    newImage.style.display="none";
    newImage.classList.add("image_face");
    newImage.id = "s" + (j+1);
    face.addEventListener("click",myMemoryGame.memoryClick);
    face.appendChild(newImage);
}



myMemoryGame.checkPairs=function(){
    // we check if the 2 carts are the same

        if (c1.src === c2.src) {
            pairs++;
            console.log("Nombre de pairs trouvees "+pairs);
            click = 0;
            pause=false;

        }
        else {
            // Si les cartes ne sont pas identiques, on les retourne apres un petit temps

            setTimeout(function (){
                console.log("Ce n'est pas une paire");
                // pause = true; // on met une pause avant de pouvoir rejouer
                // // on cache les 2 cartes a nouveau


                console.log(c1);
                console.log(c2);


                c1.style.display = "none";
                c2.style.display = "none";
                click = 0;
                pause = false;// on laisse le jeu repartir
            },2000);

        }
        if (pairs == array_images.length / 2) {
            alert("You won");
        }
};





