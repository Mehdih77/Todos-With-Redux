import produce from "immer";

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const initState = {
    status: StatusFilters.All,
    colors: []
}

const filterReducer = produce((state, action) => {
    switch (action.type) {
        case 'filters/changedStatusFilter':
            state.status = action.payload
            break;
    
        case 'filters/changedColorFilter':
            // colors is first state
            const { colors } = state;
            // color is that color we add (new one)
            const { color , changeType} = action.payload;
            switch (changeType) {
                case 'added':
                    state.colors.push(color)
                    break;
                case 'removed':
                    state.colors = colors.filter(c => c !== color)
            }    
    }
}, initState)

export default filterReducer;


//! action factory

export const selectStatusFilter = state => state.filterReducer.status;
export const selectColorsFilter = state => state.filterReducer.colors;

export const changedStatusFilter = (status) => ({
    type: 'filters/changedStatusFilter',
    payload: status
})

export const changedColorFilter = (color, changeType) => ({
    type: 'filters/changedColorFilter',
    payload: {
        color,
        changeType
    }
})