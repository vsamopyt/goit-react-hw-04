import css from "./LoadMoreBtn.module.css"
export default function LoadMoreBtn ({onHandle}) {
    // const handleClick =() => {
    //     onHandle()
    // }
  
    // console.log(onHandle);
    return (
        <div className={css.loadMoreBtnSection}>

        <div className={css.loadMoreBtnWraper}>
            <button className ={css.loadMoreBtnButton}onClick = {onHandle} >Load more</button>
        </div>
        </div>
    )
}