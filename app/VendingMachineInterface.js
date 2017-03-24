class VendingMachineInterface {
    buy(){ }
    change(){ }
    insertCoin(){ }
    insertMoney(){ }
}

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachineInterface;
}
