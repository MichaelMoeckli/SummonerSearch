import { Participant } from './Participant.model'
import { ParticipantIdentity } from './ParticipantIdentity.model';
import { Team } from './Team.model';

export interface MatchInfo {
    gameId: number
    platformId: number
    gameCreation: number
    gameDuration: number
    queueId: number
    mapId: number
    seasonId: number
    gameVersion: number
    gameModeboolean
    gameTypeboolean
    teams: Array<Team>
    participants: Array<Participant>
        participantIdentities: Array<ParticipantIdentity>
}