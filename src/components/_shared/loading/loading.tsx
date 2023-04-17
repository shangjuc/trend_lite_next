import React from "react";
import styles from './loading.module.scss';

export default function Loading(){
    return(
        <>
            <div className="lds-ellipsis scale-[.3]"><div></div><div></div><div></div><div></div></div>
        {/* <div className={styles.lds}>
        </div> */}
        </>
    )
}