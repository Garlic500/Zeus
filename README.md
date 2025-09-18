<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Search Proxy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        input[type="text"] {
            width: 300px;
            padding: 8px;
            font-size: 16px;
        }
        button {
            padding: 8px 12px;
            font-size: 16px;
        }
        #results {
            margin-top: 20px;
        }
        .result-item {
            margin-bottom: 15px;
        }
        .result-item a {
            font-size: 18px;
            color: #0078d4;
            text-decoration: none;
        }
        .result-item p {
            font-size: 14px;
        }
    </style>
</head>
<body>

    <h1>Search with Bing</h1>

    <form id="searchForm">
        <input type="text" id="query" placeholder="Enter search term" required>
        <button type="submit">Search</button>
    </form>

    <div id="results"></div>

    <script>
        const form = document.getElementById('searchForm');
        const resultsDiv = document.getElementById('results');

        // Aquí coloca tu clave de API de Bing
        const apiKey = 'TU_CLAVE_DE_API_DE_BING';
        const endpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/search';

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('query').value.trim();
            if (!query) return;

            // Realizar la solicitud a la API de Bing
            fetch(`${endpoint}?q=${encodeURIComponent(query)}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': apiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                // Mostrar los resultados
                resultsDiv.innerHTML = '';
                const webPages = data.webPages.value;
                if (webPages && webPages.length > 0) {
                    webPages.forEach(page => {
                        const resultItem = document.createElement('div');
                        resultItem.classList.add('result-item');
                        resultItem.innerHTML = `
                            <a href="${page.url}" target="_blank">${page.name}</a>
                            <p>${page.snippet}</p>
                        `;
                        resultsDiv.appendChild(resultItem);
                    });
                } else {
                    resultsDiv.innerHTML = 'No se encontraron resultados.';
                }
            })
            .catch(error => {
                console.error('Error al obtener los resultados de búsqueda:', error);
                resultsDiv.innerHTML = 'Error al realizar la búsqueda.';
            });
        });
    </script>

    <footer>
        <p>About (Zeus proxy) under construction</p>
        <p><a href="https://garlic500.github.io/Zeus/">garlic500.github.io/Zeus/</a></p>
    </footer>

</body>
</html>
