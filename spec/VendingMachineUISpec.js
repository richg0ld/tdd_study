const VendingMachineInterface = require('./../app/VendingMachineInterface');
const VendingMachineUI = require('./../app/VendingMachineUI');
const VendingMachine = require('./../app/VendingMachine');

let vendingMachineUI = null;

describe("인터페이스와 자판기를 결합 할 수 있다.", ()=>{

    it("자판기 껍데기만 만들 수 없다.", ()=>{
        expect( ()=> new VendingMachineUI() ).toThrow(new TypeError("inject VendingMachineInterface with VendingMachine"));
    });

    beforeEach(function(){
        vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
    });

    it("VendingMachineUI에 VendingMachineInterface와 VendingMachine을 조립 할 수 있다.", ()=>{
        expect(vendingMachineUI.hardware()).toEqual({
            "interface": new VendingMachineInterface(),
            "system": new VendingMachine(),
        });
    });

    it("인터페이스의 메소드명을 배열로 가져온다.", function(){
        expect(vendingMachineUI.getInterfaceMethodsByName()).toEqual(["buy", "change", "insertCoin", "insertMoney"]);
        expect(vendingMachineUI.getInterfaceMethodsByName().forEach).toEqual([].forEach);
    });

    it("인터페이스의 기능이 그대로 받아서 정의 된다.", function(){
        const vendingMachineInterface = new VendingMachineInterface();
        expect(vendingMachineUI.buy).toEqual(vendingMachineInterface.buy);
        expect(vendingMachineUI.change).toEqual(vendingMachineInterface.change);
        expect(vendingMachineUI.insertCoin).toEqual(vendingMachineInterface.insertCoin);
        expect(vendingMachineUI.insertMoney).toEqual(vendingMachineInterface.insertMoney);
    });

    // 함수 정의 자체를 확인 할 수 없어서 약간 미적지근함
    it("각 인터페이스에 자판기의 시스템들을 연결시킨다.", function(){
        vendingMachineUI.connectSystem();
        vendingMachineUI.system.supply({
            "Coke":1
        });
        vendingMachineUI.system.setPrice({
            "Coke":500
        });
        vendingMachineUI.insertCoin(100);
        vendingMachineUI.insertMoney(500);
        expect(vendingMachineUI.system.getMoney()).toBe(600);
        expect(vendingMachineUI.buy("Coke")).toBe("Coke");
        expect(vendingMachineUI.change()).toBe(100);
    });

});

beforeEach(function(){
    vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
});

describe("음료를 뽑을 수 있다.", () => {

    beforeEach(() => {
        vendingMachineUI.connectSystem();
        vendingMachineUI.insertCoin(10000);
        vendingMachineUI.system.supply({
            "Coke" : 1,
            "Sprite" : 1,
            "Orange Juice" : 1,
            "Apple Juice" : 1
        });
    });

    it("콜라, 사이다, 오렌지쥬스, 사과쥬스를 뽑을 수 있다.", () => {
        expect(vendingMachineUI.buy("Coke")).toBe("Coke");
        expect(vendingMachineUI.buy("Sprite")).toBe("Sprite");
        expect(vendingMachineUI.buy("Orange Juice")).toBe("Orange Juice");
        expect(vendingMachineUI.buy("Apple Juice")).toBe("Apple Juice");
    });

    it("재고만큼만 뽑을 수 있다.", ()=>{
        expect(vendingMachineUI.buy("Coke")).toBe("Coke");
        expect(vendingMachineUI.buy("Coke")).not.toBe("Coke");
    });

});

describe("돈을 넣을 수 있다.", ()=>{

    beforeEach (()=> {
        vendingMachineUI.connectSystem();
        vendingMachineUI.system.setPrice({
            "Coke": 500
        });
    });

    it("동전을 넣을 수 있다.", ()=>{
        vendingMachineUI.insertCoin(500);
        expect(vendingMachineUI.system.getMoney()).toBe(500);
    });

    it("저장된 금액을 확인 할 수 있다.", ()=>{
        vendingMachineUI.insertMoney(1000);
        expect(vendingMachineUI.system.getMoney()).toBe(1000);
    });

    it("동전을 여러번 넣을 수 있다.", ()=>{
        vendingMachineUI.insertCoin(100);
        vendingMachineUI.insertCoin(200);
        expect(vendingMachineUI.system.getMoney()).toBe(300);
    });

    it("지폐를 여러번 넣을 수 있다.", ()=>{
        vendingMachineUI.insertMoney(1000);
        vendingMachineUI.insertMoney(2000);
        expect(vendingMachineUI.system.getMoney()).toBe(3000);
    });

    it("동전을 넣은 만큼만 음료를 뽑을 수 있다.", ()=>{
        vendingMachineUI.system.supply({
            "Coke": 100
        });
        vendingMachineUI.insertCoin(500);
        expect(vendingMachineUI.buy("Coke")).toBe("Coke");
        expect(vendingMachineUI.buy("Coke")).not.toBe("Coke");
    });

    it("지폐를 넣은 만큼만 음료를 뽑을 수 있다.", ()=>{
        vendingMachineUI.system.supply({
            "Coke": 100
        });
        vendingMachineUI.insertMoney(1000);
        expect(vendingMachineUI.buy("Coke")).toBe("Coke");
        expect(vendingMachineUI.buy("Coke")).toBe("Coke");
        expect(vendingMachineUI.buy("Coke")).not.toBe("Coke");
    });

});