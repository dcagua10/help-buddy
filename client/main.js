import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.js';
import './main.html';
import "../imports/startup/accounts-config.js";
import '../imports/api/usuarios.js';
import '../imports/api/solicitudayuda.js';
import '../imports/api/ofertasAyuda.js';
import '../imports/api/calificacionAyuda.js';
import '../imports/api/calificacionOferta.js';
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
