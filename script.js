
var mainContent = '';
var products = [];
var cartItems = [];
brand = document.getElementsByName('flexRadioDefault');
function load_page() {
  document.getElementById('flexRadioDefault1').checked = true;
  let http = new XMLHttpRequest();
  // the http variable holds all methods and properties of the object

  http.open('get', 'apple.json', 'true');
  // the first argument sets the http method
  // the second argument holds the json file path
  // third argument true, sets the request to be async

  // nextr is to send request
  http.send();

  // then catch the response
  http.onload = function () {
    // checking the status and readystate
    if (this.readyState == 4 && this.status == 200) {
      products = JSON.parse(this.responseText);


      // now loop throught the products
      // and in every iteration, add an html template
      shop_layout(products)
      document.getElementById('apple-quantity').innerHTML = products.length;
    }
    mainContent = document.getElementById('main').innerHTML;

  }
}

function check() {
  var products = [];
  for (let elem of brand) {
    if (elem.checked === true) {
      if (elem.value === 'Samsung') {
        let http = new XMLHttpRequest;
        http.open('get', 'samsung.json', 'true');
        http.send();
        http.onload = function () {
          // checking the status and readystate
          if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText);



            // now loop throught the products
            // and in every iteration, add an html template
            document.getElementById('phone-shop').innerHTML = '';
            shop_layout(products)
            document.getElementById('samsung-quantity').innerHTML = products.length;
            mainContent = document.getElementById('main').innerHTML;
          }
        }
      } else if (elem.value === 'Apple') {
        let http = new XMLHttpRequest();
        // the http variable holds all methods and properties of the object

        http.open('get', 'apple.json', 'true');
        // the first argument sets the http method
        // the second argument holds the json file path
        // third argument true, sets the request to be async

        // nextr is to send request
        http.send();

        // then catch the response
        http.onload = function () {
          // checking the status and readystate
          if (this.readyState == 4 && this.status == 200) {
             products = JSON.parse(this.responseText);



            // now loop throught the products
            // and in every iteration, add an html template
            document.getElementById('phone-shop').innerHTML = '';
            shop_layout(products)
            document.getElementById('apple-quantity').innerHTML = products.length;
            mainContent = document.getElementById('main').innerHTML;
          }


        }
      }
    }
  }

};
function shop_layout(products) {
  let output = '';
  let added = [];
  for (let item of products) {
      for(let i of cartItems){
        if (i.product_code === item.product_code){
          added.push(item);
        }
      }
      if (added.includes(item, 0)){
        output += `
        <div class="card phone-card pg-1" style="width: 15rem;" id="${item.product_code}">
    <img src="${item.images[0]}" class="card-img-top card-image" alt="${item.name}" id="${item.name}" onclick="detailed_phone('${item.brand}','${item.product_code}')">
    <div class="card-body" id="cardBody-${item.product_code}">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.description}.</p>
      <p class="item-price">#${item.price}.</p>
      <a class="btn btn-primary cart-btn" id="${item.product_code}_btn" >Added to cart</a>
    </div>
    </div>
    
    `;
    continue
      };

    output += `
        <div class="card phone-card pg-1" style="width: 15rem;" id="${item.product_code}">
    <img src="${item.images[0]}" class="card-img-top card-image" alt="${item.name}" id="${item.name}" onclick="detailed_phone('${item.brand}','${item.product_code}')">
    <div class="card-body" id="cardBody-${item.product_code}">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.description}.</p>
      <p class="item-price">#${item.price}.</p>
      <a class="btn btn-primary cart-btn" id="${item.product_code}_btn" onclick="add_to_cart('${item.brand}','${item.product_code}')">Add to cart</a>
    </div>
    </div>
    
    `;



  }
  document.getElementById('phone-shop').innerHTML = output;
  
}



controls = `<div class="page-controls">
        <nav aria-label="...">
  <ul class="pagination control">
    <li class="page-item ">
            <a class="page-link" href="" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item  pg-1" ><a class="page-link" href="#">1</a></li>
    <li class="page-item active pg-2 aria-current="page" >
      <span class="page-link">2</span>
    </li>
    <li class="page-item pg-3"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link"  aria-label="Next" id="next">
        <span aria-hidden="true">&raquo;</span>
      </a>

    </li>
  </ul>
</nav>
</div>`;


document.getElementById('page-control').innerHTML = controls;



