ApiFootball:

- constructor(apiUri)
- attributes: apiAccountsRepository, apiAccountsUseCases, apiRequester
- comments: do the dependency injection

ApiAccountsRepository:

- constructor(db: DatabaseConnection)
- findAccounts()
- updateAccount(account)
- updateAccounts(changes)

ApiAccountsUseCases:

- constructor(apiAccountsRepository: ApiAccountsRepository)
- getAccount()
- checkDay()
- incrementDayRequests(account: ApiAccount)

ApiRequester:

- constructor(apiUri, apiAccountsUseCases)
- getResponse(endpoint, parameters)

ApiAccount (entity):

export default class ApiAccount {
mail: string;
password: string;
api_key: string;
day_requests: number;
constructor(apiAccount: {
mail: string;
password: string;
api_key: string;
day_requests: number;
}) {
this.mail = apiAccount.mail;
this.password = apiAccount.password;
this.api_key = apiAccount.api_key;
this.day_requests = apiAccount.day_requests;
}
}

DatabaseConnection:
class DatabaseConnection {
URI: string;
constructor(uri: string) {
this.URI = uri;
this.connect = this.connect.bind(this);
}
public async connect() {
await mongo.connect(this.URI);
}
}

export default DatabaseConnection;
