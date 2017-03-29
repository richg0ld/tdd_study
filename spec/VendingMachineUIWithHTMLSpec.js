const VendingMachineInterface = require('./../app/VendingMachineInterface');
const VendingMachineUI = require('./../app/VendingMachineUI');

const VendingMachine = require('./../app/VendingMachine');
global.document = require("jsdom").jsdom('<html><head></head></head><body></body></html>');
global.window = document.defaultView;

global.$ = global.jQuery = require("jquery");

let vendingMachineUI = null;
let selectorsOfButton = null;

beforeEach(()=>{
    $("body").html("");
    $("body").append(`
            <div class="dashboard">
                <span class="coke quantity" data-bind="Coke">0</span>
                <span class="coke price" data-bind="Coke">0</span>
                <span class="sprite quantity" data-bind="Sprite">0</span>
                <span class="sprite price" data-bind="Sprite">0</span>
                <span class="orange-juice quantity" data-bind="Orange Juice">0</span>
                <span class="orange-juice price" data-bind="Orange Juice">0</span>
                <span class="stored-money">0</span>
                <span class="changed-money">0</span>
                <span class="result-beverage"></span>
            </div>
            <button class="buy" value="Coke">콜라</button>
            <button class="buy" value="Sprite">사이다</button>
            <button class="buy" value="Orange Juice">오렌지 쥬스</button>
            <button class="change">거스름돈 레버</button>
            <button class="insert-coin" value="100">동전넣기</button>
            <button class="insert-money" value="1000">지폐넣기</button>
    `);

    vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
    vendingMachineUI.connectSystem();
    vendingMachineUI.system.supply({
        "Coke":100,
        "Sprite" : 80,
        "Orange Juice" : 50
    });
    vendingMachineUI.system.setPrice({
        "Coke":500,
        "Sprite" : 800,
        "Orange Juice" : 1000
    });
    vendingMachineUI.insertMoney(5000);
    selectorsOfButton = new Map();
    selectorsOfButton
        .set("buy",".buy")
        .set("change",".change")
        .set("insertCoin",".insert-coin")
        .set("insertMoney",".insert-money");
});

