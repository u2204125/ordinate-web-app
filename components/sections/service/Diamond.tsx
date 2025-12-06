type DiamondData = {
  icon: React.ComponentType;
  title: string;
  styles: {
    background: string;
    color: string;
  };
};

export const Diamond = (
    {d, id, openModal, styles}: {d: DiamondData, id: string, openModal: (id: string) => void, styles: Record<string, string>}
) => {
    const Icon = d.icon;
    return (
        <div key={id} className={`${styles.diamondWrap}`}>
            <button
            className={styles.diamond}
            data-id={id}
            aria-label={d.title}
            style={{
                background: d.styles.background,
                color: d.styles.color
            }}
            onClick={() => openModal(id)}
            >
            <span className={styles.diamondInner}><Icon /></span>
            </button>
            <div className={styles.namePanel} aria-hidden>{d.title}</div>
        </div>
    );
}
