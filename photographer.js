//Mettre le code JavaScript lié à la page photographer.html
//DOM
const firstDiv = document.querySelector('main div')
const urlParams = new URLSearchParams(window.location.search)
const urlId = urlParams.get("id")
const secDiv = document.getElementById('Photos')
const contact = document.getElementById('contact')
const lightbox = document.getElementById('lightbox')
const boxContainer = document.getElementById('lightbox__container')
const closeLightbox = document.getElementById('lightbox__close')
const nextLightbox = document.getElementById ('lightbox__next')
const prevLightbox = document.getElementById('lightbox__prev')

fetch('data.json').then(response => {
    return response.json();
  }).then(data => {

    //info photographe
    const photographers = data.photographers;    
    const photograph = photographers.find(photographe => photographe.id == urlId)
    afficherInfo(photograph)


    //affichage de ses photos + lightbox
    const photos = data.media
    let match = photos.filter( photo => photo.photographerId == urlId )
    afficherPhotos(match, photograph)   
    console.log(match.length);


    //Contact ajout nom
    contact.innerText = 'Contactez-moi' + ' ' +  photograph.name


    // ///lightbox
    // console.log(match.indexOF(1));
    console.log(match);
    
    //fermeture lightbox avec la croix
    closeLightbox.addEventListener('click', e => {
        lightbox.classList.remove('active')
    })

    // window.onload = ()=>{
    //     for (let i = 0; i < gallery.length; i++) {
    //         gallery[i].onclick = ()=>{
    //             console.log(i);
    //             lightbox.classList.add('active');
    //         }
            
    //     }
    // }


   
    

}).catch(error=> {
    console.error(error)
})



function afficherInfo (photograph){
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
    div2.setAttribute('id', 'photograph-photo')
    firstDiv.appendChild(div2)

    let profilepicture = document.createElement('img')
    profilepicture.src = '/SamplePhotos/PhotographersIDPhotos/' + photograph.portrait 
    div2.appendChild(profilepicture)

}



function afficherPhotos (match, photograph) {
    const facto = factoryMediaElt()
    match.forEach( item => {
        // Element image or vidéo
        let mediaElt = facto.choiceElt(item , photograph)
        // Conception de la suite de HTML (Carte media)
        let div3 = document.createElement('div')
        div3.setAttribute('class', 'photo-container')
        secDiv.appendChild(div3)

        let description = document.createElement('p')
        description.innerHTML = item.title

        let heart = document.createElement('p')
        heart.innerHTML = item.likes

        let icon = document.createElement('p')
        icon.innerHTML = '<i class="fas fa-heart"></i>';

        //Appendchilm
        div3.appendChild(mediaElt)

        let divsub = document.createElement('div')
        divsub.setAttribute('class', 'photo-info')
        div3.appendChild(divsub)

        divsub.appendChild(description)

        let divlike = document.createElement('div')
        divsub.appendChild(divlike)

        divlike.appendChild(heart)
        divlike.appendChild(icon)
        
    })
}




function factoryMediaElt() {


    function eltImage(match , photograph){
        //Création délemment image HTML
        let picture = document.createElement('img')
        const words = photograph.name.split(' ')
        // picture.src = 'SamplePhotos/' + match.image
        picture.src = 'SamplePhotos/' + words[0] + '/' + match.image    
        
        picture.addEventListener('click', e => {
            lightbox.classList.add('active')
            const img = document.createElement('img')
            img.src = picture.src
            while (boxContainer.firstChild) {
                boxContainer.removeChild(boxContainer.firstChild)
            }
            boxContainer.appendChild(img)
         })
        return picture;
    }

    function eltVideo(match , photograph){
        let video = document.createElement('video')
        const words = photograph.name.split(' ')
        video.src = 'SamplePhotos/' + words[0] + '/' + match.video
        video.addEventListener('click', e => {
            lightbox.classList.add('active')
            const play = document.createElement('video')
            play.src = video.src
            while (boxContainer.firstChild) {
                boxContainer.removeChild(boxContainer.firstChild)
            }
            boxContainer.appendChild(play)
         })
        return video;
    }


    function choiceElt(match , photograph){
        let elt;
        if(match.image){   
            // elt = 'image'
            elt = this.eltImage(match , photograph)
        }else{
            elt = this.eltVideo(match , photograph)
        }
        return elt;

        // console.log(elt)
        // If image ou vidéo (HTML)
    }

    return {
        eltImage,
        eltVideo,
        choiceElt
    }

}
