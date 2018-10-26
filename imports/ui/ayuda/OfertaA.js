import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import {OfertasAyuda} from '../../api/ofertasAyuda.js';

class OfertaA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname:this.props.nickname,
      nombreOferta:"",
      descripcion:"",
      tipo:"",
      remunerada:"",
      entidad:"",
      remunn:0,
      publicada:false
    };

    this.nombreOfertaChange=this.nombreOfertaChange.bind(this);
    this.descripcionChange = this.descripcionChange.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.entidadChange=this.entidadChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderRemunerada = this.renderRemunerada.bind(this);
    this.remunnChange = this.remunnChange.bind(this);
    this.atras=this.atras.bind(this);
    this.publicar=this.publicar.bind(this);
    this.renderForm=this.renderForm.bind(this);
  }

  publicar()
  {
    Meteor.call("ofertasA.add", this.state.nickname, this.state.nombreOferta, this.state.descripcion, this.state.tipo, 
      this.state.remunerada, this.state.entidad, (err, resultado)=>{
        if(resultado)
        {
          alert("Tu oferta ha sido publicada con éxito"); 
          this.setState({
            publicada:resultado
          });
        }
    });

    this.atras();
  }
  atras(){
    this.props.atras(true);
  }
  remunnChange(event){
    this.setState({remunn:event.target.value});
  }
  nombreOfertaChange(event){
    this.setState({nombreOferta:event.target.value});
  }
  descripcionChange(event){
    this.setState({descripcion:event.target.value});
  }
  tipoChange(event){
    this.setState({tipo:event.target.value});
  }
  entidadChange(event){
    this.setState({entidad:event.target.value});
  }
  renderForm()
  {
    if(!this.state.publicada)
    {
      const divStyle = {
    width: "80%",
    margin: "auto",
      borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "20px",
    borderColor: "#041527",
     boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      };
      const w = {
        width: "80%",
        margin: "auto",
      }
      let {
        nickname, nombreOferta, descripcion, tipo, remunerada, fechaLimite, entidad,remunn
      }=this.state;

      return (
    <div style={divStyle}>
      <div style={w}>
      <br/>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Nombre de la oferta: </label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Titulo de la oferta" value={nombreOferta} onChange={this.nombreOfertaChange}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Descripción: </label>
            <textarea className="form-control" rows="5" id="formGroupExampleInput2" placeholder="Descripcion de la solicitud"value={descripcion} onChange={this.descripcionChange}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput3">Tipo: </label>
            <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Tipo" value={tipo} onChange={this.tipoChange}/>
          </div>
          <br/>
          <div className="form-group">
          <label>
          Exige remuneración:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        {this.renderRemunerada(remunn)}
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput6">Entidad: </label>
            <input type="text" className="form-control" id="formGroupExampleInput6" placeholder="Enitidad u Organización" value={entidad} onChange={this.entidadChange}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.publicar}>Publicar</button>
        <button type="button" className="btnOut" onClick={this.atras}>Atras</button>
      </div>
      <br/>
      <br/>
      </div>

       );//
    }
    
  }
  renderRemunerada(remunn){
    let r = this.state.remunerada;
    if(r){
      return (
        <div>
        <label htmlFor="formGroupExampleInputN">Remuneración </label>
        <input type="number" min="0" max="100000000" className="form-control" id="formGroupExampleInputN" placeholder="Titulo de la oferta" value={remunn} onChange={this.remunnChange}/>
        </div>
      );
    }
    else {
      return null;
    }
  }
  handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  this.setState({
    remunerada: value
  });
}
  render() {
    return(<div>{this.renderForm()}</div>);
    
  }
}
OfertaA.propTypes = {
  ofertasAyuda:PropTypes.array,
};

export default withTracker(() => {

Meteor.subscribe("ofertasAyuda");

  return {
    ofertasAyuda:OfertasAyuda.find({}).fetch()
  };
})(OfertaA);
