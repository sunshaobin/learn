const stack = [];
stack.push(1);
stack.push(2);
const item1 = stack.pop();
const item2 = stack.pop();


// 括号匹配问题
var isValid = function (s){
    if(s.length%2 === 1){
        return false;
    }

    const stack = [];
    for(let i=0;i<s.length;i++){
        const c = s[i];
        if(c==="(" || c==="{" ||c==="["){
            stack.push(c)
        }

        const t = stack[stack.length-1];
        if((c==="}"&&t==="{") || (c==="]"&&t==="[") || (c==="]"&&t==="[")){
            stack.pop()
        }else{
            return false
        }
    }

    if(stack.length == 0){
        return true
    }
}



