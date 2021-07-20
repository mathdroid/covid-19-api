export interface Query {
    f: string
    outFields: string
    returnGeometry: boolean
    where: string
    orderByFields?: string
    outStatistics?: string
}

export interface CreateQueryParams {
    where: string,
    orderByFields?: string
    field?: string
}