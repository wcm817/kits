var kits = new Object();

// 获取当前时间，并且返回： xxxx-xx-xx HH:mm:ss格式的时间
kits.formatDate = function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

//  获取一个随机的十六进制的颜色
kits.randomHexColor = function () {
  var numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  var colorStr = "#";
  for (var i = 0; i < 6; i++) {
    var randomNum = Math.floor(Math.random() * numArr.length);
    colorStr += numArr[randomNum];
  }
  return colorStr;
}

// 获取n到m之间的随机整数
kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

// 获取一个随机的rgb格式的颜色
kits.randomRGBColor = function () {
  // console.log(this)
  return "rgb(" + this.randomInt(0, 255) + "," + this.randomInt(0, 255) + ", " + this.randomInt(0, 255) + ")";
}

/**
 * 从localStorage里面根据指定的键获取一个数组
 * @param {string} key 存储在localStorage里面数据对应的键
 * @returns {Array} 将JSON字符串反序列化后的数组
 */
kits.getLocalDataArray = function(key){
  var data = localStorage.getItem(key);
  var arr = JSON.parse(data);
  if(!arr){
    arr = [];
  }
  return arr;
}
/**
 * 将一个数组以指定的键存储到localStorage里面
 * @param {string} key 存储到localStorage中的数据的键
 * @param {Array} arr 要存储到localStorage里面的数组
 * @returns {undefined}
 */
kits.saveLocalDataArray= function(key,arr){
  var json = JSON.stringify(arr);
  localStorage.setItem(key,json);
}

/**
 * 向localStorage里面的数组数据追加一个数据对象
 * @param {string} key 在localStorage中的数组对应的键
 * @param {object} data 要追加到数组中的数组
 * @returns {undefined}
 */
kits.appendDataIntoArray = function(key,data){
  var arr = this.getLocalDataArray(key);
  arr.push(data);
  this.saveLocalDataArray(key,arr);
}

/**
 * 向localStorage里面的数组数据前插入一个数据对象
 * @param {string} key 在localStorage中的数组对应的键
 * @param {object} data 要追加到数组中的数组
 * @returns {undefined}
 */
kits.prependDataIntoArray = function(key,data){
  var arr = this.getLocalDataArray(key);
  arr.unshift(data);
  this.saveLocalDataArray(key,arr);
}

/**
 * 根据对应的id从localStorage中的数组中删除一条数据
 * @param {string} key 存储在localStorage中的数组的键
 * @param {string | number} id 指定的数据的id
 * @returns {boolean} 是否删除成功
 */
kits.deleteLocalDataById = function(key,id){
  var arr = this.getLocalDataArray(key);
  var data = null;
  arr.forEach(function(e,i){
    if(e.pID == id){
      data = e;
      arr.splice(i,1);
    }
  })
  this.saveLocalDataArray(key,arr);
  return !!data;
}

/**
 * 根据id修改localStorage里面的数据
 * @param {string} key 对应数组的键
 * @param {string | number} id 对应数据的id
 * @param {object} data 要把数据修改成什么样的对象
 * @returns {boolean} 是否成功
 */
kits.modifyLocalDataById = function(key,id,data){
  var arr = this.getLocalDataArray(key);
  var obj = null;
  arr.forEach(function(e,i){
    if(e.id == id){
      for(var key in data){
        if(key == 'id'){
          continue;
        }
        e[key] = data[key];
      }
      obj = e;
    }
  })
  return !!obj;
}

