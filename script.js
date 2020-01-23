const app = {}; //NAMESPACED OBJECT

// CACHED JQUERY SELECTORS 
app.$navIcon = $('nav label i') 
app.$navMenu = $('nav ul')
app.$navCheckbox = $('nav input[type="checkbox"]')  
app.$navLink = $('nav li') 
app.$rightArrow = $('.fa-angle-right')
app.$leftArrow = $('.fa-angle-left')

app.$gallery = $('#gallery ul') 

app.galleryArray = [
    { 
        image: "./assets/bouquet-of-flowers.jpg",
        caption: "Sarah & Eric",
        date: "02/20"
    },
    { 
        image: "./assets/birde-under-lights.jpg",
        caption: "Angela & Sam", 
        date: "11/19"
    }, 
    { 
        image: "./assets/photo-of-bride-and-groom-hugging.jpg", 
        caption: "Janet & Rebecca",
        date: "04/19"
    },
    { 
        image: "./assets/pink-and-red-roses-centerpiece.jpg", 
        caption: "Francis & Mel",
        date: "02/19"
    }
] 

let i = 0  
const numTiles = app.galleryArray.length -1 
const mqlMobile = window.matchMedia('(max-width: 480px)'); // media query list  
const galleryHTML = `<li>
                        <a href="#">
                        <img src="">
                        <div class="overlay">
                            <span class="caption"></span> 
                            <span class="serif date"></span>
                        </div>
                        </a>
                    </li>`

$('button, .fa, .fas, input[type="submit"]').addClass('pointer')

//FUNCTIONS 
app.displayGallery = () => {
    if (mqlMobile.matches) { 
        app.$rightArrow.show()
        app.$leftArrow.show()
        app.$gallery.html(galleryHTML)
        app.toggleMobileGallery()
    } else {
        app.$gallery.empty() 
        app.$rightArrow.hide()
        app.$leftArrow.hide()
        app.toggleFullGallery()
    }
}

app.toggleMobileGallery = () => {
    const tile = app.galleryArray[i]
    $('#gallery img').attr("src", tile.image)
    $('.caption').text(tile.caption)
    $('.date').text(tile.date)
}

app.toggleGalleryRight = () => {    
    if (i < numTiles) {
        app.toggleMobileGallery()
        i++ 
    } else {
        i = 0
    }
    app.toggleMobileGallery()
}

app.toggleGalleryleft = () => {   
    if (i > 0) {
        i = i - 1
    } else {
        i = numTiles
    } 
    app.toggleMobileGallery()
}

// POPULATE GALLERY WITH IMAGES AND CAPTIONS 
app.toggleFullGallery = () => {
    app.galleryArray.forEach((inst) => {
        const fullGalleryHTML = 
        `<li>
            <a href="#">
                <img src="${inst.image}">
                <div class="overlay">
                    <span class="caption">${inst.caption}</span>
                    <span class="serif date">${inst.date}</span>
                </div>
            </a>
        </li>`  
        app.$gallery.append(fullGalleryHTML)  
    }) 
}   

app.toggleMenu = () => {
    app.$navIcon.toggleClass('fa fa-bars').toggleClass('fas fa-times') // SWITCH ICONS
    app.$navMenu.toggleClass('showMenu') // SHOW/HIDE MENU
    if (mqlMobile.matches === true) {
        $('body').toggleClass("positionFixed") // PREVENT SCROLLING WHEN SIDEBAR IS OPEN
    }
}

app.init = () => {
    // EVENTS 
    app.displayGallery() 
    app.$navCheckbox.on('click', app.toggleMenu)   
    app.$navLink.on('click', app.toggleMenu)  
    app.$leftArrow.on('click', app.toggleGalleryleft)
    app.$rightArrow.on('click', app.toggleGalleryRight)
    $(window).resize(function() {
        app.$gallery.empty()
        app.displayGallery() 
    })
}

$(() => {  
    app.init()
})  
