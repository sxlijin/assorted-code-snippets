var bodyFrame = document.getElementById('contentFrame'),
    bodyFrameDocument = bodyFrame.contentDocument,
    moduleNames = bodyFrameDocument.getElementsByClassName('moduleTitle'),
    coursesModuleName;

function cleanUnavailableCourses() {
	var courseList = bodyFrameDocument.getElementsByClassName('courseListing');

	for (var i = 0; i < courseList.length; i++) {
		//If both 'Courses' and 'Course List' and others are present, do 'em all
		var courses = courseList[i].children
		
		//Loop runs backwards so that courses.length only needs to be called once
		//  and so that it doesn't have to deal with the size of the list changing.
		for (var j = courses.length - 1; j >= 0; j--) {
	        	if (courses[j].children[1].tagName != 'A') {
				courses[j].remove()
		        }
		}
	}
	alert('cleaned out!')
}

for (var i = 0; i < moduleNames.length; i++) {
    if (moduleNames[i].innerHTML === 'Courses') {
       coursesModuleName = moduleNames[i];
    }
}
var courseModuleBody = coursesModuleName.parentNode.parentNode.children[2].children[0];
var iter = 0;
while (courseModuleBody.innerHTML === 'Please wait while the module loads...') {
    iter++;
    console.log('LOOPING for the ' + iter + 'th time');
}
cleanUnavailableCourses()
