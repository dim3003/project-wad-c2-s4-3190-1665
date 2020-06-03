//cd/EPFL Web Dev/hats_and_things

let hat = {
  name: '<name>',
  price: '<price>',
  color: '<color>',
  image: '<imageHref>',

  toString: function() {
    return (this.name + ", color: " + this.color + ", price: " + this.price + ", image: " + this.image)
  }
}


function Hat(name, price, color, image) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.image = image;
}

Hat.prototype.toString = function() {
  return (this.name + ", color: " + this.color + ", price: " + this.price + ", image: " + this.image);
}


let hats = [
  new Hat('Baseball cap', '11.99', 'Red', 'assets/images/red/hats/1.png'),
  new Hat('Baseball cap', '11.99', 'Blue', 'assets/images/blue/hats/1.png'),
  new Hat('Baseball cap', '11.99', 'Yellow', 'assets/images/yellow/hats/1.png'),
  new Hat('Baseball cap', '11.99', 'Green', 'assets/images/green/hats/1.png'),
  new Hat('Beanie', '17.99', 'Red', 'assets/images/red/hats/2.png'),
  new Hat('Beanie', '17.99', 'Blue', 'assets/images/blue/hats/2.png'),
  new Hat('Beanie', '17.99', 'Green', 'assets/images/green/hats/2.png'),
  new Hat('Straw hat', '10.99', 'Yellow', 'assets/images/yellow/hats/3.png'),
  new Hat('Straw hat', '10.99', 'Blue', 'assets/images/blue/hats/3.png'),
  new Hat('Trilby', '10.99', 'Red', 'assets/images/red/hats/4.png'),
  new Hat('Trilby', '10.99', 'Blue', 'assets/images/blue/hats/4.png'),
  new Hat('Trilby', '10.99', 'Yellow', 'assets/images/yellow/hats/4.png'),
];

function displayHat(hat) {

  //Creating the HTML element

  let newHat = document.createElement('div');
  newHat.className += 'accessory col-sm-4 ' + hat.color;

  let my3 = document.createElement('div');
  my3.className += 'card my-3';

  let currency = document.createElement('div');
  currency.className += 'currency btn btn-light disabled';
  currency.textContent = hat.price;

  let image = document.createElement('img');
  image.className += 'card-img-top';
  image.src += hat.image;
  image.alt = 'Image of ' + hat.name;

  let cardbody = document.createElement('div');
  cardbody.className += 'card-body text-center';

  let cardtitle = document.createElement('h5');
  cardtitle.className += 'card-title';
  cardtitle.textContent = hat.name;

  let cardtext = document.createElement('p');
  cardtext.className += 'card-text';
  cardtext.textContent = 'Color: '

  let em = document.createElement('em');
  em.textContent = hat.color;

  cardtext.appendChild(em);

  let button = document.createElement('button');
  button.className += 'btn btn-outline-primary';
  button.textContent = 'Add to wishlist!';

  cardbody.appendChild(cardtitle);
  cardbody.appendChild(cardtext);
  cardbody.appendChild(button);

  my3.appendChild(currency);
  my3.appendChild(image);
  my3.appendChild(cardbody);

  newHat.appendChild(my3);

  return newHat;
}

let products = document.getElementById('products')
products.innerHTML = null;

for (i = 0; i < hats.length; i++) {
  products.appendChild(displayHat(hats[i]));
}


//Create all button
let filterButtons = document.querySelectorAll('.btn-group .btn')

let allButton = document.createElement('button');
allButton.setAttribute('type', 'button');
allButton.className = 'btn btn-outline-secondary';
allButton.textContent = 'All';

console.log(filterButtons.length);
console.log(filterButtons);
filterButtons.item(filterButtons.length - 1).parentNode.appendChild(allButton);

let filterButtons2 = document.querySelectorAll('.btn-group .btn');
console.log(filterButtons2.length);
console.log(filterButtons2);
//Filter by Color

for (i = 0; i < filterButtons2.length; i++) {
  filterButtons2[i].className = 'btn btn-outline-secondary';
}

for (i = 0; i < filterButtons2.length; i++) {
  filterButtons2[i].addEventListener('click',
    function highlightSelectedFilter() {
      for (i = 0; i < filterButtons2.length; i++) {
        filterButtons2[i].className = 'btn btn-outline-secondary';
      }
      this.className += ' active'
    }, false)
}

let allProducts = products.children;

//addEventListener click filter filterButtons2

for (i = 0; i < filterButtons2.length; i++) {
  filterButtons2[i].addEventListener('click',
    function filterHatsByColor() {
      for (i = 0; i < allProducts.length; i++) {
        allProducts.item(i).style.display = 'none';
        let arrayClass = allProducts.item(i).className.split(' ')
        if (arrayClass[arrayClass.length - 1] == this.textContent) {
          allProducts.item(i).style.display = 'block';
        } else if (this.textContent == 'All') {
          allProducts.item(i).style.display = 'block';
        } else {}
      }

    }, false)
}
