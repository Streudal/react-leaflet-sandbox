import React from 'react';

interface TableState { }

interface TableProps {
  tableData: GeoJSON.FeatureCollection; // Data coming from App.tsx.
}

export default class Table extends React.Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {}
  }

  render() {
    const { tableData } = this.props;

    return (
      <div className="table-component">
        {JSON.stringify(tableData)}
      </div>
    );
  }
}

