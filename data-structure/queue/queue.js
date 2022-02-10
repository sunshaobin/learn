const queue = [];
queue.push(1);
queue.push(2);
const item1 = queue.shift();
const item2 = queue.shift();


var RecentCounter = function(){
    this.q = [];
}

RecentCounter.prototype.ping = function(t){
    this.q.push(t);
    while(this.q[0]<t-3000){
        this.q.shift();
    }

    return this.q.length;
}
