/*semplice codice javascript che gestisce il meu a tendina/cascata */
jQuery(document).on("ready", function () {
	
	// Salvo il nav in una variabile
	var nav = $( "#myNav" );
	
	// Aggiungo la freccia e l'effetto hover su ogni sotto menu
	nav.find("li").each(function () {
		if ($(this).find("ul").length > 0) {
			$("<span>").text("^").
                        appendTo($(this).children(":first"));

			// Mosta i sottomenu per hover
			$(this).on("mouseenter", function () {
				$(this).find("ul").
                        stop(true, true).
                        slideDown( );
			});
			
			// Nasconde i sottomenu all'uscita del mose
			$(this).on("mouseleave", function () {
				$(this).find("ul").
                        stop(true, true).
                        slideUp( );
			});
                        
                        
		}
	});
});

$("#btn").click(function ()
        {
//            var data = $("#txt_arrivo").attr('value');
//            $("#link").attr('href', 'presenze_dettaglio.aspx?data=' + data);
//            $("#link").trigger('click');
             console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
});


