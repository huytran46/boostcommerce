const ParkingFeeCalculator = require("../index");

describe("Parking fee calculator testing", () => {
  const timeOut = new Date();
  const timeIn = new Date();

  test("Parked for 8 hours", () => {
    const differenceInMiliseconds = 8 * 1000 * 3600; // 8 hours
    timeIn.setTime(timeOut.getTime() - differenceInMiliseconds);
    expect(ParkingFeeCalculator.calculateParkingFee(timeIn, timeOut)).toBe(1);
  });

  test("Parked for 32 hours", () => {
    const differenceInMiliseconds = 32 * 1000 * 3600; // 32 hours
    timeIn.setTime(timeOut.getTime() - differenceInMiliseconds);
    expect(ParkingFeeCalculator.calculateParkingFee(timeIn, timeOut)).toBe(2);
  });

  test("Parked for 1 week 3 days and 12 hours", () => {
    const differenceInMiliseconds = 10 * 1000 * 3600 * 24 + 12 * 1000 * 3600; // 1 week 3 days and 12 hours
    timeIn.setTime(timeOut.getTime() - differenceInMiliseconds);
    expect(ParkingFeeCalculator.calculateParkingFee(timeIn, timeOut)).toBe(11);
  });
});
