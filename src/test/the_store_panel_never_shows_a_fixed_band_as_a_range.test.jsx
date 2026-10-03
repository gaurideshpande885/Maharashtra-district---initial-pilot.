// AIAIC's storage answer for Nashik onion (recorded 2026-10-02) carries best/average/worst of 3,876 / 3,800 / 3,724:
// exactly plus or minus 2% of one price. The engine adds that band when it has no measured spread, and the summary
// marks it (`fixed_band`). Shown as "on a better day / on a weaker day", it would invent a spread nobody measured.
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SimulationPanel from "../components/SimulationPanel";
import { fixedBandOf } from "../data_adapter/aiaicApi";
import recorded from "./recorded/view_onion_nashik_storage_2026-10-02.json";

test("the recorded answer is marked as a fixed band", () => {
  expect(fixedBandOf(recorded.storage[0].summary)).toBe("plus_minus_2_pct");
});

test("a fixed band is shown as the one price it is, never as better and weaker days", () => {
  render(<SimulationPanel data={recorded} />);
  expect(screen.queryByText("On a better day")).toBeNull();
  expect(screen.queryByText("On a weaker day")).toBeNull();
  expect(screen.getByText("₹3,800")).toBeTruthy();
  expect(screen.getByText(/no measured spread here, only a fixed ±2% around this one price/)).toBeTruthy();
});

test("without the marker (the same answer, marker removed) the three cases are shown", () => {
  const item = structuredClone(recorded.storage[0]);
  for (const section of item.summary.sections) for (const it of section.items || []) if (it.data) delete it.data.fixed_band;
  render(<SimulationPanel data={{ storage: [item] }} />);
  expect(screen.getByText("On a better day")).toBeTruthy();
  expect(screen.getByText("₹3,876")).toBeTruthy();
  expect(screen.getByText("₹3,724")).toBeTruthy();
});
