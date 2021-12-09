//DOM
const data1 = document.getElementById('data1')
const newElt = document.createElement("div")
const elt = document.querySelectorAll('main')




// document.addEnventListener

// tags.addEnventListener





fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
    const photographers = data.photographers;
    renderPhotographe(photographers)




    const tags = document.querySelectorAll('nav div')
    console.log(photographers)

    tags.forEach(element => {
        element.addEventListener('click' , (e) =>{
          let match = photographers.filter(function(element) {
            for (let i = 0; i < element.tags.length; i++) {
              if (element.tags[i] === 'art') {
                return element;
              }
            }
          });
          console.log(e)
          renderPhotographe(match)

        })
    });

    
    


    tags.forEach(tag => {
      if (Array.from(tag.classList).includes('active')) {
        tag.classList.remove('active')
        // le reste de ce que tu veux faire quand tu deselectionne un tag  
        return
      }
    
      tag.classList.add('active')
      //le reste de ce que tu veux faire quand on selectionne un tag
      filterPhotographers = photographers.filter(photographer => photographer.tags == tag.innerText) // en partant du principe que le nom de ton tag c'est du texte html  
    })

    
    //si je clique tag
      //tab photographers -> filtre pa rapport au tag -> return filterPhotographers
      //renderPhotographe(filterPhotographers)
    //Else plus de tag
      //renderPhotographe(photographers)


  }).catch(error => {
    // Do something for an error here
    console.error(error)
});








function renderPhotographe(photographers){

  document.getElementById("main").innerHTML = "";

  photographers.forEach(photographer => {
    
    let div = document.createElement('div')
    div.setAttribute('id', 'id-' + photographer.id)
    console.log(div)

    let profilepicture = document.createElement('img')
    profilepicture.src = '/SamplePhotos/PhotographersIDPhotos/' + photographer.portrait
    //"C:\Users\Julien\Desktop\P5\SamplePhotos\PhotographersIDPhotos\TracyGalindo.jpg"
    div.appendChild(profilepicture)

    let h2 = document.createElement('h2')
    h2.innerHTML = photographer.name
    div.appendChild(h2)

    let localisation = document.createElement('p')
    localisation.setAttribute('class', 'localisation')
    localisation.innerHTML = photographer.city + ', ' + photographer.country
    div.appendChild(localisation)

    let tagline = document.createElement('p')
    tagline.setAttribute('class', 'tagline')
    tagline.innerHTML = photographer.tagline
    div.appendChild(tagline)

    let price = document.createElement('p')
    price.setAttribute('class', 'price')
    price.innerHTML = photographer.price +'€/jour'
    div.appendChild(price)

    let div1 = document.createElement('div')
    div1.setAttribute('class', 'filter')
    photographer.tags.forEach(tag => {
      let t = document.createElement('p');
      t.innerHTML = '#' + tag;
      div1.appendChild(t)
    });
    
    div.appendChild(div1)

    document.getElementById("main").appendChild(div)
  });
}