export const requiredField = (value: string) => value ? undefined : 'Field is required'

export const maxLength = (maxLength: number) => (value: string) => {
    return  value.length > maxLength ? 'Max length is 10 symbols' : undefined
}

