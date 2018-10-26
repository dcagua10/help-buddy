import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const OfertasAyuda = new Mongo.Collection('ofertasAyuda');
//
if(Meteor.isServer)
{
	Meteor.publish("ofertasAyuda", ()=>{
		return OfertasAyuda.find({});
	});
}

Meteor.methods(
{
	"ofertasA.add":function(nickname, nombreOferta, descripcion, tipo, remunerada, entidad){
	      OfertasAyuda.insert({nickname:nickname, nombreOferta:nombreOferta, descripcion:descripcion,
           tipo:tipo, remunerada:remunerada, entidad:entidad});
				return true;
	  },
	"ofertasAyuda.getOfertaNombre":function(nombreSolicitud){
		const oferta = OfertasAyuda.findOne({ nombreOferta: nombreOferta});
	  return solicitud;
	},
	  "ofertasAyuda.eliminarOfertaNombre":function(id){
	  const oferta = OfertasAyuda.deleteOne({ _id: id});
	  return oferta;
	},
	"ofertasAyuda.getAll":function(){
		const ofertas = OfertasAyuda.find({}).fetch();
		console.log(ofertas);
		return ofertas;
	}
});
