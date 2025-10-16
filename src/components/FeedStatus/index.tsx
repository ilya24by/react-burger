import styles from './index.module.css';

const FeedStatus = () => {
    return (
        <div className={styles.feed_status}>
            <div className={styles.feed_status_container}>
                <div className={styles.feed_status_done}>
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <div>
                        <p className={["text text_type_main-medium", styles.done_item].join(' ')}>123</p>
                        <p className={["text text_type_main-medium", styles.done_item].join(' ')}>123</p>
                        <p className={["text text_type_main-medium", styles.done_item].join(' ')}>123</p>
                    </div>
                </div>
                <div className={styles.feed_status_in_progress}>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <div>
                        <p className="text text_type_main-medium">123</p>
                        <p className="text text_type_main-medium">123</p>
                        <p className="text text_type_main-medium">123</p>
                        <p className="text text_type_main-medium">123</p>
                    </div>
                </div>
            </div>
            <div className={styles.feed_status_all_time}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={["text text_type_digits-large", styles.numbers].join(' ')}>12345</p>
            </div>
            <div className={styles.feed_status_today}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={["text text_type_digits-large", styles.numbers].join(' ')}>12345</p>
            </div>
        </div>

    );
};

export default FeedStatus;