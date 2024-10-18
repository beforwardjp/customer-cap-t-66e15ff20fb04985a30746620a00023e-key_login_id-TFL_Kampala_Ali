/**
 * jQuery Deserialize plugin
 * @author: Akihiro Gakuhari
 *
**/

/* Builtin Array class extension, which converts itself to map */
Array.prototype.toHash = function(){
	var map = {}
	for(var i = 0;i < this.length; i++)
		map[this[i]] = ''
	return map
};

$.fn.deserialize = function(p, options){

	var str = p;
	var data = str.split("&")

	options = options || {}
	attr = options.attribute || "name"

	if(options.only && options.except)
		throw "You cannot pass both 'only' and 'except' options"

	var names = (options.except || []).toHash()
	var except = true
	if(options.only){
		names = options.only.toHash()
		except = false
	}

	callback = options.callback
	callback_on = options.callback_on || false
	if(callback_on)
		callback_on = callback_on.toHash()


	for (var i = 0; i < data.length; i++) {
		var pair = decodeURIComponent(data[i]).split("=")
		var _name = pair[0]
		var value = pair[1]
		if(except != _name in names){
			$("[" + attr + "='" + _name + "']", this).val(value)
			if(callback && ((!callback_on) || (_name in callback_on))){
				callback(_name, value)
			}
		}
	}
}

/*
alert(this.tagName);

return;

$.each(data, function(i, el){
	var
          fel = form.find('*[name="' + i + '"]'),
          type = "", tag = "";

       if (fel.length > 0) {

           tag = fel[0].tagName.toLowerCase();

           if (tag == "select" || tag == "textarea") { //...
              $(fel).val(el);
           }
           else if (tag == "input") {
              type = $(fel[0]).attr("type");
               if (type == "text" || type == "password" || type == "hidden") {
                  fel.val(el);
               }
               else if (type == "checkbox") {
                  if (el)
                     fel.attr("checked", "checked");
               }
               else if (type == "radio") {
                   fel.filter('[value="'+el+'"]').attr("checked", "checked");
               }
           }
       }
}

*/