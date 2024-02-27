const myCanvas = document.getElementById('myCanvas');
myCanvas.width = 600;
myCanvas.height = 300;
const n = 20;
const array = [];

const stringHeight = myCanvas.height*0.45;

const socks = [];
const margin = 30;
const availableWidth = myCanvas.width - 2*margin;
const spacing = availableWidth/ n;

const colors = ["red","blue","green","yellow","purple","orange","pink","brown","black","white","gray","cyan","magenta","lime"];

const sockColors = [];

for (let i = 0; i<n/2; i++) {
    const t = i/(n/2-1);
    
    array.push(lerp(0.2,1,t));
    array.push(lerp(0.2,1,t));
}

for (let i = 0; i < array.length; i++){
    const j = Math.floor(Math.random()*array.length);
    [array[i], array[j]] = [array[j], array[i]];
}
for (let i = 0; i < array.length; i++){
    const x = i*spacing+spacing/2 + margin;
    const y = stringHeight;
    const height = 0.4*myCanvas.height*array[i];
    socks[i] = new Sock(x,y,height);
}

const moves = bubbleSort(array);

const ctx=myCanvas.getContext("2d");

animate();

function animate(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    ctx.beginPath();
    ctx.moveTo(0,stringHeight);
    ctx.lineTo(myCanvas.width,stringHeight);
    ctx.stroke();
    
    let changed = false;

    for (let i = 0; i < socks.length; i++){
        changed = socks[i].draw(ctx) || changed;
        Physics.update(socks[i].particles, socks[i].segments);
    }

    
    if(!changed && moves.length > 0){
        const nextMove = moves.shift();
        if(nextMove.type === "swap"){
            const[i,j] = nextMove.indices;
            socks[i].moveTo(socks[j].loc);
            socks[j].moveTo(socks[i].loc);
            [socks[i],socks[j]] = [socks[j],socks[i]];
        }
    }
    requestAnimationFrame(animate);
}
function bubbleSort(array){
    const moves = [];
    do{
        var swapped = false;
        for(let i = 1; i < array.length; i++){
            moves.push({
                indices: [i-1, i],
                type:"comparison"
            });
            if(array[i-1] > array[i]){
                swapped = true;
                [array[i-1], array[i]] = [array[i], array[i-1]];
                moves.push({
                    indices: [i-1, i],
                    type:"swap"
                });
            }
        }

    }while(swapped);
    return moves;
}