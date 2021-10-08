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
      localisation.innerHTML = photographer.city + photographer.country
      div.appendChild(localisation)

      let tagline = document.createElement('p')
      tagline.innerHTML = photographer.tagline
      div.appendChild(tagline)

      let price = document.createElement('p')
      price.innerHTML = photographer.price +'€/jour'
      div.appendChild(price)

      photographer.tags.forEach(tag => {
        let t = document.createElement('p');
        t.innerHTML = tag;
        div.appendChild(t);
      });

      document.getElementById("main").appendChild(div)
    });
  }).catch(err => {
    // Do something for an error here
});