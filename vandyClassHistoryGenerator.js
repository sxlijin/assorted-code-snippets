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

function emailSchedule() {
	document.getElementById('emailCalendarLink').click();
	userEmail = document.getElementsByClassName('emailAddressInput')[0].value;
	akpsiEmail = 'academics.vuakpsi@gmail.com';
	document.getElementsByClassName('emailAddressInput')[1].value=akpsiEmail;
	
	alert('Your schedule will now be emailed to ' + akpsiEmail + '. A copy will also be sent to ' + userEmail + '.');

	document.getElementById('sendScheduleButton-button').click();
}

function goToAcademicInformation() {
	window.location.pathname = '/sam/AcademicInformation.action';
}

function cleanString(messy) {
	var messy = messy.replace(/ +(?= )/g,''),
	    messy = messy.replace(/- +/, '-');
	return messy;
}

function grabNthParent(orphan, nthParent) {
	var child = orphan;
	for (var i = 0; i < nthParent; i++) 
		child = child.parentNode;
	return child;
}

function getSemesterTitle(classesTable) {
	var divBigDaddy = grabNthParent(classesTable, 5),
	    divBigDaddy = divBigDaddy.children[0].children[0];
	return divBigDaddy.children[1].innerHTML.trim();
}

function getClasses(tbodyClassesParent) {
	return tbodyClassesParent.children[2].children;
}

function getClassInfo(trClassParent) {
	var classCode = trClassParent.children[0].innerHTML.trim(),
	    className = trClassParent.children[1].innerHTML.trim(),
	    classProf = trClassParent.children[2].children[0].innerHTML.trim();
	return [cleanString(classCode), cleanString(className), cleanString(classProf)];
}

function createHTMLstr(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

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

function dumpSemesterToDivBlock(semesterTree) {
	var semesterTitle = getSemesterTitle(semesterTree),
	    semesterTitleDiv = '<div class="semesterTitle">'+semesterTitle+'</div>',
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

function dumpSemestersToHTML() {
	var semesterTrees = document.getElementsByClassName('careerTermTable'),
	    hd = '<div class="roundedDialog"><div class="hd"></div>',
     	    bd = genBody(),
     	    ft ='<div class="ft"></div></div>';
     	function genBody() {
     		var bdHead = '<div class="bd"><div>someClasses</div>',
		    bdBody = '',
     		    bdFoot = '</div>';
		for (var i = 0; i < semesterTrees.length; i++) {
			var semester = semesterTrees[i];
			bdBody += dumpSemesterToDivBlock(semester);
		}
     		return bdHead + bdBody + bdFoot;
     	};
     	return hd+bd+ft;
}

function showAcademicDetail() {
	document.getElementById('academicDetailTab').click();
}

function styleClassDump() {
	styleSheet = window.document.styleSheets[0]; //Grab a stylesheet to mutilate
	styleRules = [	'.semesterBlock {margin:10px;}',
			'.classInfoRow{margin:2px;width:100%;}',
			'.classInfoElem {display:inline-block;}',
			'.classCode {width:15%;}',
			'.className {width:45%;}',
			'.classProf {width:40%;}']
	for (var i = 0; i < styleRules.length; i++) {
		styleSheet.insertRule(styleRules[i], styleSheet.cssRules.length);
	}
}

function doStuff() {
	if (window.location.pathname == '/student-search/StudentLanding.action') {
		emailSchedule();
		goToAcademicInformation();
		alert('hmmmm');
	}

	if (window.location.pathname == '/sam/AcademicInformation.action') {
		showAcademicDetail();
		htmlDump = createHTMLstr(dumpSemestersToHTML());
		pageContent = document.getElementById('academicDetailTabContent_content');
		pageContent.insertBefore(htmlDump, pageContent.children[0]);
		styleClassDump();
	}
}

doStuff();
