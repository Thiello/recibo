document.getElementById("reciboForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Pega os valores do formulário
    const nomeCliente = document.getElementById("nomeCliente").value;
    const numNotaFiscal = document.getElementById("numNotaFiscal").value;
    const valorNotaFiscal = parseFloat(document.getElementById("valorNotaFiscal").value);
    const qtdVolumes = parseInt(document.getElementById("qtdVolumes").value);

    // Calcula o valor do frete
    let valorFrete = valorNotaFiscal * 0.075;
    if (valorFrete < 85) {
        valorFrete = 85;
    }

    // Obtém a data atual no formato DD/MM/AAAA
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Gera o PDF com jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Carrega a imagem de fundo (template)
    const img = new Image();
    img.src = 'template.png';  // O caminho da imagem do template no seu diretório

    img.onload = function() {
        // Adiciona o template no PDF
        doc.addImage(img, 'PNG', 0, 0, 210, 297);  // Ajuste as dimensões conforme o tamanho da sua imagem

        doc.setTextColor(28, 30, 31);  // Cor do texto do PDF

        // Posiciona todos os textos em seus devidos lugares
        doc.text(`Cliente: ${nomeCliente}`, 10, 165);  // Ajuste as coordenadas
        doc.text(`NF: ${numNotaFiscal}`, 10, 71);  // Ajuste as coordenadas
        doc.text(`Valor NF: R$ ${valorNotaFiscal.toFixed(2)}`, 10, 198);  // Ajuste as coordenadas
        doc.text(`QTD de Volumes: ${qtdVolumes}`, 10, 182);  // Ajuste as coordenadas
        doc.text(`Valor Frete: R$ ${valorFrete.toFixed(2)}`, 10, 264);  // Ajuste as coordenadas

        // Adiciona a data atual
        doc.text(`Data: ${dataFormatada}`, 135, 71);  // Ajuste as coordenadas conforme o layout

        // Salva o PDF
        doc.save("recibo_pagamento.pdf");
    };

    img.onerror = function() {
        console.error("Erro ao carregar a imagem de fundo.");
    };
});
