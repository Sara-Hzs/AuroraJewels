// Retrieve the cartItems array from localStorage or sessionStorage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


// Create an object to hold the cards, keyed by imageName
const cards = {};

// Loop through the cartItems array and create or update a card for each item
let totalPrice = 0;
for (let i = 0; i < cartItems.length; i++) {
  const { imageName, price } = cartItems[i];
  
  // Check if a card for this item already exists
  if (imageName in cards) {
    cards[imageName].quantity++;
  } else {
    // Create a new card for this item
    cards[imageName] = {
      quantity: 1,
      price: price,
    };
  }
  
  // Add the item price to the total price
  totalPrice += parseFloat(price);
}

// Loop through the cards object and create a card element for each item
for (const imageName in cards) {
  const { quantity, price } = cards[imageName];
  
  // Create a card div element
  const card = document.createElement("div");
  card.classList.add("col-md-4");
  card.innerHTML = `
    <div class="card">
      <img src="images/${imageName}.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">$${price} x <span class="quantity">${quantity}</span></p>
        <button class="btn btn-danger remove-btn">Remove</button>
      </div>
    </div>
  `;

  // Add the card to the cards container
  document.getElementById("cards-container").appendChild(card);
}

// Display the total price
document.getElementById("total-price").innerHTML = `
  <h3 style="font-family: 'Montserrat', sans-serif;">Total Price: $${totalPrice.toFixed(2)}</h3>
`;
// Add event listener for the remove buttons
const removeBtns = document.getElementsByClassName("remove-btn");
for (let i = 0; i < removeBtns.length; i++) {
  removeBtns[i].addEventListener("click", function () {
    // Get the card element and remove it from the DOM
    const card = this.parentElement.parentElement.parentElement;

    

    // Get the quantity and price of the item that was removed
    const quantity = parseInt(this.parentElement.querySelector(".quantity").innerHTML);
    const price = parseFloat(this.parentElement.querySelector(".card-text").innerHTML.replace("$", "").replace(`x ${quantity}`, ""));

    // Update the cards object and total price
    const imageName = card.querySelector(".card-img-top").getAttribute("src").replace("images/", "").replace(".jpg", "");
    if (cards[imageName].quantity > 1) {
      cards[imageName].quantity--;
      totalPrice -= price;
    } else {
      delete cards[imageName];
      totalPrice -= price;
    }

    // Update the quantity and total price display
    const quantityEl = card.querySelector(".quantity");
    if (cards[imageName]) {
      quantityEl.innerHTML = cards[imageName].quantity;
    } else {
      // Delete the card element from the DOM if the quantity is zero
      card.remove();
    }
    document.getElementById("total-price").innerHTML = `
      <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
    `;

    // Update the cart count element
    let count = 0;
    for (const imageName in cards) {
      count += cards[imageName].quantity;
    }
    cartCount.innerHTML = count;


    // Update the cartItems array and storage
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].imageName === imageName) {
        if (cards[imageName]) {
          cartItems[i].quantity = cards[imageName].quantity;
        } else {
          cartItems.splice(i, 1);
        }
        break;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
}


// Get the cart count element
const cartCount = document.getElementById("cart-count");

// Set the cart count to the total quantity of items in the cart
let count = 0;
for (const imageName in cards) {
  count += cards[imageName].quantity;
}
cartCount.innerHTML = count;



