$(window).load(function(){
	// Igualar altura de elementos:
	var max_same_h = [];
	var last_class = null;
	

	// Bucle para todos los 'same-heightX':
	$("[class*='same-height']").each(function(){
		var clase = $(this).attr('class').match(/(same-height[^\s]*)/);
		clase = clase[1];

		// Nuevo grupo de 'same-heightX' o 1ª vez:
		if (clase != last_class) {

			if (last_class) { // Nuevo grupo de 'same-heightX'
				var max = Math.max.apply(Math, max_same_h);
				$("." + last_class).css('height', max);
				max_same_h = []; // Reseteamos para el siguiente grupo
			}

			last_class = clase;
		}

		max_same_h.push(parseInt($(this).css('height')));
	});

	// Mismo ajuste para el último caso:
	max = Math.max.apply(Math, max_same_h);
	$("." + last_class).css('height', max);
});