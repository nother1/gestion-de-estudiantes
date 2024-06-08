export const ExpirationDate = () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    const expiration_date = `${year}-${month}-${day}`;
    return expiration_date;
}