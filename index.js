fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
    const photographers = data.photographers;
    renderPhotographe(photographers)

  }).catch(error => {
    // Do something for an error here
    console.error(error)
});


function renderPhotographe(photographers){

  document.getElementById("main").innerHTML = "";

  photographers.forEach(photographer => {

    let lien = document.createElement('a')
    lien.href = 'photographer.html?id=' + photographer.id
    
    let div = document.createElement('div')
    div.setAttribute('id', 'id-' + photographer.id)
    lien.appendChild(div)

    let profilepicture = document.createElement('img')
    profilepicture.src = 'SamplePhotos/PhotographersIDPhotos/' + photographer.portrait
    profilepicture.setAttribute('alt', photographer.name)
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

    document.getElementById("main").appendChild(lien)
  });
}