describe("탬플릿에서 상태를 확인 할 수 있다.", ()=>{

    let selectors;
    let methods;

    beforeEach(()=>{
        selectors = new Map();
        methods = new Map();
        selectors
            .set("quantity",".quantity")
            .set("price",".price")
            .set("storedMoney",".stored-money")
            .set("changedMoney",".changed-money")
            .set("resultBeverage",".result-beverage");
        methods
            .set("quantity","getQuantity")
            .set("price","getPrice")
            .set("storedMoney","getStoredMoney")
            .set("changedMoney","getChange")
            .set("resultBeverage","getBeverage");
    })

    it("템플릿과 연결한다.",()=>{
        vendingMachineUI.connectDashboard($, selectors, methods);
        expect(vendingMachineUI.element("quantity").eq(0).hasClass("quantity")).toBe(true);
        expect(vendingMachineUI.element("quantity").eq(1).hasClass("quantity")).toBe(true);
        expect(vendingMachineUI.element("quantity").eq(2).hasClass("quantity")).toBe(true);
        expect(vendingMachineUI.element("price").eq(0).hasClass("price")).toBe(true);
        expect(vendingMachineUI.element("price").eq(1).hasClass("price")).toBe(true);
        expect(vendingMachineUI.element("price").eq(2).hasClass("price")).toBe(true);
        expect(vendingMachineUI.element("storedMoney").hasClass("stored-money")).toBe(true);
        expect(vendingMachineUI.element("changedMoney").hasClass("changed-money")).toBe(true);
        expect(vendingMachineUI.element("resultBeverage").hasClass("result-beverage")).toBe(true);
    });

    beforeEach(()=>{
        vendingMachineUI.connectAction($, selectorsOfButton, "click");
        vendingMachineUI.connectDashboard($, selectors, methods);
    });

    it("템플릿에 음료정보는 고유값을 가진다.",()=>{
        expect(vendingMachineUI.element("quantity").eq(0).data("bind")).toBe("Coke");
        expect(vendingMachineUI.element("quantity").eq(1).data("bind")).toBe("Sprite");
        expect(vendingMachineUI.element("quantity").eq(2).data("bind")).toBe("Orange Juice");
        expect(vendingMachineUI.element("price").eq(0).data("bind")).toBe("Coke");
        expect(vendingMachineUI.element("price").eq(1).data("bind")).toBe("Sprite");
        expect(vendingMachineUI.element("price").eq(2).data("bind")).toBe("Orange Juice");
    });

    it("탬플릿에 연결 시 상태들이 뿌려진다.",()=>{
        expect(+vendingMachineUI.element("quantity").length).toBe(3);
        expect(+vendingMachineUI.element("price").length).toBe(3);
        expect(+vendingMachineUI.element("storedMoney").length).toBe(1);
        expect(+vendingMachineUI.element("changedMoney").length).toBe(1);
        expect(vendingMachineUI.element("resultBeverage").length).toBe(1);
        expect(+vendingMachineUI.element("quantity").eq(0).text()).toBe(100);
        expect(+vendingMachineUI.element("quantity").eq(1).text()).toBe(80);
        expect(+vendingMachineUI.element("quantity").eq(2).text()).toBe(50);
        expect(+vendingMachineUI.element("price").eq(0).text()).toBe(500);
        expect(+vendingMachineUI.element("price").eq(1).text()).toBe(800);
        expect(+vendingMachineUI.element("price").eq(2).text()).toBe(1000);
        expect(+vendingMachineUI.element("storedMoney").text()).toBe(5000);
        expect(+vendingMachineUI.element("changedMoney").text()).toBe(0);
        expect(vendingMachineUI.element("resultBeverage").text()).toBe("");
    });
    //옵저버 패턴이 필요...
    it("이벤트 발생시 등록한 메소드들이 실행 된다.", ()=>{
        spyOn(vendingMachineUI, "getQuantity");
        spyOn(vendingMachineUI, "getPrice");
        spyOn(vendingMachineUI, "getStoredMoney");
        spyOn(vendingMachineUI, "getChange");
        spyOn(vendingMachineUI, "getBeverage");
        expect(vendingMachineUI.getQuantity).not.toHaveBeenCalled();
        expect(vendingMachineUI.getPrice).not.toHaveBeenCalled();
        expect(vendingMachineUI.getStoredMoney).not.toHaveBeenCalled();
        expect(vendingMachineUI.getChange).not.toHaveBeenCalled();
        expect(vendingMachineUI.getBeverage).not.toHaveBeenCalled();
        vendingMachineUI.element("buy").eq(0).click();

        expect(vendingMachineUI._updateMethods.size).toBe(5);

        expect(vendingMachineUI.getQuantity).toHaveBeenCalled();
        expect(vendingMachineUI.getPrice).toHaveBeenCalled();
        expect(vendingMachineUI.getStoredMoney).toHaveBeenCalled();
        expect(vendingMachineUI.getChange).toHaveBeenCalled();
        expect(vendingMachineUI.getBeverage).toHaveBeenCalled();
    });

    it("이벤트 발생시 상태값들이 갱신된다.", ()=>{
        vendingMachineUI.element("buy").eq(0).click();
        expect(+vendingMachineUI.element("quantity").eq(0).text()).toBe(99);
        expect(+vendingMachineUI.element("storedMoney").text()).toBe(4500);
        expect(+vendingMachineUI.element("changedMoney").text()).toBe(0);
        expect(vendingMachineUI.element("resultBeverage").text()).toBe("Coke");
        vendingMachineUI.element("change").click();
        expect(+vendingMachineUI.element("storedMoney").text()).toBe(0);
        expect(+vendingMachineUI.element("changedMoney").text()).toBe(4500);
    });
});

