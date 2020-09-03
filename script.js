const photosCount = 30;
const apiKey = "yDQ2Szp8RpLqlBTxq3-bV8vqnROv9iT5afElHFB81Gg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photosCount}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoadedCount = 0;

// function to check whether image loaded or not
function imageLoaded() {
    imagesLoadedCount++;
  if (imagesLoadedCount === totalImages) {
    ready = true;
    loader.hidden = true
    imagesLoadedCount = 0;
  }
}

// set attribute utility function
function setAttributes(item, attributes) {
  for (const key in attributes) {
    item.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // create a <a> element to link to unsplash</a>
    const item = document.createElement("a");
    const attrObj = {
      href: photo.links.html ? photo.links.html : "#",
      target: "_blank",
    };
    setAttributes(item, attrObj);

    // Create <img> for photo
    const img = document.createElement("img");
    const imgAttrObj = {
      src: photo.urls.regular ? photo.urls.regular : "#",
      alt: photo.alt_description ? photo.alt_description : "",
      title: photo.alt_description ? photo.alt_description : "",
    };
    setAttributes(img, imgAttrObj);

    img.addEventListener("load", imageLoaded);
    // putting img inside <a> and then putting it  inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

//To load photos before reaching the end of the page
window.addEventListener("scroll", () => {
  if ((window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) && ready) {
    console.log("Load More");
    ready = false;
    getPhotos();
  }
});

getPhotos();
