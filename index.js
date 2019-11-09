
const NUMBER_OF_IMAGES = 10;

class ImageScaledOnScroll {

    static IMAGE_SCALE_START_VALUE = 1;
    static IMAGE_SCALE_END_VALUE = 0.6;
    static IMAGE_SCALE_RANGE_PIXELS = 800;

    constructor(values){
        this._htmlElement = values.htmlElement;
    }

    update(){
        const centerYAbsolute = this._computeCenterYAbsolute();
        const pageCenterYAbsolute = window.scrollY + (window.innerHeight / 2);
        const distance = Math.abs(centerYAbsolute - pageCenterYAbsolute);
        const scaleValue = this._computeScaleValueFromDistance(distance);
        this._setScaleStyleToHTMLElement(scaleValue);
    }

    _computeCenterYAbsolute(){
        const rect = this._htmlElement.getBoundingClientRect();
        const topYAbsolute = rect.y + window.scrollY;
        const centerYAbsolute = topYAbsolute + rect.height / 2;
        return centerYAbsolute;
    }

    _computeScaleValueFromDistance(distance){
        const ratio = distance / ImageScaledOnScroll.IMAGE_SCALE_RANGE_PIXELS;
        const totalRange = ImageScaledOnScroll.IMAGE_SCALE_START_VALUE - ImageScaledOnScroll.IMAGE_SCALE_END_VALUE;
        return Math.min(
            ImageScaledOnScroll.IMAGE_SCALE_START_VALUE, 
            (totalRange * ratio) + ImageScaledOnScroll.IMAGE_SCALE_END_VALUE
        );
    }

    _setScaleStyleToHTMLElement(scaleValue){
        this._htmlElement.style.transform = `scale(${scaleValue})`
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

const onScroll = () => {
    imagesScaledOnScroll.forEach(x => x.update());
    updateTriggerRenderedPosition();
}

const updateTriggerRenderedPosition = () => {
    const trigger = document.getElementsByClassName('trigger')[0];
    const windowCenterYRelative = window.scrollY + (window.innerHeight / 2);
    trigger.setAttribute('value', `ScrollY: ${window.scrollY} --- ScrollY + 1/2: ${windowCenterYRelative}`);
}

document.addEventListener('DOMContentLoaded', main);
document.addEventListener('scroll', onScroll);