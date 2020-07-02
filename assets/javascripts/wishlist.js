const products = document.getElementById('products');
const allProducts = products.childNodes;

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
  button.className += 'btn btn-outline-danger';
  button.textContent = 'Remove';

  cardbody.appendChild(cardtitle);
  cardbody.appendChild(cardtext);
  cardbody.appendChild(button);

  my3.appendChild(currency);
  my3.appendChild(image);
  my3.appendChild(cardbody);

  newAccessory.appendChild(my3);

  return newAccessory;
};


function retrieveAccessories() {
  let accessory1 = JSON.parse(localStorage.getItem('accessory1'));
  let accessory2 = JSON.parse(localStorage.getItem('accessory2'));
  let accessory3 = JSON.parse(localStorage.getItem('accessory3'));

  return [accessory1, accessory2, accessory3];
}

function eraseWhishlist() {
  products.innerText = '';
}



function displayWishList() {
  eraseWhishlist();
  let accessories = retrieveAccessories();
  accessories.forEach((el) => {
    if (el != null) {
      let newEl = displayAccessory(el);
      products.appendChild(newEl);

      //binding the button of new elem
      let newElButton = newEl.querySelector('.btn.btn-outline-danger');
      newElButton.addEventListener('click',
        function() {
          let itemKey = 'accessory' + (accessories.indexOf(el) + 1);
          removeFromWishlist(itemKey, newEl)
        },
        false)
    } else {}
  })
}




function removeFromWishlist(key, htmlComponent) {
  console.log(key + '   ' + htmlComponent);
  localStorage.removeItem(key);
  htmlComponent.remove();
  displayWishList();
}



displayWishList();
