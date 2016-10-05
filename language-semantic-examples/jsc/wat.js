"use strict";

// inspired by Gary Bernhardt's "Wat" talk
// an assorted collection of ridiculous Javascript examples

var util = require('util');

var assorted_commands = [ 
                          '-[]',
                          '+[]',
                          '-{}',
                          '+{}',
                          '[] + []',
                          '[] + + []',
                          '[] + {}',
                          '[] + + {}',
                          '{} + []',
                          '{} + + []',
                          '[] - []',
                          '[] - {}',
                          '{} - []',
                          '- [] - {}',
                          '- {} - []',
                          '+ {} - []',
                          '"wat" + + []',
                          '"wat" - []',
                          ];

assorted_commands.forEach(
    function(command) {
        console.log("Evaluating: " + util.inspect(command));
        console.log(util.inspect(eval(command)));
        console.log();
    }
);
