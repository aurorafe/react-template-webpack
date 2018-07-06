import React from 'react';

function getOptions(props) {
  let options = {};
  for(let key in props) {
    if (
      key !== 'children'
      && typeof props[key] !== 'undefined' //exclude undefined ones
      && !key.match(/^on[A-Z]/)     //exclude events
    ) {
      options[key] = props[key];
    }
  }
  return options;
}

function getPropsKey(eventName) {
  return 'on' + eventName
  // eslint-disable-next-line
    .replace(/(\:[a-z])/g, $1 => $1.toUpperCase())
    .replace(/^[a-z]/, $1 => $1.toUpperCase())
    .replace(':','')
}

function getEvents(events, props) {
  let prop2EventMap;
  for(let key in events) {
    prop2EventMap[getPropsKey(key)] = key;
  }
  let ret = {};
  for(let propName in props) {
    let eventName = prop2EventMap[propName];
    let prop = props[propName];
    if (typeof prop !== 'undefined' && propName.match(/^on[A-Z]/) && eventName) {
      ret[eventName] = prop;
    }
  }

  return ret;
}

let typeOf = function(obj){
  return ({}).toString.call(obj)
    .match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

function cloneObject(obj){
  var type = typeOf(obj);
  if (type == 'object' || type == 'array') {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == 'array' ? [] : {};
    for (var key in obj) {
      clone[key] = cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
}

function findChild(children, childType) {
  let found;
  let childrenArr = React.Children.toArray(children);
  for (let i=0; i<childrenArr.length; i++) {
    let child = childrenArr[i];
    if (child.type.name === childType){
      found = child;
      break;
    }
  }
  return found;
}

function getRelation (str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr (routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
function getRoutes (path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

/**
 * check is null
 * @param obj
 * @returns {boolean}
 */
const isNull = (obj) => {
  return obj == null;
};

/**
 * check is number
 * @param val
 * @returns {boolean}
 */
const isNumber = (val) => {
  return (typeof val === 'number') && !isNaN(val);
};

/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 */
const isObject = value => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

/**
 * check is function
 * @param value
 * @returns {boolean}
 */
const isFunction = value => {
  if (!isObject(value)) {
    return false;
  }
  return typeof value === 'function' || (value.constructor !== null && value.constructor === Function);
};

/**
 * is date value
 * @param val
 * @returns {boolean}
 */
const isDate = (val) => {
  return toString.call(val) === '[object Date]'
};

/**
 * 判断是否为合法字符串
 * @param value
 * @returns {boolean}
 */
const isString = (value) => {
  if (value == null) {
    return false;
  }
  return typeof value === 'string' || (value.constructor !== null && value.constructor === String);
};

const urlToList = (url) => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
};

export {
  getOptions,
  getEvents,
  cloneObject,
  findChild,
  getRoutes,
  isNumber,
  isNull,
  isFunction,
  isDate,
  isObject,
  isString,
  urlToList
}
