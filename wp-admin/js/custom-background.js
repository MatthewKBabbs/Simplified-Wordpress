var farbtastic,pickColor;(function(b){var a="";pickColor=function(c){farbtastic.setColor(c);b("#background-color").val(c);b("#custom-background-image").css("background-color",c);if((a&&c===a)||(!a&&(""===c||"#"===c))){b("#clearcolor").hide()}else{b("#clearcolor").show()}};b(document).ready(function(){a=b("#defaultcolor").val();b("#pickcolor").click(function(){b("#colorPickerDiv").show();return false});b("#clearcolor a").click(function(c){pickColor(a);c.preventDefault()});b("#background-color").keyup(function(){var d=b("#background-color").val(),c=d;if(c.charAt(0)!="#"){c="#"+c}c=c.replace(/[^#a-fA-F0-9]+/,"");if(c!=d){b("#background-color").val(c)}if(c.length==4||c.length==7){pickColor(c)}});b('input[name="background-position-x"]').change(function(){b("#custom-background-image").css("background-position",b(this).val()+" top")});b('input[name="background-repeat"]').change(function(){b("#custom-background-image").css("background-repeat",b(this).val())});farbtastic=b.farbtastic("#colorPickerDiv",function(c){pickColor(c)});pickColor(b("#background-color").val());b(document).mousedown(function(){b("#colorPickerDiv").each(function(){var c=b(this).css("display");if(c=="block"){b(this).fadeOut(2)}})})})})(jQuery);
