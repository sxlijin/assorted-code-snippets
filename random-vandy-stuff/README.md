# How to register for classes obscenely quickly

The instructions here will allow you to register for classes as quickly as possible after registration opens - in other words, no clicking all the dropdowns!

Note that this will register *all* classes in your cart, so if you have more classes in your cart than you can actually register for, **registration will fail**.

1. Do this before registration!: make a bookmark, and copy-paste the contents of the below box into the URL field of the bookmark. You'll probably want to put the bookmark in your bookmark bar for easy access.

    ~~~js
    javascript: (function() {    var classReg_js = document.createElement('script');    classReg_js.type = 'text/javascript';    classReg_js.src = 'https://rawgit.com/sxlijin/assorted-code-snippets/master/random-vandy-stuff/vandyClassRegistration.js';    document.body.appendChild(classReg_js);})();
    ~~~
    
1. When registration day comes, go to [this page](https://webapp.mis.vanderbilt.edu/more/SearchClasses!input.action?carouselPanelIndex=1#) and refresh it until you see the "Register" button appear at the bottom.

1. The moment you see the "register" button appear, click the bookmark.
