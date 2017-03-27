class VendingMachineUI{
    constructor(vendingMachineInterface, vendingMachine){
        if(typeof vendingMachineInterface !== "object" || typeof vendingMachine !== "object"){
            throw new TypeError("inject VendingMachineInterface with VendingMachine");
        }
        this._connectedElements = {};
        this._combine(vendingMachineInterface, vendingMachine)
    }
    _combine(vendingMachineInterface, vendingMachine){

        this.interface = vendingMachineInterface;
        this.system = vendingMachine;
        this.getInterfaceMethodsByName().forEach(v=> this[v] = vendingMachineInterface[v], this);
    }
    hardware(){
        return {
            "interface": this.interface,
            "system": this.system
        }
    }
    connectDOM( selectors ){
        this._connectedElements.buy = document.querySelectorAll(".buy");
        // var $buy = document.querySelectorAll(selectors.buy);
        // $buy.addEventListener("click", function(){
        //
        // });
    }
    connect(){
        this.getInterfaceMethodsByName().forEach(v=> this[v] = this.system[v].bind(this.system), this);
    }
    getInterfaceMethodsByName(){
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this.interface)).filter(v=> v !== "constructor");
    }
    getConnectedElements(){
        return this._connectedElements;
    }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineUI;
}
