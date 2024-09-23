document.getElementById('buscar').addEventListener('click', function () {
    const endereco = document.getElementById('endereco').value;
    buscarFarmacias(endereco);
});

function buscarFarmacias(endereco) {
    const apiKey = 'SUA_API_KEY'; // Coloque sua chave da API do Google Maps aqui
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                buscarFarmaciasProximas(location.lat, location.lng);
            } else {
                document.getElementById('resultado').innerHTML = 'Endereço não encontrado.';
            }
        })
        .catch(error => console.error('Erro:', error));
}

function buscarFarmaciasProximas(lat, lng) {
    const apiKey = 'SUA_API_KEY'; // Coloque sua chave da API do Google Maps aqui
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=pharmacy&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultados = data.results;
            let html = '<h2>Farmácias Próximas:</h2><ul>';
            resultados.forEach(farmacia => {
                html += `<li>${farmacia.name} - ${farmacia.vicinity}</li>`;
            });
            html += '</ul>';
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(error => console.error('Erro:', error));
}
