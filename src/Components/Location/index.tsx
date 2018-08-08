import * as React from 'react';
const axios = require('axios');
var classifyPoint = require("robust-point-in-polygon")

interface ILocationState {
    long: number
    lat: number,
    cantPerson: number;
    person: any;
}

export class Location extends React.Component<any, ILocationState> {
    polygon: any;
  constructor(props: any) {
    super(props);
    this.state = {
        long: 0,
        lat: 0,
        cantPerson: 0,
        person: []
    };
    this.polygon = [ [ 25.774, -80.190 ], [ 18.466, -66.118 ], [32.321, -64.757 ] ];
    this.locationIss = this.locationIss.bind(this);
    this.inLocationBermudes = this.inLocationBermudes.bind(this);
    this.validationLocation = this.validationLocation.bind(this);
  }

  componentWillMount() {
    axios.get('http://api.open-notify.org/astros.json')
    .then( (response:any) => {
        let cantPerson = Number(response.data.number) ;
        let person =  response.data.people ;
        this.setState({ cantPerson , person });
    })
    .catch(function (error:any) {
        console.log(error);
    });
  }

  locationIss(){
    axios.get('http://api.open-notify.org/iss-now.json')
    .then( (response:any) => {
        let long = Number(response.data.iss_position.longitude) ;
        let lat = Number(response.data.iss_position.latitude);
        this.setState({long,lat});
        const result = this.inLocationBermudes(long, lat);
        this.validationLocation(result);
    })
    .catch(function (error:any) {
        console.log(error);
    });
  }

  inLocationBermudes(long:any,lat:any){
    return classifyPoint(this.polygon, [long, lat]);
  }
  
  validationLocation(id:any) {
    switch(id) {
        case -1:
            alert('Esta en el triangulo de las bermudas');
            break;
        case 0:
            alert('Esta al borde del triangulo de las bermudas');
            break;
        case 1:
            alert('Esta fuera del triangulo de las bermudas');
            break;
        }
    }

  render() {
    return (
      <div>
        <h1>Ubicacion Iss</h1>
        <button onClick={this.locationIss}>Buscar Localizacion</button>
        <h2>Esta es la ubicacion</h2>
        <h3>Long : {this.state.long}</h3>
        <h3>Lat:{this.state.lat}</h3>
        <div>
            <h4>Cantidad de Personas</h4>
            <p>{this.state.cantPerson}</p>
            <h4>Datos de las Personas</h4>
            {this.state.person.map(function(d:any, idx:any){
                return (
                <li key={idx}>{d.name} - {d.craft}</li>
                )
            })}
        </div>
      </div>

    );
  }
}