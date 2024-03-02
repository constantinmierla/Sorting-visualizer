class Segment{
    
    //pA and pB are particles
    constructor(pA,pB){
        this.pA = pA;
        this.pB = pB;
        this.len = distance(pA.loc, pB.loc);
    }

    update(){
        const dir = substract(this.pA.loc, this.pB.loc);
        const curLen = magnitute(dir);
        const diff = curLen - this.len;
        const norm = normalize(dir);
        if (!this.pA.fixed && !this.pB.fixed){
            this.pA.loc = add(this.pA.loc, scale(norm, -0.5*diff));
            this.pB.loc = add(this.pB.loc, scale(norm, 0.5*diff));
        }
        else{
            if(!this.pB.fixed){
                this.pB.loc = add(this.pB.loc, scale(norm, diff));
            }
            else if(!this.pA.fixed){
                this.pA.loc = add(this.pA.loc, scale(norm, -diff));
            }
        }
        
    }

    draw(ctx){
        this.update();
        ctx.beginPath();
        ctx.moveTo(this.pA.loc.x, this.pA.loc.y);
        ctx.lineTo(this.pB.loc.x, this.pB.loc.y);
        ctx.strokeStyle = "orange";
        ctx.stroke();
    }
}