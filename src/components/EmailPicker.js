// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
//
// This software is the property of WSO2 LLC. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses, createFilterOptions } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import { Avatar, Box, Stack } from '@mui/material';
import {
    Person as PersonIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { checkIfValidEmailAddress } from '../utils/formatting';

const filter = createFilterOptions();

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
    const { data, index, style } = props;
    const dataSet = data[index][0];
    const item = data[index][1];
    const inlineStyle = {
        ...style,
        top: style.top + LISTBOX_PADDING,
    };

    return (
        <Box component="li" {...dataSet} sx={{ '& > img': { mr: 2, flexShrink: 0, } }} {...props} style={inlineStyle}>
            <Stack direction="row" alignItems="center" spacing={1}>
                {item && (item.employeeThumbnail || item.employeeThumbnail === '') ?
                    <span>
                        <Avatar
                            size="small"
                            loading="lazy"
                            sx={{ width: 24, height: 24 }}
                            src={item.employeeThumbnail}
                            alt={item.workEmail}
                        />
                    </span>
                    :
                    <Avatar sx={{ width: 24, height: 24 }} >
                        <PersonIcon fontSize='small' />
                    </Avatar>
                }
                <span>{item.workEmail}</span>
            </Stack>
        </Box>);
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = React.useRef(null);
    useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

function random(length) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});


export default function EmailPicker(props) {
    const { email, handleEmailChange } = props;
    const { employeeData, employeeMap } = useSelector((state) => state.menu);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleChange = (event, newValue) => {
        let isValid = true;
        if (typeof newValue === 'string') {
            handleEmailChange(newValue);
        } else if (newValue && newValue.inputValue) {
            if (checkIfValidEmailAddress(newValue.inputValue.trim())) {
                // Create a new value from the user input
                newValue.workEmail = newValue.inputValue.trim();
                handleEmailChange(newValue);
            } else {
                isValid = false;
            }
        } else {
            handleEmailChange(newValue);
        }
        setIsValidEmail(isValid);
    };
    // const { employeeData } = props;
    useEffect(() => {
    }, [employeeData]);

    useEffect(() => { }, [email]);
    return (
        <Autocomplete
            id="employee-selector"
            sx={{ width: 300 }}
            autoHighlight
            ListboxComponent={ListboxComponent}
            options={employeeData}
            onChange={handleChange}
            renderInput={(params) => <TextField error={!isValidEmail} helperText={isValidEmail ? null : "Incorrect email."} 
            {...params} label="Employee email" />}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.workEmail;
            }}
            renderOption={(props, option, state) =>
                [props, option, state.index]
            }
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.workEmail);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        workEmail: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            // TODO: Post React 18 update - validate this conversion, look like a hidden bug
            renderGroup={(params) => params}
        />
    );
}
