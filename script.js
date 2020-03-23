const app = {}; //NAMESPACED OBJECT

// CACHED JQUERY SELECTORS 
app.$navIcon = $('.toggle i') 
app.$navMenu = $('header nav ul')
app.$navCheckbox = $('.toggle')  
app.$navLink = $('.header-nav li') 
app.$rightArrow = $('.fa-chevron-right')
app.$leftArrow = $('.fa-chevron-left')
app.$gallery = $('.gallery ul')  
app.$question = $('.faq ul div')

app.galleryArray = [
    { 
        image: "./assets/man-standing-in-front-of-woman-in-white-wedding-dress.jpg",
        alt: "Bride and groom standing face to face on a stage. Photo by Jonathan Borba.",
        caption: "Sarah & Eric",
        date: "02/20"
    },
    { 
        image: "./assets/photo-of-bride-and-groom-hugging.jpg",
        alt: "Bride and groom hugging. Photo by Jeremy Wong.",
        caption: "Janet & Rebecca", 
        date: "11/19"
    }, 
    { 
        image: "./assets/photo-of-couple-walking-on-paved-pathway.jpg", 
        alt: "Couple holding hands while walking on a paved pathway with backs to the camera. Photo by Emir Kaan Okutan.",
        caption: "Angela & Kevin",
        date: "04/19"
    },
    { 
        image: "./assets/pink-and-red-roses-centerpiece.jpg", 
        alt: "Pink and red roses centerpiece on an outdoor dining table",
        caption: "Francis & Mel",
        date: "02/19"
    }
] 

let i = 0  
const numTiles = app.galleryArray.length -1 
const mqlMobile = window.matchMedia('(max-width: 480px)'); // media query list  
const galleryHTML = `<li>
                        <a href="#">
                        <img src="" alt="">
                        <div class="gallery-text">
                            <span class="caption"></span> 
                            <span class="serif date"></span>
                        </div>
                        </a>
                    </li>`

$('button, .fa, .fas, input[type="submit"], .faq ul div').addClass('pointer')

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
    $('.gallery img').attr("src", tile.image).attr("alt", tile.alt)
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
    $('.gallery li').toggle().fadeIn('slow');
    app.toggleMobileGallery()
}

app.toggleGalleryleft = () => {   
    if (i > 0) {
        i = i - 1
    } else {
        i = numTiles
    }  
    $('.gallery li').toggle().fadeIn('slow');
    app.toggleMobileGallery()
}

// POPULATE GALLERY WITH IMAGES AND CAPTIONS 
app.toggleFullGallery = () => {
    app.galleryArray.forEach((inst) => {
        const fullGalleryHTML = 
        `<li>
            <a href="#">
                <img src="${inst.image}">
                <div class="gallery-text">
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

app.toggleAnswer = function() {
    $(this).siblings().toggle()  
    $(this).find('i').toggleClass('fa-angle-up')  
}

app.init = () => {
    // EVENTS 
    app.$question.siblings().hide() 
    app.displayGallery() 
    app.$navCheckbox.on('click', app.toggleMenu)   
    app.$navLink.on('click', app.toggleMenu)  
    app.$leftArrow.on('click', app.toggleGalleryleft)
    app.$rightArrow.on('click', app.toggleGalleryRight) 
    app.$question.on('click', app.toggleAnswer)
    $(window).resize(function() {
        app.$gallery.empty()
        app.displayGallery() 
    })
}

$(() => {  
    app.init()
})  
