import { Language } from "../utils/constant"

export type ProjectType = {
    id?: number,
    name?: string | null,
    status?: string | null,
    isVisible?: string | null,
    website?: string | null,
    images?: SingleImage[] | null,
    repositories?: SingleRepository[],
    repos?: SingleRepository[] | null,
    icons?: SingleImage[] | null,
    loadingRepos?: false | true
}
export type SingleImage = {
    id: number,
    name?: string,
    url?: string,
    isFile?: boolean,
    label?: string
}
type SingleRepository = {
    id?: number,
    name?: string,
    url?: string
}
export type FilterFormData = {
    phrase?: null | string,
    startDate?: null | string,
    endDate?: Date,
    languageCode: Language,
    isVisible?: boolean,
    className?: string
}