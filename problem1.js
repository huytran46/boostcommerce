function calculateParkingFee(timeIn, timeOut) {
  const differenceInMiliseconds = timeOut.getTime() - timeIn.getTime();
  const differenceInDate = differenceInMiliseconds / (1000 * 3600 * 24);
  const roundUpResult = Math.ceil(differenceInDate);
  return roundUpResult;
}
module.exports = { calculateParkingFee };
