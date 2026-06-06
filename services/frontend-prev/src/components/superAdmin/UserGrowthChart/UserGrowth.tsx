
import "./UserGrowth.css";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const yLabels = ["$100k", "$75k", "$50k", "$25k", "$0k"];

const UserGrowthChart = () => {
  return (
    <section className="user-growth-card">
      <h3 className="user-growth-title">USER GROWTH</h3>

      <div className="user-growth-chart-wrapper">
        <div className="user-growth-y-axis">
          {yLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="user-growth-chart-area">
          <div className="user-growth-grid" />

          <svg
            className="user-growth-svg"
            viewBox="0 0 760 260"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,229,255,0.28)" />
                <stop offset="100%" stopColor="rgba(0,229,255,0.02)" />
              </linearGradient>
            </defs>

            <path
              d="M 0 188
                 C 40 194, 70 200, 95 184
                 C 120 164, 145 130, 190 144
                 C 228 156, 252 164, 288 136
                 C 320 110, 360 140, 392 118
                 C 420 98, 460 126, 500 112
                 C 545 96, 585 74, 635 68
                 C 680 64, 720 78, 760 74
                 L 760 260
                 L 0 260 Z"
              className="user-growth-area-fill"
            />

            <path
              d="M 0 188
                 C 40 194, 70 200, 95 184
                 C 120 164, 145 130, 190 144
                 C 228 156, 252 164, 288 136
                 C 320 110, 360 140, 392 118
                 C 420 98, 460 126, 500 112
                 C 545 96, 585 74, 635 68
                 C 680 64, 720 78, 760 74"
              className="user-growth-line"
            />
          </svg>
          <div className="user-growth-x-axis">
            {monthLabels.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserGrowthChart;