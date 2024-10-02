"use strict";
import { DataSource } from "typeorm";
import {DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js";
//Configuración de la base de datos: AppDataSource funciona como un objeto de tipo DataSource.
export const AppDataSource = new DataSource({
    type: "postgres", //tipo de base de datos
    host: `${HOST}`, // dirección que utiliza la base de datos
    port: 5432,
    username: `${DB_USERNAME}`, //nombre del usuario para autenticar la conexion a la base de datos
    password: `${PASSWORD}`, //contraseña del usuario a autenticar 
    database: `${DATABASE}`,
    entities: ["src/entity/**/*.js"], // define la ruta de archivos que contiene a las entidades 
    synchronize: true , //opcion para  que TypeORM se encargue de gestionar nuestra base de datos
    logging: false, //muestra las consultas que se realizan por debajo de la aplicación
});

export async function connectDB(){
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error al conectarse a la base de datos: ", error );
    }
} 
