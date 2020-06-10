//cd/EPFL Web Dev/hats_and_things

let hat = {
  name: '<name>',
  price: '<price>',
  color: '<color>',
  imageHref: '<imageHref>',

  toString: function() {
    return (this.name + ", color: " + this.color + ", price: " + this.price + ", image: " + this.image)
  }
}


function Accessory(name, price, color, image) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.imageHref = image;
}

Accessory.prototype.toString = function() {
  return (this.name + ", color: " + this.color + ", price: " + this.price + ", image: " + this.image);
}


let hats = [
  new Accessory('Baseball cap', '11.99', 'red', './assets/images/red/hats/1.png'),
  new Accessory('Baseball cap', '11.99', 'blue', './assets/images/blue/hats/1.png'),
  new Accessory('Baseball cap', '11.99', 'yellow', './assets/images/yellow/hats/1.png'),
  new Accessory('Baseball cap', '11.99', 'green', './assets/images/green/hats/1.png'),
  new Accessory('Beanie', '17.99', 'red', './assets/images/red/hats/2.png'),
  new Accessory('Beanie', '17.99', 'blue', './assets/images/blue/hats/2.png'),
  new Accessory('Beanie', '17.99', 'green', './assets/images/green/hats/2.png'),
  new Accessory('Straw hat', '10.99', 'yellow', './assets/images/yellow/hats/3.png'),
  new Accessory('Straw hat', '10.99', 'blue', './assets/images/blue/hats/3.png'),
  new Accessory('Trilby', '10.99', 'red', './assets/images/red/hats/4.png'),
  new Accessory('Trilby', '10.99', 'blue', './assets/images/blue/hats/4.png'),
  new Accessory('Trilby', '10.99', 'yellow', './assets/images/yellow/hats/4.png'),
];

function displayAccessory(accessory) {

  //Creating the HTML element

  let newAccessory = document.createElement('div');
  newAccessory.className += 'accessory col-sm-4 ' + accessory.color;

  let my3 = document.createElement('div');
  my3.className += 'card my-3';

  let currency = document.createElement('div');
  currency.className += 'currency btn btn-light disabled';
  currency.textContent = accessory.price;

  let image = document.createElement('img');
  image.className += 'card-img-top';
  image.src += accessory.imageHref;
  image.alt = 'Image of ' + accessory.name;

  let cardbody = document.createElement('div');
  cardbody.className += 'card-body text-center';

  let cardtitle = document.createElement('h5');
  cardtitle.className += 'card-title';
  cardtitle.textContent = accessory.name;

  let cardtext = document.createElement('p');
  cardtext.className += 'card-text';
  cardtext.textContent = 'Color: '

  let em = document.createElement('em');
  em.textContent = accessory.color;

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

  newAccessory.appendChild(my3);

  return newAccessory;
}

let products = document.getElementById('products')
products.innerHTML = null;

hats.forEach(elem => products.appendChild(displayAccessory(elem)));

/*----------------
//FILTER BUTTONS
---------------*/

const filterButtonsContainer = document.querySelector('.btn-group')

const filterButtons = filterButtonsContainer.childNodes;

let allButton = document.createElement('button');
allButton.setAttribute('type', 'button');
allButton.className = 'btn btn-outline-secondary';
allButton.textContent = 'All';

filterButtonsContainer.appendChild(allButton);

//Filter by Color

function highlightSelectedFilter(el) {
  filterButtons.forEach(function(el) {
    el.className = 'btn btn-outline-secondary'
  });
  el.className += ' active';
}

filterButtons.forEach(elem => elem.className = 'btn btn-outline-secondary');

filterButtons.forEach(elem =>
  elem.addEventListener('click',
    function() {
      highlightSelectedFilter(elem)
    },
    false)
);

//all accessories nodelist
const allProducts = products.childNodes;

//function to bind wishlist BUTTONS
function bindWishButton(allProducts) {
  allProducts.forEach((el) => {
    let wishButton = el.querySelector('.card .card-body .btn');
    wishButton.addEventListener('click',
      function() {
        addToWhishlist(el);
      },
      false)
  });
}

//Bind whishbuttons when loading for the first time
bindWishButton(allProducts);

//addEventListener click filter filterButtons
function filterAccesoriesByColor(el) {
  for (i = 0; i < allProducts.length; i++) {
    allProducts.item(i).style.display = 'none';
    const arrayClass = allProducts.item(i).className.split(' ')
    if (arrayClass[arrayClass.length - 1] == el.textContent.toLowerCase()) {
      allProducts.item(i).style.display = 'block';
    } else if (el.textContent == 'All') {
      allProducts.item(i).style.display = 'block';
    } else {}
  }
}

filterButtons.forEach(el =>
  el.addEventListener('click',
    function() {
      filterAccesoriesByColor(el);
    },
    false)
)

/* ----------------------------
AJAX function to retrieve JSON
------------------------------*/
const navButtonsContainer = document.querySelector('.navbar-nav');
const navButtons = navButtonsContainer.childNodes;

function loadRemoteAccessories(el) {
  let navTitle = el.textContent.replace(/\s+/g, '');
  let request = new XMLHttpRequest();
  request.open('GET', './' + navTitle.toLowerCase() + '.json');

  request.send();
  request.onload = () => {
    let accessories = JSON.parse(request.responseText);
    //REMOVE CURRENT
    products.innerHTML = '';
    //RENDER NEW
    accessories.forEach(elem => products.appendChild(displayAccessory(elem)));

    //Bind wishbuttons when reloading elements
    bindWishButton(allProducts);

    //Filter by color if already selected filterbutton
    let select = document.querySelector('.active');
    if (select) {
      filterAccesoriesByColor(select);
    } else {}
  }
}

//Hats BUTTONS
navButtons.item(1).addEventListener('click',
  function() {
    products.innerHTML = '';

    let accessories = hats;
    accessories.forEach(elem => products.appendChild(displayAccessory(elem)));

    //Bind hats wishlist buttons if reloading
    bindWishButton(allProducts);

    //filter by color if already clicked filter button
    let select = document.querySelector('.active');
    if (select) {
      filterAccesoriesByColor(select);
    } else {}
  },
  false
)

//sunglasses and socks buttons
let i;
for (i = 5; i > 1; i = i - 2) {
  navButtons.item(i).addEventListener('click',
    function() {
      loadRemoteAccessories(this);
    },
    false)
}

/*-----------------
GLOVES
------------------*/

let glove = document.createElement('li');
glove.className = 'nav-item';
glove.innerHTML = '<button class="nav-link btn btn-outline-secondary mr-3">Gloves</button>';

navButtonsContainer.appendChild(glove);

glove.addEventListener('click',
  function() {
    loadRemoteAccessories(glove);
  }, false)



/*-----------
WISHLIST
---------------*/

//bind whishlistbutton is on line 137/149/192/211

function addToWhishlist(accessory) {
  console.log(accessory);
}
