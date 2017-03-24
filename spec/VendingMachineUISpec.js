const VendingMachineInterface = require('./../app/VendingMachineInterface');
const VendingMachineUI = require('./../app/VendingMachineUI');
const VendingMachine = require('./../app/VendingMachine');

let vendingMachineUI = null;

describe("인터페이스와 자판기를 결합 할 수 있다.", ()=>{
    it("자판기 껍데기만 만들 수 없다.", ()=>{
        const vendingMachineUIError = ()=> new VendingMachineUI();
        expect(vendingMachineUIError).toThrow(new TypeError("inject VendingMachineInterface with VendingMachine"));
    });

    it("VendingMachineUI에 VendingMachineInterface과 VendingMachine을 결합 시킬 수 있다.", ()=>{
        vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
        expect(vendingMachineUI.status()).toEqual({
            "interface": "VendingMachineInterface",
            "system": "VendingMachine",
        });
    });

    it("interface의 메소드를 가지고 있어야 한다.", function(){

    })
});