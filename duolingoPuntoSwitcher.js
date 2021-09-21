// ==UserScript==
// @name         DuolingoPuntoSwitcher
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  changes letters to russian if it needs in duolingo. Note: for fully correct script work end sentences by space
// @author       AlexanderDV-ru
// @match        https://www.duolingo.com/*
// @icon         https://www.duolingo.com/
// @grant        none
// ==/UserScript==

setInterval(function() {

    var map = {
        ru: ["йцукенгшщзхъфывапролджэячсмитьбюё","ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ"],
        en: ["qwertyuiop[]asdfghjkl;'zxcvbnm,.`","QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>~"]
    };

    var elems=document.getElementsByTagName("*"),area,span,hasRu,ru,en
    for(let i=0;i<elems.length;i++)
        switch(elems[i].getAttribute("data-test")){
            case "challenge-translate-input":
            case "challenge-text-input":
                area=elems[i]
                break
            case "hint-token":
            case "hint-sentence":
                span=elems[i]
                for(let l of map.ru[0]+map.ru[1])
                    if(span.innerText.indexOf(l)!=-1)
                        hasRu=true
                break
        }
    if(!area||!span)
        return
    if(hasRu)
        en=area
    else ru=area

    if(ru){
        ru.__lang = [ 'ru', 'en' ];
        ru.onkeydown=setInputText;
    }
    if(en){
        en.__lang = [ 'en', 'ru' ];
        en.onkeydown=setInputText;
    }

    function setInputText ( e ) {
        var k = e.key;
        let curMap=map[this.__lang[1]]
        let i=curMap[0].indexOf(k),lc=0
        if(i==-1&&curMap[1].indexOf(k)!=-1)
        {
            i=curMap[1].indexOf(k)
            lc=1
        }
        let start = this.selectionStart, end = this.selectionEnd
        console.log(i,lc,k,e,start,end)
        if(k=="Enter")
        {
            console.log("yes")
            this.setRangeText("gbdtn vbh",0,10);
        }
        if (i !== -1 ) {
            //e.preventDefault();
            let th=this
            //th.setRangeText(map[th.__lang[0]][lc][i], start, end);
            setTimeout(()=>{
                //th.setRangeText("", end, end+1 );
                th.setRangeText(map[th.__lang[0]][lc][i], start, end+1);
                th.setSelectionRange( start + 1, start + 1 );
            },10)

        }
    }
    // Your code here...
},500);
