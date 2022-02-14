export default class EventEmitter {
    list = {};
    on(event, fn) {
      let target = this.list[event];
      if (!target) {
        this.list[event] = [];
        target = this.list[event];
      }
      if (!target.includes(fn)) {
        target.push(fn);
      }
    };
    emit(event, ...args) {
      const fns = this.list[event];
      if (fns && fns.length > 0) {
        fns.forEach(fn => {
          fn && fn(...args);
        });
      }
    }
  };

  // 发布订阅
const em = new EventEmitter();

const store = {a: 1,b: 2};

// autorun
em.on('store.a', () => console.log(store.a));

// set value
store.a = 5;
em.emit('store.a');

// mobx // ------------------
const em = new EventEmitter();

const store = { a: 1, b: 2 };

// autorun
const fn = () => console.log(store.a)

// observable
Object.defineProperty(store, 'a', {
  get: function () {
    em.on('store.a', fn);
    return 100;
  },
  set: function () {
    em.emit('store.a');
  },
});

// 收集依赖
fn();

// set state
store.a = 2

// ------------------
const em = new EventEmitter();
let currentFn;
let obId = 1;

const autorun = (fn) => {
  currentFn = fn;
  fn();
  currentFn = null;
};

const observable = (obj) => {
  // 用 Symbol 当 key；这样就不会被枚举到，仅用于值的存储；
  const data = Symbol('data');
  obj[data] = JSON.parse(JSON.stringify(obj));

  Object.keys(obj).forEach(key => {
    // 每个 key 都生成唯一的 channel ID
    const id = String(obId++);
    Object.defineProperty(obj, key, {
      get: function () {
        if (currentFn) {
          em.on(id, currentFn);
        }
        return this[data][key];
      },
      set: function (v) {
        // 值不变时不触发
        if (this[data][key] !== v) {
          this[data][key] = v;
          em.emit(id);
        }
      }
    });
  });
  return obj;
};

const store = observable({ a: 1, b: 2 });

autorun(() => {
  console.log(store.a);
});

store.a = 5;
store.a = 6;

// -----------------------
const em = new EventEmitter();
let currentFn;
let obId = 1;

const autorun = (fn) => {
   const warpFn = () => {
     currentFn = warpFn;
     fn();
     currentFn = null;
   }
   warpFn();
 };
const observable = (obj) => {
  // 用 Symbol 当 key；这样就不会被枚举到，仅用于值的存储
  const data = Symbol('data');
  obj[data] = JSON.parse(JSON.stringify(obj));

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      observable(obj[key]);
    } else {
      // 每个 key 都生成唯一的 channel ID
      const id = String(obId++);
      Object.defineProperty(obj, key, {
        get: function () {
          if (currentFn) {
            em.on(id, currentFn);
          }
          return obj[data][key];
        },
        set: function (v) {
          // 值不变时不触发
          if (obj[data][key] !== v) {
            obj[data][key] = v;
            em.emit(id);
          }
        }
      });
    }
  });
  return obj;
};

// ---------

const map = new WeakMap();

const observable = (obj) => {
  return new Proxy(obj, {
    get: (target, propKey) => {
      if (typeof target[propKey] === 'object') {
        return observable(target[propKey]);
      } else {
        if (currentFn) {
          if (!map.get(target)) {
            map.set(target, {});
          }
          const mapObj = map.get(target);
          const id = String(obId++);
          mapObj[propKey] = id;
          em.on(id, currentFn);
        }
        return target[propKey];
      }
    },
    set: (target, propKey, value) => {
      if (target[propKey] !== value) {
        target[propKey] = value;
        const mapObj = map.get(target);
        if (mapObj && mapObj[propKey]) {
          em.emit(mapObj[propKey]);
        }
      }
      return true;
    }
  });
};