import { describe, it, expect } from "vitest"
import { weeklySeries, weeklyGoal, subjectDistribution, quizSeries, minutesByDay } from "@/lib/stats/aggregate"
import { monthGrid, shiftMonth, parseMonth, monthLabel } from "@/lib/calendar/month"

const now = new Date("2026-10-21T12:00:00Z")

describe("weeklySeries", () => {
  it("devuelve 12 semanas, la última es la actual, con huecos a 0", () => {
    const s = weeklySeries({ "2026-10-19": 7200, "2026-10-05": 3600 }, "2026-10-21")
    expect(s).toHaveLength(12)
    expect(s[11]).toEqual({ week: "2026-10-19", hours: 2 })
    expect(s[9]).toEqual({ week: "2026-10-05", hours: 1 })
    expect(s[10].hours).toBe(0)
    expect(s[0].week).toBe("2026-08-03")
  })
})

describe("weeklyGoal", () => {
  it("compara con el objetivo", () => {
    expect(weeklyGoal({ "2026-10-19": 18000 }, "2026-10-22", 10)).toEqual({ doneHours: 5, goalHours: 10, pct: 50 })
  })
  it("sin objetivo, pct 0", () => expect(weeklyGoal({ "2026-10-19": 3600 }, "2026-10-22", null).pct).toBe(0))
  it("permite superar el 100 %", () => expect(weeklyGoal({ "2026-10-19": 7200 }, "2026-10-19", 1).pct).toBe(200))
})

describe("subjectDistribution", () => {
  const S = (o: object) => ({ started_at: "2026-10-19T10:00:00Z", ended_at: "2026-10-19T11:00:00Z", paused_seconds: 0, paused_at: null, ...o })
  it("reparte por fase de la tarea", () => {
    const d = subjectDistribution(
      [S({ task_id: "a" }), S({ task_id: "b", ended_at: "2026-10-19T10:30:00Z" }), S({ task_id: "c" }), S({ task_id: "d" }), S({ topic_id: "t" }), S({})],
      { a: 2, b: 3, c: 4, d: 1 },
      now
    )
    expect(d).toEqual({ temario: 7200, aptitudes: 1800, ingles: 3600, otras: 7200 })
  })
})

describe("quizSeries", () => {
  it("ignora no terminados y ordena por fecha", () => {
    const r = quizSeries([
      { mode: "tema", started_at: "2026-10-02T10:00:00Z", finished_at: "x", total: 10, correct: 8 },
      { mode: "tema", started_at: "2026-10-01T10:00:00Z", finished_at: "x", total: 3, correct: 1 },
      { mode: "tema", started_at: "2026-10-03T10:00:00Z", finished_at: null, total: 10, correct: 0 },
      { mode: "simulacro", started_at: "2026-10-04T10:00:00Z", finished_at: "x", total: 0, correct: 0 },
    ])
    expect(r.map((p) => p.pct)).toEqual([33, 80])
  })
})

describe("minutesByDay", () => it("redondea a minutos", () => expect(minutesByDay({ a: 90, b: 29 })).toEqual({ a: 2, b: 0 })))

describe("calendario", () => {
  it("shiftMonth cruza años", () => {
    expect(shiftMonth("2026-12", 1)).toBe("2027-01")
    expect(shiftMonth("2027-01", -1)).toBe("2026-12")
    expect(shiftMonth("2026-10", -10)).toBe("2025-12")
  })
  it("parseMonth valida", () => {
    expect(parseMonth("2026-13", "2026-10-19")).toBe("2026-10")
    expect(parseMonth("2027-02", "2026-10-19")).toBe("2027-02")
    expect(parseMonth(undefined, "2026-10-19")).toBe("2026-10")
  })
  it("monthGrid de octubre 2026 (empieza jueves) tiene 5 semanas lunes-domingo", () => {
    const g = monthGrid("2026-10")
    expect(g).toHaveLength(5)
    expect(g[0][0]).toEqual({ day: "2026-09-28", inMonth: false })
    expect(g[0][3]).toEqual({ day: "2026-10-01", inMonth: true })
    expect(g[4][6]).toEqual({ day: "2026-11-01", inMonth: false })
  })
  it("monthGrid de febrero 2027 (empieza lunes, 28 días) tiene 4 semanas", () => expect(monthGrid("2027-02")).toHaveLength(4))
  it("monthLabel", () => expect(monthLabel("2026-10")).toBe("octubre 2026"))
})
