const images = document.querySelectorAll('.galleryImg')
const dialog = document.querySelector('dialog')
const dialogImg = document.getElementById('dialogImg')
const rightButton = document.getElementById('rightButton')
const leftButton = document.getElementById('leftButton')
const r = document.querySelector(':root')
const mask = document.getElementById('mask')
const closeButton = document.getElementById('closeButton')

const ANIMATION_DUARTION = 200; // ms
let currentImage = 0;
let isSlideShowActive = false

const getWantedImageWidth = (img) => {
    let baseWidth = img.clientWidth;

    let ratio = dialog.clientHeight / img.clientHeight;

    return baseWidth * ratio;
}

const changeDialogWidth = (widthPx) => {
    dialog.style.width = widthPx
}

const changeDialogHeight = (heightPx) => {
    dialog.style.height = heightPx

}

const getImageWidth = () => {
    return dialogImg.clientWidth()
}

const repositionDialog = (width) => {
    dialog.style.left = (window.screen.width / 2) - (width / 2) + 'px'
    dialog.style.top = (window.screen.height / 2) - (dialog.clientHeight / 2) + 'px'
}

const changeDialogImage = (img) => {


    let targetWidth = getWantedImageWidth(img)

    dialogImg.src = "./placeholder.png"


    // repositionDialog(targetWidth)

    dialog.style.width = targetWidth + "px"

    dialogImg.style.opacity = 0


    setTimeout(() => {
        dialogImg.src = img.src;
        // repositionDialog(targetWidth)

        dialogImg.style.opacity = 1

    }, ANIMATION_DUARTION)



}

const switchDialog = (img) => {

    startSlideShow()

    currentImage = Number(img.getAttribute('listId'))

    console.log(img.getAttribute('listId'));

    changeDialogImage(img);
    // changeDialogWidth(dialogImg.clientWidth);
    // changeDialogHeight(img.clientHeight);
}

const nextImage = () => {
    rightButton.disabled = true
    switchDialog(images[currentImage + 1])

    setTimeout(()=>{
        rightButton.disabled = false;
    }, ANIMATION_DUARTION)
    
}

const prevImage = () => {
    leftButton.disabled = true

    switchDialog(images[currentImage - 1])

    setTimeout(()=>{
        leftButton.disabled = false;
    }, ANIMATION_DUARTION)

}


const outsideClick = event => {

        let box = dialog.getBoundingClientRect()

        console.log(box);
        
        let xOverlap = (event.target.pageX > box.x && event.target.pageX < box.x + box.width )
        let yOverlap = (event.target.pageY > box.y && event.target.pageY < box.y + box.height )


        let containsRightButton = rightButton.contains(event.target)
        let containsLeftButton = leftButton.contains(event.target)

        console.log(containsLeftButton + " " + containsRightButton);

        let containsButton = containsLeftButton || containsRightButton

        let isClickInside = xOverlap && yOverlap 
        console.log(isClickInside);

      
        if (!isClickInside && isSlideShowActive && !containsButton) {
        console.log("eeeeaaaaaaa");

                exitSlideShow()
        }

}


const startSlideShow = () => {
    mask.style.display = ""
    dialog.style.display = ""

    rightButton.style.display = ""
    leftButton.style.display = ""
    
    dialog.showModal()

    console.log("starting");



    setTimeout(()=>{
        isSlideShowActive = true
    },100)


    document.addEventListener('click', outsideClick)


    disableScroll()
}



const exitSlideShow = () => {
    mask.style.display = "none"
    dialog.style.display = "none"

    rightButton.style.display = "none"
    leftButton.style.display = "none"

    dialog.close()

    console.log("ending");

    isSlideShowActive = false

    document.removeEventListener('click', outsideClick)

    enableScroll()

}

function disableScroll() { 
    document.body.classList.add("remove-scrolling"); 
} 
  
function enableScroll() { 
    document.body.classList.remove("remove-scrolling"); 
}
  



let i = 0
images.forEach(element => {

    element.setAttribute('listId', i)

    element.addEventListener('click', () => {
        switchDialog(element)

    })

    i++
})

closeButton.addEventListener('click', exitSlideShow)


rightButton.addEventListener('click', nextImage)
leftButton.addEventListener('click', prevImage)

document.addEventListener('keydown', event => {
    if(isSlideShowActive){
        if(event.key == "ArrowLeft") {
            prevImage()
        }
        else if(event.key == "ArrowRight") {
            nextImage()
        }
        else if(event.key == "Escape"){
            exitSlideShow()
        }
    }

});

exitSlideShow()