import { useTasks } from "../hooks/useTasks.js";
import { STATUSES, STATUS_BADGE } from "../constants.js";

export default function Summary() {
  const { tasks } = useTasks();

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.value] = tasks.filter((t) => t.status === s.value).length;
    return acc;
  }, {});

  const cards = [
    { label: "Total", value: tasks.length, badge: "bg-slate-100 text-slate-700" },
    ...STATUSES.map((s) => ({
      label: s.label,
      value: counts[s.value] || 0,
      badge: STATUS_BADGE[s.value],
    })),
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-md border border-slate-200 bg-white p-4"
        >
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${card.badge}`}
          >
            {card.label}
          </span>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
