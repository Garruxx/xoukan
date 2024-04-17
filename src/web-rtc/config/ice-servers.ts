/*
 Xoukan Serverless file sharing using webRTC
 Copyright (C) 2024  Jhon Jairo Guerrero Sanchez
 <garruxx@gmail.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
export const iceServers: RTCIceServer[] = [
	{
		urls: [
			'stun:stun.cloudflare.com:3478',
			'stun:stun.l.google.com',
			'stun:stun1.l.google.com',
			'stun:stun2.l.google.com',
			'stun:stun3.l.google.com',
			'stun:stun4.l.google.com',
			'stun:freeturn.net:5349',
		],
	},
	{
		urls: 'turns:freeturn.net:5349',
		credential: 'free',
		username: 'free',
	},
	{
		urls: 'turn:freeturn.net:3478',
		credential: 'free',
		username: 'free',
	},
	{
		urls: 'turn:relay1.expressturn.com:3478',
		username: 'ef7CXOQYB6Z0PDKJT4',
		credential: 'c9ViRNLV2JbVa8LK',
	},
	{
		urls: 'stun:stun.relay.metered.ca:80',
	},
	{
		urls: 'turn:global.relay.metered.ca:80',
		username: 'bb67ccc44cadd8d8336a23a0',
		credential: 'syLm0Rw72434CZL3',
	},
	{
		urls: 'turn:global.relay.metered.ca:80?transport=tcp',
		username: 'bb67ccc44cadd8d8336a23a0',
		credential: 'syLm0Rw72434CZL3',
	},
	{
		urls: 'turn:global.relay.metered.ca:443',
		username: 'bb67ccc44cadd8d8336a23a0',
		credential: 'syLm0Rw72434CZL3',
	},
	{
		urls: 'turns:global.relay.metered.ca:443?transport=tcp',
		username: 'bb67ccc44cadd8d8336a23a0',
		credential: 'syLm0Rw72434CZL3',
	},
]
