import mysql.connector

con = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='lardospequeninos'
)

cursor = con.cursor()
#cursor.execute('create database lardospequeninos')
# Criar tabela de administrador
cursor.execute("""
CREATE TABLE IF NOT EXISTS administrador (
    id_adm INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100)
)
""")

# Corrigir a criação da tabela voluntário
cursor.execute("""
CREATE TABLE IF NOT EXISTS voluntario (
    id_voluntario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    experiencia BOOLEAN,
    disponibilidade VARCHAR(50),
    habilidades TEXT,
    ajuda TEXT,
    id_adm INT,
    FOREIGN KEY(id_adm) REFERENCES administrador(id_adm)
)
""")

# Criar tabela de doador
cursor.execute("""
CREATE TABLE IF NOT EXISTS doador (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    data DATE DEFAULT CURRENT_DATE,
    id_adm INT,
    mensagem TEXT,
    FOREIGN KEY(id_adm) REFERENCES administrador(id_adm)
)
""")

con.commit()
