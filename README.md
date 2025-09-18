<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Simple Search Proxy</title>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; }
  input[type="text"] { width: 300px; padding: 8px; font-size: 16px; }
  button { padding: 8px 12px; font-size: 16px; }
  iframe { width: 100%; height: 80vh; margin-top: 20px; border: 1px solid #ccc; }
</style>
</head>
<body>
<h1>Search with DuckDuckGo</h1>

<form id="searchForm">
  <input type="text" id="query" placeholder="Enter your search" required />
  <button type="submit">Search</button>
</form>

<iframe id="resultFrame" src="" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>

<script>
  const form = document.getElementById('searchForm');
  const iframe = document.getElementById('resultFrame');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = document.getElementById('query').value.trim();
    if (!q) return;
    // Construct DuckDuckGo search URL
    const searchUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(q);
    iframe.src = searchUrl;
  });
</script>
</body>
</html>
