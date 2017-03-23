function VendingMachine() {
    this._quantitys = {};
    this._prices = {};
    this._storedMoney = 0;
}
VendingMachine.prototype = {
    supply: function(quantitys){
        this._quantitys = quantitys;
    },
    buy: function(goods){
        if(this._hasNoMoney(goods)) return null;
        if(this._hasQuantity(goods)) return null;

        this._reduceStoredMoneyByPriceOf(goods);
        this._reduceQuantityByOneOf(goods);
        return goods;
    },
    _hasQuantity: function(goods){
        return !this._quantitys[goods] || this._quantitys[goods] < 1;
    },
    _hasNoMoney: function(goods){
        return this._storedMoney < this._prices[goods];
    },
    _reduceStoredMoneyByPriceOf: function(goods){
        this._storedMoney-=this._prices[goods];
    },
    _reduceQuantityByOneOf: function(goods){
        this._quantitys[goods]--;
    },
    insertCoin: function(coin){
        this._storedMoney += coin;
    },
    getCoin: function(){
        return this._storedMoney;
    },
    setPrice: function(prices){
        this._prices = prices;
    }
};

module.exports.VendingMachine = VendingMachine;