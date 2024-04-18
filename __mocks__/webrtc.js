class RTCDataChannel {
	constructor() {
		this.send = jest.fn()
		this.close = jest.fn()
		this.addEventListener = jest.fn()
		this.removeEventListener = jest.fn()
		this.onopenCallback = jest.fn()
		setTimeout(() => this.onopenCallback(), 0)
	}

	set onopen(callback) {
		this.onopenCallback = callback
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
		this.oniceconnectionstatechangeCallback = jest.fn()
		this.configuration = configuration
		this.addIceCandidate = jest.fn((candidate) =>
			this.onicecandidateCallback(candidate),
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
		this.createDataChannel = jest.fn((args) => {
			this.ondatachannelCallback({ channel: { ...args } })
			return new RTCDataChannel()
		})
	}

	/**
	 * @param {jest.Mock<RTCPeerConnectionIceEvent>} callback
	 * @this RTCPeerConnection
	 */
	set onicecandidate(callback) {
		this.onicecandidateCallback = callback
	}
	/**
	 * @param {jest.Mock<Event>} callback
	 * @this RTCPeerConnection
	 */
	set oniceconnectionstatechange(callback) {
		this.oniceconnectionstatechangeCallback = callback
	}

	get iceConnectionState() {}
	/**
	 * @param {jest.Mock<RTCDataChannelEventInit>} callback
	 * @this RTCPeerConnection
	 */
	set ondatachannel(callback) {
		this.ondatachannelCallback = callback
	}

	dispatchEvent(event) {
		if (event.type === 'icecandidate') {
			this.onicecandidateCallback(event)
		}
		if (event.type === 'oniceconnectionstatechange') {
			this.oniceconnectionstatechangeCallback(event)
		}
	}
}

global.RTCPeerConnection = MockRTCPeerConnection
global.RTCDataChannel = RTCDataChannel
global.RTCIceCandidate = RTCIceCandidate
global.RTCSessionDescription = RTCSessionDescription
