var check = require('./funzioni.js');

var assignment = {
	taskID: "",
	assignmentID: "",
	workerID: "",
	assignmentID: ""
};
 
var errore = {
	errore: "Inserire workerID o taskID"
};

// Valid test
test('Tutto vuoto', () => {
	expect(check.checkErrorAssignment(assignment)).toBe(true);
});

