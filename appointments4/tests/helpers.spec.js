import {areDatesEqual} from '../src/helpers.js';

describe("Helpers testing", () => {
  it("When dates are not equal - areDatesEqual() returns false", () => {
    let d1 = new Date(2023, 12, 31);
    let d2 = new Date(2023, 12, 30);
  
    expect(areDatesEqual(d1, d2)).toBe(false);
    });

  it("When dates are equal - areDatesEqual() returns true", () => {
    let d1 = new Date(2023, 12, 31);
    let d2 = new Date(2023, 12, 31);
  
    expect(areDatesEqual(d1, d2)).toBe(true);
    });
});
