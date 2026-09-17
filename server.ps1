$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:5000/')
$listener.Start()
Write-Host "Server running at http://localhost:5000/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $reqPath = $context.Request.Url.LocalPath
        if ($reqPath -eq '/' -or $reqPath -eq '') {
            $reqPath = '/index.html'
        }
        $filePath = "c:\Qiano" + $reqPath.Replace('/', '\')
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                '.html' { 'text/html; charset=utf-8' }
                '.css'  { 'text/css; charset=utf-8' }
                '.js'   { 'application/javascript; charset=utf-8' }
                '.svg'  { 'image/svg+xml' }
                '.png'  { 'image/png' }
                '.jpg'  { 'image/jpeg' }
                default { 'application/octet-stream' }
            }
            $context.Response.ContentType = $contentType
            $context.Response.StatusCode = 200
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $context.Response.StatusCode = 404
        }
        $context.Response.Close()
    } catch {
        # continue handling requests
    }
}
