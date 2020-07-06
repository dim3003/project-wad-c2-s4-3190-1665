const hat = {
  name: '<name>',
  price: '<price>',
  color: '<color>',
  imageHref: '<imageHref>',

  toString: function() {
    return (this.name + ", color: " + this.color + ", price: " + this.price + ", image: " + this.imageHref)
  }
}


function Accessory(name, price, color, accessoryImage) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.imageHref = accessoryImage;
}

Accessory.prototype.toString = function() {
  return (this.name + ", color: " + this.color + ", price: " + this.price + ", image: " + this.imageHref);
}


const hats = [
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

  const newAccessory = document.createElement('div');
  newAccessory.className += 'accessory col-sm-4 ' + accessory.color;

  const my3 = document.createElement('div');
  my3.className += 'card my-3';

  const currency = document.createElement('div');
  currency.className += 'currency btn btn-light disabled';
  currency.textContent = accessory.price;

  const accessoryImage = document.createElement('img');
  accessoryImage.className += 'card-img-top';
  accessoryImage.src += accessory.imageHref;
  accessoryImage.alt = 'Image of ' + accessory.name;

  const cardbody = document.createElement('div');
  cardbody.className += 'card-body text-center';

  const cardtitle = document.createElement('h5');
  cardtitle.className += 'card-title';
  cardtitle.textContent = accessory.name;

  const cardtext = document.createElement('p');
  cardtext.className += 'card-text';
  cardtext.textContent = 'Color: '

  const em = document.createElement('em');
  em.textContent = accessory.color;

  cardtext.appendChild(em);

  const accessoryButton = document.createElement('button');
  accessoryButton.className += 'btn btn-outline-primary';
  accessoryButton.textContent = 'Add to wishlist!';

  cardbody.appendChild(cardtitle);
  cardbody.appendChild(cardtext);
  cardbody.appendChild(accessoryButton);

  my3.appendChild(currency);
  my3.appendChild(accessoryImage);
  my3.appendChild(cardbody);

  newAccessory.appendChild(my3);

  return newAccessory;
};

const products = document.getElementById('products')
products.innerText = null;

hats.forEach(elem => products.appendChild(displayAccessory(elem)));

/*----------------
//FILTER BUTTONS
---------------*/

const filterButtonsContainer = document.querySelector('.btn-group')

const filterButtons = filterButtonsContainer.childNodes;

const allButton = document.createElement('button');
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
function bindWishButton(allProducts, accessories) {
  let i;
  allProducts.forEach((el, i) => {
    let wishButton = el.querySelector('.card .card-body .btn');
    wishButton.addEventListener('click',
      function() {
        addToWhishlist(accessories[i]);
      },
      false)
  });
}

//Bind whishbuttons when loading for the first time
bindWishButton(allProducts, hats);

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
    products.innerText = '';
    //RENDER NEW
    accessories.forEach(elem => products.appendChild(displayAccessory(elem)));

    //Bind wishbuttons when reloading elements
    bindWishButton(allProducts, accessories);

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
    products.innerText = '';

    let accessories = hats;
    accessories.forEach(elem => products.appendChild(displayAccessory(elem)));

    //Bind hats wishlist buttons if reloading
    bindWishButton(allProducts, accessories);

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

const gloveElem = document.createElement('li');
gloveElem.className = 'nav-item';

const gloveButton = document.createElement('button');
gloveButton.className = 'nav-link btn btn-outline-secondary mr-3'
gloveButton.innerText = 'Gloves';


gloveElem.appendChild(gloveButton);
navButtonsContainer.appendChild(gloveElem);

glove.addEventListener('click',
  function() {
    loadRemoteAccessories(glove);
  }, false)



/*-----------
WISHLIST
---------------*/

//bind whishlistbutton is on line 137/149/192/211

function addToWhishlist(accessory) {
  if (localStorage.accessory1 == undefined) {
    localStorage.setItem('accessory1', JSON.stringify(accessory));
  } else if (localStorage.accessory2 == undefined) {
    localStorage.setItem('accessory2', JSON.stringify(accessory));
  } else if (localStorage.accessory3 == undefined) {
    localStorage.setItem('accessory3', JSON.stringify(accessory));
  } else {
    alert('No more than 3 elements in the wishlist. Sorry :/');
  }
}
