/*
 * termcolors.js
 *
 * node.js module to allow manipulation of terminal output colors/formatting 
 * using terminal escape formatting codes. Your mileage may vary because
 * I am not an expert in all terminal emulation flavors. I just ported this
 * from my C and PHP termcolor libraries which work the same way.
 *
 * See documentation for more info.
 *
 * by Chad Etzel - December 11, 2009
 *
 * Hacker License:
 *    Feel free to hack at will
 */

var sys = require("sys");


var attrs = {  "RESET":     0,
               "BRIGHT":    1,
               "DIM":       2, /* or underline */
               "UNDERLINE": 3, /* or reverse */
               "BLINK":     4, /* or underline */
               "REVERSE":   7, 
               "HIDDEN":    8, /* or no effect */
               "DEFAULT":   9
              };

var colors = {  "BLACK":    0,
                "RED":      1,
                "GREEN":    2,
                "YELLOW":   3,
                "BLUE":     4,
                "MAGENTA":  5,
                "CYAN":     6,
                "WHITE":    7,
                "RESET":    9
               };

var TERM_ESCAPE = "\033[";
var CLEAR_TERMINAL = TERM_ESCAPE + "1J";

var cursorPosition = function(row, col) {
    sys.print(TERM_ESCAPE + row + ";" + col + "H");
};

var cursorUp = function(i) {
    if (!arguments.length) {var i = 1;}
    cursorMove("up", i);
};
var cursorDown = function(i) {
    if (!arguments.length) {var i = 1;}
    cursorMove("down", i);
};
var cursorForward = function(i) {
    if (!arguments.length) {var i = 1;}
    cursorMove("forward", i);
};
var cursorBack = function(i) {
    if (!arguments.length) {var i = 1;}
    cursorMove("back", i);
};

var cursorMove = function(dir, i) {
    var dirsMap = {"up": "A", "down": "B", "forward": "C", "back": "D"};
    sys.print(TERM_ESCAPE + i + dirsMap[dir]);
};

var terminalFontReset = function() {
    sys.print(TERM_ESCAPE + "0m");
};

var terminalSetFont = function(color, bg, attr) {
    sys.print(TERM_ESCAPE + (30 + color) + ";" + attr + ";" + (40 + bg) + "m");
};

var terminalSetFontColor = function(color) {
    sys.print(TERM_ESCAPE + (30 + color) + "m");
};

var terminalSetFontBG = function(bg) {
    sys.print(TERM_ESCAPE + (40 + bg) + "m");
};

var terminalSetFontAttr = function(attr) {
    sys.print(TERM_ESCAPE + attr + "m");
}

var resetTerminal = function() {
    sys.print(CLEAR_TERMINAL);
    cursorPosition(0,0);
    terminalFontReset();
};

var test = function(reset) {

    if (arguments.length && reset) {
        resetTerminal();
    }
    terminalFontReset();
    sys.puts("");
    sys.puts(">>>>> FONT COLOR TEST <<<<<<");
    sys.puts("");
    for (var i in colors) {
        terminalSetFontColor(colors[i]);
        sys.puts(i);
    }
    terminalFontReset();
    sys.puts("");
    sys.puts(">>>>> FONT BG TEST <<<<<<");
    sys.puts("");
    terminalSetFontColor(colors.BLACK);
    for (var i in colors) {
        terminalSetFontBG(colors[i]);
        sys.puts(i);
    }
    terminalFontReset();
    sys.puts("");
    sys.puts(">>>>> FONT BRIGHT TEST <<<<<<");
    sys.puts("");
    terminalSetFontAttr(attrs.BRIGHT);
    for (var i in colors) {
        terminalSetFontColor(colors[i]);
        sys.puts(i);
    }
    terminalFontReset();

    /* rainbows!!!! */
    terminalSetFont(colors.YELLOW, colors.RED, attrs.DEFAULT);
    sys.print("This ");
    terminalSetFont(colors.BLACK, colors.WHITE, attrs.BRIGHT);
    sys.print("is ");
    terminalSetFontAttr(attrs.RESET);
    terminalSetFont(colors.BLUE, colors.YELLOW, attrs.DEFAULT);
    sys.print("a ");
    terminalSetFontAttr(attrs.BRIGHT);
    terminalSetFont(colors.CYAN, colors.GREEN, attrs.DIM);
    sys.print("multi-color ");
    terminalSetFontAttr(attrs.RESET);
    terminalSetFont(colors.MAGENTA, colors.BLUE, attrs.DEFAULT);
    sys.print("sentence!\n");
    sys.puts("");
    terminalFontReset();
};

/*
resetTerminal();
sys.puts("\033[34;22;49m# !\033[39;0;49m ");
sys.puts("normal");
sys.puts("\033[36m@@@@");
sys.puts("\033[0m@@@@@");
sys.puts("\033[47m@@ee@@");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.DEFAULT);
//terminalSetFontColor(colors.YELLOW);
//terminalSetFontBG(colors.RED);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.BRIGHT);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.DIM);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.UNDERLINE);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.BLINK);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.REVERSE);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
terminalSetFont(colors.YELLOW, colors.RED, attrs.HIDDEN);
sys.puts("HELLO!!!!!");
sys.puts("");
terminalFontReset();
*/


//test();



/* exports */

exports.cursorPosition       = cursorPosition;
exports.cursorUp             = cursorUp;
exports.cursorDown           = cursorDown;
exports.cursorForward        = cursorForward;
exports.cursorBack           = cursorBack;
exports.terminalFontReset    = terminalFontReset;
exports.terminalSetFont      = terminalSetFont;
exports.terminalSetFontColor = terminalSetFontColor;
exports.terminalSetFontBG    = terminalSetFontBG;
exports.terminalSetFontAttr  = terminalSetFontAttr;
exports.resetTerminal        = resetTerminal;
exports.test                 = test;

exports.colors               = colors;
exports.attrs                = attrs;
