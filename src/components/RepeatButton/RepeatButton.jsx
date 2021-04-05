import './RepeatButton.css'

export default function RepeatButton(props) {
    return (
        <button
            aria-label='Play again.'
            id='repeatButton'
            className={'app-button'}
            onClick={props.onClick}>
            сгенерировать ооо
        </button>
    );
}