function pesquisar() {
    const tabela = document.getElementById('tabela').value;
    const id = document.getElementById('id').value;

    // Define a URL sem o ID se ele não foi preenchido
    const url = id ? 
        `http://127.0.0.1:5000/pesquisar/${tabela}/${id}` :
        `http://127.0.0.1:5000/pesquisar/${tabela}/`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const results = Array.isArray(data.data) ? data.data : [data.data];
                let resultHTML = "<table>";

                resultHTML += "<thead><tr>";
                for (let key in results[0]) {
                    resultHTML += `<th>${key}</th>`;
                }
                resultHTML += "</tr></thead>";

                resultHTML += "<tbody>";
                results.forEach(result => {
                    resultHTML += "<tr>";
                    for (let key in result) {
                        resultHTML += `<td>${result[key]}</td>`;
                    }
                    resultHTML += "</tr>";
                });
                resultHTML += "</tbody></table>";

                document.getElementById('result').innerHTML = resultHTML;

                document.getElementById('form-update').style.display = results.length === 1 ? 'block' : 'none';
                document.getElementById('delete-btn').style.display = results.length === 1 ? 'inline-block' : 'none';
            } else {
                alert(data.message || 'Nenhum resultado encontrado.');
                document.getElementById('result').innerHTML = 'Nenhum resultado encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}


function atualizar() {
    const tabela = document.getElementById('tabela').value;
    const id = document.getElementById('id').value;
    const campo = document.getElementById('campo').value;
    const novo_valor = document.getElementById('novo_valor').value;

    const url = `http://127.0.0.1:5000/atualizar/${tabela}/${id}`;

    // Dados para o corpo da requisição
    const data = {
        campo: campo,
        novo_valor: novo_valor
    };

    fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'  // Garantir que a requisição será feita no modo CORS
    })

    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Atualização bem-sucedida!');
        } else {
            alert('Falha na atualização!');
        }
    })
    .catch(error => {
        console.error('Erro na atualização:', error);
    });
}

function deletar() {
    const tabela = document.getElementById('tabela').value;
    const id = document.getElementById('id').value;

    fetch(`http://127.0.0.1:5000/deletar/${tabela}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Linha deletada com sucesso!');
        } else {
            alert('Falha ao deletar linha!');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar:', error);
    });
}
