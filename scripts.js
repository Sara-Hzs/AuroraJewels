// Array of image names for Rings
const ringImageNames = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10", "img11", "img12"];

// Array of image names for earings
const earingImageNames = ["img13", "img14", "img15", "img16", "img17", "img18", "img19", "img20", "img21", "img22", "img23", "img24", "img25", "img26", "img27"];

// Array of prices for Rings
const ringPrices = [100, 150, 240, 215, 320, 315, 480, 450, 650, 585, 630, 675];

// Array of prices for earings
const earingPrices = [810, 132, 176, 220, 244, 208, 382, 336, 460, 414, 408, 592, 536, 640];

const ringNames = ["Celestial Star", "Eternal Flame", "Glimmering Grace", "Moonlit Mist", "Radiant Bloom", "Shimmering Sea", "Sparkling Sun", "Eternitique", "Whispering Wind", "Wildflower Wreath", "Willow Wisps", "Winter's Kiss"];
const earingNames = ["Moonlit Mirage", "Starlight Symphony", "Golden Gossamer", "Oceanic Opulence", "Enchanted Forest", "Desert Mirage", "Lavender Dreams", "Radiant Sunflower", "Seafoam Sparkle", "Butterfly Kiss", "Sunset Serenade", "Cherry Blossom", "Diamond Dust", "Stardust Sparkle","Ocean Breeze"];




// Create the heading for Rings
const ringsHeading = document.createElement("h2");
ringsHeading.innerText = "Rings";
ringsHeading.classList.add("rings-heading");
ringsHeading.setAttribute("id", "rings-heading"); // Add an id attribute
document.getElementById("cards-container").appendChild(ringsHeading);


// Loop through the image names array for Rings and create cards for each image
for (let i = 0; i < ringImageNames.length; i++) {
  const imageName = ringImageNames[i];

  // Get the price for the current ring
  const price = ringPrices[i];
  // Create a card div element
  const card = document.createElement("div");
  card.classList.add("col-md-4");
  card.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
      <div class="position-relative">
        <img src="images/${imageName}.jpg" class="card-img-top" alt="...">
        <div class="card-img-overlay d-flex justify-content-end align-items-start">
          <button type="button" class="btn btn-outline-light bg-transparent border-0"><i class="bi bi-heart"></i></button>
        </div>
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">${ringNames[i]}</h5>
        <p class="card-text">$${price}</p>
        <button type="button" class="btn btn-primary add-to-cart" data-image="${imageName}" style="background-color: #D4AF37; border-color: #8B4513;">Add to Cart</button>
      </div>
    </div>
  `;
  

  // Add the card to the cards container
  document.getElementById("cards-container").appendChild(card);
}


const earningsHeading = document.createElement("h2");
earningsHeading.innerText = "Earings";
earningsHeading.classList.add("earings-heading");
earningsHeading.setAttribute("id", "earings-heading"); // Add an id attribute
document.getElementById("cards-container").appendChild(earningsHeading);



// Loop through the image names array for earings and create cards for each image
for (let i = 0; i < earingImageNames.length; i++) {
  const imageName = earingImageNames[i];

    // Get the price for the current earing
    const price = earingPrices[i];

  // Create a card div element
  const card = document.createElement("div");
  card.classList.add("col-md-4");
  card.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
      <div class="position-relative">
        <img src="images/${imageName}.jpg" class="card-img-top" alt="...">
        <div class="card-img-overlay d-flex justify-content-end align-items-start">
          <button type="button" class="btn btn-outline-light bg-transparent border-0"><i class="bi bi-heart"></i></button>
        </div>
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">${earingNames[i]}</h5>
        <p class="card-text">$${price}</p>
        <button type="button" class="btn btn-primary add-to-cart" data-image="${imageName}" style="background-color: #D4AF37; border-color: #8B4513;">Add to Cart</button>
      </div>
    </div>
  `;
  

  // Add the card to the cards container
  document.getElementById("cards-container").appendChild(card);
}

// Get the cart icon and count elements
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");

// Set the initial count to 0
let count = 0;

// Add click event listener to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    count++;
    cartCount.innerText = count;
    
  });
});

let cartItems = [];
addToCartButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      count++;
      cartCount.innerText = count;
      
      // Get the image name and price for the item that was added to the cart
      const imageName = button.getAttribute("data-image");
      const price = button.previousElementSibling.innerText.replace("$", "");
  
      // Add the item to the cartItems array
      cartItems.push({ imageName, price });
       // Update the cart count
  cartCount.innerText = cartItems.length;
      
      // Store the cartItems array in localStorage or sessionStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  });
  
