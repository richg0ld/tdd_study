class VendingMachineUI{
    constructor(vendingMachineInterface, vendingMachine){
        if(typeof vendingMachineInterface !== "object" || typeof vendingMachine !== "object"){
            throw new TypeError("inject VendingMachineInterface with VendingMachine");
        }
    }
    status(){
        return {
            "interface": "VendingMachineInterface",
            "system": "VendingMachine",
        }
    }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineUI;
}
