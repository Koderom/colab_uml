--Eliminar tablas
drop table if exists empleado_proyectos;
drop table if exists nodo_relacion;
drop table if exists usuario;
drop table if exists empleado;
drop table if exists nodo;
drop table if exists diagrama;
drop table if exists proyecto;
drop table if exists relacion;
drop table if exists tipo_relacion;
drop table if exists nodo_relacion_super_nodo;
drop table if exists tipo_super_nodo;
drop table if exists super_nodo;

--Crear tablas
CREATE TABLE IF NOT EXISTS empleado(
	Id SERIAL PRIMARY KEY,
	Nombre VARCHAR(250),
	Cargo VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS usuario(
	Id SERIAL PRIMARY KEY,
	Login Varchar(50),
	Password Varchar(250),
	IdEmpleado INTEGER NOT NULL,
	
	FOREIGN KEY (IdEmpleado) REFERENCES empleado(Id)
);

CREATE TABLE IF NOT EXISTS proyecto(
	Id SERIAL PRIMARY KEY,
	Titulo VARCHAR(250),
	Descripcion VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS empleado_proyectos(
	IdEmpleado INTEGER NOT NULL,
	IdProyecto INTEGER NOT NULL,
	
	FOREIGN KEY (IdEmpleado) REFERENCES empleado(Id),
	FOREIGN KEY (IdProyecto) REFERENCES proyecto(Id)
);

CREATE TABLE IF NOT EXISTS diagrama(
	Id SERIAL PRIMARY KEY,
	Nombre VARCHAR(250),
	Data TEXT,
	IdProyecto INTEGER NOT NULL,
	
	FOREIGN KEY (IdProyecto) REFERENCES proyecto(Id)
);

CREATE TABLE IF NOT EXISTS nodo(
	Id SERIAL PRIMARY KEY,
	Data TEXT,
	IdDiagrama INTEGER NOT NULL,
	
	FOREIGN KEY (IdDiagrama) REFERENCES diagrama(Id)
);

CREATE TABLE IF NOT EXISTS tipo_relacion(
	Id SERIAL PRIMARY KEY,
	Descripcion VARCHAR(125)
);

CREATE TABLE IF NOT EXISTS relacion(
	Id SERIAL PRIMARY KEY,
	Data TEXT,
	IdTipoRelacion INTEGER,
	
	FOREIGN KEY (IdTipoRelacion) REFERENCES tipo_relacion(Id)
);

CREATE TABLE IF NOT EXISTS nodo_relacion(
	Id SERIAL PRIMARY KEY,
	IdNodo INTEGER NOT NULL,
	IdRelacion INTEGER NOT NULL,
	
	FOREIGN KEY (IdNodo) REFERENCES nodo(Id),
	FOREIGN KEY (IdRelacion) REFERENCES relacion(Id)
);

CREATE TABLE IF NOT EXISTS tipo_super_nodo(
	Id SERIAL PRIMARY KEY,
	Descripcion VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS super_nodo(
	Id SERIAL PRIMARY KEY,
	Data TEXT,
	IdTipoSuperNodo INTEGER NOT NULL,
	
	FOREIGN KEY (IdTipoSuperNodo) REFERENCES tipo_super_nodo(Id)
);

CREATE TABLE IF NOT EXISTS nodo_relacion_super_nodo(
	Id SERIAL PRIMARY KEY,
	IdSuperNodo INTEGER NOT NULL,
	IdNodoRelacion INTEGER NOT NULL,
	
	FOREIGN KEY (IdSuperNodo) REFERENCES super_nodo(Id),
	FOREIGN KEY (IdNodoRelacion) REFERENCES nodo_relacion(Id)
);