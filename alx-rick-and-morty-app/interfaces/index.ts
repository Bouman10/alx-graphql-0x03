interface InfoProps {
    pages: number
    next: number
    prev: number
    count: number
}

export interface EpisodeProps {
    id: number
    name: string
    air_date: string
    episode: string
    info: InfoProps
}

export type EpisodeProps = Pick<EpisodeProps, 'id' | 'name' | 'air_date' | "episode">