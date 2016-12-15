function onKonamiCode(fn) {
   var codes = (function(){
      var c = [38,38,40,40,37,39,37,39,66,65];
      onKonamiCode.requireEnterKey && c.push(13);
      return c;
   })(),
   expecting = function(){
      expecting.codes = expecting.codes || Array.apply({}, codes);
      expecting.reset = function() { expecting.codes = null; };
      return expecting.codes;
   },
   handler = function(e) {
      if (expecting()[0] == (e||window.event).keyCode) {
         expecting().shift();
         if (!expecting().length) {
            expecting.reset();
            fn();
         }
      } else {
         expecting.reset();
      }
   };
   window.addEventListener ?
      window.addEventListener('keydown', handler, false)
      : document.attachEvent('onkeydown', handler);
}

onKonamiCode.requireEnterKey = true;
onKonamiCode(function(){
   var iframe = document.createElement('iframe');
   iframe.style.width = "100%";
   iframe.style.height = "100%";
   iframe.style.frameborder = "0";
   iframe.style.allowTransparency = "true";
   iframe.style.zIndex = "5";
   iframe.style.position = "fixed";
   iframe.style.top = "0px";
   iframe.style.left = "0px";
   iframe.src = "http://nick11roberts.github.io/Llama-Web/";
   document.body.appendChild(iframe);
});
