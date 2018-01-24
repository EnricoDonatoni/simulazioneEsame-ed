//express
var express = require('express');
var bodyParser = require('body-parser');
//inspect variables
var util = require('util');
var modulo = require("./funzioni.js");

//instantiate express
var app = express();
var tentativi = 3;

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

var assignments = [];

app.post("/assignment", function(req, res){
//Math.round((Math.random()*domande.length)
	var taskID = req.body.taskID || req.query.taskID;
	var assignmentID = req.body.assignmentID || req.query.assignmentID;
	var workerID = req.body.workerID || req.query.workerID;
	var assignmentResult = req.body.assignmentResult || req.query.assignmentResult;

	var assignment = {
		taskID: taskID,
		assignmentID: assignmentID,
		workerID: workerID,
		assignmentResult: assignmentResult
	};

	if(modulo.checkErrorAssignment(assignment)){
		res.setHeader('Content-Type', 'application/json');
				res.status(400).json({
					errore: "Inserire workerID o taskID"
				});
	}
	else{
		assignments.push(assignment);
		console.log(assignment);
		var n = assignments.length-1;
		console.log(n);

		res.setHeader('Content-Type', 'application/json');
				res.status(200).json({
					status: "Inserimento eseguito con successo!",
				});
	}
    
}); 

app.put("/assignment", function(req, res){
//Math.round((Math.random()*domande.length)
	var mtaskID = req.body.taskID || req.query.taskID;
	var massignmentID = req.body.assignmentID || req.query.assignmentID;
	var mworkerID = req.body.workerID || req.query.workerID;
	var massignmentResult = req.body.assignmentResult || req.query.assignmentResult;

	var i=0;

	var modificato = 0;

	for(i=0; i<assignments.length; i++){
		if(mtaskID == assignments[i].taskID){
			if(mworkerID == assignments[i].workerID){
				assignments[i].assignmentID = massignmentID;
				assignments[i].assignmentResult = massignmentResult;

				res.setHeader('Content-Type', 'application/json');
				res.status(200).json({
					status: "Modifica eseguita con successo!",
					assignmentModificato: assignments[i]
				});
				modificato = 1;
			}

		}
	}

	if(modificato == 0){
		res.status(400).json({
					errore: "Non trovato assignment da modificare"
				});

	}
    
}); 


app.get("/assignment", function(req, res){
//Math.round((Math.random()*domande.length)
	var gtaskID = req.body.taskID || req.query.taskID;
	var gworkerID = req.body.workerID || req.query.workerID;

	var i=0;

	var guardato = 0;

	for(i=0; i<assignments.length; i++){
		if(gtaskID == assignments[i].taskID){
			if(gworkerID == assignments[i].workerID){
				res.setHeader('Content-Type', 'application/json');
				res.status(200).json({
					status: "Ricerca terminata con successo!",
					assignmentMostrato: assignments[i]
				});
				guardato = 1;
			}

		}
	}

	if(guardato == 0){
		res.status(400).json({
					errore: "Non trovato assignment da mostrare"
				});

	}
    
}); 

app.delete("/assignment", function(req, res){
//Math.round((Math.random()*domande.length)
	var ctaskID = req.body.taskID || req.query.taskID;
	var cworkerID = req.body.workerID || req.query.workerID;

	var i=0;

	var cancellato = 0;

	for(i=0; i<assignments.length; i++){
		if(ctaskID == assignments[i].taskID){
			if(cworkerID == assignments[i].workerID){

				assignments.splice(i,1);
				console.log(assignments);
				
				res.setHeader('Content-Type', 'application/json');
				res.status(200).json({
					status: "Cancellazione terminata con successo!",
					assignmentMostrato: assignments
				});
				cancellato = 1;
			}

		}
	}

	if(cancellato == 0){
		res.status(400).json({
					errore: "Non trovato assignment da cancellare"
				});

	}
    
}); 


//listen in a specific port
app.listen((process.env.PORT || 65000));

//check status
console.log('Server running at http://localhost:65000/');