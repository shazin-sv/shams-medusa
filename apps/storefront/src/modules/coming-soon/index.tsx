import {
  ComingSoonNewsletterForm,
  ComingSoonQuoteForm,
} from "./coming-soon-forms"
import styles from "./coming-soon.module.css"

export default function ComingSoonPage() {
  return (
    <div className={styles.page}>
      <div className={styles.siteContainer}>
        <div className={`${styles.groundLine} ${styles.bgLine}`} />

        <div className={`${styles.vehicle} ${styles.bulldozer}`}>
          <svg viewBox="0 0 120 80" width="120" height="80" xmlns="http://www.w3.org/2000/svg">
            <path d="M 90 20 Q 110 45, 95 75 L 105 75 Q 120 45, 100 20 Z" fill="#999" />
            <line x1="60" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="6" strokeLinecap="round" />
            <path d="M 20 55 L 20 25 C 20 15, 25 10, 35 10 L 65 10 C 75 10, 80 15, 80 25 L 80 55 Z" fill="#FFB300" />
            <rect x="50" y="15" width="20" height="20" rx="3" fill="#AEE2FF" />
            <rect x="30" y="0" width="6" height="15" rx="2" fill="#555" />
            <rect x="10" y="55" width="80" height="20" rx="10" fill="#222" />
            <circle cx="20" cy="65" r="5" fill="#666" />
            <circle cx="35" cy="65" r="5" fill="#666" />
            <circle cx="50" cy="65" r="5" fill="#666" />
            <circle cx="65" cy="65" r="5" fill="#666" />
            <circle cx="80" cy="65" r="5" fill="#666" />
          </svg>
        </div>

        <div className={`${styles.vehicle} ${styles.crane}`}>
          <svg viewBox="0 0 150 150" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="100" width="70" height="30" rx="6" fill="#FFCC00" />
            <rect x="60" y="65" width="30" height="35" rx="4" fill="#AEE2FF" />
            <rect x="60" y="65" width="30" height="35" rx="4" fill="none" stroke="#FFCC00" strokeWidth="5" />
            <circle cx="35" cy="130" r="12" fill="#222" />
            <circle cx="75" cy="130" r="12" fill="#222" />
            <circle cx="35" cy="130" r="5" fill="#999" />
            <circle cx="75" cy="130" r="5" fill="#999" />
            <g className={styles.craneArmGroup}>
              <rect x="35" y="85" width="100" height="10" rx="4" fill="#FF8C00" />
              <line x1="125" y1="95" x2="125" y2="135" stroke="#333" strokeWidth="2" />
              <path d="M 120 135 C 120 145, 130 145, 130 135" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            </g>
            <circle cx="40" cy="90" r="10" fill="#333" />
          </svg>
        </div>

        <div className={styles.textWrapper}>
          <div className={styles.stripes} />
          <h1 className={styles.title}>Under Construction</h1>
          <p className={styles.subtitle}>
            We&apos;re working on something big!
            <br />
            Check back soon for updates.
          </p>

          <div className={styles.formsGrid}>
            <ComingSoonNewsletterForm />
            <ComingSoonQuoteForm />
          </div>
        </div>

        <div className={`${styles.groundLine} ${styles.fgLine}`} />

        <div className={`${styles.vehicle} ${styles.forklift}`}>
          <svg viewBox="0 0 100 80" width="100" height="80" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="55" height="35" rx="8" fill="#FFCC00" />
            <path d="M 20 30 L 25 5 L 50 5 L 55 30" fill="none" stroke="#333" strokeWidth="5" strokeLinejoin="round" />
            <rect x="25" y="25" width="10" height="10" fill="#333" />
            <rect x="70" y="5" width="6" height="60" rx="2" fill="#333" />
            <path d="M 75 55 L 98 55" fill="none" stroke="#222" strokeWidth="5" strokeLinecap="round" />
            <path d="M 75 60 L 98 60" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
            <circle cx="25" cy="65" r="10" fill="#222" />
            <circle cx="55" cy="65" r="10" fill="#222" />
            <circle cx="25" cy="65" r="4" fill="#999" />
            <circle cx="55" cy="65" r="4" fill="#999" />
          </svg>
        </div>
      </div>
    </div>
  )
}
