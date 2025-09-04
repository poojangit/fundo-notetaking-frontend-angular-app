export interface Note {
    id?: string
    title: string
    description: string
    color: string
    isArchived? : boolean
    isDeleted?: boolean
    isPined? : boolean
    textFormat?: 'normal' | 'heading' | 'subheading'
    createdAt? : string
    updatedAt?: string
}

export type NoteActionType = 'archive' | 'trash' | 'color' | 'restore' | 'deleteForever'