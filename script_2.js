
    window.onerror = function (msg, url, lineNo, columnNo, error) {
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '0';
      errorDiv.style.left = '0';
      errorDiv.style.width = '100%';
      errorDiv.style.background = 'red';
      errorDiv.style.color = 'white';
      errorDiv.style.padding = '20px';
      errorDiv.style.zIndex = '9999';
      errorDiv.innerHTML = '<h1>JS Error: ' + msg + '</h1><p>Line: ' + lineNo + ' Col: ' + columnNo + '</p><pre>' + (error ? error.stack : '') + '</pre>';
      document.body.appendChild(errorDiv);
      return false;
    };
  