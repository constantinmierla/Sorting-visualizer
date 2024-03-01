class Bird{
    constructor(lFoot, rFoot, headY){
        this.lFoot = lFoot;
        this.rFoot = rFoot;
        this.head = average(lFoot, rFoot);
        this.head.y = headY;
    }

    #update(){
        this.head = average(this.lFoot, this.rFoot);
        this.head.y = headY;
    }

    draw(ctx)
    {
        
        ctx.beginPath();
        ctx.fillStyle = "black";
        const radius = 10;
        
        ctx.arc(this.head.x,this.head.y,radius,0,2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.head.x,this.head.y);
        ctx.moveTo(this.lFoot.x,this.lFoot.y);
        ctx.stroke();
        ctx.moveTo(this.head.x,this.head.y);
        ctx.moveTo(this.rFoot.x,this.rFoot.y);
        ctx.stroke();
    }
}