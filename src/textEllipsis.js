function textEllipsis(text, width) {
    var el = document.querySelector('.log-title');
    console.log("el: " + el);
    if (typeof el.getSubStringLength !== "undefined") {
        el.textContent = text;
        var len = text.length;
        while (el.getSubStringLength(0, len--) > width) {
          el.textContent = text.slice(0, len) + "...";
        }
    } else if (typeof el.getComputedTextLength !== "undefined") {
        while (el.getComputedTextLength() > width) {
            text = text.slice(0,-1);
            el.textContent = text + "...";
        }
    } else {
        while (el.getBBox().width > width) {
            text = text.slice(0,-1);
            el.textContent = text + "...";
        }
    }
}

textEllipsis('', 344);