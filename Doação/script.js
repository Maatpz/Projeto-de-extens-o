let activeSection = null; // Variável para rastrear a seção ativa

        function toggleContent(type) {
            const monetarySection = document.getElementById("monetary-section");
            const materialSection = document.getElementById("material-section");

            // Verifica se a seção clicada é a mesma que está ativa
            if (activeSection === type) {
                // Se sim, fecha a seção e redefine a variável
                monetarySection.style.display = "none";
                materialSection.style.display = "none";
                activeSection = null;
            } else {
                // Se for diferente, exibe a seção correspondente e define-a como ativa
                monetarySection.style.display = "none";
                materialSection.style.display = "none";

                if (type === 'monetary') {
                    monetarySection.style.display = "block";
                } else if (type === 'material') {
                    materialSection.style.display = "block";
                }

                activeSection = type;
            }
        }