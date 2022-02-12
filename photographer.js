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
let titreBtn = document.getElementById('customselect-titre')
let dateBtn = document.getElementById('customselect-date')
let likeBtn = document.getElementById('customselect-close')


fetch('data.json').then(response => {
    return response.json();
  }).then(data => {

    //info photographe
    const photographers = data.photographers;    
    const photograph = photographers.find(photographe => photographe.id == urlId)
    afficherInfo(photograph)


    //affichage de ses photos
    const photos = data.media
    let match = photos.filter( photo => photo.photographerId == urlId )
    function SortArray(x, y){
        if (x.likes > y.likes) {return -1;}
        if (x.likes < y.likes) {return 1;}
        return 0;
    }
    match = match.sort(SortArray);
    afficherPhotos(match, photograph)
     


    //Contact ajout nom
    contact.innerText = 'Contactez-moi' + ' ' +  photograph.name

    // afficherLightbox()
    displayLightbox()
    
    // triBtn.addEventListener('change', triData())
    titreBtn.addEventListener('click', () => {
        // triData(match , triBtn);
        titre(match)
        afficherPhotos(match, photograph)
        launchLigthbox()
        afficherLikePrix(photograph)
        
    })
    titreBtn.addEventListener('keydown',function(event){
        if(event.key === "Enter"){
            titre(match)
            afficherPhotos(match, photograph)
            launchLigthbox()
            afficherLikePrix(photograph)
        }
    })

    dateBtn.addEventListener('click', () => {
        // triData(match , triBtn);
        date(match)
        afficherPhotos(match, photograph)
        launchLigthbox()
        afficherLikePrix(photograph)
        
    })
    

    likeBtn.addEventListener('click', () => {
        // triData(match , triBtn);
        like(match)
        afficherPhotos(match, photograph)
        launchLigthbox()
        afficherLikePrix(photograph)
        
    })
    
    
    //Afficher prix/like
    afficherLikePrix(photograph)

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
    profilepicture.src = 'SamplePhotos/PhotographersIDPhotos/' + photograph.portrait 
    profilepicture.setAttribute('alt', photograph.name)
    div2.appendChild(profilepicture)

}



function afficherPhotos (match, photograph) {
    const facto = factoryMediaElt(match)
    let coeurVide 
    let coeur 
    let divlike
    let heart
    let arrayLikes = {}
    match.forEach( (item) => {
        // Element image or vidéo
        let mediaElt = facto.choiceElt(item , photograph)
        mediaElt.setAttribute('alt', item.title)
        mediaElt.setAttribute('tabindex', '0')
        mediaElt.setAttribute('onkeydown', 'launchLigthbox()')
        // Conception de la suite de HTML (Carte media)
        let div3 = document.createElement('a')
        div3.setAttribute('class', 'photo-container')
        secDiv.appendChild(div3)

        let description = document.createElement('p')
        description.innerHTML = item.title

        //div like  
        heart = document.createElement('p')
        heart.innerHTML = item.likes   
        heart.setAttribute('class', 'numberLike')     
        coeurVide = document.createElement('p')
        coeurVide.setAttribute('class', 'coeurVide')
        coeur = document.createElement('p')
        coeur.setAttribute('class', 'coeur')
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

    
    

    
}


function displayLightbox() {
    window.onload = () =>{
        launchLigthbox();
    }

}

function launchLigthbox(){
    let gallery = secDiv.querySelectorAll('img, video')
    maxIndex = gallery.length - 1;
    for (let i = 0; i < gallery.length; i++) {
        let newIndex = i;
        let clickImgIndex;
        function display (){
           clickImgIndex = newIndex;
           lightbox.classList.add('active')

           function changeImage() {
               let selected = gallery[newIndex].cloneNode(true)
               boxContainer.innerHTML = "";
               let title = gallery[newIndex].parentNode.querySelector('p').cloneNode(true)
               boxContainer.appendChild(selected)
               boxContainer.appendChild(title)
            }
           changeImage();

           prevLightbox.onclick = ()=>{
               newIndex--
               if (newIndex < 0) {
                   newIndex = maxIndex
               } 
               changeImage();
            }
         

           nextLightbox.onclick = ()=>{
               newIndex++;
               if (newIndex > maxIndex) {
                   newIndex = 0;
               }
               changeImage()
            }

            document.onkeydown = function Left (e) {
                switch (e.key) {
                    case 'ArrowLeft':
                        newIndex--
                        if (newIndex < 0) {
                        newIndex = maxIndex
                        } 
                        changeImage();
                        break;
                    case 'ArrowRight':
                        newIndex++;
                        if (newIndex > maxIndex) {
                            newIndex = 0;
                        }
                        changeImage()
                        break;
                }
            };


            closeLightbox.onclick = ()=>{
                newIndex = clickImgIndex;
                lightbox.classList.remove('active')
            }
            document.addEventListener('keydown', function(event){
                if(event.key === "Escape"){
                    lightbox.classList.remove('active')
                }
            });
        }
        gallery[i].onclick = ()=>{
           display()
        }
        gallery[i].addEventListener('keydown',function(event){
            if(event.key === "Enter"){
                display()
            }
        })
    }
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
            elt = this.eltImage(match , photograph)
        }else{
            elt = this.eltVideo(match , photograph)
        }
        return elt;

    }

    return {
        eltImage,
        eltVideo,
        choiceElt
    }

}

function afficherLikePrix(photograph) {
    //like
    info.innerHTML = ""
    let list =  Array.from(document.querySelectorAll('.numberLike'));
    let total = list.reduce((total,value) => (total += Number(value.textContent)),0);

    let sumLike = document.createElement('p')
    sumLike.innerHTML = total + '&nbsp <i class="fas fa-heart"></i>'
    info.appendChild(sumLike)

    // click coeur vide (pas liké)
    const allCoeurVide = document.querySelectorAll('.far')
    allCoeurVide.forEach(element => {
        element.addEventListener('click', e=>{
            e.target.parentNode.parentNode.querySelector('.numberLike').innerHTML = Number(e.path[2].querySelector('.numberLike').textContent)+1;
            e.target.parentNode.parentNode.querySelector('.coeur').style.display = 'block'
            e.target.parentNode.style.display = 'none'
            total = total +1
            sumLike.innerHTML = total + '&nbsp <i class="fas fa-heart"></i>'
        })
    });

    //click coeur plein(liké)
    const allCoeur = document.querySelectorAll('.fas')
    allCoeur.forEach(element => {
        element.addEventListener('click', e=>{
            e.target.parentNode.parentNode.querySelector('.coeurVide').style.display = 'block'
            e.target.parentNode.style.display = 'none'
            e.target.parentNode.parentNode.querySelector('.numberLike').innerHTML = Number(e.path[2].querySelector('.numberLike').textContent)-1;
            total = total -1
            sumLike.innerHTML = total + '&nbsp <i class="fas fa-heart"></i>'
        })
    });

    //prix
    let prix = document.createElement('p')
    prix.innerHTML = photograph.price + '€ / jour'
    
    info.appendChild(prix)

       
}


// fonction pour tri
function titre (match) {
    document.getElementById("Photos").innerHTML = "";
    function SortArray(x, y){
        if (x.title < y.title) {return -1;}
        if (x.title > y.title) {return 1;}
        return 0;
    }
    match = match.sort(SortArray);
}

function date (match) {
    document.getElementById("Photos").innerHTML = "";
    function SortArray(x, y){
        if (x.date < y.date) {return -1;}
        if (x.date > y.date) {return 1;}
        return 0;
    }
    match = match.sort(SortArray);
}

function like (match) {
    document.getElementById("Photos").innerHTML = "";
    function SortArray(x, y){
        if (x.likes > y.likes) {return -1;}
        if (x.likes < y.likes) {return 1;}
        return 0;
    }
    match = match.sort(SortArray);
}

