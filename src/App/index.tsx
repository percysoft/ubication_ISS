import * as React from 'react';
import { Location } from '../Components/Location';

export class App extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <React.Fragment>
        <Location/>
      </React.Fragment>
    );
  }
}
