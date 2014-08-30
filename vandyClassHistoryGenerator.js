semesterTrees = document.getElementsByClassName('careerTermTable');

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
	return [classCode, className, classProf];
}

for (i = 0; i < semesterTrees.length; i++) {
	console.log('loop '+i)
	semester = semesterTrees[i]
	semesterTitle = getSemesterTitle(semester);
	classAssortment = getClasses(semester);
	console.log(semesterTitle);
	for (k = 0; k < classAssortment.length; k++) {
		console.log(getClassInfo(classAssortment[k]));
	}
	console.log(classAssortment.length)
}


