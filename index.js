//DOM
const data1 = document.getElementById('data1')
const newElt = document.createElement("div")
const elt = document.querySelectorAll('main')



fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
    const photographers = data.photographers;
    photographers.forEach(photographer => {
      let div = document.createElement('div')
      div.setAttribute('id', 'id-' + photographer.id)
      console.log(div)

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
        t.innerHTML = tag;
        div1.appendChild(t)
      });
      
      div.appendChild(div1)

      document.getElementById("main").appendChild(div)
    });


    let mimi = document.createElement('img')
    mimi.src = 'SamplePhotos/Mimi/Portrait_Nora.jpg'
    document.getElementById('id-243').appendChild(mimi)

    let ellie = document.createElement('img')
    ellie.src = 'SamplePhotos/Ellie Rose/Architecture_Horseshoe.jpg'
    document.getElementById('id-930').appendChild(ellie)

    let tracy = document.createElement('img')
    tracy.src = 'SamplePhotos/Tracy/Fashion_Urban_Jungle.jpg'
    document.getElementById('id-82').appendChild(tracy)

    let nabeel = document.createElement('img')
    nabeel.src = 'SamplePhotos/Nabeel/Travel_Outdoor_Baths.jpg'
    document.getElementById('id-527').appendChild(nabeel)

    let rhode = document.createElement('img')
    rhode.src = 'SamplePhotos/Rhode/Fashion_Melody_Red_on_Stripes.jpg'
    document.getElementById('id-925').appendChild(rhode)

    let marcel = document.createElement('img')
    marcel.src = 'SamplePhotos/Marcel/Travel_Tower.jpg'
    document.getElementById('id-195').appendChild(marcel)

  }).catch(error => {
    // Do something for an error here
    console.error(error)
});


