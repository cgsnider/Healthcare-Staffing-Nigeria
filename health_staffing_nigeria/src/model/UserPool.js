
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_QfRV1jh3E",
    ClientId: "27jfqr5p999tf9tp9n7tu8f2ju"
}

export default new CognitoUserPool(poolData);