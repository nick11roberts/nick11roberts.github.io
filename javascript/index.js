// Only executed our code once the DOM is ready.
window.onload = function() {

   // For parallax effect
   $('.parallax-window').parallax({imageSrc: '/images/profile.jpg'});

   // For canvas polygon bg
   fillCanvas(document.getElementById('background'),
      '#555555', 13, 13, 4);

   // For typwriter effect
   var typewriter = require('typewriter');
   var twSpan = document.getElementById('typewriter');
   var tw = typewriter(twSpan).withAccuracy(95)
                              .withMinimumSpeed(5)
                              .withMaximumSpeed(17)
                              .build();
   var terminalPropmt = '<p class="term terminal">[</p> <p class="term-user">you</p> \
      <p class="term-host terminal">nickrobertsportfolio</p> \
      <p class="term-dir terminal">~</p> \
      <p class="term terminal">] <i class="fa fa-bolt" aria-hidden="true"></i></p> '
   tw.put(terminalPropmt)
      .waitRange(250, 500)
      .type('man nicholas-roberts | cat')
      .put('<br/>')
      .waitRange(1000, 1500)
      .put('NICHOLAS-ROBERTS(1)<br/><br/>')
      .put('NAME<br/>')
      .put('&emsp;&emsp; nicholas-roberts - Nicholas "Nick" Roberts<br/><br/>')
      .put('SYNOPSIS<br/>')
      .put('&emsp;&emsp; nicholas-roberts [options] [project ..]<br/><br/>')
      .put('DESCRIPTION<br/>')
      .put('&emsp;&emsp; Developer, UC San Diego undergraduate, \
         and machine learner, <br/>\
         &emsp;&emsp; as well as a cofounder and codeveloper of Skqrl, \
         an experience sharing platform.<br/>\
         &emsp;&emsp; Check out my portfolio below.<br/><br/>')
      .put(terminalPropmt)
      .waitRange(250, 500)
      .type('cat ~/github.com/nick11roberts/portfolio/whatsnext.txt')
      .put('<br/>')
      .waitRange(1000, 1500)
      .put('Scroll down to learn more <br/> \
         or try typing this followed by a carriage return: <br/>\
         <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> \
         <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> \
         b a <br/><br/>')
      .put(terminalPropmt)

   // For smooth scrolling, jQuery
   $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
         if (location.pathname.replace(/^\//,'')
            == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
               $('html, body').animate({
                  scrollTop: target.offset().top
               }, 1000);
               return false;
            }
         }
      });
   });

   // For konami code easter egg
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

}
