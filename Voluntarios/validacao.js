document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Evita o envio padrão do formulário

  if (validarFormulario()) {  // Se a validação passar, envia os dados ao servidor
    const formData = new FormData(document.getElementById('cadastroForm'));
    const data = Object.fromEntries(formData);

    // Pegando as opções de ajuda selecionadas e convertendo para formato "opcaoX"
    const ajudaSelecionada = [];
    const checkboxes = document.querySelectorAll('input[name="ajuda[]"]:checked');
    checkboxes.forEach((checkbox) => {
      const valor = checkbox.value;
      
      // Associando as opções aos números "opcao1" a "opcao7"
      switch (valor) {
        case 'atividades_diferenciadas': ajudaSelecionada.push('opcao1'); break;
        case 'recreacao_esportes': ajudaSelecionada.push('opcao2'); break;
        case 'contando_historias': ajudaSelecionada.push('opcao3'); break;
        case 'tomando_conta': ajudaSelecionada.push('opcao4'); break;
        case 'auxiliar_servicos_gerais': ajudaSelecionada.push('opcao5'); break;
        case 'auxiliar_cozinha': ajudaSelecionada.push('opcao6'); break;
        case 'atendimento_especializado': ajudaSelecionada.push('opcao7'); break;
      }
    });

    // Convertendo a lista de opções selecionadas para o formato desejado, separado por ;
    data.ajuda = ajudaSelecionada.join(';');

    // Enviar dados via fetch para o servidor Flask
    fetch('http://localhost:5000/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),  // Converte os dados para JSON
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.success) {
        alert('Cadastro enviado com sucesso!');
        window.location.href = '/Home/home.html';  // Redireciona para o home.html em caso de sucesso
      } else {
        alert('Erro ao enviar o cadastro: ' + (responseData.message || 'Verifique os dados.'));
      }
    })
    .catch(error => console.error('Erro:', error));
  }
});

function validarFormulario() {
  let formValido = true;

  const nome = document.getElementById('nome').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const experiencia = document.getElementById('experiencia').value;
  const disponibilidade = document.getElementById('disponibilidade').value;

  if (nome === '' || cidade === '') {
    alert('Preencha o Nome Completo e a Cidade.');
    formValido = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    formValido = false;
  }

  const telefonePattern = /^[0-9]+$/;
  if (!telefonePattern.test(telefone)) {
    alert('Por favor, insira apenas números no campo Telefone.');
    formValido = false;
  }

  if (experiencia === '' || disponibilidade === '') {
    alert('Selecione uma opção em Experiência e Disponibilidade.');
    formValido = false;
  }

  const checkboxes = document.querySelectorAll('input[name="ajuda[]"]:checked');
  if (checkboxes.length === 0) {
    alert('Selecione ao menos uma opção de ajuda.');
    formValido = false;
  }

  return formValido;
}
