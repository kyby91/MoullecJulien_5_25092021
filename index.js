fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
    const photographers = data.photographers;
    renderPhotographe(photographers)

    // const tags = document.querySelectorAll('nav div')

    // tags.forEach(element => {
    //     element.addEventListener('click' , (e) =>{
    //       console.log(e.target)
    //       let myTag = e.target.dataset.tag
    //       let active = e.target.classList

    //       console.log(tags)

    //       if (Array.from(element.classList).includes('active')) {
    //         renderPhotographe(photographers)
    //         active.remove('active')
    //       } else {
    //         let match = photographers.filter( photographer => photographer.tags.includes(myTag) ) 
    //         console.log(match)
    //         tags.forEach(element=> {
    //           element.classList.remove('active')
    //         })
    //         active.add('active')
    //         renderPhotographe(match)
    //       }
    //     })
    // });



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
    profilepicture.src = '/SamplePhotos/PhotographersIDPhotos/' + photographer.portrait
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

    // let div1 = document.createElement('div')
    // div1.setAttribute('class', 'filter')
    // photographer.tags.forEach(tag => {
    //   let t = document.createElement('p');
    //   t.innerHTML = '#' + tag;
    //   div1.appendChild(t)
    // });
    
    // div.appendChild(div1)

    document.getElementById("main").appendChild(lien)
  });
}