class MyClass {
  constructor() {
    console.log("initiate");
  }

  sayHelloFn(str) {
    console.log("say Hello");
  }

  add(arg1, arg2) {
    if (1) {
      var result;
      result = arg1 + arg2;
      return result;
    } else 
    return 2;
  }

  callAnotherFn(arg1, arg2) {
    this.sayHelloFn("hello world");
    var result = this.add(arg1, arg2);
    return result;
  }

  callTheCallBack(callback) {
    callback();
  }

  testPromise() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve(3);
      }, 6000);
    }).then(function (result) {
      return result * 2;
    });
  }

  // make XHR call
  xhrFn() {
    return new Promise((resolve, reject) => {
      var xhr = new HMLHttpRequest();
      xhr.open("post", "https://ecjp-sercice-new.herokuapp.com", true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    });
  }
}

module.exports = MyClass;
