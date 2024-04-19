// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
//
// This software is the property of WSO2 LLC. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

import React from 'react';
import Typography from '@mui/material/Typography';

const EmptyListText = props => {
  return (
    <div sx={{
      width: '100%',
      textAlign: 'center',
    }}>
      <Typography sx={{
        width: '100%',
        textAlign: 'center',
      }} variant="subtitle1" display="block">
        {props.text}
      </Typography>
    </div>
  );
}

export default EmptyListText;