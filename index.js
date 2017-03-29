($=>{
    let vendingMachineUI,
        selectorsOfButton,
        selectors,
        methods,
        supplies,
        prices;
    //Environment Values
    selectorsOfButton = new Map();
    selectors = new Map();
    methods = new Map();

    selectorsOfButton
        .set("buy",".buy")
        .set("change",".change")
        .set("insertCoin",".insert-coin")
        .set("insertMoney",".insert-money");
    selectors
        .set("quantity",".quantity")
        .set("price",".price")
        .set("storedMoney",".stored-money")
        .set("changedMoney",".changed-money")
        .set("resultBeverage",".result-beverage");
    methods
        .set("quantity","getQuantity")
        .set("price","getPrice")
        .set("storedMoney","getStoredMoney")
        .set("changedMoney","getChange")
        .set("resultBeverage","getBeverage");
    supplies = {
        "Coke":100,
        "Sprite" : 80,
        "Orange Juice" : 50
    }
    prices = {
        "Coke":500,
        "Sprite" : 800,
        "Orange Juice" : 1000
    }

    //Create Vending Machine
    vendingMachineUI = new VendingMachineUI( new VendingMachineInterface(), new VendingMachine() );
    vendingMachineUI.connectSystem();
    vendingMachineUI.connectAction($, selectorsOfButton, "click");
    vendingMachineUI.system.supply(supplies);
    vendingMachineUI.system.setPrice(prices);
    vendingMachineUI.insertMoney(5000);
    vendingMachineUI.connectDashboard($, selectors, methods);
})(jQuery);

