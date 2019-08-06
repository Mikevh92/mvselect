//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
**  @Autor: Mikevh92
**  Codigo para insertar una lista filtrable y multiple seleccionable
*/

$(document).ready(function() {
	mvselectIni();
});
//evento al dar click en el input para abrir la lista de elementos
$('body').on('click', '.mvselect-space input', function(event) {
	event.preventDefault();
	$('.mvselect-space ul').css('display', 'none');
	$(this).select();//seleccionar texto del input para hacer busquedas

	var idul = $(this).data('idul');
	if( $('#'+idul).css('display') == 'none' ){
		$('#'+idul).css('display','block');
	}else{
		$('#'+idul).css('display','none');
	}
	event.stopPropagation();
});

// evento para buscar en la lista de elementos
$('body').on('keyup', '.mvselect-space input', function(event) {
	event.preventDefault();

	var word = ($(this).val()).split(",");
	var last = (word.length)-1;
	var lastMin = (word[last]).toLowerCase();
	var regExp = new RegExp(lastMin);

	$(this).closest('.mvselect-space').find('li').each(function(index, el) {
		if( !regExp.test( ($(this).find('.mvselect-title').text()).toLowerCase() ) ){
			$(this).addClass('hide');
		}else{
			$(this).removeClass('hide');
		}
	});

});


// evento para cerrar la lista de elementos
$(document).click(function(event) {
	closeSelect();
});

function closeSelect() {
	$('.mvselect-space ul').css('display', 'none');

	for( var i = 0; i < $('.mvselect-space ul').length; i++ ){

		if( $($('.mvselect-space ul')[i]).data('multiple') ){
			var textSelected = new Array();

			$($('.mvselect-space ul')[i]).find('li').each(function(index, el) {
				if( $(this).hasClass('selected') ){
					textSelected.push( $(this).find('.mvselect-title').text() );
				}
			});

			$($('.mvselect-space ul')[i]).closest('.mvselect-space').find('input[type=text]').val(textSelected);
		}
	}
}

// evento para seleccionar un item de la lista de elementos y mandarlo al select y al input para vista previa
$('body').on('click', '.mvselect-space ul li', function(event) {
	event.preventDefault();
	
	var value = $(this).data('value');
	var text = $(this).find('.mvselect-title').text();
	var ulid = $(this).closest('ul').attr('id');
	var selected = new Array();
	var textSelected = new Array();

	if( $(this).closest('ul').data('multiple') ){	
		if( $(this).hasClass('selected') ){
			$(this).removeClass('selected');
		}else{
			$(this).addClass('selected');	
		}

		$(this).closest('ul').find('li').each(function(index, el) {
			if( $(this).hasClass('selected') ){
				selected.push( $(this).data('value') );
				textSelected.push( $(this).find('.mvselect-title').text() );
			}
		});
		event.stopPropagation();
	}


	var $select = $('body .mvselect').find('.mvselect-active');
	for(var i = 0; i < $select.length; i++){
		if( $($select[i]).attr('data-idulselect') == ulid ) {
			
			if( $(this).closest('ul').data('multiple') == false ){	
				$($select[i]).val(value);
			}else{
				$($select[i]).val(selected);
			}
		}
	}

	var $input = $('body .mvselect').find('input[type=text]');
	for(var i = 0; i < $input.length; i++){
		if( $($input[i]).attr('data-idul') == ulid ) {
			
			if( $(this).closest('ul').data('multiple') == false ){	
				$($input[i]).val(text);
			}else{
				$($input[i]).val(textSelected);
			}
		}
	}
});

// evento para cambiar el valor de forma externa
function mvselectValue(id, value) {

	$(id).val(value);
		
	$(id).closest('.mvselect').find('.mvselect-space li').each(function(index, el) {
		if( $(id).data('idulselect') != undefined ){
			if( $(id).attr('multiple') ){
				if( $.inArray($(this).data('value'), value) !== -1 ){
					$(this).addClass('selected');
				}else{
					$(this).removeClass('selected');
				}
			}else{
				if( $(this).data('value') == value ){
					$(id).closest('.mvselect').find('input[type=text]').val( $(this).find('.mvselect-title').text() );
				}
			}
		}
	});
	closeSelect();
}


function mvselectIni() {

	if( $('body').find('.mvselect .mvselect-space').length > 0 ){
		$('body').find('.mvselect .mvselect-space').remove();
	}

	var $mvselect = $('body').find('.mvselect-active');

	for( var i = 0; i < $mvselect.length; i++ ){

		var mvselectValue = $($mvselect[i]).find('option:selected').text();

		$($mvselect[i]).css('display', 'block');

		var mvselect_ul = ((i+1)<10?'0'+(i+1):(i+1));

		var divHTML =
		'<div class="mvselect-space">'+
			'<input type="text" placeholder="Buscar" data-idul="mvselect_ul_'+ mvselect_ul +'" value="'+ mvselectValue +'">'+
			'<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">'+
				'<path d="M7 10l5 5 5-5z"></path>'+
				'<path d="M0 0h24v24H0z" fill="none"></path>'+
			'</svg>'+
			'<ul id="mvselect_ul_'+ mvselect_ul +'" data-multiple="'+ ($($mvselect[i]).attr('multiple')!=undefined?'true':'false') +'" style="display:none; width:'+ $($mvselect[i]).width() +'px;'+ $($mvselect[i]).data('css') +'">';
				
				$($mvselect[i]).find('option').each(function(index, el) {
					//poner iconos o imagenes
					var icon = '';
					if ( $(this).data('icon') != undefined && (/\.(jpg|png|gif)$/i).test($(this).data('icon')) ){

						icon = '<div class="mvselect-icon"><img src="'+ $(this).data('icon') +'"></div>';

					}else if( $(this).data('icon') != undefined && (/\.(material-icons)$/i).test($(this).data('icon')) ){

						icon = '<i class="material-icons" style="margin-left: 30%; margin-top: 20%; color: #797979;">'+ ($(this).data('icon')).split('.')[0] +'</i>';
					}

					divHTML += 
					'<li data-value="'+ $(this).attr('value') +'">' +
						(icon!=''?'<div class="mvselect-icon">'+icon+'</div>':'')+
						'<div class="mvselect-title">'+ $(this).text() +'</div>'+
						($(this).data('subtitle') != undefined ? '<div class="mvselect-subtitle">'+ $(this).data('subtitle') +'</div>' : '' ) +
					'</li>';
				});

			divHTML += 
			'</ul>'+
		'</div>';


		$($mvselect[i]).closest('.mvselect').append(divHTML);
		$($mvselect[i]).attr('data-idulselect', 'mvselect_ul_'+ mvselect_ul);
		$($mvselect[i]).css('display', 'none');
	}
}