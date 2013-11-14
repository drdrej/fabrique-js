exports.err = function (what, why, code) {
    console.error("<error> ");
    console.error("[WHAT]: " + what);
    console.error("[WHY]:  " + why);
    console.error("</error> ");

    process.exit(code);
}