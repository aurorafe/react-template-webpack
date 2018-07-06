import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { Map, layer, interactions } from '@sakitam-gis/sakitam-map';
import '../../assets/style/view/dashboard.scss';

class Dashboard extends Component {
  static defaultProps = {};

  static propTypes = {
    history: PropTypes.any
  };

  // 初始化页面常量 绑定事件方法
  constructor (props, context) {
    super(props)
  }

  // 组件已经加载到dom中
  componentDidMount () {
    this.initMap();
  }

  initMap = () => {
    const map = new Map('map', {
      projection: 'EPSG:3857',
      zoom: 5,
      center: [12673975, 4079823]
    });
    const vector = new layer.VectorLayer({
      url: './static/json/countries.geojson'
    });
    map.addLayer(vector);
    const drag = new interactions.DragPan();
    const zoom = new interactions.WheelZoom();
    const dbclick = new interactions.DoubleClickZoom();
    map.addInteraction(dbclick);
    map.addInteraction(zoom);
    map.addInteraction(drag);
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  render () {
    return (<div className="map-content">
      <div id="map" onContextMenu={() => false}></div>
  </div>)
  }
}

export default Dashboard;
