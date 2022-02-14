// --------
function uri_curring(protocol){
    return function(hostname,pathname){
        return `${protocol}${hostname}${pathname}`
    }
}


const uri_https = uri_curring('https://');

const uri1 = uri_https("www.fedbook.cn","/book");
const uri2 = uri_https('www.wenyueblog.com',"/")

// ---------
const addEvent  = function(element, type, listener, useCapture) {
    if(window.addEventListener) {
      console.log('判断为其它浏览器')
      // 和原生 addEventListener 一样的函数
      // element: 需要添加事件监听的元素
      // type: 为元素添加什么类型的事件
      // listener: 执行的回调函数
      // useCapture: 要进行事件冒泡或者事件捕获的选择
      element.addEventListener(type, function(e) {
        // 为了规避 this 指向问题，用 call 进行 this 的绑定
        listener.call(element, e);
      }, useCapture);
    } else if(window.attachEvent) {
      console.log('判断为 IE9 以下浏览器')
      // 原生的 attachEvent 函数
      // 不需要第四个参数，因为 IE 支持的是事件冒泡
      // 多拼接一个 on，这样就可以使用统一书写形式的事件类型了
      element.attachEvent('on' + type, function(e) {
        listener.call(element, e);
      });
    }
  }
  
  // 测试一下
  let div = document.querySelector('div');
  let p = document.querySelector('p');
  let span = document.querySelector('span');
  
  addEvent(div, 'click', (e) => {console.log('点击了 div');}, true);
  addEvent(p, 'click', (e) => {console.log('点击了 p');}, true);
  addEvent(span, 'click', (e) => {console.log('点击了 span');}, true);


  const addEvent  = (function() {
    if(window.addEventListener) {
      console.log('判断为其它浏览器')
      return function(element, type, listener, useCapture) {
        element.addEventListener(type, function(e) {
          listener.call(element, e);
        }, useCapture);
      }
    } else if(window.attachEvent) {
      console.log('判断为 IE9 以下浏览器')
      return function(element, type, handler) {
        element.attachEvent('on'+type, function(e) {
          handler.call(element, e);
        });
      }
    }
  }) ();
  
  // 测试一下
  let div = document.querySelector('div');
  let p = document.querySelector('p');
  let span = document.querySelector('span');
  
  addEvent(div, 'click', (e) => {console.log('点击了 div');}, true);
  addEvent(p, 'click', (e) => {console.log('点击了 p');}, true);
  addEvent(span, 'click', (e) => {console.log('点击了 span');}, true);