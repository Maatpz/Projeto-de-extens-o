from flask import Flask, request, jsonify
from flask_cors import CORS  # Importando o CORS
import mysql.connector

app = Flask(__name__)

# Habilita CORS globalmente para todas as rotas
CORS(app)

# Conexão com o banco de dados MySQL
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='test'  # Ajuste conforme seu banco
    )
    return connection

# Função para verificar o login no banco de dados
def verify_user(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Consulta para verificar se existe um usuário com o email e senha fornecidos
    cursor.execute("SELECT * FROM administrador WHERE email=%s AND senha=%s", (username, password))
    user = cursor.fetchone()  # Retorna o primeiro resultado encontrado

    conn.close()

    # Se encontrou um usuário, retorna True, caso contrário, False
    return True if user else False

@app.route('/login', methods=['POST'])
def login():
    # Captura as credenciais enviadas pelo frontend
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Verifica se as credenciais são válidas
    if verify_user(username, password):
        return jsonify({'status': 'success', 'message': 'Login bem-sucedido'})
    else:
        return jsonify({'status': 'error', 'message': 'Usuário ou senha inválidos'})

if __name__ == '__main__':
    app.run(debug=True)
