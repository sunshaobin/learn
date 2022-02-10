const a = {val:"a"};
const b = {val:"b"};
const c = {val:"c"};
const d = {val:'d'};

a.next = b;
b.next = c;
c.next = d;

// 遍历链表

let  p=a;
while(p){
    console.assert(p.val);
    p = p.next;
}

// 插入
const e = {val:"e"};
c.next = e;
e.next = d;

// 删除
c.next = d;

// 删除节点
var deleteNode = function(node){
    node.val = node.next.val;
    node.next = node.next.next;
}

// 反转链表

var reverseList = function(head){
    let p1 = head;
    let p2 = null;
    while(p1){
        const tmp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = tmp;
    } 
}

// 两数相加
var addTwoNumbers = function(11,12){
    const 13 = new ListNode(0);
    let p1 = 11;
    let p2 = 12;
    let p3 = 13;
    let carry = 0;
    while(p1 || p2){
        const v1 = p1 ? p1.val : 0;
        const v2 = p2 ? p2.val : 0;
        const val = v1+v2+carry;
        carry = Math.floor(val/10);
        p3.next = new ListNode(val % 10);
        if(p1){
            p1 = p1.next;
        }

        if(p2){
            p2 = p2.next;
        }

        p3 = p3.next;
    } 

    if(carry){
        p3.next = new ListNode(carry);

    }

    return 13.next;
}

// 删除重复元素
var deleteDuplicate = function(head){
    let p = head;
    while(p && p.next.val){

        if(p.next = p.next.next){
            p.next = p.next.next;
        }else{
            p = p.next;
        }
    }
}

//判断环形链表
var hasCycle = function(head){
    let p1 = head;
    let p2 = head;
    while(p1 && p2 && p2.next){
        p1 = p1.next;
        p2 = p2.next.next;
        if(p1 === p2){
            return true;
        }
    }
    return false;
}

const instanceOf = (A,B)=>{
    let p = A;
    while(p){
        if(p === B.prototype){
            return true;
        }

        p = p.__proto__;
    }
    return;
}



// 取路径值
const json = {
    a:{b:{c:1}},
    d:{e:2},
}

const path = ["a","b","c"];

let q = json;
path.forEach(k=>{
    q = q[k];
})

