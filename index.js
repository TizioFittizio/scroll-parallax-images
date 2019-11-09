
const NUMBER_OF_IMAGES = 2;
const IMAGE_SCALE_START_VALUE = 1;
const IMAGE_SCALE_END_VALUE = 0.5;
const IMAGE_SCALE_RANGE_PIXELS = 250;

const main = () => {
    const HTMLImageContainers = [...new Array(NUMBER_OF_IMAGES)].map(generateHTMLImageContainer);
    const HTMLBlockImages = getHTMLBlockImages();
    HTMLImageContainers.forEach(x => HTMLBlockImages.appendChild(x));
}

const generateHTMLImageContainer = () => {
    const container = document.createElement('div');
    container.className = 'image-container';
    container.appendChild(generateHTMLImage());
    return container;
}

const generateHTMLImage = () => {
    const image = document.createElement('img');
    image.src = 'https://picsum.photos/1024/768';
    return image;
}

const getHTMLBlockImages = () => {
    return document.getElementsByClassName('block-images')[0];
}

main();