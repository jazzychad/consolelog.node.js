/*
 * example.js
 *
 * Example node.js script to show off the consolelog module capabilities
 *
 * To run:
 *   node example.js
 *
 * by Chad Etzel - December 11, 2009
 *
 * Hacker License:
 *    Feel free to hack at will
 */

var sys = require("sys"),
    cl = require("./consolelog");

cl.tc.resetTerminal();

sys.puts("Running termcolor standard test function...");
sys.puts("");
cl.tc.test();

sys.puts("Running consolelog standard test function...");
sys.puts("");
cl.test();

sys.puts("");
sys.puts("Showing other consolelog functionality");
sys.puts("");
cl.log("8 + 8 = " + (8 + 8));
cl.puts('consolelog.puts is aliased to log for convenience');
cl.info("node.js is nifty");


cl.setAllPrefix(function() {
	var d = Date.now();
	return "[" + d + "] ";
    });

cl.log("prefixes can be functions, too");
cl.warn("this should also show the timestamp");
cl.info("the error() function is handy for showing errors...");
try {
    var j = thisDoesNotExist();
} catch(e) {
    cl.error("An Error Occured:\n" + e.stack.toString());
}

cl.restoreDefaults();

cl.info('the end!');
cl.log('hope you find this useful!!');