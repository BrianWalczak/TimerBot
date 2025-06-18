function getMsDuration({ hours = 0, minutes = 0, seconds = 0 }) {
  return ((hours * 3600) + (minutes * 60) + seconds) * 1000;
}

function createTimeString({ hours = 0, minutes = 0, seconds = 0 }) {
	const formattedTime = [
		hours ? `${hours}h` : null,
		minutes ? `${minutes}m` : null,
		seconds ? `${seconds}s` : null
	].filter(Boolean).join(' ');

	return formattedTime || '0s';
}

module.exports = { getMsDuration, createTimeString };