class VendingMachine {
    constructor(){
        this._quantitys = {};
        this._prices = {};
        this._storedMoney = 0;
    }
    supply(quantitys){
        Object.keys(quantitys).forEach(v=> this._quantitys[v] = this._quantitys[v] === undefined ? quantitys[v] : this._quantitys[v] + quantitys[v], this);
    }
    buy(product){
        if(this._isCanNotBuy(product)) return null;

        this._reduceStoredMoneyByPriceOf(product);
        this._reduceQuantityByOneOf(product);

        return product;
    }
    _hasQuantity(product){
        return !this._quantitys[product] || this._quantitys[product] < 1;
    }
    _hasNoMoney(product){
        return this._storedMoney < this._prices[product];
    }
    _reduceStoredMoneyByPriceOf(product){
        this._storedMoney-=this._prices[product];
    }
    _reduceQuantityByOneOf(product){
        this._quantitys[product]--;
    }
    _isCanNotBuy(product){
        return this._hasNoMoney(product) || this._hasQuantity(product);
    }
    insertCoin(coin){
        this._storedMoney += coin;
    }
    insertMoney(money){
        this._storedMoney += money;
    }
    getCoin(){
        return this._storedMoney;
    }
    getMoney(){
        return this._storedMoney;
    }
    setPrice(prices){
        this._prices = prices;
    }
    change(){
        let changeMoney = this._storedMoney;
        this._storedMoney = 0;
        return changeMoney;
}
}
VendingMachine.prototype = {

};

// function VendingMachine() {
//     this._quantitys = {};
//     this._prices = {};
//     this._storedMoney = 0;
// }
// VendingMachine.prototype = {
//     supply: function(quantitys){
//         Object.keys(quantitys).forEach(function(v){
//             this._quantitys[v] = this._quantitys[v] === undefined ? quantitys[v] : this._quantitys[v] + quantitys[v];
//         }, this);
//     },
//     buy: function(product){
//         if(this._isCanNotBuy(product)) return null;
//
//         this._reduceStoredMoneyByPriceOf(product);
//         this._reduceQuantityByOneOf(product);
//
//         return product;
//     },
//     _hasQuantity: function(product){
//         return !this._quantitys[product] || this._quantitys[product] < 1;
//     },
//     _hasNoMoney: function(product){
//         return this._storedMoney < this._prices[product];
//     },
//     _reduceStoredMoneyByPriceOf: function(product){
//         this._storedMoney-=this._prices[product];
//     },
//     _reduceQuantityByOneOf: function(product){
//         this._quantitys[product]--;
//     },
//     _isCanNotBuy: function(product){
//         return this._hasNoMoney(product) || this._hasQuantity(product);
//     },
//     insertCoin: function(coin){
//         this._storedMoney += coin;
//     },
//     insertMoney: function(money){
//         this._storedMoney += money;
//     },
//     getCoin: function(){
//         return this._storedMoney;
//     },
//     getMoney: function(){
//         return this._storedMoney;
//     },
//     setPrice: function(prices){
//         this._prices = prices;
//     },
//     change: function(){
//         var changeMoney = this._storedMoney;
//         this._storedMoney = 0;
//         return changeMoney;
//     }
// };
//


if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = VendingMachine;
}
