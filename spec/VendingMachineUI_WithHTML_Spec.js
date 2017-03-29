const VendingMachineInterface = require('./../app/VendingMachineInterface');
const VendingMachineUI = require('./../app/VendingMachineUI');
const VendingMachine = require('./../app/VendingMachine');

// const $ = require("cheerio").load('<html><head></head><body></body></html>');
//Test framework

global.document = require("jsdom").jsdom('<html><head></head></head><body></body></html>');
global.window = document.defaultView;
global.$ = global.jQuery = require("jquery");

let vendingMachineUI = null;
let selectors = null;

beforeEach(()=>{
    vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
    vendingMachineUI.connect();
    vendingMachineUI.system.supply({
        "Coke":100,
        "Sprite" : 100,
        "Orange Juice" : 100
    });
    vendingMachineUI.system.setPrice({
        "Coke":500,
        "Sprite" : 800,
        "Orange Juice" : 1000
    });
    vendingMachineUI.insertMoney(5000);
    selectors = new Map();
    selectors.set("buy",".buy");
    selectors.set("change",".change");
    selectors.set("insertCoin",".insert-coin");
    selectors.set("insertMoney",".insert-money");
});

describe("템블릿에서 자판기를 사용 할 수 있다.", ()=>{

    it("템플릿을 못찾으면 연결이 되지 않는다.",()=>{
        expect(vendingMachineUI.elements()).toEqual({});
        vendingMachineUI.connectDOM($, selectors, "click");
        expect(vendingMachineUI.elements().buy.attr("class")).not.toEqual("buy");
        expect(vendingMachineUI.elements().change.attr("class")).not.toEqual("change");
        expect(vendingMachineUI.elements().insertCoin.attr("class")).not.toEqual("insert-coin");
        expect(vendingMachineUI.elements().insertMoney.attr("class")).not.toEqual("insert-money");
    });

    afterEach(()=>{
        $("body").html("");
        $("body").append(`
            <button class="buy" value="Coke">콜라</button>
            <button class="buy" value="Sprite">사이다</button>
            <button class="buy" value="Orange Juice">콜라</button>
            <button class="change">거스름돈 레버</button>
            <button class="insert-coin" value="100">동전넣기</button>
            <button class="insert-money" value="1000">지폐넣기</button>
        `);
    });

    it("템플릿과 연결한다.",()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        expect(vendingMachineUI.elements().buy.attr("class")).toEqual("buy");
        expect(vendingMachineUI.elements().change.attr("class")).toEqual("change");
        expect(vendingMachineUI.elements().insertCoin.attr("class")).toEqual("insert-coin");
        expect(vendingMachineUI.elements().insertMoney.attr("class")).toEqual("insert-money");
    });
    
    it("click 이벤트를 걸어둔 요소 클릭시 해당 메소드를 실행한다", ()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        spyOn(vendingMachineUI, "buy");
        spyOn(vendingMachineUI, "change");
        spyOn(vendingMachineUI, "insertCoin");
        spyOn(vendingMachineUI, "insertMoney");
        vendingMachineUI.elements().buy.click();
        vendingMachineUI.elements().change.click();
        vendingMachineUI.elements().insertCoin.click();
        vendingMachineUI.elements().insertMoney.click();
        expect(vendingMachineUI.buy).toHaveBeenCalled();
        expect(vendingMachineUI.change).toHaveBeenCalled();
        expect(vendingMachineUI.insertCoin).toHaveBeenCalled();
        expect(vendingMachineUI.insertMoney).toHaveBeenCalled();
    });

    it("콜라 버튼 클릭시 콜라를 뽑을 수 있다.", ()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        vendingMachineUI.elements().buy.eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4500);
        vendingMachineUI.elements().buy.eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4000);
    });

    it("음료 버튼 클릭시 해당 음료를 뽑을 수 있다.", ()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        vendingMachineUI.elements().buy.eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4500);
        vendingMachineUI.elements().buy.eq(1).click();
        vendingMachineUI.elements().buy.eq(2).click();
        expect(vendingMachineUI.system.getMoney()).toBe(2700);
    });

    it("거스름돈 레버를 클릭하면 남은 돈을 받을 수 있다.", ()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        vendingMachineUI.elements().buy.eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4500);
        vendingMachineUI.elements().change.click();
        expect(vendingMachineUI.system.getMoney()).toBe(0);
    });

    it("동전넣기 버튼을 클릭하면 100원이 들어간다.", ()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        vendingMachineUI.elements().insertCoin.click();
        expect(vendingMachineUI.system.getMoney()).toBe(5100);
        vendingMachineUI.elements().insertCoin.click();
        vendingMachineUI.elements().insertCoin.click();
        vendingMachineUI.elements().insertCoin.click();
        vendingMachineUI.elements().insertCoin.click();
        expect(vendingMachineUI.system.getMoney()).toBe(5500);
    });

    it("지폐넣기 버튼을 클릭하면 1000원이 들어간다.", ()=>{
        vendingMachineUI.connectDOM($, selectors, "click");
        vendingMachineUI.elements().insertMoney.click();
        expect(vendingMachineUI.system.getMoney()).toBe(6000);
        vendingMachineUI.elements().insertMoney.click();
        vendingMachineUI.elements().insertMoney.click();
        vendingMachineUI.elements().insertMoney.click();
        vendingMachineUI.elements().insertMoney.click();
        expect(vendingMachineUI.system.getMoney()).toBe(10000);
    });
});