function ReportAnimation({ compact = false }) {
  return (
    <div className={compact ? "report-scene report-scene--compact" : "report-scene"}>
      <div className="report-scene__glow report-scene__glow--a" />
      <div className="report-scene__glow report-scene__glow--b" />
      <div className="report-scene__badge report-scene__badge--top">AI SUMMARY</div>
      <div className="report-scene__badge report-scene__badge--side">PDF</div>

      <div className="report-scene__sheet report-scene__sheet--back" />

      <div className="report-scene__sheet report-scene__sheet--front">
        <div className="report-scene__toolbar">
          <span className="report-scene__chip">Medical report</span>
          <span className="report-scene__dot" />
        </div>

        <div className="report-scene__heading">
          <strong>Lab Record Summary</strong>
          <span>Securely organized for quick doctor review</span>
        </div>

        <div className="report-scene__lines">
          <span className="report-scene__line report-scene__line--1" />
          <span className="report-scene__line report-scene__line--2" />
          <span className="report-scene__line report-scene__line--3" />
          <span className="report-scene__line report-scene__line--4" />
        </div>

        <div className="report-scene__chart">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="report-scene__pen">
        <span className="report-scene__pen-tip" />
      </div>
    </div>
  );
}

export default ReportAnimation;
