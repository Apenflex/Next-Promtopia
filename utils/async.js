export const delay = (time) =>
    new Promise((res) => {
        setTimeout(() => res(1), time)
    })