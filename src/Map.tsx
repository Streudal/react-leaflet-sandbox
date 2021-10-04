import L, { LatLngBoundsExpression, LayersControlEvent, LeafletEvent } from 'leaflet';
import React from 'react';
import { GeoJSON, LayersControl, MapContainer, TileLayer } from 'react-leaflet';

interface MapState { }
interface MapProps {
  setTitle: (text: string) => void;
}

export default class App extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {}
  }

  ListenerTest = (map: L.Map) => {
    const { setTitle } = this.props;
    map.on('baselayerchange', (e: LeafletEvent & LayersControlEvent) => {
      console.log(e.name)
      setTitle(e.name);
    })
    return null;
  }

  render() {
    const mapBounds: LatLngBoundsExpression = [[-90, -180], [90, 180]];

    const testData1: GeoJSON.FeatureCollection = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
          "properties": { "prop0": "value0" }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
            ]
          },
          "properties": {
            "prop0": "value0",
            "prop1": 0.0
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
              [100.0, 1.0], [100.0, 0.0]]
            ]

          },
          "properties": {
            "prop0": "value0",
            "prop1": { "this": "that" }
          }
        }
      ]
    }

    const testData2: GeoJSON.FeatureCollection = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [0, 0] },
          "properties": { "prop0": "value0" }
        }
      ]
    }

    return (
      <div className="map-component" style={{ height: '35rem', width: '119rem' }}>
        <MapContainer
          center={[37.263104, -99.536127]}
          zoom={2}
          style={{ height: '35rem', width: '119rem' }}
          whenCreated={(map) => this.ListenerTest(map)}
        >
          <TileLayer
            noWrap={true}
            bounds={mapBounds}
            maxZoom={20}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl position="topright" collapsed={true}>
            <LayersControl.BaseLayer name="Dataset 1" checked>
              <GeoJSON key="data-1" data={testData1} />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Dataset 2">
              <GeoJSON key="data-1" data={testData2} />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}

