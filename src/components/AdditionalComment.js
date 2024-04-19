// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
//
// This software is the property of WSO2 LLC. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

import React, { useEffect } from 'react';
import { Box, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AdditionalComment = props => {
    const { comment, handleComment } = props;
    const theme = useTheme();
    const matchDownXS = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    useEffect(() => {

    }, [comment]);

    return (
        <Box
            component="form"
            sx={{
                display: 'contents',
              }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="standard-multiline-static"
                sx={{padding: 1}}
                value={comment}
                onChange={handleComment}
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
                variant="outlined"
            />
        </Box>
    );
};

export default AdditionalComment;