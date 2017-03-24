var VendingMachine = require('./../app/VendingMachine').VendingMachine;

var vendingMachine;
beforeEach(function(){
    vendingMachine = new VendingMachine();
});

describe("음료를 뽑을 수 있다.", function() {

    beforeEach(function(){
        vendingMachine.insertCoin(10000);
        vendingMachine.supply({
            "Coke" : 1,
            "Sprite" : 1,
            "Orange Juice" : 1,
            "Apple Juice" : 1
        });
    });

    it("콜라, 사이다, 오렌지쥬스, 사과쥬스를 뽑을 수 있다.", function() {
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Sprite")).toBe("Sprite");
        expect(vendingMachine.buy("Orange Juice")).toBe("Orange Juice");
        expect(vendingMachine.buy("Apple Juice")).toBe("Apple Juice");
    });

});

describe("재고를 관리 할 수 있다.", function(){

    beforeEach(function(){
        vendingMachine.insertCoin(10000);
        vendingMachine.supply({
            "nonExistingOtherDrink": 0,
            "Coke": 1
        });
    });

    it("재고가 있는 음료만 뽑을 수 있다.", function () {
        expect(vendingMachine.buy("nonExistingOtherDrink")).not.toBe("nonExistingOtherDrink");
    });

    it("재고만큼만 구매 가능하다.", function () {
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });

    it("음료별로 가격을 설정 할 수 있다.", function () {
        vendingMachine.setPrice({
            "Coke": 500
        });
        vendingMachine.buy("Coke");
        expect(vendingMachine.getCoin()).toBe(9500);
    });

});

describe("돈을 넣을 수 있다.", function(){

    beforeEach(function(){
        vendingMachine.setPrice({
            "Coke": 500
        });
    });

    it("동전을 넣을 수 있다.", function () {
        vendingMachine.insertCoin(500);
        expect(vendingMachine.getCoin()).toBe(500);
    });

    it("저장된 금액을 확인 할 수 있다.", function () {
        vendingMachine.insertMoney(1000);
        expect(vendingMachine.getMoney()).toBe(1000);
    });

    it("동전을 여러번 넣을 수 있다.", function () {
        vendingMachine.insertCoin(100);
        vendingMachine.insertCoin(200);
        expect(vendingMachine.getCoin()).toBe(300);
    });

    it("지폐를 여러번 넣을 수 있다.", function () {
        vendingMachine.insertMoney(1000);
        vendingMachine.insertMoney(2000);
        expect(vendingMachine.getMoney()).toBe(3000);
    });

    it("동전을 넣은 만큼만 음료를 구매 할 수 있다.", function () {
        vendingMachine.supply({
            "Coke": 100
        });
        vendingMachine.insertCoin(500);
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });

    it("지폐를 넣은 만큼만 음료를 구매 할 수 있다.", function () {
        vendingMachine.supply({
            "Coke": 100
        });
        vendingMachine.insertMoney(1000);
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).toBe("Coke");
        expect(vendingMachine.buy("Coke")).not.toBe("Coke");
    });

});
