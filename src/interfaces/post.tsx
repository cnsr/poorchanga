export interface File {
    name: string
    original: string
    thumb: string
    filename: string
    filedata: string
}

export interface ThreadInterface {
    replies: Array<number>,
    files: Array<File>,
    locked: boolean,
    roll: null
    infinite: false
    count: number
    oppost: boolean
    postcount: number
    username: string
    pinned: boolean
    op: boolean
    sage: boolean
    board: string
    countryname: string
    filecount: number
    date: string
    subject: string
    thread: null | string
    lastpost: string
    admin: boolean
    seal: boolean
    country: string | null
    trip: null | string
    banned: boolean
    text: string
}