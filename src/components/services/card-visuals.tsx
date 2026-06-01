/** All service card visuals — pure JSX, no images, dark/red aesthetic. */

const BG = { background: 'oklch(0.09 0.008 290)' }
const BG_DARK = { background: 'oklch(0.07 0.006 290)' }
const RED = 'oklch(0.63 0.24 24)'

// ── Tier 1 ────────────────────────────────────────────────────────────────────

/** Kubernetes: a cluster node diagram */
export function KubernetesVisual() {
  return (
    <div className="relative h-full w-full p-3 font-mono" style={BG}>
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
        }}
      />
      <div className="relative flex h-full flex-col gap-1.5">
        {/* Cluster boundary */}
        <p className="text-[9px] tracking-[0.15em] text-white/25">cluster · prod.k8s</p>
        <div className="flex flex-1 gap-1.5">
          {[
            { name: 'api', accent: true },
            { name: 'web', accent: false },
            { name: 'worker', accent: false },
          ].map(({ name, accent }) => (
            <div
              key={name}
              className="flex flex-1 flex-col gap-1 rounded border p-1.5"
              style={{
                borderColor: accent ? `${RED}40` : 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent ? RED : 'rgba(255,255,255,0.25)' }}
              />
              <span className="text-[8px] text-white/40">:{name}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 text-[9px] text-white/30">
          <span>
            <span style={{ color: RED }}>↑</span> ArgoCD
          </span>
          <span>
            <span style={{ color: RED }}>↑</span> Grafana
          </span>
        </div>
      </div>
    </div>
  )
}

/** CI/CD: horizontal pipeline stages with timing */
export function CicdVisual() {
  const stages = [
    { label: 'lint', time: '12s', done: true },
    { label: 'test', time: '44s', done: true },
    { label: 'build', time: '1m24', done: true },
    { label: 'deploy', time: 'live', done: false },
  ]
  return (
    <div className="flex h-full w-full flex-col justify-between p-3 font-mono" style={BG}>
      <p className="text-[9px] text-white/25">main · push · 2m 20s ago</p>
      <div className="flex items-center gap-1">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-1">
            <div
              className="flex flex-col items-center gap-0.5 rounded px-1.5 py-1 text-[8px]"
              style={{
                border: `1px solid ${stage.done ? `${RED}35` : 'rgba(255,255,255,0.12)'}`,
                color: stage.done ? RED : 'rgba(255,255,255,0.35)',
              }}
            >
              <span>{stage.done ? '✓' : '→'}</span>
              <span className="text-[7px]">{stage.label}</span>
              <span className="text-[7px] opacity-60">{stage.time}</span>
            </div>
            {i < stages.length - 1 && <span className="text-[8px] text-white/15">─</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-1 w-1 animate-pulse rounded-full" style={{ background: RED }} />
        <span className="text-[9px] text-white/30">deploy to production</span>
      </div>
    </div>
  )
}

/** AWS Infrastructure: nested VPC diagram */
export function AwsVisual() {
  return (
    <div className="flex h-full w-full flex-col p-3 font-mono" style={BG}>
      <p className="mb-1.5 text-[9px] text-white/25">VPC · 10.0.0.0/16</p>
      <div className="flex flex-1 gap-1.5 overflow-hidden rounded border border-white/10 p-1.5">
        {/* Public subnet */}
        <div
          className="flex flex-1 flex-col gap-0.5 rounded border p-1"
          style={{ borderColor: `${RED}25` }}
        >
          <p className="text-[8px]" style={{ color: `${RED}99` }}>
            public
          </p>
          <p className="text-[8px] text-white/35">ALB</p>
          <p className="text-[8px] text-white/25">NAT GW</p>
        </div>
        {/* Private subnet */}
        <div className="flex flex-1 flex-col gap-0.5 rounded border border-white/10 p-1">
          <p className="text-[8px] text-white/35">private</p>
          <p className="text-[8px] text-white/35">EKS Nodes</p>
          <p className="text-[8px] text-white/25">RDS</p>
        </div>
      </div>
      <div className="mt-1.5 flex gap-2 text-[8px] text-white/20">
        <span>Terraform</span>
        <span>·</span>
        <span>IaC managed</span>
      </div>
    </div>
  )
}

/** Observability: sparkline + metric pills */
export function ObservabilityVisual() {
  // spike at index 4-5, otherwise quiet
  const pts = [28, 25, 30, 27, 72, 85, 38, 26, 29, 27, 31, 28, 26]
  const max = Math.max(...pts)
  const W = 180
  const H = 40
  const svgPts = pts
    .map((p, i) => `${(i / (pts.length - 1)) * W},${H - (p / max) * H}`)
    .join(' ')
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3 font-mono" style={BG}>
      {/* Metric pills */}
      <div className="flex gap-2">
        <div className="rounded border border-white/10 px-2 py-1">
          <p className="text-[8px] text-white/30">uptime</p>
          <p className="text-[11px] font-bold" style={{ color: RED }}>
            99.9%
          </p>
        </div>
        <div className="rounded border border-white/10 px-2 py-1">
          <p className="text-[8px] text-white/30">p95 latency</p>
          <p className="text-[11px] font-bold text-white/55">42ms</p>
        </div>
        <div className="rounded border border-white/10 px-2 py-1">
          <p className="text-[8px] text-white/30">errors</p>
          <p className="text-[11px] font-bold text-white/40">0.01%</p>
        </div>
      </div>
      {/* Sparkline */}
      <div className="flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          {/* Alert threshold line */}
          <line
            x1="0"
            y1={H * 0.35}
            x2={W}
            y2={H * 0.35}
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.1"
            strokeDasharray="3,3"
          />
          <polyline
            points={svgPts}
            fill="none"
            stroke={RED}
            strokeWidth="1.5"
            strokeOpacity="0.65"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

// ── Tier 2 ────────────────────────────────────────────────────────────────────

/** AI Chatbots: 3 chat message bubbles */
export function AiChatVisual() {
  const messages = [
    { role: 'user' as const, text: 'How do I connect my knowledge base?' },
    { role: 'ai' as const, text: "I found 3 relevant docs. Here's the answer…" },
    { role: 'user' as const, text: 'Can it handle follow-up context?' },
  ]
  return (
    <div
      className="flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-3 py-2"
      style={BG}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className="max-w-[78%] rounded-lg px-2.5 py-1.5 font-mono text-[9px] leading-snug"
            style={
              msg.role === 'user'
                ? {
                    background: `${RED}18`,
                    border: `1px solid ${RED}30`,
                    color: 'rgba(255,255,255,0.65)',
                  }
                : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                  }
            }
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Custom Web & SaaS: browser chrome with a dashboard mockup */
export function CustomWebVisual() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={BG}>
      {/* Browser chrome */}
      <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-white/8 px-2.5 py-1.5">
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-1.5 w-1.5 rounded-full bg-white/15" />
          ))}
        </div>
        <div className="flex-1 rounded-sm bg-white/[0.04] px-2 py-0.5 font-mono text-[8px] text-white/25">
          app.example.com/dashboard
        </div>
      </div>
      {/* Dashboard content */}
      <div className="flex flex-1 gap-1.5 p-2">
        {/* Sidebar */}
        <div className="w-8 space-y-1.5">
          {[8, 6, 9, 5, 7].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-sm"
              style={{
                width: `${w * 10}%`,
                background: i === 1 ? `${RED}40` : 'rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
        {/* Main area */}
        <div className="flex flex-1 flex-col gap-1.5">
          {/* Stat row */}
          <div className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1 rounded border border-white/8 px-1 py-1">
                <div
                  className="mb-0.5 h-2 w-3/4 rounded-sm"
                  style={{ background: n === 1 ? `${RED}30` : 'rgba(255,255,255,0.1)' }}
                />
                <div className="h-1.5 w-1/2 rounded-sm bg-white/[0.06]" />
              </div>
            ))}
          </div>
          {/* Chart area */}
          <div
            className="flex-1 rounded border border-white/8"
            style={{
              background: `linear-gradient(to top, ${RED}08, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

/** WordPress: browser chrome with a CMS editor look */
export function WordpressVisual() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={BG}>
      {/* Browser chrome */}
      <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-white/8 px-2.5 py-1.5">
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-1.5 w-1.5 rounded-full bg-white/15" />
          ))}
        </div>
        <div className="flex-1 rounded-sm bg-white/[0.04] px-2 py-0.5 font-mono text-[8px] text-white/25">
          myblog.com/wp-admin
        </div>
      </div>
      {/* WP editor feel */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* WP sidebar nav */}
        <div className="w-10 space-y-1 border-r border-white/8 p-1.5">
          {[9, 7, 8, 6, 7, 5].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-sm"
              style={{
                width: `${w * 10}%`,
                background: i === 0 ? `${RED}35` : 'rgba(255,255,255,0.07)',
              }}
            />
          ))}
        </div>
        {/* Post editor */}
        <div className="flex flex-1 flex-col gap-1.5 p-2">
          <div className="h-2.5 w-3/4 rounded bg-white/12" />
          <div className="space-y-1">
            {[1, 0.85, 0.7, 0.9].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-sm bg-white/[0.06]"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
          <div
            className="mt-1 h-6 w-20 rounded"
            style={{ background: `${RED}25`, border: `1px solid ${RED}30` }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Tier 3 ────────────────────────────────────────────────────────────────────

/** Server Troubleshooting: terminal diagnostic output */
export function TerminalVisual() {
  return (
    <div className="h-full w-full p-2.5 font-mono" style={BG_DARK}>
      <div className="mb-1.5 flex gap-1">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-1.5 w-1.5 rounded-full bg-white/15" />
        ))}
      </div>
      <div className="space-y-0.5 text-[9px]">
        <div>
          <span style={{ color: RED }}>$ </span>
          <span className="text-white/45">systemctl status nginx</span>
        </div>
        <div className="text-white/30">
          ● nginx · <span className="text-green-400/55">active (running)</span>
        </div>
        <div>
          <span style={{ color: RED }}>$ </span>
          <span className="text-white/45">docker ps --format table</span>
        </div>
        <div className="text-white/30">api · worker · postgres</div>
      </div>
    </div>
  )
}

/** Hosting Management: 30-day uptime bar chart */
export function UptimeVisual() {
  const days = Array.from({ length: 30 }, (_, i) =>
    i === 8 || i === 21 ? 'partial' : 'up',
  )
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3 font-mono" style={BG}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-white/30">30-day uptime</span>
        <span className="text-[10px] font-bold" style={{ color: RED }}>
          99.3%
        </span>
      </div>
      <div className="flex flex-1 items-end gap-[1.5px]">
        {days.map((status, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: status === 'up' ? '100%' : '55%',
              background: status === 'up' ? `${RED}50` : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[8px] text-white/20">
        <span>30 days ago</span>
        <span>today</span>
      </div>
    </div>
  )
}

/** DevOps Consulting & Audits: audit findings list */
export function AuditVisual() {
  const findings = [
    { ok: true, text: 'IAM least-privilege policies' },
    { ok: true, text: 'S3 public access blocked' },
    { ok: false, text: 'MFA not on root account' },
    { ok: true, text: 'GuardDuty active' },
  ]
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-3 font-mono" style={BG}>
      <p className="mb-0.5 text-[9px] text-white/25">audit report · aws · 2025</p>
      {findings.map((f, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className="text-[10px]"
            style={{ color: f.ok ? RED : 'rgba(251, 191, 36, 0.65)' }}
          >
            {f.ok ? '✓' : '⚠'}
          </span>
          <span className="text-[8px] text-white/40">{f.text}</span>
        </div>
      ))}
    </div>
  )
}
