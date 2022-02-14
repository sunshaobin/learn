export default function createStore(reducer) {
    let currentState;
    // 定义 currentListeners，保存订阅的回调函数
    let lisenters = [];

    function getSate() {
        return currentState;
    }
    function subscribe(listener) {
        // 将回调函数保存到回调函数数组中
        lisenters.push(listener)
        // 返回一个取消订阅的函数
        return function unsubscribe() {
            const index = lisenters.indexOf(lisenter);
            lisenters.splice(index, 1);
        }
    }
    function dispatch(action) {
        // 调用 reducer 函数，修改当前的 state
        currentState = reducer(currentState, action)
        // 循环调用回调函数
        for (let i = 0; i < lisenters.length; i++) {
        const lisenter = lisenters[i];
            lisenter()
        }
    }
  
    dispatch({type:"@@redux/INIT"})
    return {
      getSate,
      subscribe,
      dispatch,
    }
  }

  export default function compose(...funcs){
    if(funcs.length === 0){
        return arg => arg
    }

    if(funcs.length == 1){
        return funcs[0]
    }

    return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
  }

  export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
      let store = createStore(reducer);
      let dispatch = () => {
        throw new Error(
          '不允许在构建中间件时调用 dispatch，其他中间件不会应用此 dispatch。'
        );
      };
      // 提供给中间件到 API
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args),
      };
      // 调用中间件函数（构建），并返回一个调用后到数据
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      // 使用 compose 将中间件数组串起来
      dispatch = compose(...chain)(store.dispatch);
  
      return {
        ...store,
        dispatch,
      };
    };
  }

  // 构建中间件的时候，传入 getState, dispatch，使中间件可以用这两个方法
const thunk = ({ getState, dispatch }) => {
    // 第二层是 compose 的时候生成的一层包一层的函数，其中 next 就是下一层中间件，最后一个 next 就是原始的 dispatch
    return (next) => {
      // 中间件主要逻辑代码
      return (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }
        return next(action);
      };
    };
};

const store = createStore(reducer, applyMiddleware(logger, thunk));


export default class Provider extends React.Component {  
  // 需要声明静态属性childContextTypes来指定context对象的属性,是context的固定写法  
  static childContextTypes = {    
      store: PropTypes.object  
  } 

  constructor(props, context) {    
      super(props, context)
      this.store = props.store  
  } 

  // 实现getChildContext方法,返回context对象,也是固定写法  
  getChildContext() {    
      return { store: this.store }  
  }  

  // 渲染被Provider包裹的组件  
  render() {    
      return this.props.children  
  }
}
