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
        iframe {
            width: 100%;
            height: 80vh;
            margin-top: 20px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>

    <h1>Search with Google</h1>

    <form id="searchForm">
        <input type="text" id="query" placeholder="Enter search term" required>
        <button type="submit">Search</button>
    </form>

    <iframe id="resultFrame" src="" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>

    <script>
        const form = document.getElementById('searchForm');
        const iframe = document.getElementById('resultFrame');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('query').value.trim();
            if (!query) return;

            // Construir la URL de búsqueda de Google
            const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);

            // Actualizar el src del iframe para cargar los resultados en la misma página
            iframe.src = searchUrl;
        });
    </script>

    <footer>
        <p>About (Zeus proxy) under construction</p>
        <p><a href="https://garlic500.github.io/Zeus/">garlic500.github.io/Zeus/</a></p>
    </footer>

</body>
</html>
