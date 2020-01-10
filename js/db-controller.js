const idbPromised = idb.open('nobars_database', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('nobars')) {
        upgradedDb.createObjectStore("nobars", {keyPath: "nobarId"});
    }
});

const dbGetAllNobar = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("nobars", `readonly`);
            return transaction.objectStore("nobars").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const dbInsertNobar = nobar => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("nobars", `readwrite`);
            transaction.objectStore("nobars").put(nobar);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteNobar = nobarId => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("nobars", `readwrite`);
            transaction.objectStore("nobars").delete(nobarId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const idbPromisedTeam = idb.open('fav_teams_database', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('fav_teams')) {
        upgradedDb.createObjectStore("fav_teams", {keyPath: "favteamId"});
    }
});

const dbGetAllFavteam = () => {
    return new Promise((resolve, reject) => {
        idbPromisedTeam.then(db => {
            const transaction = db.transaction("fav_teams", `readonly`);
            return transaction.objectStore("fav_teams").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const dbInsertFavteam = favteam => {
    return new Promise((resolve, reject) => {
        idbPromisedTeam.then(db => {
            const transaction = db.transaction("fav_teams", `readwrite`);
            transaction.objectStore("fav_teams").put(favteam);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteFavteam = favteamId => {
    return new Promise((resolve, reject) => {
        idbPromisedTeam.then(db => {
            const transaction = db.transaction("fav_teams", `readwrite`);
            transaction.objectStore("fav_teams").delete(favteamId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};