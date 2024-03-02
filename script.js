import Sorting from './sorting.js';

const myCanvas = document.getElementById('myCanvas');
myCanvas.width = 600;
myCanvas.height = 300;
const n = 20;
const array = [];

const stringHeight = myCanvas.height*0.40;

const socks = [];
const margin = 30;
const availableWidth = myCanvas.width - 2*margin;
const spacing = availableWidth/ n;

const colors = ['red','green','blue','purple','orange','pink','black','gray','brown','cyan','magenta','lime','indigo','teal','violet',
                'navy','maroon','olive','aqua','fuchsia', 'silver','lime','crimson','coral','gold','plum','ivory','azure','lavender','salmon','tan',
                'khaki','wheat','beige','mint','apricot','cerulean','rose'];

const sockColors = [];

for (let i = 0; i<n/2; i++) {
    const t = i/(n/2-1);
    sockColors.push(colors[i]);
    sockColors.push(colors[i]);
    array.push(lerp(0.2,1,t));
    array.push(lerp(0.2,1,t));
}

for (let i = 0; i < array.length; i++){
    const j = Math.floor(Math.random()*array.length);
    [array[i], array[j]] = [array[j], array[i]];
    [sockColors[i], sockColors[j]] = [sockColors[j], sockColors[i]];
}
for (let i = 0; i < array.length; i++){
    const x = i*spacing+spacing/2 + margin;
    const y = stringHeight;
    const height = 0.4*myCanvas.height*array[i];
    socks[i] = new Sock(x,y,height,sockColors[i]);
}

const bird = new Bird(socks[0].loc, socks[1].loc, myCanvas.height*0.2);

//aici de adaugat butoanele
let moves = 0;

const ctx=myCanvas.getContext("2d");

ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0,stringHeight);
    ctx.lineTo(myCanvas.width,stringHeight);
    ctx.stroke();
    let changed = false;

    for (let i = 0; i < socks.length; i++){
        changed = socks[i].draw(ctx) || changed;
        Physics.update(socks[i].particles, socks[i].segments);
    }
    changed = bird.draw(ctx) || changed;  

function animate(){
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0,stringHeight);
        ctx.lineTo(myCanvas.width,stringHeight);
        ctx.stroke();
        
        let changed = false;

        for (let i = 0; i < socks.length; i++){
            changed = socks[i].draw(ctx) || changed;
            Physics.update(socks[i].particles, socks[i].segments);
        }
        changed = bird.draw(ctx) || changed;
        
        if(!changed && moves.length > 0){
            const nextMove = moves.shift();
            const [i,j] = nextMove.indices;
            if(nextMove.type === "swap"){
                const[i,j] = nextMove.indices;
                socks[i].moveTo(socks[j].loc);
                socks[j].moveTo(socks[i].loc);
                [socks[i],socks[j]] = [socks[j],socks[i]];
            }else{
                bird.moveTo(socks[i].loc, socks[j].loc);
            }
        }
        requestAnimationFrame(animate);
    }

document.getElementById("bubbleSortBtn").addEventListener("click", function () {
    moves = Sorting.bubbleSort(array);
    animate();

});
document.getElementById("selectionSortBtn").addEventListener("click", function () {
    moves = Sorting.SelectionSort(array);
    animate();
});
document.getElementById("insertionSortBtn").addEventListener("click", function () {
    moves = Sorting.InsertionSort(array);
    animate();
});
document.getElementById("resetBtn").addEventListener("click", function () {
    location.reload();
});
