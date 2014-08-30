semesterTrees = document.getElementsByClassName('careerTermTable');

function cleanString(messy) {
	messy = messy.replace(/ +(?= )/g,'');
	messy = messy.replace(/- +/, '-');
	return messy;
}

function grabNthParent(orphan, nthParent) {
	child = orphan;
	for (j = 0; j < nthParent; j++) 
		child = child.parentNode;
	return child;
}

function getSemesterTitle(classesTable) {
	divBigDaddy = grabNthParent(classesTable, 5);
	divBigDaddy = divBigDaddy.children[0].children[0];
	return divBigDaddy.children[1].innerHTML.trim();
}

function getClasses(tbodyClassesParent) {
	return tbodyClassesParent.children[2].children;
}

function getClassInfo(trClassParent) {
	classCode = trClassParent.children[0].innerHTML.trim();
	className = trClassParent.children[1].innerHTML.trim();
	classProf = trClassParent.children[2].children[0].innerHTML.trim();
	return [cleanString(classCode), cleanString(className), cleanString(classProf)];
}

for (i = 0; i < semesterTrees.length; i++) {
	//console.log('loop '+i)
	semester = semesterTrees[i]
	semesterTitle = getSemesterTitle(semester);
	classList = getClasses(semester);
	console.log('\n'+semesterTitle);
	for (k = 0; k < classList.length; k++) {
		classInfo = getClassInfo(classList[k]);
		
		console.log(classInfo[0]+'    \t'+classInfo[1]+'\t'+classInfo[2]);
	}
	//console.log(classList.length)
}
