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
let triBtn = document.getElementById('tri-select')
const info = document.getElementById('like-prix')


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
    console.log(match);


    //Contact ajout nom
    contact.innerText = 'Contactez-moi' + ' ' +  photograph.name


    // ///lightbox
    afficherLightbox(photograph)

    // console.log(match.indexOF(1));
    
    //fermeture lightbox avec la croix
    closeLightbox.addEventListener('click', e => {
        lightbox.classList.remove('active')
    })
   
    // triBtn.addEventListener('change', triData())
    triBtn.addEventListener('change', () => {
        triData(match , triBtn);
        afficherPhotos(match, photograph)
    })
    

    afficherLikePrix(match, photograph)

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
    const facto = factoryMediaElt(match)
    let coeurVide 
    let coeur 
    let divlike
    let arrayLikes = {}
    match.forEach( (item , index) => {
        // Element image or vidéo
        let mediaElt = facto.choiceElt(item , photograph)
        // Conception de la suite de HTML (Carte media)
        let div3 = document.createElement('div')
        div3.setAttribute('class', 'photo-container')
        div3.setAttribute('data-index', index)
        secDiv.appendChild(div3)

        let description = document.createElement('p')
        description.innerHTML = item.title

        //div like
        let heart = document.createElement('p')
        heart.innerHTML = item.likes        
        coeurVide = document.createElement('p')
        coeur = document.createElement('p')
        coeurVide.innerHTML = '<i class="far fa-heart"></i>'        
        coeur.innerHTML = '<i class="fas fa-heart"></i>'
        coeur.style.display = 'none'

        
        arrayLikes[item.id] = item.likes
        

        //Appendchild
        div3.appendChild(mediaElt)

        let divsub = document.createElement('div')
        divsub.setAttribute('class', 'photo-info')
        div3.appendChild(divsub)

        divsub.appendChild(description)

        divlike = document.createElement('div')
        divlike.setAttribute('id', item.id)
        divsub.appendChild(divlike)

        divlike.appendChild(heart)
        divlike.appendChild(coeur)
        divlike.appendChild(coeurVide)
        
    })

    //click coeur plein(liké)
    const allCoeur = document.querySelectorAll('.fas')
    console.log(allCoeur);
    allCoeur.forEach(element => {
        element.addEventListener('click', e=>{
            coeurVide.style.display = 'block'
            coeur.style.display = 'none'
            console.log(e.target);
        })
    });

    // click coeur vide (pas liké)
    const allCoeurVide = document.querySelectorAll('.far')
    console.log(allCoeurVide);
    allCoeurVide.forEach(element => {
        element.addEventListener('click', e=>{
            coeurVide.style.display = 'none'
            coeur.style.display = 'block'
            console.log(e.path[2].id);
        })
    });


    console.log(arrayLikes);
}



function afficherLightbox (photograph) {
    const media = secDiv.querySelectorAll('img, video')
    console.log(media);
    
    let currentMedia;
    media.forEach( (element, index) => {
        element.addEventListener('click', e =>{
            // console.log(e);
            lightbox.classList.add('active')
            currentMedia = element.cloneNode(true)
            let title = photograph.title
            boxContainer.appendChild(currentMedia)
            // console.log(e.target.parentNode);

            nextLightbox.addEventListener('click', ()=>{
                // let media2 = Array.from(media)
                // console.log(media2)
                // console.log(media2[2])
                console.log(currentMedia)
                // console.log(currentMedia.target)
                // console.log(media2.indexOf(currentMedia))
                let courantIndex = index + 1;
                if(media.length <= courantIndex){
                    courantIndex = 0;
                }
               
                
                let base = media[courantIndex]
                console.log(base)
                // currentMedia.src = media[(media.indexOf(currentMedia) +1) || 0]
                // console.log(media2[(media2.indexOf(currentMedia) +1) || 0])
            })
        })
        
    })
}



function factoryMediaElt() {

    function eltImage(match , photograph){
        //Création délemment image HTML
        let picture = document.createElement('img')
        const words = photograph.name.split(' ')
        // picture.src = 'SamplePhotos/' + match.image
        picture.src = 'SamplePhotos/' + words[0] + '/' + match.image    
        return picture;
    }

    function eltVideo(match , photograph){
        let video = document.createElement('video')
        const words = photograph.name.split(' ')
        video.src = 'SamplePhotos/' + words[0] + '/' + match.video
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



function triData (match, triBtn) {
    console.log('ok')
    document.getElementById("Photos").innerHTML = "";
    
    // let triBtnElt = document.getElementById('tri-select')
    // var value = triBtnElt.options[triBtnElt.selectedIndex].value;
    var value = triBtn.options[triBtn.selectedIndex].value;
    console.log(value)
    console.log(match)

    if (value === 'Date') {
        function SortArray(x, y){
            if (x.date > y.date) {return -1;}
            if (x.date < y.date) {return 1;}
            return 0;
        }
        match = match.sort(SortArray);
        console.log(match);

    } else if (value === 'Popularité') {
        function SortArray(x, y){
            if (x.likes > y.likes) {return -1;}
            if (x.likes < y.likes) {return 1;}
            return 0;
        }
        match = match.sort(SortArray);
        console.log(match);

    } else if (value === 'Titre') {

        function SortArray(x, y){
            if (x.title < y.title) {return -1;}
            if (x.title > y.title) {return 1;}
            return 0;
        }
        match = match.sort(SortArray);
        console.log(match);
    }
}



function afficherLikePrix(match, photograph, facto) {
    //like
    
    totalLikes = function(){
        var total = 0;
        for (let i = 0; i < match.length; i++) {
        total = total + match[i].likes;        
        }
        return total;
    }
    console.log(totalLikes(match));

    let sumLike = document.createElement('p')
    sumLike.innerHTML = totalLikes(match)
    info.appendChild(sumLike)

    // modification nombre de like

    ///ajout de like
    const ok = document.getElementById('header')
    op = ok.querySelector('img')
    console.log(op);
    op.addEventListener('click', e=>{
        totalLikes()
    })
    // const bb = afficherPhotos(facto)
    // console.log(bb);

    //prix
    let prix = document.createElement('p')
    prix.innerHTML = photograph.price + '€/jour'
    info.appendChild(prix)

       
}
