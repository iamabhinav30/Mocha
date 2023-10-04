var MyClass = require("../src/myClass");

var myObj = new MyClass();
var expect = require("chai").expect;
var sinon = require("sinon");
let chai = require("chai");
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);
const nock = require("nock");

describe("test suit", function () {
  it("Test the add method", function () {
    expect(myObj.add(1, 2)).to.be.equal(3);
  });

  it("spy the add methos", function () {
    var spy = sinon.spy(myObj, "add");
    var args1 = 10,
      args2 = 20;
    myObj.callAnotherFn(args1, args2);
    // sinon.assert.called(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(args1, args2)).to.be.true;
    // spy.restore();
  });

  it("spy the callback mehtod", function () {
    var callback = sinon.spy();
    myObj.callTheCallBack(callback);
    expect(callback.calledOnce).to.be.true;
  });

  it("mock the sayHello function", function () {
    var mock = sinon.mock(myObj);
    var expectation = mock.expects("sayHelloFn");
    expectation.exactly(1);
    expectation.withArgs("hello world");
    myObj.callAnotherFn(10, 20);
    mock.verify();
  });
});

describe("TEST SUIT FOR STUB", function () {
  it("stub the add method ", function () {
    var stub = sinon.stub(myObj, "add");
    stub
      .withArgs(10, 20)
      .onFirstCall()
      .returns(100)
      .onSecondCall()
      .returns(200);
    expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
    expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
  });
});

describe("Test the Promise", function () {
  it("Promise test case", function () {
    this.timeout(0);
    // myObj.testPromise().then(function(result){
    //     expect(result).to.be.equal(6)
    //     expect(false).to.be.false;
    //     done(); //keep track of callback method
    // });

    return expect(myObj.testPromise()).to.eventually.equal(6);
  });
});

describe.skip("XHR test suit", function () {
  after(function () {
    console.log("after test suit");
  });
  before(function () {
    console.log("before test suit");
  });

  afterEach(function () {
    console.log("after each test case");
  });

  beforeEach(function () {
    sinon.restore(); //restore different types of wrapper reated using spy, stub, nock
    console.log("before each test case");
  });

  it("Mock and stub and xht call", function (done) {
    this.timeout(0);
    const scope = nock("https://echo-service-new.herokuapp.com")
      .post("/echo")
      .reply(200, { id: 123 });
    myObj
      .xhrFn()
      .then(function (result) {
        expect(result).to.be.equal({ id: 123 });
        console.log(result);
        done();
      })
      .catch((error) => {
        done(new Error("test case failed"));
      });
  });
});

// describe("Test the Promise", function () {
//   it("Promise test case", function () {});
// });
// describe("Test the Promise", function () {
//   it("Promise test case", function () {});
// });
// describe("Test the Promise", function () {
//   it("Promise test case", function () {});
// });
