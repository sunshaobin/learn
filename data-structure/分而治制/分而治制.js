
// 猜数字
var guessNumber = function(n){
    const rec=(low,high)=>{
        if(low > high){return}
        const mid = Math.floor((low+hogh)/2);
        const res = guess(mid);
        if(res===0){
            return mid;
        }else if(res===1){
            return rec(mid+1,high);
        }else{
            return rec(1,mid-1);
        }

    }

    return (rec1,n);
}
// 翻转二叉树
var inverTree = function(root){
    if(!root){
        return null
    }
    return {
        val:root.val,
        left:inverTree(root.right),
        right:inverTree(root.left)
    }
}

// 相同的树
var isSameTree = function(p,q){
    if(!p && !q){
        return true;
    }

    if(p && q && p.val && isSameTree(p.left,q.left) && isSameTree(p.right,q.right)){
        return true
    }

    return false;
}

// 对称二叉树
var isSymmetric = function(root){
    if(!root){
        return true;
    }

    const isMirror = (l,r)=>{
        if(l && r && l.val === r.val && isMirror(l.left,r.right) && isMirror(l.right,r.left)){
            return true;
        }
    }

    return isMirror(root.left,root.right);
}