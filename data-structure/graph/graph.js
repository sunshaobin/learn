const graph = {
    0:[1,2],
    1:[2],
    2:[0,3],
    3:[3]
}

// 深度优先遍历
const visited = new Set();

const dfs = (n)=>{
    console.log(n);
    visited.add(n);
    graph[n].forEach(c=>{
        if(!visited.has(c)){
            dfs(c);
        }
    })
}

dfs(2);

// 广度优先
const visited = new Set();
const q = [2];
while(q.length){
    const n = q.shift();
    console.log(n);
    visited.add(n);
    graph[n].forEach(c=>{
        if(!visited.has(c)){
            q.push(c)
        }
    })
}

// 有效数字