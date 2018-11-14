module.exports = {
    missionPatch: (mission, { size }) => {
        return size === 'SMALL'
            ? mission.missionPatchSmall
            : mission.missionPatchLarge;
    }
}