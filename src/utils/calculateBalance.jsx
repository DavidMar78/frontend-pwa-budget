
export const computeDiff = (data) => {
    const totalDavid = data
        .filter(item => item.user === "David")
        .reduce((acc, item) => acc + item.sum, 0);

    const totalLaetitia = data
        .filter(item => item.user === "Laetitia")
        .reduce((acc, item) => acc + item.sum, 0);

    return {
        diffDavid: totalDavid - totalLaetitia,
        diffLaetitia: totalLaetitia - totalDavid,
    };
};

export const format = (value) =>
    value.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });0