const createLatestCardBody = (data) => {
    return `
    <a xlink:href="${data[0]?.url}" target="_blank">
    <g data-testid="main-card-body" transform="translate(5, 9)">
    <svg data-testid="lang-items" x="25" width="360" height="100" viewBox="0 0 300 100">
        <g transform="translate(0, 0)">
            <text data-testid="lang-name" x="0" y="20" class="log-title">
            ${data[0]?.title}
            </text>
            <text data-testid="lang-name" x="0" y="40" class="log-date">
            ${data[0]?.createTime}
            </text>
        </g>
    </svg>
    </g>
    </a>
        `;
};
  
const latestCardStyle = `
    <style>
        .header {
            font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #343A40;
        }
        .log-title { font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #212529;}
        .log-date { font-size: 12px; fill: #495057}
    </style>
    <script>
    function dotme(text) {
        text.each(function() {
            var text = d3.select(this);
            var words = text.text().split(/\s+/);
            
            var ellipsis = text.text('').append('tspan').attr('class', 'elip').text('...');
            var width = parseFloat(text.attr('width')) - ellipsis.node().getComputedTextLength();
            var numWords = words.length;
            
            var tspan = text.insert('tspan', ':first-child').text(words.join(' '));
            
            // Try the whole line
            // While it's too long, and we have words left, keep removing words
            
            while (tspan.node().getComputedTextLength() > width & words.length) {
                words.pop();
                tspan.text(words.join(' '));
            }
            
            if (words.length === numWords) {
                ellipsis.remove();
            }
        });
    }

    d3.selectAll('.log-title').call(dotme);
    </script>
`;

const createLatestCard = (data) => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="400" height="65" viewBox="0 0 400 65" fill="none">
        ${latestCardStyle}
        <rect width="400" height="65" rx="10" fill="white" fill-opacity="1"/>
        <rect x="9" y="12" width="40" height="40" fill="url(#pattern0)"/>
        <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_0_1" transform="scale(0.00520833)"/>
        </pattern>
        <image id="image0_0_1" width="192" height="192" 
        xlink:href="data:image/png;base64
        ,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"
        />
        </defs>
        ${createLatestCardBody(data)}
    </svg>
        `;
};
  
module.exports = { createLatestCard };