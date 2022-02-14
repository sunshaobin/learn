老浏览器的history: 主要通过hash来实现，对应createHashHistory
高版本浏览器: 通过html5里面的history，对应createBrowserHistory
node环境下: 主要存储在memeory里面，对应createMemoryHistory

class HashRouter {
    currentUrl = ''; // 当前的URL
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    getHashPath(url) {
        const index = url.indexOf('#');
        if (index >= 0) {
            return url.slice(index + 1);
        }
        return '/';
    }

    refresh(event) {
        let curURL = '',
            oldURL = null;
        if (event.newURL) {
            oldURL = this.getHashPath(event.oldURL || '');
            curURL = this.getHashPath(event.newURL || '');
        } else {
            curURL = this.getHashPath(window.location.hash);
        }
        this.currentUrl = curURL;
    }
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: <Home />,
    },
    {
        path: '/about',
        name: 'about',
        component: <About />,
    },
    {
        path: '*',
        name: '404',
        component: <NotFound404 />,
    },
];
const router = new HashRouter();
// 监听change事件
router.on('change', (currentUrl, lastUrl) => {
    let route = null;
    // 匹配路由
    for (let i = 0, len = routes.length; i < len; i++) {
        const item = routes[i];
        if (currentUrl === item.path) {
            route = item;
            break;
        }
    }
    // 若没有匹配到，则使用最后一个路由
    if (!route) {
        route = routes[routes.length - 1];
    }
    // 渲染当前的组件
    ReactDOM.render(route.component, document.getElementById('app'));
});

class HistoryRouter {
    currentUrl = '';
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        this.addStateListener();
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('popstate', this.refresh, false);
        window.addEventListener('pushState', this.refresh, false);
        window.addEventListener('replaceState', this.refresh, false);
    }
    addStateListener() {
        const listener = function (type) {
            var orig = history[type];
            return function () {
                var rv = orig.apply(this, arguments);
                var e = new Event(type);
                e.arguments = arguments;
                window.dispatchEvent(e);
                return rv;
            };
        };
        window.history.pushState = listener('pushState');
        window.history.replaceState = listener('replaceState');
    }
    refresh(event) {
        this.currentUrl = location.pathname;
        this.emit('change', location.pathname);
        document.querySelector('#app span').innerHTML = location.pathname;
    }
    on(evName, listener) {
        this.handlers[evName] = listener;
    }
    emit(evName, ...args) {
        const handler = this.handlers[evName];
        if (handler) {
            handler(...args);
        }
    }
}
const router = new HistoryRouter();
router.on('change', function (curUrl) {
    console.log(curUrl);
});