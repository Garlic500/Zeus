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

    <h1>Search with DuckDuckGo</h1>

    <form id="searchForm">
        <input type="text" id="query" placeholder="Enter search term" required>
        <button type="submit">Search</button>
    </form>

    <div id="results"></div>

    <script>
        const form = document.getElementById('searchForm');
        const resultsDiv = document.getElementById('results');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('query').value.trim();
            if (!query) return;

            // Utilizar el proxy público para realizar la solicitud
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const targetUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

            fetch(proxyUrl + encodeURIComponent(targetUrl))
                .then(response => response.json())
                .then(data => {
                    const json = JSON.parse(data.contents);
                    resultsDiv.innerHTML = ''; // Limpiar resultados previos

                    // Extraer y mostrar resultados
                    if (json.RelatedTopics && json.RelatedTopics.length > 0) {
                        json.RelatedTopics.forEach(topic => {
                            if (topic.Result) {
                                const resultItem = document.createElement('div');
                                resultItem.classList.add('result-item');
                                resultItem.innerHTML = `
                                    <a href="${topic.FirstURL}" target="_blank">${topic.Text}</a>
                                    <p>${topic.Snippet || 'No description available.'}</p>
                                `;
                                resultsDiv.appendChild(resultItem);
                            }
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

</body>
</html>
