let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: '%',
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: 'px',
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg',
    },
}


// creating the filter elements dynamically

const filtersContainer = document.querySelector('.filters');

function createFilterElement(name, unit = '%', value, min, max) {
    
    const div = document.createElement('div');
    div.classList.add('filter');
    
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;
    
    const p = document.createElement('p');
    p.innerText = name;
    
    div.appendChild(p);
    div.appendChild(input);

    // updating the filter value on input change
    
    input.addEventListener('input', () => {

        filters[ name ].value = input.value;
        applyFilters()

        // console.log(name, filters[name]);

    });
    
    return div;
}

// dispaying the array of filters in the UI

function createFilters() {

    Object.keys(filters).forEach(key => {
        
        const filterElement = createFilterElement(
            key,
            filters[key].unit,
            filters[key].value,
            filters[key].min,
            filters[key].max,
        );
        
        filtersContainer.appendChild(filterElement);
    })
}

createFilters();

// importing the user's selected image

const imageCanvas = document.querySelector('#image-canvas');
const imgInput = document.querySelector('#image-input');
const canvasCtx = imageCanvas.getContext('2d');
let file = null;
let image = null;

imgInput.addEventListener("change", (event) => {

    file = event.target.files[0];

    const imgPlaceHolder = document.querySelector(".placeholder");
    imageCanvas.style.display = 'block';
    imgPlaceHolder.style.display = 'none';

    const img = new Image();

    img.src = URL.createObjectURL(file);

    // when the image is loaded, draw it on the canvas

    img.onload = () => {

        image = img;

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        canvasCtx.drawImage(image, 0, 0);

    }
    
});

// applying filters to the image on the canvas

function applyFilters() {

    // clearing the canvas before applying new filters
    
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    // setting the canvas context filter property based on the filters object
    
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    `.trim();

    // redrawing the image on the canvas with the applied filters
    canvasCtx.drawImage(image, 0, 0);
};

// reset button functionality

const resetBtn = document.querySelector('#reset-btn');

resetBtn.addEventListener('click', () => {

    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: '%',
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%',
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: 'px',
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg',
    },
    };
    
    applyFilters();

    filtersContainer.innerHTML = '';
    createFilters();
})

// download button functionality

const downloadBtn = document.querySelector('#download-btn');

downloadBtn.addEventListener('click', () => {

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = imageCanvas.toDataURL();
    link.click();
})


// preset filters 

const presets = {
    none: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 0,
    },
    looking_good_filter: {
        brightness: 90,
        contrast: 69,
        saturation: 175,
        grayscale: 0,
        sepia: 26,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 338,
    }
    vintage: {
        brightness: 110,
        contrast: 85,
        saturation: 80,
        grayscale: 0,
        sepia: 35,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 15,
    },
    aesthetic: {
        brightness: 105,
        contrast: 110,
        saturation: 130,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 340,
    },
    oldSchool: {
        brightness: 95,
        contrast: 120,
        saturation: 70,
        grayscale: 20,
        sepia: 50,
        opacity: 100,
        invert: 0,
        blur: 0.5,
        hueRotation: 25,
    },
    blackAndWhite: {
        brightness: 105,
        contrast: 110,
        saturation: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 0,
    },
    dramatic: {
        brightness: 90,
        contrast: 150,
        saturation: 120,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 0,
    },
    cool: {
        brightness: 105,
        contrast: 100,
        saturation: 110,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 200,
    },
    warm: {
        brightness: 110,
        contrast: 95,
        saturation: 120,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 30,
    },
    dreamy: {
        brightness: 115,
        contrast: 80,
        saturation: 90,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
        blur: 1,
        hueRotation: 320,
    },
    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 85,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0,
        blur: 0,
        hueRotation: 10,
    },

}

const presetsContainer = document.querySelector('.presets');

Object.keys(presets).forEach(presetName => {

    const presetBtn = document.createElement('button');
    presetBtn.classList.add('btn');

    presetBtn.innerText = presetName;
    presetsContainer.appendChild(presetBtn);

    presetBtn.addEventListener('click', () => {
        const preset = presets[presetName];
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        })

        applyFilters();
        filtersContainer.innerHTML = '';
        createFilters();
    });


});
