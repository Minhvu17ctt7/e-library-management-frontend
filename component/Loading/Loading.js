import React from 'react'
import styles from "styles/Loading.module.css"

const Loading = () => {
    return (
        <div className={styles.backdrop}>
            <div className="loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </div>
    )
}

export default Loading
