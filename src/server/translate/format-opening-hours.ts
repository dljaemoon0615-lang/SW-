/** Google Places weekdayDescriptions 등 → 평일 9:00~18:00 형식 */

const DAY_INDEX: Record<string, number> = {
  monday: 0,
  mon: 0,
  월요일: 0,
  월: 0,
  tuesday: 1,
  tue: 1,
  화요일: 1,
  화: 1,
  wednesday: 2,
  wed: 2,
  수요일: 2,
  수: 2,
  thursday: 3,
  thu: 3,
  목요일: 3,
  목: 3,
  friday: 4,
  fri: 4,
  금요일: 4,
  금: 4,
  saturday: 5,
  sat: 5,
  토요일: 5,
  토: 5,
  sunday: 6,
  sun: 6,
  일요일: 6,
  일: 6,
};

const DAY_LINE_RE =
  /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|월요일|화요일|수요일|목요일|금요일|토요일|일요일)\s*[:：]\s*(.+)$/i;

function splitLines(text: string): string[] {
  return text
    .split(/\s*·\s*|\s*\|\s*|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function hasWeekdayLine(lines: string[]): boolean {
  return lines.some((l) => DAY_LINE_RE.test(l));
}

function parseDayIndex(dayLabel: string): number | undefined {
  const key = dayLabel.trim().toLowerCase();
  if (key in DAY_INDEX) return DAY_INDEX[key];
  const ko = dayLabel.trim();
  if (ko in DAY_INDEX) return DAY_INDEX[ko];
  return undefined;
}

function parseClock(text: string, fallbackPeriod?: "am" | "pm"): string | null {
  const t = text.trim();
  const m = t.match(/(\d{1,2})\s*[:：]\s*(\d{2})/);
  if (!m) return null;

  let hour = Number(m[1]);
  const min = m[2];
  const period =
    /\bpm\b|오후/i.test(t) ? "pm" : /\bam\b|오전/i.test(t) ? "am" : fallbackPeriod;

  if (period === "pm" && hour < 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;

  return `${hour}:${min}`;
}

function normalizeHoursSlot(raw: string): string {
  const text = raw.trim().replace(/\u202f/g, " ").replace(/\s+/g, " ");

  if (/closed|휴무|休業|定休/i.test(text)) return "휴무";
  if (/24\s*시간\s*운영|open\s*24\s*hours?|24\s*hours?|always\s*open|24시간/i.test(text)) {
    return "24시간";
  }
  if (/일출|sunrise|日の出/i.test(text) && /일몰|sunset|日の入/i.test(text)) {
    return "일출~일몰";
  }

  const rangeParts = text.split(/\s*[–—\-~〜～]\s*/);
  if (rangeParts.length >= 2) {
    const startRaw = rangeParts[0];
    const endRaw = rangeParts.slice(1).join(" ");
    const startPeriod = /\bpm\b|오후/i.test(startRaw)
      ? "pm"
      : /\bam\b|오전/i.test(startRaw)
        ? "am"
        : undefined;
    const endPeriod = /\bpm\b|오후/i.test(endRaw)
      ? "pm"
      : /\bam\b|오전/i.test(endRaw)
        ? "am"
        : startPeriod === "am"
          ? "pm"
          : undefined;

    const start = parseClock(startRaw, startPeriod);
    const end = parseClock(endRaw, endPeriod);
    if (start && end) return `${start}~${end}`;
  }

  const single = parseClock(text);
  if (single) return single;

  return text
    .replace(/\bAM\b/gi, "오전")
    .replace(/\bPM\b/gi, "오후")
    .replace(/[–—]/g, "~");
}

function labelHours(hours: string): string {
  if (hours === "24시간") return "24시간 운영";
  return hours;
}

function parseWeekdaySlots(lines: string[]): Map<number, string> {
  const slots = new Map<number, string>();
  for (const line of lines) {
    const m = DAY_LINE_RE.exec(line);
    if (!m) continue;
    const day = parseDayIndex(m[1]);
    if (day === undefined) continue;
    slots.set(day, normalizeHoursSlot(m[2]));
  }
  return slots;
}

function groupSlots(slots: Map<number, string>): string[] {
  const out: string[] = [];

  const weekdayHours = [0, 1, 2, 3, 4].map((d) => slots.get(d));
  const weekdayDefined = weekdayHours.filter((h): h is string => h !== undefined);
  const weekdaySame =
    weekdayDefined.length === 5 && weekdayDefined.every((h) => h === weekdayDefined[0]);

  if (weekdaySame && weekdayDefined[0]) {
    out.push(`평일 ${labelHours(weekdayDefined[0])}`);
  } else {
    const dayNames = ["월", "화", "수", "목", "금"];
    for (let d = 0; d <= 4; d++) {
      const h = slots.get(d);
      if (h) out.push(`${dayNames[d]}요일 ${labelHours(h)}`);
    }
  }

  const sat = slots.get(5);
  const sun = slots.get(6);
  if (sat && sun && sat === sun) {
    out.push(`주말 ${labelHours(sat)}`);
  } else {
    if (sat) out.push(`토요일 ${labelHours(sat)}`);
    if (sun) out.push(`일요일 ${labelHours(sun)}`);
  }

  return out;
}

/**
 * 운영시간 문자열을 요일별로 묶어 한국어로 정리합니다.
 * - 평일 동일 → `평일 9:00~18:00`
 * - 토·일 동일 → `주말 10:00~21:00`
 * - 전 요일 24시간 → `24시간 운영`
 */
function isAlreadyFormatted(text: string): boolean {
  return /^(평일|주말|매일|24시간\s*운영)|,\s*(평일|토요일|일요일|주말)/.test(text.trim());
}

export function formatOpeningHours(
  input: string | string[] | undefined | null,
): string | undefined {
  if (!input) return undefined;

  if (typeof input === "string" && isAlreadyFormatted(input)) {
    return input.trim();
  }

  const lines = Array.isArray(input) ? input.map((s) => s.trim()).filter(Boolean) : splitLines(input);
  if (lines.length === 0) return undefined;

  if (!hasWeekdayLine(lines)) {
    const single = normalizeHoursSlot(lines.join(" "));
    if (single === "24시간") return "24시간 운영";
    return labelHours(single);
  }

  const slots = parseWeekdaySlots(lines);
  if (slots.size === 0) return undefined;

  const all = [...slots.values()];
  if (all.length === 7 && all.every((h) => h === all[0])) {
    return all[0] === "24시간" ? "24시간 운영" : `매일 ${labelHours(all[0])}`;
  }
  if (all.every((h) => h === "24시간")) return "24시간 운영";

  return groupSlots(slots).join(", ");
}
