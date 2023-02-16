/// <reference lib="webworker" />
declare const lamejs;

addEventListener('message', ({ data }) => {
	importScripts(
		'../../assets/scripts/lame.min.js'
	);

	const mp3encoder = new lamejs.Mp3Encoder(2, data.sampleRate, 128);
	const mp3Data = [];
	const sampleBlockSize = 1152;

	for (let i = 0; i < data.left.length; i += sampleBlockSize) {
		const leftChunk = data.left.subarray(i, i + sampleBlockSize);
		const rightChunk = data.right.subarray(i, i + sampleBlockSize);

		const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
		if (mp3buf.length > 0) {
			mp3Data.push(mp3buf);
		}
	}

	const mp3bufffer = mp3encoder.flush();
	mp3Data.push(mp3bufffer);

	postMessage(mp3Data);
});
