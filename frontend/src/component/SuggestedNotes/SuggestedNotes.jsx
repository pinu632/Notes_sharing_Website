import './SuggestN.css'


export const SuggestedNotes = ({suggest}) =>{


    return(
        <div className="Suggest-outer">
            <div className="suggest-title">{suggest.title}</div>
            <div className="suggest-author"><em><label htmlFor="">Author: </label>{suggest.author}</em></div>
        </div>
    )
}