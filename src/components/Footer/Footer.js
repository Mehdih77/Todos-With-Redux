import ColorFilters from './ColorFilters';
import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';
import Actions from './Actions';

export default function Footer() {
    return (
        <footer className='footer'>
            
            <Actions />
            <RemainingTodos />
            <StatusFilter />
            <ColorFilters/>
        </footer>
    )
}
