/* Copyright 2014 Samuel Lijin
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var akpsiEmail = 'academics.vuakpsi@gmail.com';

//Emails user's schedule to $akpsiEmail upon confirmation.
function emailScheduleOnConfirm() {
	var confirmMsg = 'Please click OK to send your current schedule to ';
	confirmMsg += akpsiEmail;
	confirmMsg += ' and your Vanderbilt email.';

	//Only email schedule if user agrees.
	if (confirm(confirmMsg)) {
		emailSchedule();
	} else {
		alert('Your schedule will not be sent.');
	}
}

//Emails user's schedule to $akpsiEmail, no confirmation
function emailSchedule() {
	//Expand email-calendar-to fields to access them.
	document.getElementById('emailCalendarLink').click();
	
	//Grab user's email, which is by default the first recipient.
	var emailFields = document.getElementsByClassName('emailAddressInput'),
	    userEmail = emailFields[0].value;
	//Add akpsiEmail to recipients.
	emailFields[1].value=akpsiEmail;
	
	//Submit email recipients.
	document.getElementById('sendScheduleButton-button').click();

	alert('Your schedule has successfully been emailed.');
}

//Loads the Academic Record page.
function goToAcademicInformation() {
	//Doesn't use .href or .search b/c commodoreId is part of the URL
	var stem = window.location.origin,
	    academicInfoPath = '/sam/AcademicInformation.action',
	    tail = window.location.search;
	tail = tail.replace('commodoreId','cid');
	window.location.assign(stem+academicInfoPath+tail);
	alert(stem+academicInfoPath+tail);
}

//Cleans up whitespace (only the types encountered here!)
function cleanString(messy) {
	var messy = messy.replace(/ +(?= )/g,''),
	    messy = messy.replace(/- +/, '-');
	return messy.trim();
}

//Returns the nthParent of orphan (presumes <type element> <type int>).
function grabNthParent(orphan, nthParent) {
	var child = orphan;
	for (var i = 0; i < nthParent; i++) 
		child = child.parentNode;
	return child;
}

//Returns "2014 Fall" or whatever - parses the DOM for the semester.
function getSemesterTitle(classesTable) {
	var divBigDaddy = grabNthParent(classesTable, 5),
	    divBigDaddy = divBigDaddy.children[0].children[0];
	return divBigDaddy.children[1].innerHTML.trim();
}

//Returns HTMLCollection of classes in a <tbody>
function getClasses(tbodyClassesParent) {
	return tbodyClassesParent.children[2].children;
}

//Returns array containing the class code, name, and professor from the <tr>
function getClassInfo(trClassParent) {
	var classCode = trClassParent.children[0].innerHTML,
	    className = trClassParent.children[1].innerHTML,
	    classProf = trClassParent.children[2].children[0].innerHTML;
	return [cleanString(classCode),
	       	cleanString(className),
	       	cleanString(classProf)];
}

//Takes a string that contains HTML and parses into DocumentFragment
function createHTMLstr(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

//Generates <div> using class info returned by getClassInfo()
function dumpClassInfoToDivRow(classInfoArray) {
	// Arg in the form [ classCode, className, classProf ], like so:
	// ["MATH-205A-01", "Multivar Calc/Linear Alg", "Bruce Hughes"]
	var classCodeDiv = '<div class="classCode classInfoElem">'+classInfoArray[0]+'</div>',
	    classNameDiv = '<div class="className classInfoElem">'+classInfoArray[1]+'</div>',
	    classProfDiv = '<div class="classProf classInfoElem">'+classInfoArray[2]+'</div>',
	    classInfoDiv = '<div class="classInfoRow">';
	    classInfoDiv += classCodeDiv+classNameDiv+classProfDiv;
	    classInfoDiv += '</div>';
	return classInfoDiv;
}

//Loops dumpClassInfoToDivRow() to generate dump of all classes in a semester
function dumpSemesterToDivBlock(semesterTree) {
	var semesterTitle = getSemesterTitle(semesterTree),
	    semesterTitleDiv = '<div class="semesterTitle">'
		    		+semesterTitle+'</div>',
	    semesterDivBlockContent = '',
	    classList = getClasses(semesterTree);
	//console.log('\n'+semesterTitleDiv);
	for (var k = 0; k < classList.length; k++) {
		var classInfo = getClassInfo(classList[k]);
		semesterDivBlockContent += dumpClassInfoToDivRow(classInfo);
		//console.log(dumpClassInfoToDivRow(classInfo));
	}
	var semesterDivBlock = '<div class="semesterBlock">';
	semesterDivBlock += semesterTitleDiv;
	semesterDivBlock += semesterDivBlockContent;
	semesterDivBlock += '</div>';
	return semesterDivBlock;
}

//Returns the student's name.
function grabNameString() {
	var studentElem = document.getElementsByClassName('studentName'),
	    studentName = studentElem[0].innerHTML;
	studentName = studentName.replace(/\(.*\)/,'');
	studentName = studentName.replace(',',', '); 
	studentName = cleanString(studentName);

	return 'All classes taken by: ' + studentName;
}
	
//Generates the entire DocumentFragment containing the entire class history
function dumpSemestersToHTML() {
	var semesterTrees = document.getElementsByClassName('careerTermTable'),
	    hd = '<div class="roundedDialog"><div class="hd"></div>',
     	    bd = genBody(),
     	    ft ='<div class="ft"></div></div>';
     	function genBody() {
     		var hdText = 'A list of all classes you have taken here at \
			     Vanderbilt has been generated below. Please \
			     email this list to ' + akpsiEmail + '.',
		    bdHead = '<div class="bd"><div>'+hdText+'</div>',
		    bdBody = '<div class="semesterDumpWrap">',
     		    bdFoot = '</div></div>';
		bdBody += '<hr class="semesterSeparator" /><div>'+grabNameString()+'</div>';
		for (var i = 0; i < semesterTrees.length; i++) {
			var semester = semesterTrees[i];
			bdBody += dumpSemesterToDivBlock(semester);
		}
		bdBody += '<hr class="semesterSeparator"/>';
     		return bdHead + bdBody + bdFoot;
     	};
     	return hd+bd+ft;
}

function showAcademicDetail() {
	document.getElementById('academicDetailTab').click();
}

function styleClassDump() {
	var styleSheet = window.document.styleSheets[0], //Grab a CSS sheet to edit
	    styleRules = [	'.semesterBlock {margin:10px 0;}',
		        	'.semesterDumpWrap {margin:15px 30px;\
				   font-family: Consolas, Monaco, Liberation Mono,\
			           monospace, sans serif;}',
				'.classInfoRow{margin:2px 30px;width:100%;}',
				'.classInfoElem {display:inline-block;}',
					'.classCode {width:15%;}',
				'.className {width:45%;}',
				'.classProf {width:40%;}',
				'.semesterSeparator {margin:20px 0;}'	];
	for (var i = 0; i < styleRules.length; i++) {
		styleSheet.insertRule(styleRules[i], 
				      styleSheet.cssRules.length);
	}
}

function doStuff() {
	var pathYEShomepage = '/student-search/StudentLanding.action',
	    pathAcademicInfo = '/sam/AcademicInformation.action';

	//Email schedules & switch from homepage to academic info.
	if (window.location.pathname === pathYEShomepage) {
		emailScheduleOnConfirm();
		if (confirm('Click OK to proceed to the next step.')) {
			alert('You will now be taken to your Academic Record.');
			goToAcademicInformation();
		}
	}
	
	//Generate class history summary - needs to be run twice
	//  once to load Academic Detail, once to parse & dump summary
	if (window.location.pathname === pathAcademicInfo) {
		activeTabName = document.getElementsByClassName('active')[0].id;
		if (activeTabName === "academicDetailTab") {
			htmlDump = createHTMLstr(dumpSemestersToHTML());
			pageContent = document.getElementById('academicDetailTabContent_content');
			pageContent.insertBefore(htmlDump, pageContent.children[0]);
			styleClassDump();
		} else {
			showAcademicDetail();
		}
	}
}

doStuff();
