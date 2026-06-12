export type ColumnConfig<T> = {
    key: keyof T
    label: string
    width?: number | string
}