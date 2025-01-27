export default {
  async fetch(request, env) {
      let myurl = new URL(request.url)
      if(myurl.pathname.startsWith('/proxy')) {
         let page =`
          <!DOCTYPE HTML>
          <html>
      <head>
          <meta charset="UTF-8">
          <title>CF-Proxy Online</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
          <link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css">
        
      </head>
      <body><div class="mdui-prose">
          <mdui-text-field  id="text" label="Address"></mdui-text-field>
          <mdui-button onclick="search()">GO</mdui-button></div>
          <script src="https://unpkg.com/mdui@2/mdui.global.js"></script>
          <script>
              function search() {
                  document.cookie = document.getElementById("text").value;
                  window.location.href = window.location.hostname
              }
          </script>
      </body>
  </html>
        `
       return new Response(page, {headers: {'Content-Type': 'text/html; charset=utf-8'}})
      }
      let blockfix = { method: request.method,
                     headers: request.headers};
      let destinationurl = new URL(request.url)
      destinationurl.hostname = request.headers.get("Cookie")
      let nrequest = new Request(destinationurl, blockfix);
      return fetch(nrequest);
    }
};
