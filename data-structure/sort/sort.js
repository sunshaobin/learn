
// 冒泡
Array.prototype.bubbleSort = function(){
    for(let i = 0;i<this.length -1;i=i+1){
        for(let j = 0; j<this.length-1-i;j=j+1){
            if(this[j]>this[j+1]){
                const temp = this[j];
                this[j] = this[j+1];
                this[j+1] = temp
            }
        }
    }
}

// 选择排序
Array.prototype.selectionSort = function(){
    for(let i = 0;i<this.length-1;i+=1){
        let indexMin = i;
        for(let j = i;j<this.length;j+=1){
            if(this[j]<this[indexMin]){
                indexMin = j;
            }
        }
        if(indexMin !==1){
            const temp = this[i];
            this[i] = this[indexMin];
            this[indexMin] = temp;
        }
       
    }
    
}

//插入排序
Array.prototype.insertionSort = function(){
    for(let i = 1;i<this.length;i=i+1){
        const temp = this[i];
        let j = i;
        while(j > 0){
            if(this[j-1]>this[j]){
                this[j] = this[j-1];

            }else{
                break
            }

            this[j] = temp
        }
    }
}

// 归并
// Array.prototype.mergeSort = function(){
//     const rec = (arr)=>{
//         if(arr.length === 1){
//             return arr
//         }
//         const mid = Math.floor(arr.length / 2);
//         const left = arr.slice(0,mid);
//         const right = arr.slice(mid,arr.length);
//         const orderLeft = rec(left);
//         const orderRight = rec(right);
//     }

//     rec(this)
// }

function merge(left,right){
    let arr = [];
    while(left.length && right.length){
        if(left[0] < right[0]){
            arr.push(left.shift())
        }else{
            arr.push(right.shift())
        }
    }

    return [...arr,...left,...right];
}


function mergeSort(array){
    const half = array.length / 2;
    if(array.length < 2){
        return array;
    }

    const left = array.splice(0,half);
    return merge(mergeSort(left),mergeSort(array))
}   

// 快速排序

Array.prototype.quickSort = function(){
    const rec = () => {
        const left = [];
        const right = [];
        if(arr.length === 1){
            return arr;
        }
        const mid = arr[0];
        for(let i = 1 ;i<arr.length;i+=1){
            if(arr[i]<mid){
                left.push(arr[i]);

            }else{
                right.push(arr[i]);
            }
        }
        return [...rec(left),mid,...rec(right)]
    }
}


// 二分搜索
Array.prototype.binarySearch = function(item){
    let low = 0;
    let high = this.length  - 1;
    while(low <= high){
        const mid = Math.floor((low + high)/2);
        const element = this[mid];
        if(element<item){
            low = mid + 1;
        }else if(element > item){
            high = mid -1
        }else{
            return mid;
        }
    }

    return -1;
}
