class VendingMachineUI{
    constructor(vendingMachineInterface, vendingMachine){
        if(typeof vendingMachineInterface !== "object" || typeof vendingMachine !== "object"){
            throw new TypeError("inject VendingMachineInterface with VendingMachine");
        }
        this.interface = vendingMachineInterface;
        this.system = vendingMachine;

        this.buy = vendingMachineInterface.buy;
        this.change = vendingMachineInterface.change;
        this.insertCoin = vendingMachineInterface.insertCoin;
        this.insertMoney = vendingMachineInterface.insertMoney;
    }
    hardware(){
        return {
            "interface": this.interface,
            "system": this.system
        }
    }
    connect(){
        this.buy = this.system.buy.bind(this.system);
        this.change = this.system.change.bind(this.system);
        this.insertCoin = this.system.insertCoin.bind(this.system);
        this.insertMoney = this.system.insertMoney.bind(this.system);
    }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineUI;
}
