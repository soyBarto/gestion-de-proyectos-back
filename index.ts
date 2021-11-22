import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db';
import { typeDefs } from './graphql/types';
import { resolvers } from './graphql/resolvers';
// import { UserModel } from './models/user';
// import { Enum_EstadoUsuario, Enum_Rol, Enum_TipoObjetivo } from './models/enums';
// import { ProjectModel } from './models/project';
// import { ObjectiveModel } from './models/objective';

dotenv.config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
  await conectarBD();
  await server.start();

  server.applyMiddleware({ app });

  console.log('servidor listo');
});


// CREAR USUARIO, PROYECTO Y OBJETIVOS
// const main = async () => {
//   await conectarBD();
//   const usuarioInicial = await UserModel.create({
//     nombre: 'Daniel',
//     apellido: 'Saldarriaga',
//     correo: 'dsl@cc.com',
//     identificacion: '1234',
//     rol: Enum_Rol.ADMINISTRADOR,
//     estado: Enum_EstadoUsuario.AUTORIZADO,
//   });

//   const proyectoCreado = await ProjectModel.create({
//     nombre: 'Proyecto Mision TIC',
//     fechaInicio: new Date('2021/12/24'),
//     fechaFin: new Date('2022/12/24'),
//     presupuesto: 120000,
//     lider: usuarioInicial._id,
//     objetivos: [
//       { descripcion: 'Este es el objetivo general', tipo: Enum_TipoObjetivo.general },
//       { descripcion: 'Este es el objetivo especifico 1', tipo: Enum_TipoObjetivo.especifico },
//       { descripcion: 'Este es el objetivo especifico 2', tipo: Enum_TipoObjetivo.especifico },
//     ],
//   });

//   const objetivoGeneral = await ObjectiveModel.create({
//     descripcion: 'este es el objetivo general',
//     tipo: Enum_TipoObjetivo.general,
//     proyecto: proyectoCreado._id,
//   });

//   const objetivoEspecifico1 = await ObjectiveModel.create({
//     descripcion: 'este es el objetivo especifico 1',
//     tipo: Enum_TipoObjetivo.especifico,
//     proyecto: proyectoCreado._id,
//   });

//   const objetivoEspecifico2 = await ObjectiveModel.create({
//     descripcion: 'este es el objetivo especifico 2',
//     tipo: Enum_TipoObjetivo.especifico,
//     proyecto: proyectoCreado._id,
//   });

// console.log('Proyecto Creado: ', proyectoCreado, '\nObjetivo General: ', objetivoGeneral, '\nObjetivo Especifico 1: ', objetivoEspecifico1, '\nObjetivo Especifico 2: ', objetivoEspecifico2);
// };

// main();

// CREAR UN USUARIO
// const main = async () => {

//   await UserModel.create({
//     apellido: 'Saldarriaga',
//     correo: 'danpp@email.co',
//     identificacion: '5678',
//     nombre: 'Juan',
//     rol: Enum_Rol.ADMINISTRADOR,
//     estado: Enum_EstadoUsuario.PENDIENTE,
//   })
//     .then((u) => {
//       console.log('usuario creado', u);
//     })
//     .catch((e) => {
//       console.error('Error creando el usuario', e);
//     });
// };

// main();