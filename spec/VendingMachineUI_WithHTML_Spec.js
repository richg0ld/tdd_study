const VendingMachineInterface = require('./../app/VendingMachineInterface');
const VendingMachineUI = require('./../app/VendingMachineUI');
const VendingMachine = require('./../app/VendingMachine');

// const $ = require("cheerio").load('<html><head></head><body></body></html>');
//Test framework

global.document = require("jsdom").jsdom('<html><head></head></head><body></body></html>');
global.window = document.defaultView;
// require('jasmine-jquery');
global.$ = global.jQuery = require("jquery");

let vendingMachineUI = null;

beforeEach(function(){
    vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
    vendingMachineUI.connect();
    vendingMachineUI.system.supply({
        "Coke":100
    });
    vendingMachineUI.system.setPrice({
        "Coke":500
    });
    vendingMachineUI.insertMoney(5000);
});

describe("템블릿에서 자판기를 사용 할 수 있다.", ()=>{

    let selectors = null;

    beforeEach(function(){
        selectors = new Map();
        selectors.set("buy",".buy");
        selectors.set("change",".change");
        selectors.set("insertCoin",".insert-coin");
        selectors.set("insertMoney",".insert-money");
    });

    it("템플릿을 못찾으면 연결이 되지 않는다.",function(){
        expect(vendingMachineUI.elements()).toEqual({});
        vendingMachineUI.connectDOM($, selectors);
        expect(vendingMachineUI.elements().buy.attr("class")).not.toEqual("buy");
        expect(vendingMachineUI.elements().change.attr("class")).not.toEqual("change");
        expect(vendingMachineUI.elements().insertCoin.attr("class")).not.toEqual("insert-coin");
        expect(vendingMachineUI.elements().insertMoney.attr("class")).not.toEqual("insert-money");
    });

    it("템플릿과 연결한다.",function(){
        $("body").html("");
        $("body").append(`
            <button class="buy">buy</button>
            <button class="change">change</button>
            <button class="insert-coin">insert coin</button>
            <button class="insert-money">insert money</button>
        `);
        vendingMachineUI.connectDOM($, selectors);
        expect(vendingMachineUI.elements().buy.attr("class")).toEqual("buy");
        expect(vendingMachineUI.elements().change.attr("class")).toEqual("change");
        expect(vendingMachineUI.elements().insertCoin.attr("class")).toEqual("insert-coin");
        expect(vendingMachineUI.elements().insertMoney.attr("class")).toEqual("insert-money");

        spyOnEvent(".buy", 'click');

    });

});