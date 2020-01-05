export interface ParticipantIdentity {
    participantId: number,
        player: {
            platformId: string,
            accountId: string,
            summonerName: string,
            summonerId: string,
            currentPlatformId: string,
            currentAccountId: string,
            matchHistoryUri: string,
            profileIcon: number
    }
}