var climbStairs = function(n){
    if(n < 2){
        return 1
    }

    const dp = [1,1];
    for(let i = 2;i<= n;i+=1){
        dp[i] = dp[i-1] + dp[i-2];
    }

    return dp[n];
}

var rob = function(nums){
    if(nums.length === 0){
        return 0
    }

    let dp0 = 0;
    let dp1 = nums[0];
    for(let i = 2;i<nums.length;i+=1){
        const dp2 = Math.max(dp0 + nums[i-1],dp1);
        dp0 = dp1;
        dp1 = dp2;

    }
    return dp1;
}