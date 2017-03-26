const VendingMachineInterface = require('./../app/VendingMachineInterface');
const VendingMachineUI = require('./../app/VendingMachineUI');
const VendingMachine = require('./../app/VendingMachine');

let vendingMachineUI = null;

describe("인터페이스와 자판기를 결합 할 수 있다.", ()=>{
    it("자판기 껍데기만 만들 수 없다.", ()=>{
        expect( ()=> new VendingMachineUI() ).toThrow(new TypeError("inject VendingMachineInterface with VendingMachine"));
    });

    it("VendingMachineUI에 VendingMachine을 결합 시킬 수 있다.", ()=>{
        vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
        expect(vendingMachineUI.hardware()).toEqual({
            "interface": new VendingMachineInterface(),
            "system": new VendingMachine(),
        });
    });

    it("interface의 메소드를 가지고 있어야 한다.", function(){

    })
});

beforeEach(function(){
    vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
});

describe("인터페이스에 자판기를 연결 할 수 있다.",function(){

    it("인터페이스의 기능이 그대로 받아서 정의 된다.", function(){
        const vendingMachineInterface = new VendingMachineInterface();
        expect(vendingMachineUI.buy).toBe(vendingMachineInterface.buy);
        expect(vendingMachineUI.change).toBe(vendingMachineInterface.change);
        expect(vendingMachineUI.insertCoin).toBe(vendingMachineInterface.insertCoin);
        expect(vendingMachineUI.insertMoney).toBe(vendingMachineInterface.insertMoney);
    });

    it("각 인터페이스에 자판기의 기능들을 연결시킨다.", function(){
        const vendingMachine = new VendingMachine();
        vendingMachineUI.connect();
        expect(vendingMachineUI.buy).toEqual(vendingMachine.buy);
        expect(vendingMachineUI.change).toEqual(vendingMachine.change);
        expect(vendingMachineUI.insertCoin).toEqual(vendingMachine.insertCoin);
        expect(vendingMachineUI.insertMoney).toEqual(vendingMachine.insertMoney);
    });
});

describe("음료를 뽑을 수 있다.", () => {

    beforeEach(() => {
        vendingMachineUI.connect();
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

});