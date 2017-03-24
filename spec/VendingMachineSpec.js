const VendingMachine = require('./../app/VendingMachine');

let vendingMachine = null;
beforeEach(()=> vendingMachine = new VendingMachine());

describe("음료를 뽑을 수 있다.", () => {

    beforeEach(() => {
        vendingMachine.insertCoin(10000);
        vendingMachine.supply({
            "Coke" : 1,
            "Sprite" : 1,
            "Orange Juice" : 1,
            "Apple Juice" : 1
        });
    });

    it("콜라, 사이다, 오렌지쥬스, 사과쥬스를 뽑을 수 있다.", () => {
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Sprite")).toBe("Sprite");
        expect(vendingMachine.buy("Orange Juice")).toBe("Orange Juice");
        expect(vendingMachine.buy("Apple Juice")).toBe("Apple Juice");
    });

});

describe("재고를 관리 할 수 있다.", ()=>{

    beforeEach(()=>{
        vendingMachine.insertCoin(10000);
        vendingMachine.supply({
            "nonExistingOtherDrink": 0,
            "Coke": 1
        });
    });

    it("콜라를 충전한다.", ()=>{
        vendingMachine.supply({
            "Coke": 1
        });
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });
    
    it("재고를 여러번 충전한다.", ()=>{
        vendingMachine.supply({
            "Coke": 1,
            "Sprite" : 1
        });
        vendingMachine.supply({
            "Sprite" : 1,
            "Orange Juice" : 1
        });
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
        expect(vendingMachine.buy("Sprite")).toBe("Sprite");
        expect(vendingMachine.buy("Sprite")).toBe("Sprite");
        expect(vendingMachine.buy("Sprite")).not.toBe("Sprite");
        expect(vendingMachine.buy("Orange Juice")).toBe("Orange Juice");
        expect(vendingMachine.buy("Orange Juice")).not.toBe("Orange Juice");
    });

    it("재고가 있는 음료만 뽑을 수 있다.", ()=>{
        expect(vendingMachine.buy("nonExistingOtherDrink")).not.toBe("nonExistingOtherDrink");
    });

    it("재고만큼만 뽑을 수 있다.", ()=>{
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });

    it("음료별로 가격을 설정 할 수 있다.", ()=>{
        vendingMachine.setPrice({
            "Coke": 500
        });
        vendingMachine.buy("Coke");
        expect(vendingMachine.getCoin()).toBe(9500);
    });

});

describe("돈을 넣을 수 있다.", ()=>{

    beforeEach (()=> vendingMachine.setPrice({
        "Coke": 500
    }));

    it("동전을 넣을 수 있다.", ()=>{
        vendingMachine.insertCoin(500);
        expect(vendingMachine.getCoin()).toBe(500);
    });

    it("저장된 금액을 확인 할 수 있다.", ()=>{
        vendingMachine.insertMoney(1000);
        expect(vendingMachine.getMoney()).toBe(1000);
    });

    it("동전을 여러번 넣을 수 있다.", ()=>{
        vendingMachine.insertCoin(100);
        vendingMachine.insertCoin(200);
        expect(vendingMachine.getCoin()).toBe(300);
    });

    it("지폐를 여러번 넣을 수 있다.", ()=>{
        vendingMachine.insertMoney(1000);
        vendingMachine.insertMoney(2000);
        expect(vendingMachine.getMoney()).toBe(3000);
    });

    it("동전을 넣은 만큼만 음료를 뽑을 수 있다.", ()=>{
        vendingMachine.supply({
            "Coke": 100
        });
        vendingMachine.insertCoin(500);
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });

    it("지폐를 넣은 만큼만 음료를 뽑을 수 있다.", ()=>{
        vendingMachine.supply({
            "Coke": 100
        });
        vendingMachine.insertMoney(1000);
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });

});

describe("거스름돈을 받을 수 있다.", ()=>{

    beforeEach (()=> vendingMachine.insertMoney(1000));

    it("넣은 돈을 다시 거슬러 받는다.", ()=>{
        expect(vendingMachine.change()).toBe(1000);
    });

    it("음로를 뽑은 후 거슬러 받는다.", ()=>{
        vendingMachine.supply({
            "Coke": 1
        });
        vendingMachine.setPrice({
            "Coke": 500
        });
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.change()).toBe(500);
    });

    it("거스름돈을 받은 후 자판기는 가지고 있는금액이 0이다", ()=>{
        vendingMachine.change();
        expect(vendingMachine.getMoney()).toBe(0);
    });
});