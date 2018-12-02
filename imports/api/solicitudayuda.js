import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import { Email } from 'meteor/email';

export const SolicitudAyuda = new Mongo.Collection('solicitudayuda');
//
if(Meteor.isServer)
{
	Meteor.publish("solicitudayuda", ()=>{
		return SolicitudAyuda.find({});
	});
}

Meteor.methods(
{
	"solicitudayuda.add":function(id1, nickname, correo, nombreSolicitud, descripcion, tipo, remunerada, remunn, fechaLimite, entidad){
				check(nickname, String);
		check(correo, String);
		check(nombreSolicitud, String);
		check(descripcion, String);
		check(tipo, String);

	      SolicitudAyuda.insert({id:id1,nickname:nickname, correo: correo, nombreSolicitud:nombreSolicitud, descripcion:descripcion,
           tipo:tipo, remunerada:remunerada, remunn:remunn, fechaLimite:fechaLimite, entidad:entidad});
				return "success";
	  },
		"solicitudayuda.getAyudaID":function(id){

			check(id, String);
			const solicitud = SolicitudAyuda.findOne({ _id: id});
			if(!solicitud.id)
			{
				console.log("No tiene id");
				SolicitudAyuda.remove(solicitud);
				return undefined;
			}
			else{
				return solicitud;
			}
		  
		},
	"solicitudayuda.getAyudaNombre":function(nombreSolicitud){
		check(nombreSolicitud, String);
		const solicitud = SolicitudAyuda.findOne({ nombreSolicitud: nombreSolicitud});
	  return solicitud;
	},
  "solicitudayuda.eliminarAyudaNombre":function(id){
		check(id, String);
  const solicitud = SolicitudAyuda.findOne({ _id: id});
  SolicitudAyuda.remove(solicitud);
  return solicitud;
	},

	"solicitudayuda.enviar":function(to, pfrom, asunto, mensaje){
		check(to, String);
		check(pfrom, String);
		check(asunto, String);
		check(mensaje, String);
	Meteor.startup( function() {
      process.env.MAIL_URL = Meteor.settings.public.stripe.mail__url;
     Email.send({ to:to, from:pfrom, subject:asunto, text:mensaje });
     });
	}
});
