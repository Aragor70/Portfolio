export type StateType<T> = {
    state: T,
    setState: (value: T) => void
}