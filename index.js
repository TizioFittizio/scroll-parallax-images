
const NUMBER_OF_IMAGES = 1;

class ImageScaledOnScroll {

    static IMAGE_SCALE_START_VALUE = 1;
    static IMAGE_SCALE_END_VALUE = 0.5;
    static IMAGE_SCALE_RANGE_PIXELS = 250;

    constructor(values){
        this._htmlElement = values.htmlElement;
    }

    update(){
        const centerYAbsolute = this._computeCenterYAbsolute();
    }

    _computeCenterYAbsolute(){
        const rect = this._htmlElement.getBoundingClientRect();
        console.log(rect);
    }

}

let imagesScaledOnScroll = [];

const main = () => {
    const HTMLImages = [...new Array(NUMBER_OF_IMAGES)].map(generateHTMLImage);
    const HTMLImageContainers = HTMLImages.map(generateHTMLImageContainer);
    const HTMLBlockImages = getHTMLBlockImages();
    HTMLImageContainers.forEach(x => HTMLBlockImages.appendChild(x));
    imagesScaledOnScroll = HTMLImages.map(x => new ImageScaledOnScroll({ htmlElement: x }));
}

const generateHTMLImage = () => {
    const image = document.createElement('img');
    image.src = 'https://picsum.photos/1024/768';
    return image;
}

const generateHTMLImageContainer = HTMLImage => {
    const container = document.createElement('div');
    container.className = 'image-container';
    container.appendChild(HTMLImage);
    return container;
}

const getHTMLBlockImages = () => {
    return document.getElementsByClassName('block-images')[0];
}

const onScroll = e => {
    imagesScaledOnScroll.forEach(x => x.update());
    updateTriggerPosition();
}

const updateTriggerPosition = () => {
    const trigger = document.getElementsByClassName('trigger')[0];
    trigger.setAttribute('value', `Y: ${window.scrollY}`);
}

document.addEventListener('DOMContentLoaded', main);
document.addEventListener('scroll', onScroll);