type ProgressBarProps = {
  label: string;
  max?: number;
  value: number;
};

export function ProgressBar({ label, max = 100, value }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percent = (safeValue / safeMax) * 100;

  return (
    <div className="progress">
      <div className="progress__header">
        <span>{label}</span>
        <span className="progress__value">{Math.round(percent)}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
