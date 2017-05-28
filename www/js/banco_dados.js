$(function(){
	var i = Number(localStorage.getItem('paciente-contador')) + 1;
	var j;
    var k;
    var orderList;
	var $paciente = $("#NomePacientes"); //Variável com o valor digitado para o nome do Paciente
    var $pacienteIdade = $("#IdadePacientes"); //Variável com o valor digitado para a idade do Paciente
    var $pacienteEmail = $("#EmailPacientes"); //Variável com o valor digitado para o email do Paciente
	var $pacienteList = $("#pacientes"); //lista de pacientes
	var order = [];
	orderList = localStorage.getItem('paciente-cadastro');
	
	if(!orderList){
		$("#semErros").css("display","block");
	}

	
    // Mostrar Lista de Pacientes		
    orderList = orderList ? orderList.split(',') : [];   
    for( j = 0, k = orderList.length; j < k; j++) {
        $pacienteList.append(
            "<li id='" + orderList[j] + "'>"
            + "<a class='editable' data-split-theme='c'>"	
            + localStorage.getItem(orderList[j]) 
            + "</a> <a href='#' class='close' data-icon='delete' data-theme='c'>X</a></li>"
        );
    }
    
	// Incluir Pacientes 
	$("#IncluirPacientes").live("tap", function() {
		if($paciente.val() != ""){
			localStorage.setItem("paciente-"+i, $paciente.val());
            localStorage.setItem("pacienteIdade-"+i, $pacienteIdade.val());
            localStorage.setItem("pacienteEmail-"+i, $pacienteEmail.val());
			localStorage.setItem("paciente-contador",i);
			$("#semErros").css("display","none");
			$pacienteList.append(
				"<li id='paciente-" + i + "'>" 
				+  "<a class='editable' data-split-theme='c'>" 
				+ "Nome: " + localStorage.getItem("paciente-" + i) + " / "
                + "Idade: " + localStorage.getItem("pacienteIdade-" + i) + " / "
                + "E-mail: " + localStorage.getItem("pacienteEmail-" + i)
				+ " </a><a href='#' data-icon='delete' class='close' data-theme='c'>x</a></li>"
			);
			$.mobile.changePage("#ListaPacientes", { transition: "slidedown"});		
			ListaPacientes();
			$paciente.val("");
            $pacienteIdade.val("");
            $pacienteEmail.val("");
			
			i++
		} 
		return false;
	});	
	
	// Excluir Pacientes
	$("#pacientes li a.close").live("tap", function() {
		localStorage.removeItem($(this).parent().attr("id"));
		 $(this).parent().slideUp('normal', function(){
				$(this).remove();
				ListaPacientes();
			});
		 	
		return false;
	});
	
	function ListaPacientes(){
		var $pacienteLi = $("#pacientes li");
		order.length = 0;
		
		$pacienteLi.each(function(){
			var id = $(this).attr("id");
			order.push(id);
		});
		$('ul').listview('refresh');
		localStorage.setItem("paciente-cadastro", order.join(","));	
	}	
});