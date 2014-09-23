/*
 *
 * Copyright (c) 2006-2014 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 1.4
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 *
 */
(function(e){e.fn.numeric=function(t,n){if(typeof t==="boolean"){t={decimal:t,negative:true,decimalPlaces:-1}}t=t||{};if(typeof t.negative=="undefined"){t.negative=true}var r=t.decimal===false?"":t.decimal||".";var i=t.negative===true?true:false;var s=typeof t.decimalPlaces=="undefined"?-1:t.decimalPlaces;n=typeof n=="function"?n:function(){};return this.data("numeric.decimal",r).data("numeric.negative",i).data("numeric.callback",n).data("numeric.decimalPlaces",s).keypress(e.fn.numeric.keypress).keyup(e.fn.numeric.keyup).blur(e.fn.numeric.blur)};e.fn.numeric.keypress=function(t){var n=e.data(this,"numeric.decimal");var r=e.data(this,"numeric.negative");var i=e.data(this,"numeric.decimalPlaces");var s=t.charCode?t.charCode:t.keyCode?t.keyCode:0;if(s==13&&this.nodeName.toLowerCase()=="input"){return true}else if(s==13){return false}var o=false;if(t.ctrlKey&&s==97||t.ctrlKey&&s==65){return true}if(t.ctrlKey&&s==120||t.ctrlKey&&s==88){return true}if(t.ctrlKey&&s==99||t.ctrlKey&&s==67){return true}if(t.ctrlKey&&s==122||t.ctrlKey&&s==90){return true}if(t.ctrlKey&&s==118||t.ctrlKey&&s==86||t.shiftKey&&s==45){return true}if(s<48||s>57){var u=e(this).val();if(e.inArray("-",u.split(""))!==0&&r&&s==45&&(u.length===0||parseInt(e.fn.getSelectionStart(this),10)===0)){return true}if(n&&s==n.charCodeAt(0)&&e.inArray(n,u.split(""))!=-1){o=false}if(s!=8&&s!=9&&s!=13&&s!=35&&s!=36&&s!=37&&s!=39&&s!=46){o=false}else{if(typeof t.charCode!="undefined"){if(t.keyCode==t.which&&t.which!==0){o=true;if(t.which==46){o=false}}else if(t.keyCode!==0&&t.charCode===0&&t.which===0){o=true}}}if(n&&s==n.charCodeAt(0)){if(e.inArray(n,u.split(""))==-1){o=true}else{o=false}}}else{o=true;if(n&&i>0){var a=e.inArray(n,e(this).val().split(""));if(a>=0&&e(this).val().length>a+i){o=false}}}return o};e.fn.numeric.keyup=function(t){var n=e(this).val();if(n&&n.length>0){var r=e.fn.getSelectionStart(this);var i=e.fn.getSelectionEnd(this);var s=e.data(this,"numeric.decimal");var o=e.data(this,"numeric.negative");var u=e.data(this,"numeric.decimalPlaces");if(s!==""&&s!==null){var a=e.inArray(s,n.split(""));if(a===0){this.value="0"+n;r++;i++}if(a==1&&n.charAt(0)=="-"){this.value="-0"+n.substring(1);r++;i++}n=this.value}var f=[0,1,2,3,4,5,6,7,8,9,"-",s];var l=n.length;for(var c=l-1;c>=0;c--){var h=n.charAt(c);if(c!==0&&h=="-"){n=n.substring(0,c)+n.substring(c+1)}else if(c===0&&!o&&h=="-"){n=n.substring(1)}var p=false;for(var d=0;d<f.length;d++){if(h==f[d]){p=true;break}}if(!p||h==" "){n=n.substring(0,c)+n.substring(c+1)}}var v=e.inArray(s,n.split(""));if(v>0){for(var m=l-1;m>v;m--){var g=n.charAt(m);if(g==s){n=n.substring(0,m)+n.substring(m+1)}}}if(s&&u>0){var a=e.inArray(s,n.split(""));if(a>=0){n=n.substring(0,a+u+1);i=Math.min(n.length,i)}}this.value=n;e.fn.setSelection(this,[r,i])}};e.fn.numeric.blur=function(){var t=e.data(this,"numeric.decimal");var n=e.data(this,"numeric.callback");var r=e.data(this,"numeric.negative");var i=this.value;if(i!==""){var s=new RegExp(r?"-?":""+"^\\d+$|^\\d*"+t+"\\d+$");if(!s.exec(i)){n.apply(this)}}};e.fn.removeNumeric=function(){return this.data("numeric.decimal",null).data("numeric.negative",null).data("numeric.callback",null).data("numeric.decimalPlaces",null).unbind("keypress",e.fn.numeric.keypress).unbind("keyup",e.fn.numeric.keyup).unbind("blur",e.fn.numeric.blur)};e.fn.getSelectionStart=function(e){if(e.type==="number"){return undefined}else if(e.createTextRange&&document.selection){var t=document.selection.createRange().duplicate();t.moveEnd("character",e.value.length);if(t.text=="")return e.value.length;return Math.max(0,e.value.lastIndexOf(t.text))}else{try{return e.selectionStart}catch(n){return 0}}};e.fn.getSelectionEnd=function(e){if(e.type==="number"){return undefined}else if(e.createTextRange&&document.selection){var t=document.selection.createRange().duplicate();t.moveStart("character",-e.value.length);return t.text.length}else return e.selectionEnd};e.fn.setSelection=function(e,t){if(typeof t=="number"){t=[t,t]}if(t&&t.constructor==Array&&t.length==2){if(e.type==="number"){e.focus()}else if(e.createTextRange){var n=e.createTextRange();n.collapse(true);n.moveStart("character",t[0]);n.moveEnd("character",t[1]-t[0]);n.select()}else{e.focus();try{if(e.setSelectionRange){e.setSelectionRange(t[0],t[1])}}catch(r){}}}}})(jQuery)