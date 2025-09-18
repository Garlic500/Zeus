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
    </style>
</head>
<body>

    <h1>Search with Google</h1>

    <form id="searchForm">
        <input type="text" id="query" placeholder="Enter search term" required>
        <button type="submit">Search</button>
    </form>

    <script>
        const form = document.getElementById('searchForm');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('query').value.trim();
            if (!query) return;

            // Redirigir al usuario a la URL de búsqueda de Google
            const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            window.location.href = searchUrl; // Redirige la página
        });
    </script>

    <footer>
        <p>About (Zeus proxy) under construction</p>
        <p><a href="https://garlic500.github.io/Zeus/">garlic500.github.io/Zeus/</a></p>
    </footer>

</body>
</html>
