import { useSelector, useDispatch } from "react-redux";
import { changedColorFilter, selectColorsFilter } from '../Filters/filterSlice';

export const availableColors = ['green', 'blue', 'orange', 'purple', 'red']

export default function ColorFilters() {

    const colors = useSelector(selectColorsFilter);
    const dispatch = useDispatch();

    function handleChnageColor(color, changeType) {
        dispatch(changedColorFilter(color,changeType))
    }


    const renderedColors = availableColors.map((color) => {
        const checked = colors.includes(color);
        const changeType = checked ? 'removed' : 'added';

        return (
            <label key={color}>
                <input 
                    type="checkbox"
                    name={color}
                    defaultChecked={checked}
                    onChange={() => handleChnageColor(color, changeType)}
                />
                <span
                    className='color-block'
                    style={{ backgroundColor: color }}>
                    </span>
                    {color}
            </label>
        )
    })

    return (
        <div className='filters colorFilters'>
            <h5>Filter by Color</h5>
            <form className='colorSelection'>
                {renderedColors}
            </form>
        </div>
    )
}
