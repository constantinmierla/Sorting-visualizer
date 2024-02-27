class Sock{
    constructor(x,y,height,color){
        this.width = 10;
        this.loc = {x,y};
        this.height = height;
        this.color = color;
        this.queue = [];
        this.particles = [];
        this.segments = [];
        this.blockHeight = 10;
        this.#createParticles();
    }

    #createParticles(){
        const xx = this.loc.x;
        const yy = this.loc.y;
        const left = xx-this.width/2;
        const right = xx+this.width/2;
        const bottom = yy+this.height;

        this.particles.push(new Particle(this.loc, true))
        let curHeight = yy;

        do{
            curHeight+= this.blockHeight;
            this.particles.push(new Particle({x:left,y:curHeight}));
            this.particles.push(new Particle({x:right,y:curHeight}));
        }while(curHeight < this.height+yy);

        const lastP = this.particles[this.particles.length-1];
        lastP.loc.x -= this.blockHeight*2;
        lastP.loc.y += this.blockHeight*0.1;
        const secondLastP = this.particles[this.particles.length-2];
        secondLastP.loc.x -= this.blockHeight*3;
        secondLastP.loc.y -= this.blockHeight*0.5;

        this.segments.push(
            new Segment(this.particles[0],this.particles[1])
        );
        this.segments.push(
            new Segment(this.particles[0],this.particles[2])
        );
        this.segments.push(
            new Segment(this.particles[1],this.particles[2])
        );
        for (let i = 3; i < this.particles.length; i = i+2){
            this.segments.push(
                new Segment(this.particles[i],this.particles[i+1])
            );
            this.segments.push(
                new Segment(this.particles[i],this.particles[i-2])
            );
            this.segments.push(
                new Segment(this.particles[i+1],this.particles[i-1])
            );
        }
        if (this.particles.length > 3){
            this.segments.push(
                new Segment(lastP,this.particles[this.particles.length-4])
            )
        }
    }


    moveTo(newLoc,frameCount = 30){
        for(let i = 1; i <= frameCount; i++){
            const t = i/frameCount;
            this.queue.push(vLerp(this.loc, newLoc,t))
        }  
    }

    draw(ctx){
        let changed = false;
        if(this.queue.length > 0){
            this.loc = this.queue.shift();
            this.particles[0].loc = this.loc;
            changed = true;
        }
        const {x,y} = this.loc;
        const left = x-this.width/2;
        const right = x+this.width/2;
        const bottom = y+this.height;

        const ps = this.particles;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(ps[0].loc.x, ps[0].loc.y);
        for (let i = 2; i < ps.length; i+=2){
            ctx.lineTo(ps[i].loc.x, ps[i].loc.y);
        }
        for (let i = ps.length-2; i > 0; i-=2){
            ctx.lineTo(ps[i].loc.x, ps[i].loc.y);
        }
        ctx.closePath();
        ctx.fill();
        /*
        for (let i = 0; i < this.particles.length; i++){
            this.particles[i].draw(ctx);
        }
        for (let i = 0; i < this.segments.length; i++){
            this.segments[i].draw(ctx);
        }
        */
        return changed;
    }
}
