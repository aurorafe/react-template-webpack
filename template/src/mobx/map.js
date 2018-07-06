import {observable, action} from 'mobx';

class Map {
  @observable
  map = null;

  constructor(map){
    this.map = map;
  }

  @action
  getMap(map){
    this.map = map;
  }
}

export default (new Map());
