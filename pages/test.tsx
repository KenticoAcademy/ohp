import React from 'react';

export default (props: any) => (
  <div>
    {props.url.query.title} : {props.url.query.route}
  </div>
);
