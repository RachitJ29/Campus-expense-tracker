import { describe, expect, test } from "vitest";
import { calculateTotal } from "../src/expenseUtils";

describe("calculateTotal", () => {
  test("calculates the total of all expenses", () => {
    const expenses = [
      { name: "Food", amount: 120 },
      { name: "Transport", amount: 180 },
      { name: "Education", amount: 450 },
    ];

    expect(calculateTotal(expenses)).toBe(750);
  });

  test("returns zero when there are no expenses", () => {
    expect(calculateTotal([])).toBe(0);
  });
});