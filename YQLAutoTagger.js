/*
  YQLAutoTagger by Christian Heilmann
  Homepage: http://github.com/codepo8/YQLAutoTagger/
  Copyright (c) 2009, Christian Heilmann
  Code licensed under the BSD License:
  http://wait-till-i.com/license.txt
*/
YQLAutoTagger = function(){
  var cfg = {
    loadingClass:'loading',
    tagDelimiter:' ',
    addQuotes:true,
    disableField:true
  };
  var inputField,tagField;
  function init(input,output){
    inputField = document.getElementById(input);
    tagField = document.getElementById(output);
    if(inputField && tagField){
      addEvent(inputField,'blur',function(){
        var content = inputField.value.replace('"','');
        var url = 'http://query.yahooapis.com/v1/public/yql?'+
                  'q=select%20*%20from%20search.termextract%20'+
                  'where%20context%3D%22'+encodeURIComponent(content)+ 
                  '%22&format=json&callback=YQLAutoTagger.received';
        var s = document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src',url);
        document.getElementsByTagName('head')[0].appendChild(s);
        if(cfg.disableField===true){
          tagField.setAttribute('disabled','true');
        }
        if(cfg.loadingClass !== ''){
          inputField.className += cfg.loadingClass;
        }
      },false);          
    }
  }
  function YQLreceived(o){
    if(o.query.results){
      if(cfg.disableField === true){
        tagField.removeAttribute('disabled');
      }
      if(cfg.loadingClass !== ''){
        var cl = inputField.className;
        inputField.className = cl.replace(cfg.loadingClass,'');
      }
      var tags = o.query.results.Result;
      if(typeof tags!=='string'){
        if(cfg.addQuotes === true){
          for(var i=tags.length-1;i>0;i--){
            if(tags[i].indexOf(' ')!==-1){
              tags[i] = '"' + tags[i] + '"';
            }
          }
        }
        tags = tags.join(cfg.tagDelimiter);
      } else {
        if(cfg.addQuotes === true){
          tags = (tags.indexOf(' ') !== -1) ? '"' + tags + '"' : tags;
        }
      }
      tagField.value = tags; 
    }
  }
  function addEvent(elm, evType, fn, useCapture){
    if (elm.addEventListener){
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent) {
      var r = elm.attachEvent('on' + evType, fn);
      return r;
    } else {
      elm['on' + evType] = fn;
    }
  }
  return{received:YQLreceived,init:init,config:cfg};
}();
