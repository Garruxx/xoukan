class RTCDataChannel {
	constructor() {
		this.send = jest.fn()
		this.close = jest.fn()
		this.addEventListener = jest.fn()
		this.removeEventListener = jest.fn()
	}
}

class RTCIceCandidate {
	constructor(candidate) {
		this.candidate = candidate
	}
}

class RTCSessionDescription {
	constructor(description) {
		this.description = description
	}
}

class MockRTCPeerConnection {
	constructor(configuration) {
		this.onicecandidateCallback = jest.fn()
		this.ondatachannelCallback = jest.fn()
		this.configuration = configuration
		this.addIceCandidate = jest.fn(() =>
			this.onicecandidateCallback('candidate'),
		)
		this.createOffer = jest.fn(
			() => new Promise((resolve) => resolve('sesion description')),
		)
		this.createAnswer = jest.fn()
		this.setLocalDescription = jest.fn()
		this.setRemoteDescription = jest.fn()
		this.localDescription = new RTCSessionDescription('session description')
		this.close = jest.fn()
		this.addEventListener = jest.fn()
		this.removeEventListener = jest.fn()
		this.addTrack = jest.fn()
		this.removeTrack = jest.fn()
		this.getSenders = jest.fn()
		this.getReceivers = jest.fn()
		this.getTransceivers = jest.fn()
		this.createDataChannel = jest.fn((args) =>
			this.ondatachannelCallback({ channel: { ...args } }),
		)
	}

	/**
	 * @param {jest.Mock<RTCPeerConnectionIceEvent>} callback
	 * @this RTCPeerConnection
	 */
	set onicecandidate(callback) {
		this.onicecandidateCallback = callback
	}

	/**
	 * @param {jest.Mock<RTCDataChannelEventInit>} callback
	 * @this RTCPeerConnection
	 */
	set ondatachannel(callback) {
		this.ondatachannelCallback = callback
	}
}

global.RTCPeerConnection = MockRTCPeerConnection
global.RTCDataChannel = RTCDataChannel
global.RTCIceCandidate = RTCIceCandidate
global.RTCSessionDescription = RTCSessionDescription
