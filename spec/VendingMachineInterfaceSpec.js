const VendingMachineInterface = require('./../app/VendingMachineInterface');

let vendingMachineInterface;
beforeEach(()=>{
    vendingMachineInterface = new VendingMachineInterface();
});

describe("버튼들이 있다.", ()=>{
    it("음료 구매 버튼이 있다.", ()=>{
        expect(vendingMachineInterface.buy).toBeDefined();
    });
    it("콜라버튼이 있다.", ()=>{
        expect(vendingMachineInterface.change).toBeDefined();
    });
});

// describe("거스름돈 레버를 돌릴 수 있다.", ()=>{
// });