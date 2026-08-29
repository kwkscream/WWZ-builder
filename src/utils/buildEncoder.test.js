/**
 * Test file for buildEncoder - verify encoding/decoding works correctly
 * Run in browser console to test
 */

import { encodeBuildToFragment, decodeBuildFromFragment } from './buildEncoder.js';

// Test case 1: Gunslinger with passive and active skills
const testBuild1 = {
	passive: [
		{
			"name": "Gimme a Reason",
			"description": "Start with Frag Grenade and Compact SMG. Movement has no effect on weapon accuracy, recoil effect also reduced",
			"isPassive": true,
			"image": "GimmeaReason"
		}
	],
	active: {
		1: {
			"name": "Fire in the Hole",
			"description": "Frag Grenade can kill 25% more targets (base: 14)",
			"image": "FireintheHole"
		},
		3: {
			"name": "Heavy Metal",
			"description": "Start with improved MAG5 Machinegun that deals 50% more damage, and has 50% more ammo. All MAG5 machinegun pickups also improved",
			"image": "HeavyMetal"
		}
	},
	className: "Gunslinger"
};

console.log('=== Test Case 1: Gunslinger with skills ===');
console.log('Original build:', testBuild1);

try {
	const encoded = encodeBuildToFragment(testBuild1, 'Gunslinger');
	console.log('Encoded fragment:', encoded);
	
	const decoded = decodeBuildFromFragment(encoded);
	console.log('Decoded build:', decoded);
	
	// Verify
	const passiveMatch = decoded.passive.length === testBuild1.passive.length &&
		decoded.passive[0].name === testBuild1.passive[0].name;
	
	const activeMatch = Object.keys(decoded.active).length === Object.keys(testBuild1.active).length &&
		decoded.active[1]?.name === testBuild1.active[1]?.name &&
		decoded.active[3]?.name === testBuild1.active[3]?.name;
	
	console.log('✓ Passive skills match:', passiveMatch);
	console.log('✓ Active skills match:', activeMatch);
	console.log('✓ Class name match:', decoded.className === testBuild1.className);
	
	if (passiveMatch && activeMatch && decoded.className === testBuild1.className) {
		console.log('✅ Test PASSED');
	} else {
		console.log('❌ Test FAILED');
	}
} catch (error) {
	console.error('❌ Test ERROR:', error);
}

// Test case 2: Empty build
console.log('\n=== Test Case 2: Empty build ===');
const testBuild2 = {
	passive: [],
	active: {},
	className: "Gunslinger"
};

try {
	const encoded = encodeBuildToFragment(testBuild2, 'Gunslinger');
	console.log('Encoded fragment:', encoded);
	
	const decoded = decodeBuildFromFragment(encoded);
	console.log('Decoded build:', decoded);
	
	const match = decoded.passive.length === 0 &&
		Object.keys(decoded.active).length === 0 &&
		decoded.className === 'Gunslinger';
	
	console.log('✓ Empty build preserved:', match);
	if (match) {
		console.log('✅ Test PASSED');
	} else {
		console.log('❌ Test FAILED');
	}
} catch (error) {
	console.error('❌ Test ERROR:', error);
}

// How to use:
console.log('\n=== URL Format Examples ===');
console.log('Simple: #Gunslinger');
console.log('With passive: #Gunslinger/p:Gimme%20a%20Reason');
console.log('With active: #Gunslinger/a:1:Fire%20in%20the%20Hole');
console.log('Full: #Gunslinger/p:Gimme%20a%20Reason/a:1:Fire%20in%20the%20Hole|3:Heavy%20Metal');
