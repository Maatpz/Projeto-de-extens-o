from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Importando o CORS
import mysql.connector

app = Flask(__name__)

# Habilita CORS globalmente para todas as rotas
CORS(app)

# Conexão com o banco de dados
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='test'  # Ajuste conforme seu banco
    )
    return connection

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('test.html')

# Rota para pesquisar dados
@app.route('/pesquisar/<tabela>/', defaults={'id': None}, methods=['GET'])
@app.route('/pesquisar/<tabela>/<int:id>', methods=['GET'])
def pesquisar(tabela, id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    if id:
        query = f"SELECT * FROM {tabela} WHERE id_{tabela} = %s"
        cursor.execute(query, (id,))
        result = cursor.fetchone()
    else:
        query = f"SELECT * FROM {tabela}"
        cursor.execute(query)
        result = cursor.fetchall()  # Traz todas as linhas

    cursor.close()
    connection.close()

    if result:
        return jsonify(success=True, data=result)
    else:
        return jsonify(success=False, message="Nenhum dado encontrado")


# Rota para atualizar dados (Método POST)
@app.route('/atualizar/<tabela>/<int:id>', methods=['POST'])
def atualizar(tabela, id):
    dados = request.get_json()
    campo = dados.get('campo')
    novo_valor = dados.get('novo_valor')

    connection = get_db_connection()
    cursor = connection.cursor()

    # Preparando a query para atualizar o valor de uma coluna
    query = f"UPDATE {tabela} SET {campo} = %s WHERE id_{tabela} = %s"
    cursor.execute(query, (novo_valor, id))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify(success=True)

# Rota para deletar dados (Método DELETE)
@app.route('/deletar/<tabela>/<int:id>', methods=['DELETE'])
def deletar(tabela, id):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = f"DELETE FROM {tabela} WHERE id_{tabela} = %s"
    cursor.execute(query, (id,))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)
