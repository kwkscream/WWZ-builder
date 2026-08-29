/**
 * Build Encoder/Decoder Utility
 * Compact URL-based build sharing using skill names and column indices
 * Format: #ClassName/p:SkillName1,SkillName2/a1:SkillName/a2:SkillName
 */

import dronemaster from "@/data/skills/Dronemaster.json";
import exterminator from "@/data/skills/Exterminator.json";
import fixer from "@/data/skills/Fixer.json";
import medic from "@/data/skills/Medic.json";
import slasher from "@/data/skills/Slasher.json";
import hellraiser from "@/data/skills/Hellraiser.json";
import vanguard from "@/data/skills/Vanguard.json";
import gunslinger from "@/data/skills/Gunslinger.json";

const skillsData = {
	Dronemaster: dronemaster,
	Gunslinger: gunslinger,
	Exterminator: exterminator,
	Fixer: fixer,
	Medic: medic,
	Slasher: slasher,
	Hellraiser: hellraiser,
	Vanguard: vanguard,
};

/**
 * Encode build to compact URL fragment format
 * Format: #ClassName/p:PassiveName1,PassiveName2/a1:ActiveName/a2:ActiveName
 * @param {Object} buildData - Build data with passive/active skills
 * @param {string} className - Class name
 * @returns {string} - Compact URL fragment (without #)
 */
export const encodeBuildToFragment = (buildData, className) => {
	try {
		const skillsTree = skillsData[className];
		if (!skillsTree) {
			throw new Error(`Unknown class: ${className}`);
		}

		// Encode passive skills by name
		const passiveNames = buildData.passive
			.filter(skill => skill && skill.name)
			.map(skill => skill.name)
			.join(',');

		// Encode active skills by column index and name
		const activeParts = [];
		if (buildData.active && typeof buildData.active === 'object') {
			Object.keys(buildData.active).forEach(colIdx => {
				const skill = buildData.active[colIdx];
				if (skill && skill.name) {
					activeParts.push(`${colIdx}:${encodeURIComponent(skill.name)}`);
				}
			});
		}

		// Build fragment: ClassName/p:names/a1:name/a2:name
		let fragment = className;
		if (passiveNames) {
			fragment += `/p:${encodeURIComponent(passiveNames)}`;
		}
		if (activeParts.length > 0) {
			fragment += `/a:${activeParts.join('|')}`;
		}

		return fragment;
	} catch (error) {
		console.error('Failed to encode build to fragment:', error);
		throw error;
	}
};

/**
 * Decode build from compact URL fragment format
 * @param {string} fragment - URL fragment (without #)
 * @returns {Object|null} - Build data with passive/active skills and className
 */
export const decodeBuildFromFragment = (fragment) => {
	try {
		if (!fragment || typeof fragment !== 'string') {
			return null;
		}

		// Parse fragment: ClassName/p:names/a:1:name|2:name
		const parts = fragment.split('/');
		const className = parts[0];

		const skillsTree = skillsData[className];
		if (!skillsTree) {
			console.error('Unknown class:', className);
			return null;
		}

		const buildData = {
			passive: [],
			active: {},
			className: className
		};

		// Parse passive skills
		const passivePart = parts.find(p => p.startsWith('p:'));
		if (passivePart) {
			const passiveNames = decodeURIComponent(passivePart.substring(2)).split(',');
			// Find passive skills in all columns
			passiveNames.forEach(name => {
				skillsTree.forEach(column => {
					const skill = column.find(s => s.name === name && s.isPassive);
					if (skill && !buildData.passive.find(p => p.name === skill.name)) {
						buildData.passive.push(skill);
					}
				});
			});
		}

		// Parse active skills
		const activePart = parts.find(p => p.startsWith('a:'));
		if (activePart) {
			const activeItems = activePart.substring(2).split('|');
			activeItems.forEach(item => {
				// Split only on first colon to handle skill names with colons
				const colonIdx = item.indexOf(':');
				if (colonIdx === -1) return;
				
				const colIdx = item.substring(0, colonIdx);
				const encodedName = item.substring(colonIdx + 1);
				const colIdxNum = parseInt(colIdx, 10);
				const skillName = decodeURIComponent(encodedName);

				// Find the skill in the specified column
				if (skillsTree[colIdxNum]) {
					const skill = skillsTree[colIdxNum].find(s => s.name === skillName && !s.isPassive);
					if (skill) {
						buildData.active[colIdxNum] = skill;
					}
				}
			});
		}

		return buildData;
	} catch (error) {
		console.error('Failed to decode build from fragment:', error);
		return null;
	}
};

/**
 * Get build share URL with compact fragment
 * @param {Object} buildData - Build data
 * @param {string} className - Class name
 * @returns {string} - Share URL with fragment
 */
export const getBuildShareUrl = (buildData, className) => {
	try {
		const fragment = encodeBuildToFragment(buildData, className);
		const baseUrl = window.location.origin + window.location.pathname;
		return `${baseUrl}#${fragment}`;
	} catch (error) {
		throw new Error(`Failed to generate share URL: ${error.message}`);
	}
};

/**
 * Get build from URL fragment
 * @returns {Object|null} - Build data if found, null otherwise
 */
export const getBuildFromUrl = () => {
	try {
		const fragment = window.location.hash.substring(1); // Remove #
		if (!fragment) {
			return null;
		}
		return decodeBuildFromFragment(fragment);
	} catch (error) {
		console.error('Failed to load build from URL:', error);
		return null;
	}
};
