import L, { LatLngBoundsExpression, LayersControlEvent, LeafletEvent } from 'leaflet';
import React from 'react';
import { GeoJSON, LayersControl, MapContainer, TileLayer } from 'react-leaflet';

interface MapState { }
interface MapProps {
  setParentData: (datasetTitle: string, tableData?: GeoJSON.FeatureCollection) => void; // Calls the state method 'updateAppState' in App.tsx
}

// You can also mimic fetching this data on the fly by putting them in separate files and the using the built in fetch method to call that file locally so you can 
// test it that way too.
const testData1: GeoJSON.FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
      "properties": { "testData1": "Dataset 1 - Point" }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
        ]
      },
      "properties": { "testData1": "Dataset 1 - Linestring" }
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
        "prop1": { "testData1": "Dataset 1 - Polygon" }
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
      "properties": { "testData2": "Dataset 2 - Point" }
    }
  ]
}

export default class Map extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {}
  }

  mapEventChange = (map: L.Map) => {
    const { setParentData } = this.props;
    map.on('baselayerchange', (e: LeafletEvent & LayersControlEvent /** Intersection type because I noticed the property name was getting in here as well.  */) => {
      // Change dataset and title in parent component every time there is a change in basemap selection via radio buttons.
      setParentData(e.name, e.name === 'Dataset 1' ? testData1 : testData2);
    });
    map.whenReady(() => {
      // On inital map load. Should only fire once.
      setParentData('Dataset 1', testData1);
    })
    return null;
  }

  render() {
    const mapBounds: LatLngBoundsExpression = [[-90, -180], [90, 180]]; // This just creates 1 map image instead of multiple.

    return (
      <div className="map-component" style={{ height: '35rem', width: '119rem' }}>
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: '35rem', width: '119rem' }}
          whenCreated={(map) => this.mapEventChange(map)}
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
              <GeoJSON key="data-2" data={testData2} />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}
