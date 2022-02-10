const m = new Map();
m.set("a","aa");
m.delete("a");

// 求交集
var intersection = function(nums1,nums2){
    const map = new Map();
    nums1.forEach(n => {
        map.push(n);
    });
    const res = [];
    nums2.forEach(n=>{
        if(map.get(n)){
            res.push(n)
            map.delete(n)
        }
    })

    return res;
}

// 两数之和
var twoSum = function(nums,target){
    const map = new Map();
    for(let i=0;i<nums.length;i++){
        const n = nums[i];
        const n2 = target - n;
        if(map.has(n2)){
            return [map.get(n2),i];
        }else{
            map.set(n,i)
        }
    }
}

// 无重复字符的最长字串
var lengthOfLongestSubstring = function(s){
    let l = 0;
    let res = 0;
    const map = new Map();
    for(let r = 0;r<s.length;r+=1){
        if(map.has(s[r])&& map.get(s[r]>=1)){
            l = map.get(s[r])+1;
        }

        res = Math.max(res,r-1+1)
        map.set(s[r],r);

    }

    return res;
}

// 最小覆盖子串
var minWindow = function(s,t){
    let l = 0;
    let r = 0;
    const need = new Map();
    for(let c of t){
        need.set(c,need.has(c)?need.get(c)+1:1)
    }

    

}