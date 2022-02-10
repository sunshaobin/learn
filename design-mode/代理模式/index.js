let star = {
    name:"张三",
    age:25,
    phone:15779166583
}

let agent = new Proxy(star,{
    get:function(target,key){
        if(key === "phone"){
            return "1111"
        }

        if(key === 'price'){
            return 12000;
        }

        return target[key];
    },

    set:function(target,key,val){
        if(key==="customPrice"){
            if(val < 10000){
                throw new Error("")
            }else{
                target[key] = val;
                return true;
            }
        }
    }


})