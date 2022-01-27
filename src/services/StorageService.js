const StorageService = {};
StorageService.save = function (key, data) {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}
StorageService.delete = function (key) {
    localStorage.removeItem(key);
}
StorageService.get = function (key) {
    const temp = localStorage.getItem(key);
    if (temp)
        return JSON.parse(temp);
    else
        return false;
}
export default StorageService;