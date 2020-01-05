export interface Team {
    teamId: number,
    winbooleanail,
    firstBlood: boolean,
    firstTower: boolean,
    firstInhibitor: boolean,
    firstBaron: boolean,
    firstDragon: boolean,
    firstRiftHerald: boolean,
    towerKills: number,
    inhibitorKills: number,
    baronKills: number,
    dragonKills: number,
    vilemawKills: number,
    riftHeraldKills: number,
    dominionVictoryScore: number,
    bans: [
        {
            championId: number,
            pickTurn: number
        },
        {
            championId: number,
            pickTurn: number
        },
        {
            championId: number,
            pickTurn: number
        },
        {
            championId: number,
            pickTurn: number
        },
        {
            championId: number,
            pickTurn: number
        }
    ]
}