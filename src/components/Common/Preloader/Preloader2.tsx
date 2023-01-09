import s from './Preloader2.module.css'

export const Preloader2 = () => {
    return (
        <div className={s.preloaderWrapper}>
            <div className={s.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}