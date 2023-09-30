
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const taco10Btn = document.getElementById('taco10Btn');
const taco5Btn = document.getElementById('taco5Btn');
const taco7Btn = document.getElementById('taco7Btn');
const results = document.getElementById('results');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                taco5Btn.style.display = 'block';
                taco7Btn.style.display = 'block';
                taco8Btn.style.display = 'block'; 
                taco10Btn.style.display = 'block';
               taco12Btn.style.display = 'block';
                taco15Btn.style.display = 'block';
               taco16Btn.style.display = 'block';
               taco20Btn.style.display = 'block';

const imageContainer = document.getElementById('uploadedImageContainer');
                imageContainer.innerHTML = ''; // Limpar o contêiner, se necessário
                imageContainer.appendChild(img); // Adicionar a imagem ao contêiner
                imageContainer.style.display = 'block'; // Mostrar o contêiner
            
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function getTextColor(r, g, b) {
    // Calcula a luminosidade e determina a cor do texto
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "black" : "white";
}

function processImage(divisor) {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCount = {};

    for (let i = 0; i < data.length; i += 4) {
        const color = `${data[i]},${data[i+1]},${data[i+2]}`;
        colorCount[color] = (colorCount[color] || 0) + 1;
    }

    results.innerHTML = '';
    let count = 0;
    for (const color in colorCount) {
        if (count >= 30) break;

        const [r, g, b] = color.split(',');
        const div = document.createElement('div');
        div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        const p = document.createElement('p');
        p.innerText = `${Math.ceil(colorCount[color] / divisor)} Folhas`;

        const textColor = getTextColor(parseInt(r), parseInt(g), parseInt(b));
        p.style.color = textColor;
        
        div.appendChild(p);
        results.appendChild(div);
        count++;
downloadBtn.style.display = 'block';

    }
}

taco10Btn.addEventListener('click', function() {
    processImage(35);
});

taco5Btn.addEventListener('click', function() {
    processImage(144);
});
taco7Btn.addEventListener('click', function() {
    processImage(71.4);
});
taco8Btn.addEventListener('click', function() {
    processImage(54.68);
});
taco12Btn.addEventListener('click', function() {
    processImage(24.25);
});
taco15Btn.addEventListener('click', function() {
    processImage(15.51);
});
taco16Btn.addEventListener('click', function() {
    processImage(13.63);
});
taco20Btn.addEventListener('click', function() {
    processImage(8.75);
});





const downloadBtn = document.getElementById('downloadBtn');

function downloadResults() {
    const dataURL = convertToImage(results);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'contagemdefolhas.png';
    link.click();
}

function convertToImage(node) {

    const data = (function() {
        const data = [];
        const nodes = node.querySelectorAll('div');
        nodes.forEach(node => {
            const color = node.style.backgroundColor;
            const text = node.querySelector('p').innerText;
            data.push({ color, text });
        });
        return data;
    })();

    const rows = Math.ceil(data.length / 5);
    const canvasWidth = 5 * 80;
    const canvasHeight = rows * 80;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    data.forEach((item, index) => {
        const x = (index % 5) * 80;
        const y = Math.floor(index / 5) * 80;
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, 70, 70);
        ctx.strokeRect(x, y, 70, 70);
        ctx.fillStyle = getTextColorFromBackground(item.color);

        // Separa o número e a palavra "Folhas"
        const number = item.text.split(' ')[0];

        ctx.textBaseline = 'top';
        ctx.fillText(number, x + 35, y + 15);

        ctx.textBaseline = 'bottom';
        ctx.fillText('Folhas', x + 35, y + 55);
    });

    return canvas.toDataURL();
}




function getTextColorFromBackground(backgroundColor) {
    const rgb = backgroundColor.match(/\d+/g);
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "black" : "white";
}

downloadBtn.addEventListener('click', downloadResults);
const backButton = document.getElementById('backButton');
if (backButton) {
    backButton.addEventListener('click', function() {
        window.location.href = 'acessoapp.html';
    });
}

