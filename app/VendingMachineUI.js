class VendingMachineUI{
    constructor(vendingMachineInterface, vendingMachine){
        if(typeof vendingMachineInterface !== "object" || typeof vendingMachine !== "object"){
            throw new TypeError("inject VendingMachineInterface with VendingMachine");
        }
        this._elements = {};
        this._combine(vendingMachineInterface, vendingMachine);
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
    connectDOM( api, selectors, event ){
        for (let [k, v] of selectors){
            this._elements[k] = api(v);
            this._elements[k].on(event, e => this[k](e.target.value) );
        }
    }
    connect(){
        this.getInterfaceMethodsByName().forEach(v=> this[v] = this.system[v].bind(this.system), this);
    }
    getInterfaceMethodsByName(){
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this.interface)).filter(v=> v !== "constructor");
    }
    elements(){
        return this._elements;
    }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineUI;
}