function add_to_cart(brand, id) {
  // product = JSON.parse(product);
  console.log(brand, id)
  initial = document.getElementById('cart-quantity').innerHTML;
  new_quantity = parseInt(initial) + 1;
  document.getElementById('cart-quantity').innerHTML = new_quantity;
  document.getElementById(`${id}_btn`).innerHTML = 'Added to cart';
  document.getElementById(`${id}_btn`).onclick = null;
  if (brand === 'Samsung') {
    let http = new XMLHttpRequest;
    http.open('get', 'samsung.json', 'true');
    http.send();
    http.onload = function () {
      // checking the status and readystate
      if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);
        for (let item of products) {

          if (item.product_code === id) {
            cartItems.push(
              {
                image: item.images[0],
                name: item.name,
                brand: item.brand,
                description: item.description,
                price: item.price,
                product_code: item.product_code
              }
            );

          }
        }
      }
    }
  } else if (brand === 'Apple') {
    let http = new XMLHttpRequest;
    http.open('get', 'apple.json', 'true');
    http.send();
    http.onload = function () {
      // checking the status and readystate
      if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);
        for (let item of products) {
          if (item.product_code === id) {
            cartItems.push(
              {
                image: item.images[0],
                name: item.name,
                brand: item.brand,
                description: item.description,
                price: item.price,
                product_code: item.product_code
              }
            );

          }
        }
      }
    }
  }


}

function change_range() {
  range1 = document.getElementById('customRange1').value;
  range2 = document.getElementById('customRange2').value;

  document.getElementById('min-price').value = range1;
  document.getElementById('max-price').value = range2;
};


function show_cart() {
  main = document.getElementById('main');
  var contactus = '<div class="contactUs" id="contactUs">';
  contactus += document.getElementById('contactUs').innerHTML;
  main.innerHTML =  `<nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#" onclick="shopping()">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Shopping cart</li>
  </ol>
</nav>`;
  container = document.createElement('div');
  container.setAttribute('class', 'cart-container');
  const button = document.createElement('button');
  button.setAttribute('class','btn btn-secondary btn-contShopping');
  button.innerHTML = '<i class="bi bi-arrow-left-circle-fill"></i>Continue Shopping';
  container.append(button)  ;
  const tableContain = document.createElement('div');
  tableContain.setAttribute('class','tableContainer');
  

  var table = `<div class="table-responsive">
  <table class="table table-striped cart-table">
        <thead>
          <tr>
            <th scope="col">Item Details</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price (#)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>`
  var total = 0;
  for (let item of cartItems) {
    table += `
          <tr>
            <td><div class="row-cols-2 row" >
                            <div class="col-2"><img src="${item.image}" alt="${item.name}" width="60" height="60"></div>
                            <div class="col-5 phone-description" >${item.description} 
                            <div class="caption">sold by <span class="purple">purple<span></div>
                            </div>
                        </div>
            </td>
            <td><button onclick="deduct(${item.product_code})" class="deduct"><i class="bi bi-dash "></i></button><span id="${item.product_code}Quantity" class="item-quantity">1</span><button onclick="add(${item.product_code})" class="add"><i class="bi bi-plus "></i></button></td>
            <td id="${item.product_code}_unitPrice">${item.price}</td>
            <td><i class="bi bi-x-circle-fill remove" onclick="remove('${item.product_code}','${item.brand}')"></i></td>
          </tr>
          
      `;
      let price = item.price.replace(/,/g,'');

    total += parseInt(price );
  }
  var summary = `<div class="summary" id="cart_summary">
  <h5>Cart Summary</h5>
  <p class="Subtotal">Subtotal: <span id="subtotal">#${total}</span></p>
  <p class="Total">Total <span id="total">#${total}</span></p>
  <div class="checkout"><button type="button" class="btn btn-primary btn-lg" id="checkout">Checkout</button></div>
  </div>`;

  table += `</tbody>
    </table>`;
    
    tableContain.innerHTML = table;
    tableContain.innerHTML += summary;
    container.append(tableContain);
    main.append(container);
    main.innerHTML += contactus;
    b= document.querySelector('.btn-contShopping');
    b.onclick = shopping
   
}


function deduct(code){
  quantity = document.getElementById(`${code}Quantity`);
  quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
  total = document.getElementById('total');
  subtotal = document.getElementById('subtotal');
  price = document.getElementById(`${code}_unitPrice`);
  price = price.innerHTML.replace(/,/g,'');
  total = total.innerHTML.replace('#','');
  subtotal = subtotal.innerHTML.replace('#','');
  new_total= parseInt(total) - parseInt(price)
  new_subtotal= parseInt(subtotal) - parseInt(price);
  console.log(new_total);
  document.getElementById('total').innerHTML = `#${new_total}`;
  document.getElementById('subtotal').innerHTML = `#${new_subtotal}`;
}

function add(code){
  quantity = document.getElementById(`${code}Quantity`);
  quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
  total = document.getElementById('total');
  subtotal = document.getElementById('subtotal');
  price = document.getElementById(`${code}_unitPrice`);
  price = price.innerHTML.replace(/,/g,'');
  total = total.innerHTML.replace('#','');
  subtotal = subtotal.innerHTML.replace('#','');
  new_total= parseInt(total) + parseInt(price)
  new_subtotal= parseInt(subtotal) + parseInt(price);
  console.log(new_total);
  document.getElementById('total').innerHTML = `#${new_total}`;
  document.getElementById('subtotal').innerHTML = `#${new_subtotal}`;
}

