const photosCount = 10
const apiKey = 'yDQ2Szp8RpLqlBTxq3-bV8vqnROv9iT5afElHFB81Gg'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photosCount}`

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Create elements for links and photos and add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        // create a <a> element to link to unsplash</a>
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html ? photo.links.html : '#')
        item.setAttribute('target', '_blank')

        // Create <img> for photo
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular ? photo.urls.regular : '#')
        img.setAttribute('alt', photo.alt_description ? photo.alt_description : '')
        img.setAttribute('title', photo.alt_description ? photo.alt_description : '')

        // putting img inside <a> and then putting it  inside image container
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Get photos from unsplash
async function getPhotos() {
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch(error) {
        console.log(error)
    }
}

getPhotos()
