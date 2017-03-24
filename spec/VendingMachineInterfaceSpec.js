const VendingMachineInterface = require('./../app/VendingMachineInterface');

let vendingMachineInterface = null;
beforeEach(()=>{
    vendingMachineInterface = new VendingMachineInterface();
});

describe("버튼들이 있다.", ()=>{
    it("음료 구매 버튼이 있다.", ()=>{
        expect(vendingMachineInterface.buy).toBeDefined();
    });
    it("거스롬돈 레버가 있다.", ()=>{
        expect(vendingMachineInterface.change).toBeDefined();
    });
    it("동전을 넣을 수 있다.", ()=>{
        expect(vendingMachineInterface.insertCoin).toBeDefined();
    });
    it("지폐를 넣을 수 있다.", ()=>{
        expect(vendingMachineInterface.insertMoney).toBeDefined();
    });
});
