// ==UserScript==
// @name           Stackoverflow Tags
// @namespace      Enhancements
// @include        http://stackoverflow.com/questions/ask
// ==/UserScript==

/*
Hello I am a programmer that does care about interfaces. What kind of library can I use that gives me a defined set of widgets that have been tested in the real world?
*/
var text = document.getElementById('wmd-input');
var out = document.getElementById('tagnames');
text.addEventListener('blur',function(){
  var url = 'http://query.yahooapis.com/v1/public/yql?'+
            'q=select%20*%20from%20search.termextract%20'+
            'where%20context%3D%22'+encodeURIComponent(text.value)+ 
            '%22&format=json&callback=foo';
  text.style.background = '#cfc';
  out.setAttribute('disabled','true');
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.setAttribute('src',url)
  document.getElementsByTagName('head')[0].appendChild(s);
},true);
var s2 = document.createElement('script');
document.getElementsByTagName('head')[0].appendChild(s2);
s2.innerHTML = 'function foo(o){'+
  'var out = document.getElementById(\'tagnames\');'+
  'var source = document.getElementById(\'wmd-input\');'+
  'source.style.background=\'#fff\';'+
  'out.removeAttribute(\'disabled\');'+
  'if(o.query.results){'+
  'var tags = o.query.results.Result;'+
  'if(typeof tags!==\'string\'){'+
  'tags=tags.join(\' \');};'+
  'out.value+=tags;};}';
