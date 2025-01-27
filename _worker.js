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
          <mdui-text-field  id="text" label="Hostname"></mdui-text-field>
          <mdui-button onclick="search()">GO</mdui-button></div>
          <script src="https://unpkg.com/mdui@2/mdui.global.js"></script>
          <script>
              function search() {
                  document.cookie = 'hostname=' + document.getElementById("text").value;
                  location.replace('https://' + window.location.hostname)
              }
          </script>
      </body>
  </html>
        `
       return new Response(page, {headers: {'Content-Type': 'text/html; charset=utf-8'}})
      }
       function getCookie(name) {
        let match = request.headers.get("Cookie").match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return match[2];
        } else {
            return null;
        }
      }
      let blockfix = { method: request.method,
                     headers: request.headers};
      let destinationurl = new URL(request.url)
      destinationurl.hostname = getCookie('hostname')
      let nrequest = new Request(destinationurl, blockfix);
      return fetch(nrequest);
    }
};
