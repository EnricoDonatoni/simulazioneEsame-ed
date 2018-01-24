exports.checkErrorAssignment = function(assignment){
	var errore = false;
	if(typeof(assignment.taskID) == "undefined"){
		errore=true;
	}
	else if(assignment.taskID == ""){
		errore=true;
	}
	else if(typeof(assignment.workerID) == "undefined"){
		errore=true;
	}
	else if(assignment.workerID== ""){
		errore = true;
	}

	return errore;

}

/*exports.idnonvalido = function(res, domande){

		var rand = Math.round((Math.random()*(domande.length-1)));
		//console.log(rand)
		if(domande.length==0){
			res.setHeader('Content-Type', 'application/json');
		res.status(400).json({
			status: "Senza domande"
		});
		}
		else{
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json({
			question: domande[rand].question,
			idq: rand
		});
	}
}*/