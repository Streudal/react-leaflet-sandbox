import React from 'react';
import Map from './Map';
import Table from './Table';

/**
 * General overview: 
 * 
 *  This is how I would structure React class components. 
 *  - Create an interface for State
 *  - Create an interface for Props
 *  - Pass those as type arguments to the class component, in this cases it's:
 *    export default class App extends React.Component<AppProps, AppState>, where AppProps is the props interface and AppState is the state interface.
 *    ...
 *  - Then destructure your props and set everywhere to make it easier to read.
 *  - Then rinse and repeat.
*/


// AppState should just match whatever is in this.state = {} from your constructor.
interface AppState {
  appTitle: string;
  basemapTitle: string;
  tableData: GeoJSON.FeatureCollection;
}

interface AppProps { }

const emptyFeatureCollection: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] };
export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      appTitle: 'App Title',
      basemapTitle: '',
      tableData: { type: 'FeatureCollection', features: [] }
    }
  }

  updateAppState = (basemapTitle: string, tableData?: GeoJSON.FeatureCollection) => {
    this.setState({ basemapTitle, tableData: tableData && tableData != null ? tableData : emptyFeatureCollection });
  }

  render() {
    const { appTitle, basemapTitle, tableData } = this.state;
    return (
      <div className="App">
        <h1>{appTitle}</h1>
        <h3>Displaying: {basemapTitle}</h3>
        <Map setParentData={this.updateAppState} />
        <Table tableData={tableData} />
      </div>
    );
  }
}
