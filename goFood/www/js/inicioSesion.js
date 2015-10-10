function onLoad(){
	document.addEventListener("deviceready", onDeviceReady(), false);
}

function onDeviceReady(){
	$('#iniciarSesion').click(function(){

		var username = $("#user").val();
		var password = $("#password").val();

		var conexion = checkConnection();

		if(conexion){
			$.ajax({
				type: 'POST',
				url: 'http://8.9.0.209:8080/gofood/loginApp.do',
				dataType: "JSON",
				data: {
						"usuario": username,
						"password": password
						},
				success: function(data){
					if(data.length != 0){
						location.href = "./listaProductos.html";
						cargarProductos();
					}else{
						alert('Ocurrio un problema al inciar sesion');
					}
				},
				error: function(){
					alert('Problema al iniciar sesion');
				}
			});
		}else{
			alert("No connection");
		}
		return false;
	});

	function checkConnection(){
		try{
			var networkState = navigator.connection && navigator.connection.type;
				networkState = navigator.connection && navigator.connection.type;

				var states = {};
				states[Connection.UNKNOWN]  = 'Unknown connection';
				states[Connection.ETHERNET] = 'Ethernet connection';
				states[Connection.WIFI]     = 'WiFi connection';
				states[Connection.CELL_2G]  = 'Cell 2G connection';
				states[Connection.CELL_3G]  = 'Cell 3G connection';
				states[Connection.CELL_4G]  = 'Cell 4G connection';
				states[Connection.NONE]     = 'No network connection';

				if(states[networkState] === 'No network connection'){
					alert('Device offline');
					return false;
				}else{
					alert('Device online');
					return true;
				}
		}catch(e){
			alert(e);
			$.each(navigator, function(key, value){
				alert(key+' => '+value);
			});
		}
	}

	function cargarProductos(){
		$.ajax({
			type: 'POST',
			url: 'http://8.9.0.209:8080/gofood/cargarProductosApp.do',
			dataType: "JSON",
			success: function(data){
				if(data.length != 0){
					$("#listaProductos").empty();
					$.each(data, function(i, e){
						$("#listaProductos").append("<li class=list-group-item comprarProducto' data-idProducto=" + e.idProducto + " data-producto="+ e.producto +">" + e.producto + " / " + e.tiempoElaboracionS + "min <span class='badge pull-right'>$" + e.precio + "</span></li>");
					});
				}else{
					alert('Ocurrio un problema al cargar los productos');
				}
			},
			error: function(){
				alert('Problema al cargar los productos');
			}
		});
	}

	$("#listaProyectos").on("click", ".comprarProducto", function(){

		var idProducto = $(this).attr("data-idProducto");
		var producto = $(this).attr("data-producto");
		var confirm = confirm("Desea comprar " + producto);

		if(confirm){
			alert("Se agrego a tu lista de alimentos");
		}
	});
}
