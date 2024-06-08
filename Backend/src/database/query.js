import mysql from 'mysql2/promise';
import { conn } from '../main.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

class GestionEstudiantes {
    async createDatabase() {
        try {
            const connection = await conn.getConnection();

            // Create the database
            await connection.query('CREATE DATABASE IF NOT EXISTS gestionestudiantes');

            // Use the database
            await connection.query('USE gestionestudiantes');

            // Create Roles table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS Roles (
          uuid VARCHAR(36) PRIMARY KEY,
          nombre_rol VARCHAR(255) NOT NULL,
          permisos LONGTEXT NOT NULL
        );
      `);

            // Create Personas table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS Personas (
          uuid VARCHAR(36) PRIMARY KEY,
          nombres VARCHAR(255) NOT NULL,
          apellidos VARCHAR(255) NOT NULL,
          documento VARCHAR(50) NOT NULL,
          tipo_documento VARCHAR(50) NOT NULL,
          correo_electronico VARCHAR(100) NOT NULL,
          telefono VARCHAR(20) NOT NULL,
          direccion VARCHAR(100)
        );
      `);

            // Create Users table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS Users (
          uuid VARCHAR(36) PRIMARY KEY,
          usuario VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(100) NOT NULL,
          rol_uuid CHAR(36) NOT NULL,
          person_uuid CHAR(36) NOT NULL,
          FOREIGN KEY (rol_uuid) REFERENCES Roles(uuid),
          FOREIGN KEY (person_uuid) REFERENCES Personas(uuid)
        );
      `);

            // Create Sessions table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS Sessions (
          uuid VARCHAR(36) PRIMARY KEY,
          status BOOLEAN NOT NULL,
          expiration_date VARCHAR(20) NOT NULL,
          user_uuid VARCHAR(36) NOT NULL,
          FOREIGN KEY (user_uuid) REFERENCES Users(uuid)
        );
      `);
            // Create Cursos table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS Cursos (
          uuid VARCHAR(36) PRIMARY KEY,
          nombre_curso VARCHAR(50) NOT NULL,
          horario LONGTEXT NOT NULL,
          cantidad_estudiantes INTEGER NOT NULL,
          profesor_asignado CHAR(36) NOT NULL,
          FOREIGN KEY (profesor_asignado) REFERENCES Personas(uuid)
        );
      `);

            // Create Notas table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS Notas (
          uuid VARCHAR(36) PRIMARY KEY,
          nota_final VARCHAR(50) NOT NULL,
          estudiante_asignado CHAR(36) NOT NULL,
          curso_asignado CHAR(36) NOT NULL,
          FOREIGN KEY (estudiante_asignado) REFERENCES Personas(uuid),
          FOREIGN KEY (curso_asignado) REFERENCES Cursos(uuid)
        );
      `);

            // Create detalleNotas table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS detalleNotas (
          uuid VARCHAR(36) PRIMARY KEY,
          nota_referencia CHAR(36) NOT NULL,
          nota FLOAT NOT NULL,
          porcentaje FLOAT NOT NULL,
          fecha_nota VARCHAR(25) NOT NULL,
          FOREIGN KEY (nota_referencia) REFERENCES Notas(uuid)
        );
      `);

            // Close the connection
            const rolUuid = uuidv4();
            const personUuid = uuidv4();
            const userUuid = uuidv4();
            const myPlaintextPassword = '123';
            const saltRounds = 10
            const passwordHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
            await connection.query('USE gestionestudiantes');
            const sqlRoles = "INSERT INTO Roles(uuid, nombre_rol, permisos) VALUES(?, ?, ?);"
            const valuesRoles = [
                rolUuid,
                'Administrador',
                '{personas:{crear:true,editar:true,eliminar:true,buscar:true}}'
            ];
            const sqlPersonas = "INSERT INTO Personas(uuid, nombres, apellidos, documento, tipo_documento, correo_electronico, telefono, direccion) VALUES(?, ?, ?, ?, ?, ? ,? ,?);"
            const valuesPersonas = [
                personUuid,
                'Jhonatan Alexander',
                'Pereañez Aguiire',
                '1036659275',
                'C.C',
                'jhonatanpereanez@gmail.com',
                '3202096198',
                ''
            ];
            const sqlUser = "INSERT INTO Users(uuid, usuario, password, rol_uuid, person_uuid) VALUES(?, ?, ?, ?, ?);"
            const valuesUser = [
                userUuid,
                'Nother',
                passwordHash,
                rolUuid,
                personUuid,
            ];
            await connection.query(sqlRoles, valuesRoles);
            await connection.query(sqlPersonas, valuesPersonas);
            await connection.query(sqlUser, valuesUser);
            await connection.release();

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }



}

export default GestionEstudiantes;