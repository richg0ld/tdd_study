class VendingMachineInterface {
    buy(){ }
    change(){ }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineInterface;
}
