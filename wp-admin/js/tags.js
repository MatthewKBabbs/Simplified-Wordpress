jQuery(document).ready(function(a){a(".delete-tag").live("click",function(g){var b=a(this),f=b.parents("tr"),c=true,d;if("undefined"!=showNotice){c=showNotice.warn()}if(c){d=b.attr("href").replace(/[^?]*\?/,"").replace(/action=delete/,"action=delete-tag");a.post(ajaxurl,d,function(e){if("1"==e){a("#ajax-response").empty();f.fadeOut("normal",function(){f.remove()});a("select#parent option[value="+d.match(/tag_ID=(\d+)/)[1]+"]").remove();a("a.tag-link-"+d.match(/tag_ID=(\d+)/)[1]).remove()}else{if("-1"==e){a("#ajax-response").empty().append('<div class="error"><p>'+tagsl10n.noPerm+"</p></div>");f.children().css("backgroundColor","")}else{a("#ajax-response").empty().append('<div class="error"><p>'+tagsl10n.broken+"</p></div>");f.children().css("backgroundColor","")}}});f.children().css("backgroundColor","#f33")}return false});a("#submit").click(function(){var b=a(this).parents("form");if(!validateForm(b)){return false}a.post(ajaxurl,a("#addtag").serialize(),function(h){a("#ajax-response").empty();var f=wpAjax.parseAjaxResponse(h,"ajax-response");if(!f){return}var g=b.find("select#parent").val();if(g>0&&a("#tag-"+g).length>0){a("#the-list #tag-"+g).after(f.responses[0].supplemental.noparents)}else{a("#the-list").prepend(f.responses[0].supplemental.parents)}if(b.find("select#parent")){var e=f.responses[1].supplemental;var c="";for(var d=0;d<f.responses[1].position;d++){c+="&nbsp;&nbsp;&nbsp;"}b.find("select#parent option:selected").after('<option value="'+e.term_id+'">'+c+e.name+"</option>")}a('input[type="text"]:visible, textarea:visible',b).val("")});return false})});
