class SingleObject{
    login(){
        console.log("...");
    }


}

SingleObject.getInstance = (function(){
    let instance;
    return function(){
        if(!instance){
            instance = new SingleObject();

        }

        return instance;
    }
})()

let obj1 = SingleObject.getInstance();
obj1.login();
let obj2 =SingleObject.getInstance();
obj2.login();