import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
export default class AyudaItemLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitud:this.props.solicitud
    };
    this.verDetalle=this.verDetalle.bind(this);
  }
  renderSolicitud(solicitud){
    const divStyle = {
      margin: "auto",
      textAlign: "center",
    }
    const divStyleT = {
      margin: "auto",
      textAlign: "center",
      maxHeight:"100px",
      color: "#00A0D8",
    }
    if(solicitud.remunerada){
      return(
        <div style={divStyle}>
        <h2 className="hIem" style={divStyleT} aria-label={"Nombre de la solicitud de ayuda:   "+solicitud.nombreSolicitud}>{solicitud.nombreSolicitud}</h2>
        <br/>
        <h4 className="hIem" style={divStyle} aria-label={"Descripcion de la solicitud:    "+solicitud.descripcion}>{solicitud.descripcion}</h4>
        <br/>
        <h4 className="hIem" style={divStyle} aria-label={"Remuneracion ofrecida por la ayuda:    "+solicitud.remunn}>{"Remuneración: $"+solicitud.remunn}</h4>
        <h4 className="hIem" style={divStyle}>{"Disponible hasta: "+solicitud.fechaLimite}</h4>
        </div>
      );
    }
    else{
      return(
        <div style={divStyle}>
        <h2 className="hIem" style={divStyleT} aria-label={"Nombre de la solicitud de ayuda: "+solicitud.nombreSolicitud}>{solicitud.nombreSolicitud}</h2>
        <br/>
        <h4 className="hIem" style={divStyle} aria-label={"Descripcion de la solicitud: "+solicitud.descripcion}>{solicitud.descripcion}</h4>
        <br/>
        <h4 className="hIem" style={divStyle}>{"Disponible hasta: "+solicitud.fechaLimite}</h4>
        </div>
      );
    }

  }
  verDetalle(){
    let id = this.state.solicitud._id;
    this.props.verDetalle(id);
  }
    render() {
      let solicitud = this.state.solicitud;
      const center={
        overflow: "auto",
        width: "270px",
        height: "280px",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }
      const divStyle = {
      overflow: "hidden",
      width: "270px",
      height: "330px",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "20px",
      borderColor: "#00A0D8",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };
    return (
      <div style={divStyle} key={solicitud._id}>
      <div style={center}>
      <br/>
      <br/>
            {this.renderSolicitud(solicitud)}
      <br/>
      </div>
      <button type="button" className="btnLis" onClick={this.verDetalle}>Ver</button>
      <br/>
      <br/>
      </div>
    );
  }
}
