/*
 * consolelog.js
 *
 * node.js module to give a bit of stylized console logging output
 * to differentiate between different sorts of messages:
 *  log      -  standard console output line
 *  info     -  for more interesting things
 *  warn     -  for things that should concern you
 *  error    -  for when Bad Things happen
 *
 * All log lines have customizeable colors, prefixes, and postfixes.
 * Prefixes and postfixes can either be strings or functions that
 * return strings. 
 *
 * See documentation for more info.
 *
 * by Chad Etzel - December 11, 2009
 *
 * Hacker License:
 *    Feel free to hack at will
 */

var sys = require("sys");
var tc = require("./termcolors");

var disableDoubleNewlines = true;

var dodads = {
               "standard_prefix"  : ">>> ",
               "standard_postfix" : "",
               "info_prefix"      : "iii ",
               "info_postfix"     : "",
               "warn_prefix"      : "*** ",
               "warn_postfix"     : "",
               "error_prefix"     : "!!! ",
               "error_postfix"    : ""
             };

var dodadsDefaults = {
               "standard_prefix"  : ">>> ",
               "standard_postfix" : "",
               "info_prefix"      : "iii ",
               "info_postfix"     : "",
               "warn_prefix"      : "*** ",
               "warn_postfix"     : "",
               "error_prefix"     : "!!! ",
               "error_postfix"    : ""
             };

var logColors = {
                 "standard"  : tc.colors.RESET,
                 "info"      : tc.colors.GREEN,
                 "warn"      : tc.colors.YELLOW,
                 "error"     : tc.colors.RED
                };

var logColorsDefaults = {
                 "standard"  : tc.colors.RESET,
                 "info"      : tc.colors.GREEN,
                 "warn"      : tc.colors.YELLOW,
                 "error"     : tc.colors.RED
                };

var logAttrs = {
                 "standard"  : tc.attrs.DEFAULT,
                 "info"      : tc.attrs.BRIGHT,
                 "warn"      : tc.attrs.BRIGHT,
                 "error"     : tc.attrs.BRIGHT
                };

var logAttrsDefaults = {
                 "standard"  : tc.attrs.DEFAULT,
                 "info"      : tc.attrs.BRIGHT,
                 "warn"      : tc.attrs.BRIGHT,
                 "error"     : tc.attrs.BRIGHT
                };


var setColor = function(type, color) {
    if (typeof color == "number") {
        logColors[type] = color;
    } else {
        logColors[type] = tc.colors[color];
    }
};

var setLogColor = function(color) {
    setColor("standard", color);
};

var setInfoColor = function(color) {
    setColor("info", color);
};

var setWarnColor = function(color) {
    setColor("warn", color);
};

var setErrorColor = function(color) {
    setColor("error", color);
};

var setLogPrefix = function(prefix) {
    setDodad("standard_prefix", prefix);
};

var setInfoPrefix = function(prefix) {
    setDodad("info_prefix", prefix);
};

var setWarnPrefix = function(prefix) {
    setDodad("warn_prefix", prefix);
};

var setErrorPrefix = function(prefix) {
    setDodad("error_prefix", prefix);
};

var setAllPrefix = function(prefix) {
    setLogPrefix(prefix);
    setInfoPrefix(prefix);
    setWarnPrefix(prefix);
    setErrorPrefix(prefix);
};

var setLogPostfix = function(postfix) {
    setDodad("standard_postfix", postfix);
};

var setInfoPostfix = function(postfix) {
    setDodad("info_postfix", postfix);
};

var setWarnPostfix = function(postfix) {
    setDodad("warn_postfix", postfix);
};

var setErrorPostfix = function(postfix) {
    setDodad("error_postfix", postfix);
};

var setAllPostfix = function(postfix) {
    setLogPostfix(postfix);
    setInfoPostfix(postfix);
    setWarnPostfix(postfix);
    setErrorPostfix(postfix);
};

var setDodad = function(type, dodad) {
    dodads[type] = dodad;  
};

var restoreDefaultColors = function() {
    setLogColor(logColorsDefaults.standard);
    setInfoColor(logColorsDefaults.info);
    setWarnColor(logColorsDefaults.warn);
    setErrorColor(logColorsDefaults.error);
};

var restoreDefaultPrefixes = function() {
    setLogPrefix(dodadsDefaults.standard_prefix);
    setInfoPrefix(dodadsDefaults.info_prefix);
    setWarnPrefix(dodadsDefaults.warn_prefix);
    setErrorPrefix(dodadsDefaults.error_prefix);
};

