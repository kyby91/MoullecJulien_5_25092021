//Mettre le code JavaScript lié à la page photographer.html
//DOM
const firstDiv = document.querySelector('main div')
const urlParams = new URLSearchParams(window.location.search)
const urlId = urlParams.get("id")
const secDiv = document.getElementById('Photos')


fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
      //info photographe
    const photographers = data.photographers;

   
    
    const photograph = photographers.find(photographe => photographe.id == urlId)

    console.log( photograph.name.split(' '))


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



    //affichage de ses photos

    const photos = data.media

    let match = photos.filter( photo => photo.photographerId == urlId )

    const facto = factoryMediaElt()
    match.forEach( item => {
        // Element image or vidéo
        let mediaElt = facto.choiceElt(item , photograph)
        console.log(mediaElt)
        // Conception de la suite de HTML (Carte media)
        let div3 = document.createElement('div')
        secDiv.appendChild(div3)
        console.log(secDiv);

        let description = document.createElement('p')
        description.innerHTML = item.title

        let heart = document.createElement('p')
        heart.innerHTML = item.likes

        let icon = document.createElement('p')
        icon.innerHTML = '<i class="fas fa-heart"></i>';

        //Appendchilm
        div3.appendChild(mediaElt)
        div3.appendChild(description)
        div3.appendChild(heart)
        div3.appendChild(icon)
        
    })




}).catch(error=> {
    console.error(error)
})

// "/SamplePhotos/Ellie Rose/Architecture_Connected_Curves.jpg"
// "\SamplePhotos\Nabeel\Travel_On_the_Road.jpg"




function factoryMediaElt() {


    function eltImage(data , photograph){
        //Création délemment image HTML
        let picture = document.createElement('img')
        const words = photograph.name.split(' ')
        // picture.src = 'SamplePhotos/' + data.image
        picture.src = 'SamplePhotos/' + words[0] + '/' + data.image
        return picture;
    }

    function eltVideo(data , photograph){
        let video = document.createElement('video')
        const words = photograph.name.split(' ')
        video.src = 'SamplePhotos/' + words[0] + '/' + data.video
        return video;
    }


    function choiceElt(data , photograph){
        let elt;
        if(data.image){   
            // elt = 'image'
            elt = this.eltImage(data , photograph)
        }else{
            elt = this.eltVideo(data , photograph)
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
