let showing = false;
let size = 128;
let sizeSpeed = 1;
let isMax = false;

let imagesHolder = document.createElement("div");
imagesHolder.style.position = "fixed";
imagesHolder.style.display = 'none';
imagesHolder.style.alignItems = 'center';
imagesHolder.style.zIndex = '2147483647';
imagesHolder.style.left = '50%';
imagesHolder.style.top = '50%';
imagesHolder.style.translate = '-50% -50% 0';
document.body.appendChild(imagesHolder);
let sum = document.createElement("div");
sum.style.display = 'flex';
sum.style.justifyContent = 'center';
sum.style.alignItems = 'center';
sum.style.setProperty('background-color', 'white', 'important');
sum.style.setProperty('color', 'black', 'important');
sum.style.setProperty('border-color', 'black', 'important');
sum.style.border = 'solid';
sum.style.fontWeight = 'bold';
sum.style.boxSizing = 'border-box';
for (let i = 0; i < 9; i++){
    let image = document.createElement("div");
    image.style.display = 'none';
    image.className = "dice";
    imagesHolder.appendChild(image);
}
imagesHolder.appendChild(sum);
resize(0);

function throwing(dices){
    dices = dices || 1;
    let sumNumber = 0;
    Array.from(imagesHolder.children).forEach((child, index)=>{
        if(child.className === "dice"){
            let number = Math.floor(Math.random() * 6)+1;
            sumNumber+= index>dices-1 ? 0 : number;
            child.setAttribute("face", `${number}`);
            child.innerHTML = getFace(number-1);
            child.style.display = index>dices-1 ? 'none' : 'flex';
        }
    });
    sum.innerText = sumNumber;
    show();
}

function show(){
    if(!document.contains(imagesHolder))document.body.appendChild(imagesHolder);
    document.querySelector("html").style.pointerEvents = 'none';
    imagesHolder.style.display = 'flex';
    showing = true;
    imagesHolder.focus();
    resize(0);
}

function hide(){
    imagesHolder.style.display = 'none';
    document.querySelector("html").style.pointerEvents = 'all';
    showing = false;
}

function getMaxSize(){
    let nb = imagesHolder.querySelectorAll("div:not([style*=\"display: none;\"])").length;
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth / nb * 0.9;
    return  Math.min(height, width);
}

function resize(value){
    sizeSpeed*=1.2;
    let max = getMaxSize();
    size = isMax && value >= 0 ? max : size+value;
    isMax = size >= max;
    if (size > max)size = max;
    if (size < 32)size = 32;
    Array.from(imagesHolder.children).forEach(child=>{
        child.style.width = `${size}px`;
        child.style.height = `${size}px`;
        if(child.className === "dice") child.innerHTML = getFace(parseInt(child.getAttribute("face"))-1);
    });
    sum.style.borderWidth = `${size/10}px`;
    sum.style.fontSize = `${size/2}px`;
    imagesHolder.style.gap = `${size/10}px`;
}

document.addEventListener("keydown",function (e) {
    if(showing && e.key === "Escape")hide();
    if ((showing || e.ctrlKey && e.altKey)){
        if (e.key >= '1' && e.key <= '9')throwing(e.key);
        if (e.key === '0')if (showing) hide(); else show();
        if (e.key === '+')resize(4*sizeSpeed);
        if (e.key === '-')resize(-4*sizeSpeed);
        e.preventDefault();
    }
}, true);

document.addEventListener("keyup", ()=>sizeSpeed = 1);

document.addEventListener("click", function(event) {
    if(showing===true){
        event.preventDefault();
        event.stopPropagation();
    }
    hide();
}, true);

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "throw")
        throwing(5);
});

function getFace(number){
    let faces = [
        `<svg viewBox="0 0 100 100" style="width: ${size}px !important; height: ${size}px !important">
    <rect width="90" height="90" stroke-width="10" x="5" y="5" style="fill:white !important; stroke:black !important;"></rect>
    <circle r="9" cx="50" cy="50" style="fill:black !important;"></circle>
</svg>`,
        `<svg viewBox="0 0 100 100" style="width: ${size}px !important; height: ${size}px !important">
    <rect width="90" height="90" stroke-width="10" x="5" y="5" style="fill:white !important; stroke:black !important;"></rect>
    <circle r="9" cx="29" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="71" style="fill:black !important;"></circle>
</svg>`,
        `<svg viewBox="0 0 100 100" style="width: ${size}px !important; height: ${size}px !important">
    <rect width="90" height="90" stroke-width="10" x="5" y="5" style="fill:white !important; stroke:black !important;"></rect>
    <circle r="9" cx="29" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="71" style="fill:black !important;"></circle>
    <circle r="9" cx="50" cy="50" style="fill:black !important;"></circle>
</svg>`,
        `<svg viewBox="0 0 100 100" style="width: ${size}px !important; height: ${size}px !important">
    <rect width="90" height="90" stroke-width="10" x="5" y="5" style="fill:white !important; stroke:black !important;"></rect>
    <circle r="9" cx="29" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="29" cy="71" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="71" style="fill:black !important;"></circle>
</svg>`,
        `<svg viewBox="0 0 100 100" style="width: ${size}px !important; height: ${size}px !important">
    <rect width="90" height="90" stroke-width="10" x="5" y="5" style="fill:white !important; stroke:black !important;"></rect>
    <circle r="9" cx="29" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="50" cy="50" style="fill:black !important;"></circle>
    <circle r="9" cx="29" cy="71" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="71" style="fill:black !important;"></circle>
</svg>`,
        `<svg viewBox="0 0 100 100" style="width: ${size}px !important; height: ${size}px !important">
    <rect width="90" height="90" stroke-width="10" x="5" y="5" style="fill:white !important; stroke:black !important;"></rect>
    <circle r="9" cx="29" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="29" style="fill:black !important;"></circle>
    <circle r="9" cx="29" cy="71" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="71" style="fill:black !important;"></circle>
    <circle r="9" cx="29" cy="50" style="fill:black !important;"></circle>
    <circle r="9" cx="71" cy="50" style="fill:black !important;"></circle>
</svg>`];
    return faces[number];
}