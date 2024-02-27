function lerp(a, b, t) {
    return a + (b - a) * t;
}

function vLerp(A,B,t){
    const res = {};
    for(let attr in A){
        res[attr] = lerp(A[attr],B[attr],t);
    }
    return res;
}

function add(A,B){
    const res = {};
    for(let attr in A){
        res[attr] = A[attr] + B[attr];
    }
    return res;
}

function substract(A,B){
    const res = {};
    for(let attr in A){
        res[attr] = A[attr] - B[attr];
    }
    return res;
}

function average(A,b){
    const res = {};
    for(let attr in A){
        res[attr] = (A[attr] + b[attr])/2;
    }
    return res;

}

function scale(A,a){
    const res = {};
    for(let attr in A){
        res[attr] = A[attr]*a;
    }
    return res;
}

function normalize(A){
    const mag = magnitute(A);
    return scale(A,1/mag);
}

function magnitute(A){
    let sum = 0;
    for(let attr in A){
        sum += A[attr]**2;
    }
    return Math.sqrt(sum);
}

function distance(A,B){
    const sub=substract (A,B);
    return magnitute(sub);
}