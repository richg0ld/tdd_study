class VendingMachineUI{
    constructor(vendingMachineInterface, vendingMachine){
        if(typeof vendingMachineInterface !== "object" || typeof vendingMachine !== "object"){
            throw new TypeError("inject VendingMachineInterface with VendingMachine");
        }
        this._changedMoney = 0;
        this._beverage = "";
        this._updateMethods = null;
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
    connectDashboard( api, selectors, methods ){
        for (let [k, v] of selectors){
            this._elements[k] = api(v);
        }
        this._updateMethods = methods;
        this._dashboardUpdateLoop();
    }
    connectAction( api, selectors, event ){
        for (let [k, v] of selectors){
            this._elements[k] = api(v);
            this._elements[k].on(event, e =>{
                this[k](e.target.value);
                this._dashboardUpdateLoop(e);
            });
        }
    }
    _dashboardUpdateLoop( event ){
        if(this._updateMethods === null) return;
        for (let [k, v] of this._updateMethods){
            if(this._elements[k].length <= 1){
                this._elements[k].text( this[v]() );
            }else{
                this._elements[k].each(i=>{
                    let $el = this._elements[k].eq(i);
                    $el.text( this[v]( $el.data("bind") ) );
                });
            }
        }
    }
    connectSystem(){
        this.getInterfaceMethodsByName().forEach(v=> {
            if(v === "buy") return this[v] = (product)=> this._beverage = this.system[v].call(this.system, product);
            if(v === "change") this[v] = ()=> this._changedMoney = this.system[v].call(this.system);
            else this[v] = this.system[v].bind(this.system);
        }, this);
    }
    getInterfaceMethodsByName(){
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this.interface)).filter(v=> v !== "constructor");
    }
    element( name ){
        return this._elements[name];
    }
    getQuantity( product ){
        return this.system.getQuantity( product );
    }
    getPrice( product ){
        return this.system.getPrice( product );
    }
    getStoredMoney(){
        return this.system.getMoney();
    }
    getChange(){
        return this._changedMoney;
    }
    getBeverage(){
        return this._beverage;
    }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineUI;
}
