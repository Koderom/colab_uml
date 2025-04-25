--Eliminar tablas
drop table if exists empleado_proyecto;
drop table if exists usuario;
drop table if exists empleado;
drop table if exists nodo;
drop table if exists proyecto;
drop table if exists view;

--Crear tablas
CREATE TABLE IF NOT EXISTS empleado(
	Id SERIAL PRIMARY KEY,
	Nombre VARCHAR(250),
	Cargo VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS usuario(
	Id SERIAL PRIMARY KEY,
	Login Varchar(50) UNIQUE,
	Password Varchar(250),
	IdEmpleado INTEGER NOT NULL,
	
	FOREIGN KEY (IdEmpleado) REFERENCES empleado(Id)
);
CREATE TABLE IF NOT EXISTS view(
	Id SERIAL PRIMARY KEY,
	jsonData JSON
);

CREATE TABLE IF NOT EXISTS proyecto(
	Id SERIAL PRIMARY KEY,
	Titulo VARCHAR(250),
	Descripcion VARCHAR(250)
	IdView INTEGER,

	FOREIGN KEY (IdView) REFERENCES view(Id)
);

CREATE TABLE IF NOT EXISTS empleado_proyecto(
	Id SERIAL PRIMARY KEY,
	IdEmpleado INTEGER NOT NULL,
	IdProyecto INTEGER NOT NULL,
	
	FOREIGN KEY (IdEmpleado) REFERENCES empleado(Id),
	FOREIGN KEY (IdProyecto) REFERENCES proyecto(Id)
);

