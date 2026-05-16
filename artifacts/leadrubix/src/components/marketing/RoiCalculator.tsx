import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";

function formatINR(n: number): string {
  if (!isFinite(n)) return "—";
  const v = Math.round(n);
  return `₹${v.toLocaleString("en-IN")}`;
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function RoiCalculator() {
  const [leads, setLeads] = useState<number>(500);
  const [conversion, setConversion] = useState<number>(8);
  const [dealValue, setDealValue] = useState<number>(50000);

  const result = useMemo(() => {
    const safeLeads = Math.max(0, Number(leads) || 0);
    const safeConv = Math.max(0, Math.min(100, Number(conversion) || 0));
    const safeDeal = Math.max(0, Number(dealValue) || 0);
    const baseRevenue = safeLeads * (safeConv / 100) * safeDeal;
    // Sub-1-min response + automated rotation typically lifts close rate ~32% (industry studies)
    const liftedConv = Math.min(100, safeConv * 1.32);
    const liftedRevenue = safeLeads * (liftedConv / 100) * safeDeal;
    const delta = liftedRevenue - baseRevenue;
    const annualDelta = delta * 12;
    return {
      baseRevenue,
      liftedRevenue,
      delta,
      annualDelta,
      liftedConv,
    };
  }, [leads, conversion, dealValue]);

  return (
    <Card className="overflow-hidden border-border" data-testid="roi-calculator">
      <CardContent className="p-6 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Estimate your revenue lift</h2>
            <p className="text-sm text-muted-foreground">
              Plug in your numbers — see the impact of sub-1-minute response and automated rotation.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Field
            label="Monthly leads"
            value={leads}
            onChange={setLeads}
            min={0}
            max={100000}
            step={50}
            suffix=""
            testId="roi-leads"
          />
          <Field
            label="Current conversion %"
            value={conversion}
            onChange={setConversion}
            min={0}
            max={100}
            step={1}
            suffix="%"
            testId="roi-conversion"
          />
          <Field
            label="Average deal value (₹)"
            value={dealValue}
            onChange={setDealValue}
            min={0}
            max={100000000}
            step={1000}
            suffix=""
            testId="roi-deal"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Stat label="Current monthly revenue" value={formatINR(result.baseRevenue)} muted testId="roi-base" />
          <Stat
            label="With Leads Rubix"
            value={formatINR(result.liftedRevenue)}
            highlight
            testId="roi-lifted"
          />
          <Stat
            label="Extra revenue / year"
            value={formatINR(result.annualDelta)}
            accent
            icon={<TrendingUp className="h-4 w-4" />}
            testId="roi-annual"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <p className="text-xs text-muted-foreground flex-1">
            Estimate based on a typical 32% close-rate lift seen by teams that move from spreadsheets / generic CRMs to Leads Rubix. Your results will vary — book a demo for a tailored projection.
          </p>
          <Button asChild size="lg" data-testid="btn-roi-cta">
            <Link href="/demo">
              Get a tailored projection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  testId,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  testId: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const next = clampNumber(Number(e.target.value), min, max);
            onChange(next);
          }}
          className="w-full bg-transparent outline-none text-lg font-semibold tabular-nums"
          data-testid={`input-${testId}`}
        />
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2 accent-primary"
        aria-label={label}
        data-testid={`slider-${testId}`}
      />
    </label>
  );
}

function Stat({
  label,
  value,
  highlight,
  accent,
  muted,
  icon,
  testId,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  accent?: boolean;
  muted?: boolean;
  icon?: React.ReactNode;
  testId: string;
}) {
  const cls = accent
    ? "bg-primary text-primary-foreground border-primary"
    : highlight
      ? "bg-primary/5 border-primary/30 text-foreground"
      : muted
        ? "bg-muted/40 border-border text-foreground"
        : "bg-card border-border text-foreground";
  return (
    <div className={`rounded-xl border p-5 min-w-0 ${cls}`} data-testid={testId}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2 flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className="font-extrabold tabular-nums leading-tight break-words text-[clamp(1.4rem,2.8vw,2.15rem)]">
        {value}
      </div>
    </div>
  );
}
