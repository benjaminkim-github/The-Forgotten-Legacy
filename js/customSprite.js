const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

async function drawCustomSpritesheet(images = [], width = 100, height = 100, filepath = "./image.png") {

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < images.length; i ++) {
        if (typeof images[i] === "string") {
            const image = images[i];
            images[i] = {
                image: await loadImage(image),
                x: 0,
                y: 0,
                width: width,
                height: height
            }
        } else {
            images[i].image = await loadImage(images[i].image);
        }
    }

    images.forEach(image => {
        ctx.drawImage(image.image, image.x || 0, image.y || 0, image.width || width, image.height || height);
    })

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(filepath, buffer);

}

module.exports = drawCustomSpritesheet;