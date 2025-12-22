var RandomizedSet = function () {
  this.valToKeyMap = new Map([]);
  this.keyToValMap = new Map([]);
  this.ids = new Set([]);
  this.id = 0;
  this.count = 0;

  return null;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (!this.valToKeyMap.has(val)) {
    this.valToKeyMap.set(val, this.id);
    this.keyToValMap.set(this.id, val);
    this.ids.add(id);
    this.id++;
    this.count++;

    return true;
  }

  return false;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (this.valToKeyMap.has(val)) {
    const id = this.valToKeyMap.get(this.val);
    this.valToKeyMap.delete(val);
    this.keyToValMap.delete(id);
    this.ids.delete(id);
    this.count--;

    return true;
  }

  return false;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const randomIndex = (this.count * Math.getRandom()) | 0;
  const randomId = this.ids.get(randomIndex);
  return this.keyToValMap.get(randomId);
};

var obj = new RandomizedSet();
var param_1 = obj.insert(123);
// var param_1 = obj.insert(456);
// var param_1 = obj.insert(789);
// var param_2 = obj.remove(123);
// var param_3 = obj.getRandom();
