from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir comunicação com o frontend

# Função para conexão com o banco de dados
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='lardospequeninos'  # Nome do banco de dados
    )
    return connection

# Rota para receber e salvar os dados de cadastro
@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    dados = request.json  # Obtém os dados enviados pelo JavaScript

    # Extraindo os dados recebidos
    nome = dados.get('nome')
    cidade = dados.get('cidade')
    email = dados.get('email')
    telefone = dados.get('telefone')
    experiencia = dados.get('experiencia')
    disponibilidade = dados.get('disponibilidade')
    ajuda = dados.get('ajuda', '')  # Recebe as opções selecionadas como "opcao1;opcao3;opcao5"
    habilidades = dados.get('habilidades', '')
    
    # Supondo que você tem o ID do administrador já disponível
    # Exemplo: O ID do administrador pode ser obtido via sessão ou outra forma de autenticação
    # Aqui estamos assumindo que o `id_adm` foi passado como parte do JSON (você deve garantir isso)
    id_adm = dados.get('id_adm')

    if not id_adm:
        return jsonify(success=False, message="ID do administrador não fornecido")

    # Inserindo os dados no banco de dados
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Query para inserir os dados no banco
        query = """
            INSERT INTO voluntario (nome, cidade, email, telefone, experiencia, disponibilidade, ajuda, habilidades, id_adm)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nome, cidade, email, telefone, experiencia, disponibilidade, ajuda, habilidades, id_adm))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify(success=True)
    except mysql.connector.Error as err:
        return jsonify(success=False, message=f"Erro ao inserir no banco de dados: {err}")

if __name__ == '__main__':
    app.run(debug=True)
