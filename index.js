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

    const tags = document.querySelectorAll('nav span')
    console.log(tags)

    tags.forEach(element => {
        element.addEventListener('click' , (e) =>{
          console.log(e.target.dataset.tag)
          renderPhotographe(photographers)
        })
    });
    
    //si je clique tag
      //tab photographers -> filtre pa rapport au tag -> return filterPhotographers
      //renderPhotographe(filterPhotographers)
    //Else plus de tag
      //renderPhotographe(photographers)

  }).catch(error => {
    // Do something for an error here
    console.error(error)
});

let recipes = [
  {
    'title': 'Jus d\'orange',
    'ingredients': ['orange']
  },
  {
    'title': 'Tarte aux agrumes',
    'ingredients': ['farine', 'beurre', 'sucre', 'oeuf', 'citron', 'orange', 'clémentine']
  },
  {
    'title': 'Citronnade',
    'ingredients': ['eau', 'citron']
  }
];

let match = recipes.filter(function(element) {
  for (let i = 0; i < element.ingredients.length; i++) {
    if (element.ingredients[i] === 'citron') {
      return element;
    }
  }
});

console.table(match);


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