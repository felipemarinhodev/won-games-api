import React from 'react';

import Wrapper from './Wrapper';

function LeftMenuFooter() {

  return (
    <Wrapper>
      <div className="poweredBy">
        <a
          key="website"
          href="https://felipemarinho.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          FelipeMarinho
        </a>
      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
