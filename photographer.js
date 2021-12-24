//Mettre le code JavaScript lié à la page photographer.html
//DOM
const firstDiv = document.querySelector('main div')
const urlParams = new URLSearchParams(window.location.search)
const urlId = urlParams.get("id")
const secDiv = document.getElementsByClassName('Photos')

console.log(urlId)

fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
      //info photographe
    const photographers = data.photographers;

    
    const photograph = photographers.find(photographe => photographe.id == urlId)
    console.log(photograph)
    console.log(photograph.name)

    let div1 = document.createElement('div')
    div1.setAttribute('id', 'photograph-info')
    firstDiv.appendChild(div1)

    let h1 = document.createElement('h1')
    h1.innerHTML = photograph.name
    div1.appendChild(h1)

    let h2 = document.createElement('h2')
    h2.innerHTML = photograph.city + ' ' + photograph.country
    div1.appendChild(h2)

    let p = document.createElement('p')
    p.innerHTML = photograph.tagline
    div1.appendChild(p)

    let div2 = document.createElement('div')
    div2.setAttribute('id', 'photograh-photo')
    firstDiv.appendChild(div2)

    let profilepicture = document.createElement('img')
    profilepicture.src = '/SamplePhotos/PhotographersIDPhotos/' + photograph.portrait 
    div2.appendChild(profilepicture)


    console.log(profilepicture)
    console.log(firstDiv)

    //affichage de ses photos

    const photos = data.media

    let match = photos.filter( photo => photo.photographerId == urlId )
    console.log(match)

    const facto = factoryMediaElt()
    match.forEach( item => {
        // Element image or vidéo
        console.log(facto.choiceElt(item) )

        // Conception de la suite de HTML (Carte media)
        //Appendchilm
    })

    

    //->Chercher le bon photographe
        //Chercher dans mon tableau photographe celui qui a l'id = urlId
        //Un photographe (Le bon)
        //-> Afficher les données du photographe dans la page

    //->Chercher ses medias (photo et video)
        //Chercher dans mon tableau media , ceux qui ont l'id = urlId
        //Recrer un tableau de média tu photograpge en question
        //Afficher ses medias
            //Factory methode (créer lement html image ou video)


}).catch(error=> {
    console.error(error)
})



function affichagePhotos(photos) {
    photos.forEach(photo =>{
        let picture = document.createElement('img')
        picture.src = '/SamplePhotos/'+ photograph.name + '/' + photo.image
        secDiv.appendChild(picture)
    })
}


function factoryMediaElt() {

    function eltImage(data){
        //Création délemment image HTML
        return data;
    }


    function choiceElt(data){
        console.log(data.image)
        let elt;
        if(data.image){   
            // elt = 'image'
            elt = this.eltImage('image')
            
        }else{
            elt = 'vidéo'
        }

        return elt;

        // console.log(elt)
        // If image ou vidéo (HTML)
    }


    return {
        eltImage,
        choiceElt
    }

}




const object = {
    name : "thomas",
    myFonction() {
        console.log(this.name)
    }
}

object.myFonction()