var restoreDefaultPostfixes = function() {
    setLogPostfix(dodadsDefaults.standard_postfix);
    setInfoPostfix(dodadsDefaults.info_postfix);
    setWarnPostfix(dodadsDefaults.warn_postfix);
    setErrorPostfix(dodadsDefaults.error_postfix);
};

var restoreDefaultPreAndPostfixes = function() {
    restoreDefaultPrefixes();
    restoreDefaultPostfixes();
};

var restoreDefaults = function() {
    restoreDefaultColors();
    restoreDefaultPreAndPostfixes();
};

var cleanmsg = function(msg) {
    if (disableDoubleNewlines) {
        msg = msg.replace(/\r\n$/, "");
        msg = msg.replace(/\n$/, "");
    }
    return msg;
};

var dolog = function(type, msg, color, bg, attr) {
    msg = cleanmsg(msg);
    tc.terminalSetFontAttr(tc.attrs.RESET);
    tc.terminalSetFont(color, bg, attr);
    var prefix, postfix;
    if (typeof dodads[type + "_prefix"] == "string") {
        prefix = dodads[type + "_prefix"];
    } else {
        prefix = dodads[type + "_prefix"]();
    }
    if (typeof dodads[type + "_postfix"] == "string") {
        postfix = dodads[type + "_postfix"];
    } else {
        postfix = dodads[type + "_postfix"]();
    }

    sys.puts(prefix + msg + postfix);
    tc.terminalFontReset();
};

var log = function(msg) {
    dolog("standard", msg, logColors.standard, tc.colors.RESET, logAttrs.standard);
};

var info = function(msg) {
    dolog("info", msg, logColors.info, tc.colors.RESET, logAttrs.info);
};

var warn = function(msg) {
    dolog("warn", msg, logColors.warn, tc.colors.RESET, logAttrs.warn);
};

var error = function(msg) {
    dolog("error", msg, logColors.error, tc.colors.RESET, logAttrs.error);
};

/*
var puts = function(msg) {
    log(msg);
}
*/
var puts = log;

var test = function() {
    
    log("this is a standard log message");
    info("this is an info message");
    warn("this is a warning");
    error("this is an error");
    log("this is a standard log message");
    puts("another message");

    setLogPrefix("log: ");
    log("this has a new prefix");

    setLogPostfix(" <<<");
    log("this has a new postfix!");

    setAllPrefix("[[[ ");
    setAllPostfix(" ]]]");
    log("now all of the messages have the same pre/postfix");
    info("now all of the messages have the same pre/postfix");
    warn("now all of the messages have the same pre/postfix");
    error("now all of the messages have the same pre/postfix");

    setLogColor("CYAN");
    log("now the log messages are cyan...");
    setErrorColor("MAGENTA");
    error("errors are magenta");

    restoreDefaultColors();
    log("now all of the messages have the default colors");
    info("now all of the messages have the default colors");
    warn("now all of the messages have the default colors");
    error("now all of the messages have the default colors");

    restoreDefaults();
    log("now all of the messages have the defaults restored");
    info("now all of the messages have the defaults restored");
    warn("now all of the messages have the defaults restored");
    error("now all of the messages have the defaults restored");


};

/*
test();
*/


/* exports */

exports.tc = tc;

exports.disableDoubleNewlines = disableDoubleNewlines;

exports.setLogColor   = setLogColor;
exports.setInfoColor  = setInfoColor;
exports.setWarnColor  = setWarnColor;
exports.setErrorColor = setErrorColor;

exports.setLogPrefix   = setLogPrefix;
exports.setInfoPrefix  = setInfoPrefix;
exports.setWarnPrefix  = setWarnPrefix;
exports.setErrorPrefix = setErrorPrefix;

exports.setAllPrefix   = setAllPrefix;

exports.setLogPostfix   = setLogPostfix;
exports.setInfoPostfix  = setInfoPostfix;
exports.setWarnPostfix  = setWarnPostfix;
exports.setErrorPostfix = setErrorPostfix;

exports.setAllPostfix   = setAllPostfix;

exports.restoreDefaultColors          = restoreDefaultColors;
exports.restoreDefaultPrefixes        = restoreDefaultPrefixes;
exports.restoreDefaultPostfixes       = restoreDefaultPostfixes;
exports.restoreDefaultPreAndPostfixes = restoreDefaultPreAndPostfixes;
exports.restoreDefaults               = restoreDefaults;

exports.log   = log;
exports.info  = info;
exports.warn  = warn;
exports.error = error;
exports.puts  = puts;
exports.test  = test;
