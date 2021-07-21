
function drawRectTriangle(side) {
    document.write("<pre>");
    for (let i = 0; i <  side; i++) {
        document.write(" ".repeat(side - i)+"*".repeat(i * 2 + 1) + "<br/>")
    }
    document.write("</pre>");
}
drawRectTriangle(10);