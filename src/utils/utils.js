import { LEAVE_APP } from "../constants";

// Function to handle the very specific change to merge sick and casual leaves to one. This will be removed after migration.
export const sickLeaveExceptionHandler = (leave) => {
    if (leave.type === 'sick' || leave.leaveType ===`sick` || leave.key === 'sick') {
        return {...leave, type: 'casual', leaveType: 'casual', key: 'casual', value: isNaN(leave.value) ? LEAVE_APP.LEAVE_TYPES.casual.title : leave.value, label: LEAVE_APP.LEAVE_TYPES.casual.title, name: LEAVE_APP.LEAVE_TYPES.casual.title};
    }

    return leave;
}

// Function to get start date of this year
export const getStartDateOfThisYear = () => {
    var date = new Date();
    return new Date(date.getFullYear(), 0, 1);
}

// Function to get end date of this year
export const getEndDateOfThisYear = () => {
    var date = new Date();
    return new Date(date.getFullYear(), 11, 31);
}

// Function to get all years between two dates
export const getYearsBetweenDateRange = (startDate, endDate) => {
    var years = [];
    var startYear = new Date(startDate).getFullYear();
    var endYear =  new Date(endDate).getFullYear();
    for (var i = startYear; i <= endYear; i++) {
        years.push(i);
    }
    return years;
}