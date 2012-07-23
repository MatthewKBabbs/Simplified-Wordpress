(function(){tinymce.create("tinymce.plugins.wpEditImage",{url:"",editor:{},init:function(a,c){var d=this,b={};d.url=c;d.editor=a;d._createButtons();a.addCommand("WP_EditImage",function(){var i=a.selection.getNode(),g,h,e,f=a.dom.getAttrib(i,"class");if(f.indexOf("mceItem")!=-1||f.indexOf("wpGallery")!=-1||i.nodeName!="IMG"){return}g=tinymce.DOM.getViewPort();h=680<(g.h-70)?680:g.h-70;e=650<g.w?650:g.w;a.windowManager.open({file:c+"/editimage.html",width:e+"px",height:h+"px",inline:true})});a.onInit.add(function(e){e.dom.events.add(e.getBody(),"dragstart",function(g){var f;if(g.target.nodeName=="IMG"&&(f=e.dom.getParent(g.target,"div.mceTemp"))){e.selection.select(f)}})});a.onMouseUp.add(function(f,g){if(tinymce.isWebKit||tinymce.isOpera){return}if(b.x&&(g.clientX!=b.x||g.clientY!=b.y)){var h=f.selection.getNode();if("IMG"==h.nodeName){window.setTimeout(function(){var e=f.dom.getParent(h,"dl.wp-caption"),i;if(h.width!=b.img_w||h.height!=b.img_h){h.className=h.className.replace(/size-[^ "']+/,"")}if(e){i=f.dom.getAttrib(h,"width")||h.width;i=parseInt(i,10);f.dom.setStyle(e,"width",10+i);f.execCommand("mceRepaint")}},100)}}b={}});a.onMouseDown.add(function(f,h){var g=h.target;if(g.nodeName!="IMG"){if(g.firstChild&&g.firstChild.nodeName=="IMG"&&g.childNodes.length==1){g=g.firstChild}else{return}}if(f.dom.getAttrib(g,"class").indexOf("mceItem")==-1){b={x:h.clientX,y:h.clientY,img_w:g.clientWidth,img_h:g.clientHeight};f.plugins.wordpress._showButtons(g,"wp_editbtns")}});a.onKeyPress.add(function(f,j){var k,g,i,h;if(j.keyCode==13){k=f.selection.getNode();g=f.dom.getParent(k,"dl.wp-caption");if(g){i=f.dom.getParent(g,"div.mceTemp")}if(i){h=f.dom.create("p",{},"<br>");f.dom.insertAfter(h,i);f.selection.select(h.firstChild);if(tinymce.isIE){f.selection.setContent("")}else{f.selection.setContent('<br _moz_dirty="">');f.selection.setCursorLocation(h,0)}f.dom.events.cancel(j);return false}}});a.onBeforeSetContent.add(function(e,f){f.content=e.wpSetImgCaption(f.content)});a.onPostProcess.add(function(e,f){if(f.get){f.content=e.wpGetImgCaption(f.content)}});a.wpSetImgCaption=function(e){return d._do_shcode(e)};a.wpGetImgCaption=function(e){return d._get_shcode(e)}},_do_shcode:function(a){return a.replace(/(?:<p>)?\[(?:wp_)?caption([^\]]+)\]([\s\S]+?)\[\/(?:wp_)?caption\](?:<\/p>)?/g,function(j,i,h){var d,m,k,l,f,g,e=tinymce.trim;d=i.match(/id=['"]([^'"]*)['"] ?/);i=i.replace(d[0],"");m=i.match(/align=['"]([^'"]*)['"] ?/);i=i.replace(m[0],"");k=i.match(/width=['"]([0-9]*)['"] ?/);i=i.replace(k[0],"");h=e(h);g=h.match(/((?:<a [^>]+>)?<img [^>]+>(?:<\/a>)?)([\s\S]*)/i);if(g&&g[2]){l=e(g[2]);g=e(g[1])}else{l=e(i).replace(/caption=['"]/,"").replace(/['"]$/,"");g=h}d=(d&&d[1])?d[1]:"";m=(m&&m[1])?m[1]:"alignnone";k=(k&&k[1])?k[1]:"";if(!k||!l){return h}f="mceTemp";if(m=="aligncenter"){f+=" mceIEcenter"}return'<div class="'+f+'"><dl id="'+d+'" class="wp-caption '+m+'" style="width: '+(10+parseInt(k))+'px"><dt class="wp-caption-dt">'+g+'</dt><dd class="wp-caption-dd">'+l+"</dd></dl></div>"})},_get_shcode:function(a){return a.replace(/<div (?:id="attachment_|class="mceTemp)[^>]*>([\s\S]+?)<\/div>/g,function(d,c){var e=c.replace(/<dl ([^>]+)>\s*<dt [^>]+>([\s\S]+?)<\/dt>\s*<dd [^>]+>([\s\S]*?)<\/dd>\s*<\/dl>/gi,function(i,f,l,j){var k,h,g;g=l.match(/width="([0-9]*)"/);g=(g&&g[1])?g[1]:"";if(!g||!j){return l}k=f.match(/id="([^"]*)"/);k=(k&&k[1])?k[1]:"";h=f.match(/class="([^"]*)"/);h=(h&&h[1])?h[1]:"";h=h.match(/align[a-z]+/)||"alignnone";j=j.replace(/\r\n|\r/g,"\n").replace(/<[a-zA-Z0-9]+( [^<>]+)?>/g,function(b){return b.replace(/[\r\n\t]+/," ")});j=j.replace(/\s*\n\s*/g,"<br />");return'[caption id="'+k+'" align="'+h+'" width="'+g+'"]'+l+" "+j+"[/caption]"});if(e.indexOf("[caption")!==0){e=c.replace(/[\s\S]*?((?:<a [^>]+>)?<img [^>]+>(?:<\/a>)?)(<p>[\s\S]*<\/p>)?[\s\S]*/gi,"<p>$1</p>$2")}return e})},_createButtons:function(){var b=this,a=tinyMCE.activeEditor,d=tinymce.DOM,e,c;d.remove("wp_editbtns");d.add(document.body,"div",{id:"wp_editbtns",style:"display:none;"});e=d.add("wp_editbtns","img",{src:b.url+"/img/image.png",id:"wp_editimgbtn",width:"24",height:"24",title:a.getLang("wpeditimage.edit_img")});tinymce.dom.Event.add(e,"mousedown",function(g){var f=tinyMCE.activeEditor;f.windowManager.bookmark=f.selection.getBookmark("simple");f.execCommand("WP_EditImage")});c=d.add("wp_editbtns","img",{src:b.url+"/img/delete.png",id:"wp_delimgbtn",width:"24",height:"24",title:a.getLang("wpeditimage.del_img")});tinymce.dom.Event.add(c,"mousedown",function(i){var f=tinyMCE.activeEditor,g=f.selection.getNode(),h;if(g.nodeName=="IMG"&&f.dom.getAttrib(g,"class").indexOf("mceItem")==-1){if((h=f.dom.getParent(g,"div"))&&f.dom.hasClass(h,"mceTemp")){f.dom.remove(h)}else{if((h=f.dom.getParent(g,"A"))&&h.childNodes.length==1){f.dom.remove(h)}else{f.dom.remove(g)}}f.execCommand("mceRepaint");return false}})},getInfo:function(){return{longname:"Edit Image",author:"WordPress",authorurl:"http://wordpress.org",infourl:"",version:"1.0"}}});tinymce.PluginManager.add("wpeditimage",tinymce.plugins.wpEditImage)})();
