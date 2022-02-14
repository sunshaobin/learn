// const fn1 = (next) => {
//     console.log(1)
//     next()
//     console.log(2)
//   }
  
//   const fn2 = (next) => {
//     console.log(3)
//     next()
//     console.log(4)
//   }
  
//   const fn3 = (next) => {
//     console.log(5)
//     next()
//     console.log(6)
//   }
  
//   const middlewares = [fn1, fn2, fn3];


//   function compose1(middlewarw){
//     return function(args){
//         console.log(args)
//         function dispatch(index) {
//             const fn = middlewarw[index] || args;
//             if(typeof fn !== "function"){
//                 return 
//             }
//             const next = ()=>{
//                 dispatch(index+1);
//             }
//             fn(next)
//         }
//         dispatch(0)
//     }
//   }

// //   function compose(middlewarw) {
// //     return function(args){
// //       dispatch(0);
// //       function dispatch(index){
// //         const fn = middlewarw[index] || args;
// //         if(typeof fn !== "function") return;
// //         const next = ()=> dispatch(index+1);
// //         fn(next);
// //       }
// //     }
// //   };
// //   console.log("middlewares",middlewares);
//   compose1(middlewares)("pp");

//   // --------------------------
//   function asyncFn() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("delay...");
//         resolve();
//       }, 1000);
//     });
//   }
  
//   const fn1 = async (next) => {
//     console.log(1)
//     await next()
//     console.log(2)
//   }
  
//   const fn2 = async (next) => {
//     console.log(3)
//     await asyncFn();
//     await next()
//     console.log(4)
//   }
  
//   const fn3 = async (next) => {
//     console.log(5)
//     await next()
//     console.log(6)
//   };
  
//   function compose(middlewarw) {
//     return function (args) {
//       dispatch(0);
//       function dispatch(index) {
//         const fn = middlewarw[index] || args;
//         if (typeof fn !== "function") return Promise.resolve();
//         const next = () => dispatch(index + 1);
        
//         // 给执行函数添加返回成功的Promise.resolve
//         return Promise.resolve(fn(next))
//       }
//     }
//   };
  
//   compose([fn1,fn2,fn3])();

  
//redux ---------------------------
const fn1 = (next) => {
    return ()=>{
      console.log(1)
      next()
      console.log(2)
    }
  }
  
  const fn2 = (next) => {
    return ()=>{
      console.log(3)
      next()
      console.log(4)
    }
  }
  
  const fn3 = (next) => {
    return ()=>{
      console.log(5)
      next()
      console.log(6)
    }
  }
  


  function compose(middlewarw) {
    return function(cb) {
      function dispatch(index){
        const fn = middlewarw[index];
        const next = ()=>dispatch(index+1); // 下一次的函数执行
        // 如果不存在下一个函数了，拿到传参里面的函数执行，这里需要保证传参是一个函数，对应的是redux里面的dispatch参数
        fn ? fn(next)() : cb() 
      }
      
      // 最终返回一个函数
      return ()=> dispatch(0);
      
    }
  };

  const dispatch = compose([fn1,fn2,fn3])(()=> console.log("dispatch"));
  
  dispatch();
