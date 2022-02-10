
const tree={
    val:"a",
    children:[
        {
            val:"b",
            children:[
                {
                    val:"d",
                    children:[],
                },
                {
                    val:"e",
                    children:[],
                }
            ]
        },
        {
            val:"c",
            children:[
                {
                    val:"f",
                    children:[]
                },
                {
                    val:"g",
                    children:[]
                }
            ]
        }

    ]
}

// 深度优先
const dfs = (root)=>{
    // console.log(root.val);
    root.children.forEach((child)=>{
        dfs(child);
    })
}

// 广度优先
const bfs = (root)=>{
    const q = [root];
    while(q.length > 0){
        const n = q.shift();
        // console.log(n.val);
        n.children.forEach(child=>{
            q.push(child);
        })
    }
}

const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
}

// //  递归

// 二叉树先序遍历
const preorder = (root)=>{
    if(!root){
        return;
    }
    console.log(root.val);
    preorder(root.left);
    preorder(root.right);
}

// 中序遍历
const inorder = (root)=>{
    if(!root){
        return
    }
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
}

// 后序遍历
const postorder = (root) => {
    if(!root){
        return 
    }

    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
}

// // 非递归
const preorder = (root)=>{
    if(!root){
        return
    }

    const stack = [root];
    while(stack.length){
        const n = stack.pop();
        console.log(n.val);
        if(n.right){
            stack.push(n.right);
        }

        if(n.left){
            stack.push(n.left);
        }
    }
}

const inorder = (root) => {
    if(!root){
        return 
    }

    const stack = [];
    let p=stack;
    while(stack.length || p){
        while(p){
            stack.push(p);
            p = p.left;
        }

        const n = stack.pop();
        console.log(n.val);
        p = n.right;
    }
}


const postorder = (root) => {
    if(!root){
        return;
    }

    const outputStack = [];
    const stack = [];
    while(stack.length){
        const n = stack.pop;

    }

}



// 求二叉树的最大深度
var maxDepth = function (root){
    let res = 0;
    const dfs = (n,l)=>{
        if(!n) {
            return;
        }

        if(!n.left && !n.right){
            res = Math.max(res,l);

        }

        dfs(n.left,l+1);
        dfs(n.right,l+1);
    };
    dfs(root,1);
    return res;
}

// 求二叉树的最小深度
var minDepth = function(root){
    if(!root){
        return 0;
    }
    const q = [root,1];
    while(q.length){
        const [n,l] = q.shift();
        if(!n.left && !n.right){
            return l;
        }
        console.log(n.val,l);
        if(n.left){
            q.push(n.left,l+1);
        }
        if(n.right){
            q.push(n.right,l+2);
        }
    }
}

// 求路径总和


