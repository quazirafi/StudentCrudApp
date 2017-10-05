function Student(stdId, stdName, stdRoll, stdCGPA, stdYear, stdDOB, stdAge){
		this.stdId = stdId;
		this.stdName = stdName;
		this.stdRoll = stdRoll;
		this.stdCGPA = stdCGPA;
		this.stdYear = stdYear;
		this.stdDOB = stdDOB;
		this.stdAge = stdAge;
		this.stdInfo = function(){
			return this.stdId + " " + this.stdName + " " + this.stdRoll + " " + this.stdAge;
		}
}
function validation(){
	//alert("inside");
	name = document.forms["stdInfo"]["name"].value;
	roll = document.forms["stdInfo"]["roll"].value;
	cgpa = document.forms["stdInfo"]["cgpa"].value;
	year = document.forms["stdInfo"]["year"].value;
	dob =  document.forms["stdInfo"]["dob"].value;
	if (name==""){
		alert("Sorry name field empty");
		return false;
	}
	if (roll!=parseInt(roll,10)){
		alert("Sorry not an integer in roll");
		return false;
	}
	if (cgpa%1===0){
		alert("Sorry not a float in cgpa");
		return false;
	}
	if (year!=parseInt(year,10)){
		alert("Sorry not an int in year");
		return false;
	}
	//alert(dob);
	var currDate = new Date();
	var myDate = new Date(dob);
	var ageYear = currDate.getFullYear() - myDate.getFullYear();
	var ageMonth = currDate.getMonth() - myDate.getMonth();
	if ((ageMonth < 0) || (ageMonth === 0 && currDate.getDate() < myDate.getDate())){
		--ageYear;
	}
	//alert(ageYear);
	
	if (sessionStorage.getItem("students")===null){
		student = new Student(1, name, roll, cgpa, year, dob, ageYear);
		var students = new Array();
		students.push(student);
		sessionStorage.setItem("students", JSON.stringify(students));
		alert("Size: " + students.length + " Info: " + student.stdInfo());
	}
	else{
		var students = JSON.parse(sessionStorage.getItem("students"));
		student = new Student(students.length + 1, name, roll, cgpa, year, dob, ageYear);
		students.push(student);
		sessionStorage.setItem("students", JSON.stringify(students));
		alert("Size: " + students.length + " Info: " + student.stdInfo());
	}
	return true;
}
function populate(){
	students = JSON.parse(sessionStorage.getItem("students"));
	var stdTable = document.getElementById('stdTable');
	if (stdTable.style.display == 'none'){
		stdTable.style.display = 'block';
	}
	else if (stdTable.style.display == 'block'){
		stdTable.style.display = 'none';
	}
	alert(students.length);
	
	//new portion
	var row2 = stdTable.insertRow(0);
		var cells2 = new Array(5);
		for (let j = 0; j < cells2.length ; ++j){
			cells2[j] = row2.insertCell(j);
		}
	cells2[0].innerHTML = '<b>ID</b>';	
	cells2[1].innerHTML = '<b>Name</b>';
	cells2[2].innerHTML = '<b>Roll</b>';
	cells2[3].innerHTML = '<b>Age</b>';
	cells2[4].innerHTML = '<b>Action</b>';
	//
	
	for (let i = 0; i < students.length ; ++i){
		var row = stdTable.insertRow(i+1);
		var cells = new Array(5);
		for (let j = 0; j < cells.length ; ++j){
			cells[j] = row.insertCell(j);
		}
		cells[0].innerHTML = students[i].stdId;
		cells[1].innerHTML = students[i].stdName;
		cells[2].innerHTML = students[i].stdRoll;
		cells[3].innerHTML = students[i].stdAge;
		cells[4].innerHTML = '<a href="update.html" onclick=update('+students[i].stdId+') >Update</a><input type="button" value="delete" onclick="del('+students[i].stdId+')" ></input>';
	}
}
function update(id){
	alert(id);
	var index;
	var students = JSON.parse(sessionStorage.getItem("students"));
	for (let i = 0; i < students.length ; ++i){
		if (students[i].stdId === id){
			index = i;
		}
	}
	sessionStorage.setItem("index", index);
}
function finalUpdate(){
	var index = parseInt(sessionStorage.getItem("index"));
	//alert(index);
	//debugger;
	name = document.forms["stdInfo"]["name"].value;
	roll = document.forms["stdInfo"]["roll"].value;
	cgpa = document.forms["stdInfo"]["cgpa"].value;
	year = document.forms["stdInfo"]["year"].value;
	dob =  document.forms["stdInfo"]["dob"].value;
	if (name==""){
		alert("Sorry name field empty");
		return false;
	}
	if (roll!=parseInt(roll,10)){
		alert("Sorry not an integer in roll");
		return false;
	}
	if (cgpa%1===0){
		alert("Sorry not a float in cgpa");
		return false;
	}
	if (year!=parseInt(year,10)){
		alert("Sorry not an int in year");
		return false;
	}
	//alert(dob);
	var currDate = new Date();
	var myDate = new Date(dob);
	var ageYear = currDate.getFullYear() - myDate.getFullYear();
	var ageMonth = currDate.getMonth() - myDate.getMonth();
	if ((ageMonth < 0) || (ageMonth === 0 && currDate.getDate() < myDate.getDate())){
		--ageYear;
	}
	//alert(ageYear);
	
	var students = JSON.parse(sessionStorage.getItem("students"));
	student = new Student(students[index].stdId, name, roll, cgpa, year, dob, ageYear);
	students.splice(index, 1, student);
	sessionStorage.setItem("students", JSON.stringify(students));
	return true;
}
function del(id){
	var students = JSON.parse(sessionStorage.getItem("students"));
	var index;
	confirm("Sure you want to delete?");
	for (let i = 0; i < students.length ; ++i){
		if (students[i].stdId === id){
			index = i;
		}
	}
	students.splice(index, 1);
	sessionStorage.setItem("students", JSON.stringify(students));
}