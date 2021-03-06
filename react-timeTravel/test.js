function deepEqual(x, y) {
  if (x === y) {
      return true;
  }
  if (!(typeof x == "object" && x != null) || !(typeof y == "object" && y != null)){
      return false;
  }
  //比较对象内部
  if (Object.keys(x).length != Object.keys(y).length){
      return false;
  }
  for (var prop in x) {
      if (y.hasOwnProperty(prop))
      {  
          if (!deepEqual(x[prop], y[prop])){
              return false;
          }
      }
      else{
          return false;
      }
  }
  return true;
}