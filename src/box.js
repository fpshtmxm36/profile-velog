const createLatestCardTitle = (data) => {
    return `
      <g data-testid="card-title" transform="translate(20, 35)">
          <g transform="translate(0, 0)">
            <text x="0" y="0" class="header" data-testid="header">
            Latest velog posts
            </text>
          </g>
      </g>
      `;
  };
  
  const createLatestCardBody = (data) => {
    return `
    <g data-testid="main-card-body" transform="translate(0, 45)">
    <svg data-testid="lang-items" x="25" width="400" height="300" viewBox="0 0 400 400">
        <g transform="translate(0, 0)">
            <text data-testid="lang-list" class="list-style" x="5" y="20">•</text>
            <text data-testid="lang-name" x="20" y="20" class="log-title">
            ${data[0]?.title + " - " + data[0]?.createTime}
            </text>
        </g>
    </svg>
  </g>
      `;
  };
  
  const latestCardStyle = `
      <style>
          .header {
              font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
              fill: #343A40;
          }
          .log-title { font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #212529 }
          .log-description { font-size: 12px; fill: #495057}
          .tag-item { font-size: 12px; fill: #0CA678;}
          .heart-count { font-size: 12px; fill: #495057;}
          .log-title:hover{ fill: #0CA678; text-decoration: underline;}
          .list-style{font-size:14px; fill: #212529; }
      </style>
  `;
  const createLatestCard = (data) => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="110" viewBox="0 0 380 110" fill="none">
        ${latestCardStyle}
        <rect width="380" height="110" fill="#1E1E1E"/>
        <rect width="380" height="110" rx="10" fill="white"/>
        <rect x="5" y="5" width="370" height="100" rx="10" fill="white" stroke="#C8C8C8" stroke-opacity="0.75" stroke-width="3"/>
        ${createLatestCardTitle(data.title, data.createTime)}
        ${createLatestCardBody(data)}
    </svg>
      `;
  };
  
  module.exports = { createLatestCard };