function shopping(){
  document.getElementById('main').innerHTML = mainContent;
  load_page()
}

function remove(code,brand){
  console.log(code);
  for (let i = 0;i<cartItems.length;i++){
    console.log(cartItems[i].product_code)
    if (cartItems[i].product_code == code){
      cartItems.splice(i,1);
    }
  };
  initial = document.getElementById('cart-quantity').innerHTML;
  new_quantity = parseInt(initial) - 1;
  document.getElementById('cart-quantity').innerHTML = new_quantity;
  // document.getElementById(`${code}_btn`).innerHTML = 'Add to cart';
  // document.getElementById(`${code}_btn`).onclick = `add_to_cart('${brand}','${code}')`;
  show_cart()
}

function detailed_phone(brand,id){
  if (brand === 'Samsung') {
    let http = new XMLHttpRequest;
    http.open('get', 'samsung.json', 'true');
    http.send();
    http.onload = function () {
      // checking the status and readystate
      if (this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.responseText);
        viewDetails(products,id,brand);
      }
    }
  }else if(brand === 'Apple'){
    let http = new XMLHttpRequest;
    http.open('get', 'apple.json', 'true');
    http.send();
    http.onload = function () {
      // checking the status and readystate
      if (this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.responseText);
        viewDetails(products,id,brand);
      }
    }
  }
  
    
   
}

function viewDetails(products,id,brand){
  main = document.getElementById('main');
  var contactus = '<div class="contactUs" id="contactUs">';
  contactus += document.getElementById('contactUs').innerHTML;
  main.innerHTML = `<nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#" onclick="shopping()">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Phones</a></li>
    <li class="breadcrumb-item"><a href="#">Smartphones</a></li>
    <li class="breadcrumb-item"><a href="#">${brand}</a></li>
    <li class="breadcrumb-item active" aria-current="page">Product ${id}</li>
  </ol>
</nav>`;
  container = document.createElement('div');
  container.setAttribute('class', 'phonedetails');
  const similar = document.createElement('div');
  similar.setAttribute('class','similar');
  var viewPhone = '';
  
  for (let item of products) {
    if (item.product_code == id){
      viewPhone = `<div id="carouselExampleIndicators" class="carousel slide phone-view" data-bs-ride="true">
            <div class="carousel-indicators indicators">
                <img src="${item.images[0]}" alt="" data-bs-slide-to="0" class="active" aria-current="true"
                    aria-label="Slide 1" width="100" height="100">
                <img src="${item.images[1]}" alt="" data-bs-slide-to="1" aria-current="true"
                    aria-label="Slide 2" width="100" height="100">
            </div>
            <div class="carousel-inner carousel-images">
                <div class="carousel-item active">
                    <img src="${item.images[0]}" class="d-block w-100" alt="${item.name}" width="300">
                </div>
                <div class="carousel-item">
                    <img src="${item.images[1]}" class="d-block w-100" alt="${item.name}" width="300">
                </div>
            </div>
            <button class="carousel-control-prev previous" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <i class="bi bi-caret-left next-icon"></i>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <i class="bi bi-caret-right next-icon"></i>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="describephone">
            <h3>
                ${item.description}
            </h3>
            <p>
                <span class="grey">Product Code:</span> <strong>${item.product_code}</strong>
            </p>
            <p>
                <span class="grey"> Brand:</span> <strong>${item.brand}</strong>
            </p>
            <h1 class="phoneprice">
                #${item.price}
            </h1>
            <p class="phonequantity">
                Quantity <button class="deduct"><i class="bi bi-dash "></i></button><span class="item-quantity">1</span>
                <button class="add"><i class="bi bi-plus "></i></button>
            </p>

        </div>
      `
    }
    
  }

  let similars = `<div class="head">
            <h2>Similar Items You May Like</h2>
        </div>
        <div class="items">
            
            
        
`
let items = [];
// const _ = require('lodash');
for (let i=1;i<=5;i++){
  let index = Math.floor(Math.random() * products.length);
    let item = products[index];
    if (items.includes(item,0)){
      i--;
      continue
    }else{
      items.push(item);
  console.log(item);
  console.log(products)
  similars += `<div class="card phone-card pg-1" style="width: 15rem;" id="${item.product_code}">
    <img src="${item.images[0]}" class="card-img-top card-image" alt="${item.name}" id="${item.name}">
    <div class="card-body" id="cardBody-${item.product_code}">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.description}.</p>
      <p class="item-price">#${item.price}.</p>
      <a class="btn btn-primary cart-btn" id="${item.product_code}_btn" onclick="add_to_cart('${item.brand}','${item.product_code}')">Add to cart</a>
    </div>
    </div>`
};

  }
  similars +='</div>';
    similar.innerHTML=similars;
    container.innerHTML=viewPhone;
    main.append(container);
    main.append(similar);
    main.innerHTML += contactus;
}