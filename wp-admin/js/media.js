var findPosts;(function(a){findPosts={open:function(d,c){var b=document.documentElement.scrollTop||a(document).scrollTop();if(d&&c){a("#affected").attr("name",d).val(c)}a("#find-posts").show().draggable({handle:"#find-posts-head"}).css({top:b+50+"px",left:"50%",marginLeft:"-250px"});a("#find-posts-input").focus().keyup(function(f){if(f.which==27){findPosts.close()}});return false},close:function(){a("#find-posts-response").html("");a("#find-posts").draggable("destroy").hide()},send:function(){var b={ps:a("#find-posts-input").val(),action:"find_posts",_ajax_nonce:a("#_ajax_nonce").val()};var c;a("input[@name='itemSelect[]']:checked").each(function(){c=a(this).val()});b.post_type=c;a.ajax({type:"POST",url:ajaxurl,data:b,success:function(d){findPosts.show(d)},error:function(d){findPosts.error(d)}})},show:function(b){if(typeof(b)=="string"){this.error({responseText:b});return}var c=wpAjax.parseAjaxResponse(b);if(c.errors){this.error({responseText:wpAjax.broken})}c=c.responses[0];a("#find-posts-response").html(c.data)},error:function(b){var c=b.statusText;if(b.responseText){c=b.responseText.replace(/<.[^<>]*?>/g,"")}if(c){a("#find-posts-response").html(c)}}};a(document).ready(function(){a("#find-posts-submit").click(function(b){if(""==a("#find-posts-response").html()){b.preventDefault()}});a("#doaction, #doaction2").click(function(b){a('select[name^="action"]').each(function(){if(a(this).val()=="attach"){b.preventDefault();findPosts.open()}})})})})(jQuery);
