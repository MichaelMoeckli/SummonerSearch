import { Match } from './Match.model'

export interface MatchHistoryList {
    matches: Array<Match>
    startIndex: number
    endIndex: number
    totalGames: number
}