describe("템플릿에서 해당요소를 못찾으면 연결이 되지 않는다.",()=>{
    it("class명에 해당하는 요소가 템플릿에 없으면 연결 되지 않는다.",()=>{
        $("body").html("");
        vendingMachineUI.connectAction($, selectorsOfButton, "click");
        expect(vendingMachineUI.element("buy").hasClass("buy")).not.toBe(true);
        expect(vendingMachineUI.element("change").hasClass("change")).not.toBe(true);
        expect(vendingMachineUI.element("insertCoin").hasClass("insert-coin")).not.toBe(true);
        expect(vendingMachineUI.element("insertMoney").hasClass("insert-money")).not.toBe(true);
    });
});

describe("템블릿에서 자판기를 사용 할 수 있다.", ()=>{

    it("템플릿과 연결한다.",()=>{
        vendingMachineUI.connectAction($, selectorsOfButton, "click");
        expect(vendingMachineUI.element("buy").hasClass("buy")).toBe(true);
        expect(vendingMachineUI.element("change").hasClass("change")).toBe(true);
        expect(vendingMachineUI.element("insertCoin").hasClass("insert-coin")).toBe(true);
        expect(vendingMachineUI.element("insertMoney").hasClass("insert-money")).toBe(true);
    });

    beforeEach(()=>{
        vendingMachineUI.connectAction($, selectorsOfButton, "click");
    })

    it("click 이벤트를 걸어둔 요소 클릭시 해당 메소드를 실행한다", ()=>{
        spyOn(vendingMachineUI, "buy");
        spyOn(vendingMachineUI, "change");
        spyOn(vendingMachineUI, "insertCoin");
        spyOn(vendingMachineUI, "insertMoney");
        vendingMachineUI.element("buy").click();
        vendingMachineUI.element("change").click();
        vendingMachineUI.element("insertCoin").click();
        vendingMachineUI.element("insertMoney").click();
        expect(vendingMachineUI.buy).toHaveBeenCalled();
        expect(vendingMachineUI.change).toHaveBeenCalled();
        expect(vendingMachineUI.insertCoin).toHaveBeenCalled();
        expect(vendingMachineUI.insertMoney).toHaveBeenCalled();
    });

    it("콜라 버튼 클릭시 콜라를 뽑을 수 있다.", ()=>{
        vendingMachineUI.element("buy").eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4500);
        vendingMachineUI.element("buy").eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4000);
    });

    it("음료 버튼 클릭시 해당 음료를 뽑을 수 있다.", ()=>{
        vendingMachineUI.element("buy").eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4500);
        vendingMachineUI.element("buy").eq(1).click();
        vendingMachineUI.element("buy").eq(2).click();
        expect(vendingMachineUI.system.getMoney()).toBe(2700);
    });

    it("거스름돈 레버를 클릭하면 남은 돈을 받을 수 있다.", ()=>{
        vendingMachineUI.element("buy").eq(0).click();
        expect(vendingMachineUI.system.getMoney()).toBe(4500);
        vendingMachineUI.element("change").click();
        expect(vendingMachineUI.system.getMoney()).toBe(0);
    });

    it("동전넣기 버튼을 클릭하면 100원이 들어간다.", ()=>{
        vendingMachineUI.element("insertCoin").click();
        expect(vendingMachineUI.system.getMoney()).toBe(5100);
        vendingMachineUI.element("insertCoin").click();
        vendingMachineUI.element("insertCoin").click();
        vendingMachineUI.element("insertCoin").click();
        vendingMachineUI.element("insertCoin").click();
        expect(vendingMachineUI.system.getMoney()).toBe(5500);
    });

    it("지폐넣기 버튼을 클릭하면 1000원이 들어간다.", ()=>{
        vendingMachineUI.element("insertMoney").click();
        expect(vendingMachineUI.system.getMoney()).toBe(6000);
        vendingMachineUI.element("insertMoney").click();
        vendingMachineUI.element("insertMoney").click();
        vendingMachineUI.element("insertMoney").click();
        vendingMachineUI.element("insertMoney").click();
        expect(vendingMachineUI.system.getMoney()).toBe(10000);
    });
});